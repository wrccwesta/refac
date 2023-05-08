<?php
namespace Northplay\NorthplayApi\Controllers\Casino\API;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class CurrencyRateController
{
    public function __construct()
    {
        $this->currency_controller = new \Northplay\NorthplayApi\Controllers\CurrencyController;
        $this->global_metadata = $this->metadata_cache_helper("global");
    }

    public function all_exchange_rates() {
      
      
    }

}