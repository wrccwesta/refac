<?php

namespace Northplay\NorthplayApi\Controllers\Casino\API\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Northplay\NorthplayApi\Controllers\Integrations\GatewayTrait;

class CasinoGameController extends Controller
{
    use GatewayTrait;

      public function __construct()
      {
         $this->middleware(['web', 'auth']);
         $this->entry_controller = new \Northplay\NorthplayApi\Controllers\Integrations\EntryController;
         $this->games_model = new \Northplay\NorthplayApi\Models\SoftswissGameModel;
      }

      public function retrieve(Request $request)
      {
            if(auth()->guest()) {
                abort(403, "Please login to play games.");
            }
            if(!$request->slug) {
                abort(403, "Game not defined");
            }
            if(!$request->currency) {
                abort(403, "Currency not defined");
            }
            if(!$request->debit_currency) {
                abort(403, "Debit currency not defined");
            }

            $select_game = $this->games_model->where("slug", $request->slug)->first();
            if(!$select_game) {
                abort(400, "Game not found.");
            }

            $preloader_theme = 'black';
            if($request->preloader_theme) {
                if($request->preloader_theme === "darkblue") {
                    $preloader_theme = "darkblue";
                }

            }

            $user_id = auth()->user()->id;
            $game_id = $select_game->id;
            $currency = $request->currency;
            $debit_currency = $request->debit_currency;
            $entry_token = $this->entry_controller->create_entry_session($user_id, $game_id, $currency, $debit_currency);
            $data = [
                "success" => true,
                "session_url" => env('APP_URL')."/northplay/game-gateway/entry?entry_token=".$entry_token."&preloader_theme=".$preloader_theme,
            ];
            return response()->json($data, 200);
            
    
      }
}