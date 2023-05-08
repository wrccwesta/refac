<?php
namespace Northplay\NorthplayApi\Controllers\Integrations\Games;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;

class GameKernel
{
		public function providers()
		{
				return array(
						array(
						"id" => "mascot",
						"active" => true,
						"provider_name" => "Mascot Games",
						),
						array(
							"id" => "bgaming",
							"active" => true,
							"provider_name" => "BGaming",
						),
						array(
						"id" => "pragmaticplay",
						"active" => false,
						"provider_name" => "Pragmatic Play",
						),
					);
		}

		public function create_session($provider, $session_id)
		{
				if($provider === "mascot") {
					$mascot_controller = new \Northplay\NorthplayApi\Controllers\Integrations\Games\Mascot\MascotKernel;
					return $mascot_controller->create_session($session_id);
				}
				if($provider === "bgaming") {
					$bgaming_controller = new \Northplay\NorthplayApi\Controllers\Integrations\Games\Bgaming\BgamingKernel;
					return $bgaming_controller->create_session($session_id);
				}
		}
}