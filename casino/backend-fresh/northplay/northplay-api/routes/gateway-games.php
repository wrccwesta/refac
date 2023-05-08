<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;


/* entry queue related */
Route::get('/northplay/test/entry_token', [Northplay\NorthplayApi\Controllers\Integrations\EntryController::class, 'test_entry'])
->middleware(['web', 'auth'])
->name('entry_integration_test');

Route::get('/northplay/game-gateway/entry', [Northplay\NorthplayApi\Controllers\Integrations\EntryController::class, 'show'])
    ->middleware(['web'])
    ->name('entry_show');

Route::get('/northplay/entry/queue_check', [Northplay\NorthplayApi\Controllers\Integrations\EntryController::class, 'queue_check'])
    ->middleware(['web'])
    ->name('queue_check');


/* game functionality */
    Route::get('/northplay/gw/mascot/game_event/{session_id}', [Northplay\NorthplayApi\Controllers\Integrations\Games\Mascot\MascotKernel::class, 'game_event'])
        ->middleware(['api'])
        ->name('game_event.mascot.get');

    Route::post('/northplay/gw/mascot/game_event/{session_id}', [Northplay\NorthplayApi\Controllers\Integrations\Games\Mascot\MascotKernel::class, 'game_event'])
        ->middleware(['api'])
        ->name('game_event.mascot.post');

    Route::get('/northplay/gw/bgaming/game_event/{session_id}', [Northplay\NorthplayApi\Controllers\Integrations\Games\Bgaming\BgamingKernel::class, 'game_event'])
        ->name('game_event.bgaming.get');

    Route::post('/northplay/gw/bgaming/game_event/{session_id}', [Northplay\NorthplayApi\Controllers\Integrations\Games\Bgaming\BgamingKernel::class, 'game_event'])
        ->name('game_event.bgaming.post');

    Route::get('/northplay/play/mascot/{session_id}', [Northplay\NorthplayApi\Controllers\Integrations\Games\Mascot\MascotKernel::class, 'show'])
        ->middleware(['api'])
        ->name('view_blade_mascot');

    Route::get('/northplay/play/bgaming/{session_id}', [Northplay\NorthplayApi\Controllers\Integrations\Games\Bgaming\BgamingKernel::class, 'show'])
        ->middleware(['api'])
        ->name('view_blade_bgaming');


        Route::get('/northplay/oppadoppa', function (Request $request) {
            $controller = new \Northplay\NorthplayApi\Models\SoftswissGameModel;
            $i = 0;
            foreach($controller->all() as $game) {
                $i++;
                echo $i.' - '.$game->slug.': <a target="_blank" href="https://demo.mascot.games/run/'.str_replace('mascot/', '', $game->slug).'">'.$game->slug.'</a> </br>';
            }
        });