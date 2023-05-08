<?php

namespace Northplay\NorthplayApi\Controllers\Casino\API\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class CasinoGameController extends Controller
{
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

            $select_game = $this->games_model->where("slug", $request->slug)->first();
            if(!$select_game) {
                abort(400, "Game not found.");
            }

            $user_id = auth()->user()->id;
            $game_id = $select_game->id;
            $currency = "USD";
            $entry_token = $this->entry_controller->create_entry_session($user_id, $game_id, $currency);
            $data = [
                "success" => true,
                "session_url" => "https://".$request->host()."/northplay/game-gateway/entry?entry_token=".$entry_token,
            ];
            return response()->json($data, 200);
            
    
      }
}