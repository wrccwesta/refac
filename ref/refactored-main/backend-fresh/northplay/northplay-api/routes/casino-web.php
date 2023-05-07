<?php

use Northplay\NorthplayApi\Controllers\Casino\API\Auth\AuthenticatedSessionController;
use Northplay\NorthplayApi\Controllers\Casino\API\Auth\EmailVerificationNotificationController;
use Northplay\NorthplayApi\Controllers\Casino\API\Auth\NewPasswordController;
use Northplay\NorthplayApi\Controllers\Casino\API\Auth\PasswordResetLinkController;
use Northplay\NorthplayApi\Controllers\Casino\API\Auth\UserRegistrationController;
use Northplay\NorthplayApi\Controllers\Casino\API\Auth\UserEmailVerifyController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Northplay\NorthplayApi\Controllers\Casino\API\Auth\UserEmailController;
use Northplay\NorthplayApi\Controllers\Casino\API\MetadataController;
use Northplay\NorthplayApi\Controllers\Casino\API\Auth\UserAuthController;
use Northplay\NorthplayApi\Controllers\Casino\API\GamedataController;
use Northplay\NorthplayApi\Controllers\Casino\API\Auth\CasinoGameController;
use Northplay\NorthplayApi\Controllers\Casino\API\Auth\UserNotificationsController;

/*
    Route::middleware(['web', 'auth:sanctum'])->get('/northplay/casino/auth/external', function (Request $request) {
        $auth = new ExternalAuthController;
        return $auth->external_auth($request);
    });


    Route::domain("ryan-northplay-legendary-space-guacamole-qwqw7wvvx96h5xw-5555.preview.app.github.dev")->group(function () {


*/

    Route::middleware(['web', 'auth:sanctum'])->get('/northplay/casino/auth/user', function (Request $request) {
        $auth = new UserAuthController;
        return $auth->me($request);
    });

    Route::get('/northplay/casino/data/games-row', [GamedataController::class, 'retrieve'])->middleware(['web'])->name('casino.get.gamedata');

    Route::get('/northplay/casino/meta', [MetadataController::class, 'retrieve'])
                ->middleware(['web'])
                ->name('casino.get.meta');

    Route::post('/northplay/casino/auth/register', [UserRegistrationController::class, 'store'])
                    ->middleware(['web', 'guest'])
                    ->name('register');

    Route::post('/northplay/casino/auth/login', [AuthenticatedSessionController::class, 'store'])
                    ->middleware(['web', 'guest'])
                        ->name('login');

    Route::post('/northplay/casino/auth/forgot-password', [PasswordResetLinkController::class, 'store'])
                    ->middleware(['web', 'guest'])
                    ->name('password.email');

    Route::post('/northplay/casino/auth/change-password', [PasswordResetLinkController::class, 'store'])
                    ->middleware(['web', 'auth'])
                    ->name('password.change.email');
                    
    Route::get('/northplay/casino/auth/notifications/all', [UserNotificationsController::class, 'all'])
                    ->middleware(['web', 'auth'])
                    ->name('casino.notifications');

    Route::get('/northplay/casino/auth/start-game', [CasinoGameController::class, 'retrieve'])
                    ->middleware(['web', 'auth'])
                    ->name('casino.start_game');

    Route::post('/northplay/casino/auth/reset-password', [NewPasswordController::class, 'store'])
                    ->middleware(['web'])
                    ->name('password.store');

    Route::post('/northplay/casino/auth/email/update-email', [UserEmailController::class, 'store'])
                    ->middleware(['web', 'auth'])
                    ->name('update_email');

    Route::get('/northplay/casino/auth/verify-email/{id}/{hash}', UserEmailVerifyController::class)
                    ->middleware(['web', 'auth', 'signed', 'throttle:6,1'])
                    ->name('verification.verify');

    Route::post('/northplay/casino/auth/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                    ->middleware(['web', 'auth', 'throttle:6,1'])
                    ->name('verification.send');

    Route::post('/northplay/casino/auth/logout', [AuthenticatedSessionController::class, 'destroy'])
                    ->middleware(['web', 'auth'])
                    ->name('logout');
