<?php
// config for Northplay/NorthplayApi
return [
    'frontend' => 'https://play.bet4k.com',
    'backend' => 'play.bet4k.com',
    'registration_bonus' => [
        "enabled" => true,
        "currency" => "BTC",
        "amount" => 1, //int amount, 1$ = 10000
    ],
    'evercookie' => [
        'name' => env('EVERCOOKIE_COOKIE_NAME', 'northplay'),
    ],
    'openai_key' => "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",
    'seeder_data' =>  [
        "config" => [
                "environment" => [
                    "master_access_key" => "key0214190129412",
                    "force_cache_reset_metadata" => "yes",
                    "force_exchange_rate_update" => "yes",
                ],
                "exchange_rate_keys" => [
                    "coinmarketcap" => "c0a60bf0-ffef-4c50-8e76-2d64ff8878ee",
                ],
                "scoobiedog" => [
                    "sd_host" => env('SCOOBIEDOG_HOST', 'dev.northplay.me'),
                    "sd_apikey" => "e03b960509a9f281b708de47ad1f1056",
                    "sd_secret" => "aPjo8uBQDhWh",
                ],
                "global" => [
                        "links_twitter" => "https://twitter.com/northplay-bv",
                        "links_github" => "https://github.com/northplay-bv",
                        "links_email" => "support@northplay.me",
                        "page_url" => "https://dollardave.app",
                        "page_backend_url" => "https://dollardave.app",
                        "page_title" => "Northplay (DollarDave)",
                        "page_description" => "Come play at the DollarDave\'s.",
                ],
        ],
        "currency" => [
            "USD" => [
                "symbol_id" => "USD",
                "name" => "US Dollar",
                "type" => "fiat",
                "decimals" => "2",
                "rate_usd" => "1.00",
                "active" => false,
            ],
            "EUR" => [
                "symbol_id" => "EUR",
                "name" => "Euro",
                "type" => "fiat",
                "decimals" => "2",
                "rate_usd" => "0.9114110",
                "active" => false,
            ],
            "GBP" => [
                "symbol_id" => "GBP",
                "name" => "British Pound",
                "type" => "fiat",
                "decimals" => "2",
                "rate_usd" => "0.8033450",
                "active" => false,
            ],
            "BTC" => [
                "symbol_id" => "BTC",
                "name" => "Bitcoin",
                "type" => "crypto",
                "decimals" => "8",
                "rate_usd" => "0.0000520",
                "active" => true,
            ],
            "LTC" => [
                "symbol_id" => "LTC",
                "name" => "Litecoin",
                "type" => "crypto",
                "decimals" => "8",
                "rate_usd" => "0.0189060",
                "active" => true,
            ],
            "ETH" => [
                "symbol_id" => "ETH",
                "name" => "Ethereum",
                "type" => "crypto",
                "decimals" => "8",
                "rate_usd" => "0.0007640",
                "active" => true,
            ],
            "XRP" => [
                "symbol_id" => "XRP",
                "name" => "XRP",
                "type" => "crypto",
                "decimals" => "8",
                "rate_usd" => "2.0708300",
                "active" => true,
            ],
            "BNB" => [
                "symbol_id" => "BNB",
                "name" => "BNB",
                "type" => "crypto",
                "decimals" => "8",
                "rate_usd" => "0.0036330",
                "active" => true,
            ],
            "DOGE" => [
                "symbol_id" => "DOGE",
                "name" => "Dogecoin",
                "type" => "crypto",
                "decimals" => "8",
                "rate_usd" => "16.6548880",
                "active" => true,
            ],
        ],
    ],
];
