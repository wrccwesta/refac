<?php
namespace Northplay\NorthplayApi\Controllers\Integrations;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Northplay\NorthplayApi\Controllers\Integrations\ProxyController;
use Northplay\NorthplayApi\Models\GatewayEntrySessions;
use Northplay\NorthplayApi\Controllers\Integrations\GatewayTrait;

class EntryController extends ParentSession
{

		use GatewayTrait;
		protected $entrysession_model;
		
		/**
		 * EntryController constructor.
		 *
		 * Initialize a gateway entry session.
		 *
		 * @return void
		 */
		public function __construct()
		{
				$this->entrysession_model = new GatewayEntrySessions;
		}
		
		/**
		 * Testing an entry point for gateway sessions.
		 *
		 * @param Request $request
		 * 
		 * @return Redirect
		 */
		public function test_entry(Request $request)
		{
				$user_id = $request->user()->id;
				$game_id = 93;
				$currency = "USD";
				$entry_token = $this->create_entry_session($user_id, $game_id, $currency);

				return redirect("/northplay/test/entry?entry_token=".$entry_token);
		}
		
		/**
		 * Create gateway entry session.
		 *
		 * @param integer $user_id
		 * @param integer $game_id
		 * @param string $currency
		 *
		 * @return string|null
		 */
		public function create_entry_session($user_id, $game_id, $currency, $debit_currency)
		{	
				$entry_token = $this->uuid();

				$inserted_row = $this->entrysession_model->insert([
					"entry_token" => $entry_token,
					"entry_confirmation" => $this->uuid(),
					"session_url" => NULL,
					"session_id" => NULL,
					"user_public_id" => $user_id,
					"user_private_id" => md5($user_id),
					"api_mode" => NULL,
					"game_id" => $game_id,
					"currency" => $currency,
					"debit_currency" => $debit_currency,
					"state" => "CREATED",
					"active" => true,
					"updated_at" => now_nice(),
					"created_at" => now_nice(),
				]);
				
				if($inserted_row) {
					return $entry_token;
				}
		}

		/**
		 * Showing gateway session.
		 *
		 * @param Request $request
		 *
		 * @return View
		 */
		public function show(Request $request)
		{
			if(!$request->entry_token) {
					abort(403, "Entry token missing.");
			}
			$select_entry = $this->entrysession_model->where("entry_token", $request->entry_token)->first();
			if(!$select_entry) {
				abort(400, "Entry session not found for that token.");
			}
			$data = [
					"title" => "Play Gateway",
					"entry_token" => $select_entry['entry_token'],
					"entry_confirmation" => $select_entry['entry_confirmation'],
					"state" => $select_entry['state'],
					"queue_check" => "/northplay/entry/queue_check", // route to hit once player is in the viewer
					"queue_check_options" => [
						"rate_limiter" => [
							"init_interval" => 2000, // amount in MS per http request
							"slowdown_tries" => 10, // amount of http request till slowing
							"slowdown_interval" => 5000, // amount in MS per http request
							"fail_tries" => 60, // amount of trries till fail
						],
					],
			];

			return view('northplay::gateway-preloader')->with("entry_data", $data);
		}

		/**
		 * Checking if session is in queue.
		 *
		 * @param Request $request
		 *
		 * @return JsonResponse|null
		 */
		public function queue_check(Request $request) 
		{
			$entry_token = $request->entry_token ?? abort(400, "Entry token missing");
			$entry_confirmation = $request->confirmation ?? abort(400, "Confirmation key missing");
			$select_entry = $this->entrysession_model->where("entry_token", $entry_token)->where("entry_confirmation", $entry_confirmation)->first();

			if($select_entry) {
					if($select_entry->state === "CREATED") {
						$select_entry->update([
								"state" => "QUEUED",
								"updated_at" => now_nice(),
						]);
						\Northplay\NorthplayApi\Jobs\CreateSession::dispatch($select_entry);
					}
					if($select_entry->session_id !== NULL) {
								$parent_session = $this->select_parent_session($select_entry->session_id);
								if($parent_session->session_url !== NULL) {
									$select_entry->update([
										"state" => "ACTIVE",
										"session_url" => $parent_session->session_url,
										"updated_at" => now_nice(),
									]);
									$select_entry = $this->entrysession_model->where("entry_token", $entry_token)->where("entry_confirmation", $entry_confirmation)->first();
								}
					}
					
					$public_response = [
						"state" => $select_entry->state,
						"state_message" => $select_entry->state_message,
						"session_id" => $select_entry->session_id,
						"session_url" => $select_entry->session_url,
						"updated_at" => $select_entry->updated_at,
					];

					return $public_response;
			} else {
				$public_response = [
					"state" => "FAILED",
					"state_message" => "Entry token not found",
					"session_id" => null,
					"session_url" => null,
				];

				return $public_response;
			}
		}
}
