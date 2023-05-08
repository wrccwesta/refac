<?php
/**
 * NorthplayApi\Controllers\Integrations\Games\Bgaming\BgamingKernel
 *
 * PHP version 8.2
 *
 * @category Bgaming
 * @package  NorthplayApi\Controllers\Integrations\Games\Bgaming
 * @author   Ryan West
 */

namespace Northplay\NorthplayApi\Controllers\Integrations\Games\Bgaming;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Northplay\NorthplayApi\Controllers\Integrations\GatewayTrait;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
/**
 * BgamingKernel class
 *
 * Class that contains functions to handle Bgaming game integration.
 *
 * @category Bgaming
 * @package  NorthplayApi\Controllers\Integrations\Games\Bgaming
 * @access   public
 */

class BgamingKernel
{
    use GatewayTrait;

    /**
     * Constructor function
     *
     * Initializes the urls to be used in API calls
     *
     * @return void
     */

    public function __construct()
    {
        $this->static_assets_url = "https://static-Bgaming-eu-edgenetwork.play-gateway.com/BgamingGaming/"; //+game_identifier
        $this->api_url = "https://games.dollardave.app/gw/bgaming/game_event/"; //+session_id
        $this->session_url = "https://game-client-dollardave.play-gateway.com/play/bgaming/"; //+session_id
    }

    /**
     * Transform game id function
     *
     * Extracts slug from the game identifier and returns it
     *
     * @param int $game_id Game identifier to be transformed
     * 
     * @return string|null
     */

    public function transform_game_id($game_id)
    {
        $game_identifier = $this->select_game($game_id);
        $game_identifier = explode('/', $game_identifier->slug);
        return $game_identifier[1];
    }

    /**
     * Create session function
     *
     * Creates session for Bgaming game, and sets session and game session urls in session table
     *
     * @param int $session_id Parent session identifier
     *
     * @return void
     */

    public function create_session($session_id)
    {
        $session = $this->select_parent_session($session_id);
        $this->set_real_session($session_id);

    }


    public function set_real_session($session_id)
    {
        $session = $this->select_parent_session($session_id);
        $game_identifier = $this->transform_game_id($session->game_id);
        $url = "https://bgaming-network.com/play/".$game_identifier."/FUN?server=demo";
        $real_session_url = $this->get_redirect_url($url);
        $game_session = explode("play_token=", $real_session_url)[1];
        $http_get = Http::get($real_session_url);
        $options_inbetween = in_between("__OPTIONS__ =", "}}", $http_get->body());
        $options = json_decode($options_inbetween."}}", true);
        Cache::set($session_id.':BgamingHiddenBalance:'.$game_session, (int) 100000, now()->addMinutes(60));
        $this->upsert_parent_session_storage($session_id, "game_options", $options);
        $this->upsert_parent_session_storage($session_id, "created_at", time());
        $this->upsert_parent_session_storage($session_id, "game_session_url", $real_session_url);
        $this->update_parent_session($session_id, "session_url", $this->session_url.$session_id);
        $this->update_parent_session($session_id, "state", "READY");
        $this->update_parent_session($session_id, "game_session", $game_session);
    }

    /**
     * Show function
     *
     * Renders the view for the Bgaming game and returns the session data
     *
     * @param int $session_id Parent session identifier
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */

