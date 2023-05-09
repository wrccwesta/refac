<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;




        Route::get('/northplay/oppadoppa', function (Request $request) {
            $controller = new \Northplay\NorthplayApi\Models\SoftswissGameModel;
            $i = 0;
            foreach($controller->all() as $game) {
                $i++;
                echo $i.' - '.$game->slug.': <a target="_blank" href="https://demo.mascot.games/run/'.str_replace('mascot/', '', $game->slug).'">'.$game->slug.'</a> </br>';
            }
        });