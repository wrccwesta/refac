<?php
namespace Northplay\NorthplayApi\Controllers\Casino\API;

use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Northplay\NorthplayApi\Controllers\Casino\API\Auth\UserBalanceController;
use Northplay\NorthplayApi\Controllers\Casino\API\Auth\UserNotificationsController;
use Northplay\NorthplayApi\Models\UserStorageModel;

trait CasinoTrait
{

	public function add_balance($user_id, $currency, $amount, $tx_data)
	{
		$user_balance = new UserBalanceController;
		return $user_balance->credit_user_balance($user_id, $currency, "balance", $amount, $tx_data);
	}

	public function add_bonus_balance($user_id, $currency, $amount, $tx_data)
	{
		$user_balance = new UserBalanceController;
		return $user_balance->credit_user_balance($user_id, $currency, "balance_bonus", $amount, $tx_data);
	}
	

	public function sendNotification($user_id, $title, $short_message, $last_message, $category, $action)
	{
        $notifications = new UserNotificationsController;
		$notifications->send(
			$user_id,
			$title,
			$short_message,
			$last_message,
			$category,
			$action,
		);
	}

	public function user_storage_get($user_id, $storage_key)
	{
		$user_storage_model = new UserStorageModel;
		$select_storage = $user_storage_model->where("user_id", $user_id)->where("storage_key", $storage_key)->first();
		if($select_storage) {
			return $select_storage;
		} else {
			return NULL;
		}
	}
	

	public function user_storage_set($user_id, $storage_key, $storage_value, $storage_category, $extra_data)
	{
		$user_storage_model = new UserStorageModel;
		$select_storage = $this->user_storage_get($user_id, $storage_key);
		if($select_storage) {
			$storage_data = [
				"storage_value" => $storage_value,
				"extra_data" => $extra_data,
				"updated_at" => now(),
			];
			$data = $user_storage_model->where("user_id", $user_id)->where("storage_key", $storage_key)->update($storage_data);
		} else {
		$storage_data = [
				"user_id" => $user_id,
				"storage_key" => $storage_key,
				"storage_value" => $storage_value,
				"storage_category" => $storage_category,
				"extra_data" => json_encode($extra_data, JSON_PRETTY_PRINT),
				"created_at" => now(),
				"updated_at" => now(),
		];
		$user_storage_model->insert($storage_data);
		}
		return $storage_data;
	}
}