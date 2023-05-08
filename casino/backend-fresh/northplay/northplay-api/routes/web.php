<?php
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect(config('northplay-api.frontend'));
});
/*
Route::get('/v2/rooms', [\Northplay\NorthplayApi\Controllers\Multiplayer\RoomController::class, 'list'])
    ->middleware('guest')
    ->name('rooms.list');
Route::get('/v2/rooms/{room_id}', [\Northplay\NorthplayApi\Controllers\Multiplayer\RoomController::class, 'select_room'])
    ->middleware('guest')
    ->name('rooms.select');
Route::post('/v2/rooms/{room_id}/authorize', [\Northplay\NorthplayApi\Controllers\Multiplayer\RoomController::class, 'authorize'])
    ->middleware('guest')
    ->name('rooms.authorize');
Route::get('/v2/rooms/{room_id}/active_users', [\Northplay\NorthplayApi\Controllers\Multiplayer\RoomController::class, 'authorize'])
    ->middleware('guest')
    ->name('rooms.active_users');

Route::get('/play/{type}/{id}', [\Northplay\NorthplayApi\Controllers\Multiplayer\PlayFrameController::class, 'init'])
    ->middleware('guest')
    ->name('player.official.init');


Route::get('/northplay/ever/digest', [EverCookie::class, 'digest'])
    ->middleware(['web'])
    ->name('evercookie.digest');

Route::get('/northplay/ever/check', [EverCookie::class, 'show'])
    ->middleware(['web'])
    ->name('evercookie.show');

Route::get('/northplay/ever/stream', [EverCookie::class, 'stream'])
->middleware(['web'])
->name('evercookie.stream');


Route::get('/northplay/ever/fp', [EverCookie::class, 'fp'])
    ->middleware(['web'])
    ->name('evercookie.fp');

Route::get('/northplay/ever/etag', [EverCookie::class, 'etag'])
    ->middleware(['web'])
    ->name('evercookie.etag');

Route::get('/northplay/ever/cache', [EverCookie::class, 'cache'])
    ->middleware(['web'])
    ->name('evercookie.cache');

Route::get('/northplay/ever/image.png', [EverCookie::class, 'png'])
    ->middleware(['web'])
    ->name('evercookie.png');



Route::get('/northplay/casino/play_game', [PlayGameController::class, 'retrieve'])
                ->middleware(['web', 'auth'])
                ->name('casino.get.game');
*/


require __DIR__.'/casino-web.php';
require __DIR__.'/gateway-games.php';
