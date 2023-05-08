<?php

namespace Northplay\NorthplayApi\Commands;

use Illuminate\Console\Command;

class NorthplayWebsocketMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'northplay:websocket-message {channel_id?} {type?} {message?}';

    protected $description = 'Command description';
    /**
     * Execute the console command.
     */
    public function handle(): void
    {
      if ($this->argument('channel_id')) {
         $channel_id = $this->argument('channel_id');
      } else {
        $channel_id = $this->ask('Please enter the channel id you want to message');
      }

			if ($this->argument('type')) {
				$type = $this->argument('type');
			} else {
				$type = $this->ask('Please enter the type you want to send');
			}

      if ($this->argument('message')) {
				$message = $this->argument('message');
			} else {
				$message = $this->ask('Please enter the message you want to send');
			}
			
			$data = [
				"type" => $type,
				"message" => $message,
			];

			$websocket_controller = new \Northplay\NorthplayApi\Controllers\Casino\WebsocketController;
			$websocket_controller->sendMessage($channel_id, $data);
    }

}
