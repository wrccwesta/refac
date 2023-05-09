<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

/*
Route::get('/show_list', function (Request $request) {
    $controller = new \Northplay\NorthplayApi\Controllers\DogCallbackController;
    $list = json_decode($controller->get_list($request), true);
    foreach($list as $game) {
        echo '<img src="https://cdn.softswiss.net/i/s4/'.$game['gid'].'.png"/>';
    }
});

Route::get('/config', function (Request $request) {
    $controller = new \Northplay\NorthplayApi\Models\ConfigModel;
    return response()->json($controller->all(), 200);
});

Route::get('/api/dog/callback', function (Request $request) {
    $controller = new \Northplay\NorthplayApi\Controllers\DogCallbackController;
    return $controller->callback($request);
});

Route::post('/api/mailer/incoming', [\Northplay\NorthplayApi\Controllers\MailController::class, 'incoming_http_endpoint'])
    ->name('incoming_http_endpoint');

Route::get('/api/admin/log/{action}', function (Request $request, $action) {
    if($action === 'get') {
        return response()->json((\Northplay\NorthplayApi\Models\LogModel::all()), 200);
    }
});


Route::get('/api/auth/providers', function () {
    return '{"credentials":{"id":"credentials","name":"Credentials","type":"credentials","signinUrl":"https://api.northplay.online/api/auth/signin/credentials","callbackUrl":"https://api.northplay.online/api/auth/callback/credentials"}}';
});

Route::get('/internal/getUserByAuthkey', function (Request $request) {
    $controller = new \Northplay\NorthplayApi\Models\UserExternalAuthModel;
    $auth_model = $controller->where("auth_key", $request->auth_key)->first();
    if(!$auth_model) {
        abort(401, "Auth key not found.");
    }
    $user_controller = new \App\Models\User;
    $user = $user_controller->where('id', $auth_model->user_id)->first();
    if(!$user) {
        abort(403, "Error, user not found.");
    }

    $auth_model->update([
        "external_id" => $request->external_id,
    ]);
    
    return response()->json($user, 200);
});

Route::get('/northplay/images', function (Request $request) {
            $model = new \Northplay\NorthplayApi\Models\SoftswissGameModel;
            $model = $model->all();
            foreach($model as $game) {
                $contents = file_get_contents("https://cdn2.softswiss.net/i/s3/".$game->slug.".png");
                Storage::disk('local')->put($game->slug.'.png', $contents);
                echo "saved";
            }
});

*/


/* entry queue related */
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

Route::get('/gateway/game', [\Northplay\NorthplayApi\Controllers\Integrations\EntryController::class, 'show'])
        ->middleware(['web'])
        ->name('preload.view');

require __DIR__.'/casino-api.php';
