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
Route::domain('games.dollardave.app')->group(function () {
    Route::get('/gw/mascot/game_event/{session_id}', [Northplay\NorthplayApi\Controllers\Integrations\Games\Mascot\MascotKernel::class, 'game_event'])
        ->middleware(['api'])
        ->name('game_event.mascot.get');

    Route::post('/gw/mascot/game_event/{session_id}', [Northplay\NorthplayApi\Controllers\Integrations\Games\Mascot\MascotKernel::class, 'game_event'])
        ->middleware(['api'])
        ->name('game_event.mascot.post');

    Route::get('/gw/bgaming/game_event/{session_id}', [Northplay\NorthplayApi\Controllers\Integrations\Games\Bgaming\BgamingKernel::class, 'game_event'])
        ->name('game_event.bgaming.get');

    Route::post('/gw/bgaming/game_event/{session_id}', [Northplay\NorthplayApi\Controllers\Integrations\Games\Bgaming\BgamingKernel::class, 'game_event'])
        ->name('game_event.bgaming.post');

    Route::get('/play/mascot/{session_id}', [Northplay\NorthplayApi\Controllers\Integrations\Games\Mascot\MascotKernel::class, 'show'])
        ->middleware(['api'])
        ->name('view_blade_mascot');

    Route::get('/play/bgaming/{session_id}', [Northplay\NorthplayApi\Controllers\Integrations\Games\Bgaming\BgamingKernel::class, 'show'])
        ->middleware(['api'])
        ->name('view_blade_bgaming');
});
