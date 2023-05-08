<?php

namespace Northplay\NorthplayApi\Controllers\Casino;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class WebsocketController
{
      protected $client;

      public function __construct()
      {
         $this->centrifuge_api_key = "e91741cd-9403-4743-a6bf-d45c05a84a85";
         $this->centrifuge_secret_key = "2c4371bd-e76a-4a4a-bdee-cfce4807becb";
         $this->auth_channel_secret = "sd21k21o-2012m-aSA00fk-2m2m-salq0qwwTTk";

         $this->client = $this->client();
         $this->external_auth = new \Northplay\NorthplayApi\Models\UserExternalAuthModel;
      }

      /*
            $client->publish($channel, $data);
            $response = $client->broadcast($channels, $data);
            $response = $client->unsubscribe($channel, $userId);
            $response = $client->disconnect($userId);
            $response = $client->presence($channel);
            $response = $client->presenceStats($channel);
            $response = $client->history($channel);
            $response = $client->historyRemove($channel);
            $response = $client->channels();
            $response = $client->info();
      */
      public function client()
      {
            $client = new \phpcent\Client("http://localhost:8000/api");
            $client->setApiKey($this->centrifuge_api_key);
            return $client;
      }

      public function publish($channel_id, $data)
      {     
            return $this->client->publish($channel_id, $data);
      }
      
      public function auth_channel_name($user_id)
      {
            $channel = 'auth-'.md5($user_id.$this->centrifuge_secret_key.$this->auth_channel_secret);
            return $channel;
      }

      public function sendMessage($channel_id, $data)
      {
            return $this->client->publish($channel_id, $data);
      }

      public function channels()
      {
            return $this->client->setUseAssoc(true)->channels();
      }
      public function presenceStats($channel_id)
      {
            return $this->client->presenceStats($channel_id);
      }

      public function connection_token($user_id)
      {
            return $this->client->setSecret($this->centrifuge_secret_key)->generateConnectionToken($user_id);
      }

      public function subscribe_token($user_id, $channel_id)
      {
            return $this->client->setSecret($this->centrifuge_secret_key)->generateSubscriptionToken($user_id, $channel_id);
      }

      public function unsubscribe($user_id, $channel_id)
      {
            $client->unsubscribe($channel_id, $user_id);
      }

}