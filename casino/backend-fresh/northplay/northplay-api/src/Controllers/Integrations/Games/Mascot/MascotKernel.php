<?php
/**
 * NorthplayApi\Controllers\Integrations\Games\Mascot\MascotKernel
 *
 * PHP version 8.2
 *
 * @category Mascot
 * @package  NorthplayApi\Controllers\Integrations\Games\Mascot
 * @author   Ryan West
 */

namespace Northplay\NorthplayApi\Controllers\Integrations\Games\Mascot;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Northplay\NorthplayApi\Controllers\Integrations\GatewayTrait;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
/**
 * MascotKernel class
 *
 * Class that contains functions to handle Mascot game integration.
 *
 * @category Mascot
 * @package  NorthplayApi\Controllers\Integrations\Games\Mascot
 * @access   public
 */

class MascotKernel
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
        $this->static_assets_url = "https://static.mascot.games/mascotGaming/"; //+game_identifier
        $this->api_url = env('APP_URL')."/northplay/gw/mascot/game_event/"; //+session_id
        $this->session_url = env('APP_URL')."/northplay/play/mascot/"; //+session_id
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
     * Creates session for Mascot game, and sets session and game session urls in session table
     *
     * @param int $session_id Parent session identifier
     *
     * @return void
     */

    public function create_session($session_id)
    {
        $session = $this->select_parent_session($session_id);
        $game_identifier = $this->transform_game_id($session->game_id);
        $url = 'https://demo.mascot.games/run/' . $game_identifier;
        //$url = 'https://exapi.mascot.games/eva/2020-05-22?cid=parimatch&productId='.$game_identifier.'&lang=en&targetChannel=desktop&consumerId=mascot';
        $session_url = $this->get_redirect_url($url);
        $game_session = explode(".", $this->url_hostname($session_url))[0];
        $this->upsert_parent_session_storage($session_id, "game_session_url", $session_url);
        $this->update_parent_session($session_id, "session_url", $this->session_url.$session_id);
        $this->update_parent_session($session_id, "state", "READY");
        $this->update_parent_session($session_id, "game_session", $game_session);
    }

    /**
     * Show function
     *
     * Renders the view for the Mascot game and returns the session data
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
            "game_identifier" => $game_identifier,
            "title" => $this->select_game($session->game_id)->name,
            "static_url" => $this->static_assets_url . $game_identifier . '/',
            "api_url" => $this->api_url . $session_id,
            "currency" => $session->currency,
			"session" => ($this->is_development_state() ? $session : $session_id),
        ];
        return view("northplay::gateway-mascot-game")->with("session_data", $data);
    }

    public function mascot_balance_helper($internal_token)
    {
        $balance = $this->user_balance($internal_token);
        return (int) ($balance['total_usd'] * 100);

    }
    
    public function game_event($session_id, Request $request)
    {
        $internal_token = $session_id;
        $select_session = $this->select_parent_session($session_id);
        $url = 'https://'.$select_session->game_session.'.mascot.games/mascotGaming/spin.php';
        $request_arrayable = $request->toArray(); //we are cloning the request and changing to the minimum bet amount, this because demo balance on mascot is only 100 credits after we sent we will map back to original bet

        $action = $request_arrayable['action'];
        if($action === 'init') { //store values that can come in handy from init, as init is sending stuff you won't get later

			// Sending request to provider
			$init_response = $this->proxy($request, $url);

            $data_origin = json_decode($init_response->getContent(), true);
            if(!isset($data_origin['betCoins'])) {
                return array("error" => $init_response, "session" => $select_session, "url" => $url);
            }
            $data_origin['homeURL']['url'] = NULL;
            $data_origin['homeURL']['show'] = false;
            $data_origin['currency'] = 'USD';

            Cache::set($internal_token.'::mascot_gameconfig::bet_coins', $data_origin['betCoins']);
            Cache::set($internal_token.'::mascot_gameconfig::bet_sizes', $data_origin['bets']);
            Cache::set($internal_token.'::mascot_gameconfig::min_bet', $data_origin['bet']);
            Cache::set($internal_token.':mascotHiddenBalance:'.$select_session->game_session, (int) $data_origin['balance']);
            $data_origin['balance'] = $this->mascot_balance_helper($internal_token);
            return $data_origin;
        }

        $min_bet = (int) Cache::get($internal_token.'::mascot_gameconfig::min_bet');

        if(isset($request_arrayable['bet'])) {
            $original_bet = $request_arrayable['bet'];
            $request_arrayable['bet'] = $min_bet;
            $request = (clone $request)->replace($request_arrayable); // build a new request with existing original headers from player, we are only replacing body content
        }
		$response = $this->proxy($request, $url);
        $data_origin = json_decode($response->getContent(), true);
       
        // Example of respinning game results by creating new session:
		
        if($data_origin['nextAction'] === 'freespin' && $action === 'spin') {
            $this->session_transfer($internal_token);
			$select_session = $this->select_parent_session($session_id);
			$url = 'https://'.$select_session->game_session.'.mascot.games/mascotGaming/spin.php';
            $request_arrayable['action'] = 'spin';
            $request = (clone $request)->replace($request_arrayable); // build a new request with existing original headers from player, we are only replacing body content
			$response = $this->proxy($request, $url);
            $data_origin = json_decode($response->getContent(), true);
            $data_origin['buyin'] = NULL;
		}


        if($action === 'spin' || $action === 'drop' || $action === 'freespin' || $action === 'respin') { // map back to the real bet amounts
            if(isset($data_origin['bet'])) {
                if($original_bet !== $data_origin['bet']) {
                    $data_origin['bet'] = $original_bet;
                    if(isset($data_origin['totalWin'])) {
                        $data_origin['totalWin'] = ($data_origin['totalWin'] / $min_bet) * $original_bet;
                    }
                    if(isset($data_origin['win'])) {
                        $data_origin['win'] = ($data_origin['win'] / $min_bet) * $original_bet;
                    }
                    if(isset($data_origin['freespins'])) {
                        if(isset($data_origin['freespins']['win'])) {
                            $data_origin['freespins']['win'] = ($data_origin['freespins']['win']  / $min_bet) * $original_bet;
                        }
                    }
                    if(isset($data_origin['buyin'])) {
                        if(isset($data_origin['buyin']['bet'])) {
                            $buyin_amount = ($data_origin['buyin']['bet'] / $min_bet) * $original_bet;
                            Cache::set($internal_token.':mascotHiddenBuyinAmount', (int) $buyin_amount);
                            $data_origin['buyin']['bet'] = $buyin_amount;
                        }
                    }
                    if(isset($data_origin['dropWin'])) {
                            $data_origin['dropWin'] = ($data_origin['dropWin'] / $min_bet) * $original_bet;
                    }
                };
            }
        }
        
        if($action === 'buyin') { // buyin feature, based on cache that set before as mascot is using variable buyin feature cost amount
            $buyin_amount = (int) Cache::get($internal_token.':mascotHiddenBuyinAmount');
            $data_origin['bet'] = $buyin_amount;
            $process_and_get_balance = $this->process_game($internal_token, ($buyin_amount), 0, $data_origin);
            $data_origin['balance'] = (int) $process_and_get_balance;
            return $data_origin;
        }

        // calculate balance differences from real session, multiplied by the bet value (as balance differences will be on min. bet settings)
        // we store the previous balance in cache, if it is missing we will set it to the current balance
        $bridge_balance = (int) Cache::get($internal_token.':mascotHiddenBalance:'.$select_session->game_session);
        if(!$bridge_balance) {
            $bridge_balance = Cache::set($internal_token.':mascotHiddenBalance:'.$select_session->game_session, (int) $data_origin['balance']);
        }
        $current_balance = (int) $data_origin['balance'];
        if($bridge_balance !== $current_balance) {
            if($bridge_balance > $current_balance) {
                $winAmount = 0;
                $betAmount = (($bridge_balance - $current_balance)  / $min_bet) * $original_bet;
            } else {
                $betAmount = 0;
                $winAmount = (($current_balance - $bridge_balance) / $min_bet) * $original_bet;
            }
        Cache::set($internal_token.':mascotHiddenBalance:'.$select_session->game_session,(int) $current_balance);
        $process_and_get_balance = $this->process_game($internal_token, ($betAmount ?? 0), ($winAmount ?? 0), $data_origin);
        $data_origin['balance'] = (int) $process_and_get_balance;
        } else {
            Cache::set($internal_token.':mascotHiddenBalance:'.$select_session->game_session, (int) $current_balance);
            $get_balance = $this->mascot_balance_helper($internal_token);
            $data_origin['balance'] = (int) $get_balance;
        }

        $hidden_balance = (int) Cache::get($internal_token.':mascotHiddenBalance:'.$select_session->game_session);
        if($hidden_balance < 2500) { // let's create new _real_ session in background when real session's balance is running low (2500 is if below 25$)
            if(isset($data_origin['nextAction'])) {
                if($data_origin['nextAction'] === "spin") {
                    $this->session_transfer($internal_token);
                }
            }
        }

        if(env('APP_DEBUG') === true)
        { // add extra data in debug/testing
        $data_origin['dog'] = [];
        $data_origin['dog']['real_balance'] = $hidden_balance;
        $data_origin['dog']['real_session'] = $select_session->game_session;
        $data_origin['dog']['internal_token'] = $internal_token;
        }
        return $data_origin;
	}

    public function session_transfer($session_id) // creates new real session and assigns it to the parent session
    {
		$this->create_session($session_id);		
		$select_session = $this->select_parent_session($session_id);

        $init_balance = 10000; // value of starting balance on real session - defaulted 100.00, used when doing session transfer
        Cache::set($session_id.':mascotHiddenBalance:'.$select_session->game_session, (int) $init_balance);
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