    public function show($session_id)
    {
		$session = $this->select_parent_session($session_id);
        $game_identifier = $this->transform_game_id($session->game_id);
        $data = [
            "session_id" => $session_id,
            "game_identifier" => $game_identifier,
            "title" => $this->select_game($session->game_id)->name,
            "static_url" => $this->static_assets_url . $game_identifier . '/',
            "api_url" => $this->api_url . $session_id,
            "currency" => $session->currency,
            "storage" => $session->storage["game_options"],
			"session" => ($this->is_development_state() ? $session : $session_id),
        ];
        return view("northplay::gateway-bgaming-game")->with("session_data", $data);
    }

    
    public function game_event($session_id, Request $request)
    {
        $internal_token = $session_id;
        $select_session = $this->select_parent_session($session_id);
        
        $url = Cache::get($internal_token.":bgamingApiUrl".$select_session->game_session);
        if(!$url) {
            Cache::set($internal_token.":bgamingApiUrl".$select_session->game_session, $select_session->storage["game_options"]["api"], now()->addMinutes(60));
            $url = Cache::get($internal_token.":bgamingApiUrl".$select_session->game_session);
        }
        $request_arrayable = $request->toArray(); //we are cloning the request and changing to the minimum bet amount, this because demo balance on Bgaming is only 100 credits after we sent we will map back to original bet

        
        if($request->command === 'init') {
            $init_response = $this->proxy($request, $url);
            $init_details = Cache::get($session_id."::init");
            if(!$init_details) {
                $data_origin = json_decode($init_response->getContent(), true);
                if(isset($data_origin['options'])) {
                    Cache::set($session_id."::init", $data_origin, now()->addMinutes(1));
                }
            } else {
                $data_origin = Cache::get($session_id."::init");
            }
            $get_balance = $this->user_balance($internal_token);
            $data_origin['options']['currency']['code'] = $select_session->currency;
            $game_balance = $data_origin['balance']['game'] ?? 0;
            $data_origin['balance'] = [];
            $data_origin['balance']['game'] = $game_balance;
            $data_origin['balance']['wallet'] = (int) $get_balance;
            return $data_origin;
        }

        if($request->command === 'spin' || $request->command === 'freespin' || $request->command === 'gamble' || $request->command === 'close') {
            $init_response = $this->proxy($request, $url);
            $hidden_cache_key = $internal_token.':BgamingHiddenBalance:'.$select_session->game_session;

            $data_origin = json_decode($init_response->getContent(), true);
            
            // calculate balance differences from real session, multiplied by the bet value (as balance differences will be on min. bet settings)
            // we store the previous balance in cache, if it is missing we will set it to the current balance
            $bridge_balance = (int) Cache::get($hidden_cache_key);
            if(isset($data_origin['balance'])) {
            $current_balance = (int) $data_origin['balance']['wallet'] + (int) $data_origin['balance']['game'];

            if(!$bridge_balance) {
                Cache::set($hidden_cache_key, (int) $current_balance, now()->addMinutes(60));
                $another_response = $this->proxy($request, $url);
                $data_origin = json_decode($another_response->getContent(), true);

                $bridge_balance = (int) Cache::get($hidden_cache_key);
                $current_balance = (int) $data_origin['balance']['wallet'] + (int) $data_origin['balance']['game'];
                $data_origin['log'] = "cache key missing";
            }

            if($bridge_balance !== $current_balance) {
                if($bridge_balance > $current_balance) {
                    $winAmount = 0;
                    $betAmount = (int) ($bridge_balance - $current_balance);
                } else {
                    $betAmount = 0;
                    $winAmount = (int) ($current_balance - $bridge_balance);
                }
            Cache::set($hidden_cache_key, (int) $current_balance);
            $process_and_get_balance = $this->process_game($internal_token, ($betAmount ?? 0), ($winAmount ?? 0), $data_origin);
            $data_origin['balance']['game'] = (int) $data_origin['balance']['game'];
            $data_origin['balance']['wallet'] = (int) $process_and_get_balance;
            } else {
                Cache::set($hidden_cache_key, (int) $current_balance);
                $get_balance = $this->user_balance($internal_token);
                $data_origin['balance']['game'] = (int) $data_origin['balance']['game'];
                $data_origin['balance']['wallet'] = (int) $get_balance;
            }
            }
          

            return $data_origin;


        }

        return [];
	}

    public function session_transfer($session_id) // creates new real session and assigns it to the parent session
    {
		$this->create_session($session_id);		
		$select_session = $this->select_parent_session($session_id);

        $init_balance = 10000; // value of starting balance on real session - defaulted 100.00, used when doing session transfer
        Cache::set($session_id.':BgamingHiddenBalance:'.$select_session->game_session, (int) $init_balance);
    }

    public function replaceInBetweenDataset($a, $b, $replace_from_data, $replace_in_data)
    {
        $value_from = in_between($a, $b, $replace_from_data);
        $value_in = in_between($a, $b, $replace_in_data);
        return str_replace($value_in, $value_from, $replace_in_data);
    }

    public function replaceInBetweenValue($a, $b, $data, $value)
    {
        $value_from = in_between($a, $b, $data);
        return str_replace($value_from, $value, $data);
    }
}