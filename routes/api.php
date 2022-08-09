<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('login',[AuthController::class,'login']);
Route::post('registration',[AuthController::class,'register']);


Route::middleware('auth:sanctum')->group(function(){
    Route::post('/image-upload',[DashboardController::class,'imageUpload']);
    Route::get('/images',[DashboardController::class,'getImage']);
    Route::get('/images/download/{id}',[DashboardController::class,'downloadImage']);
    Route::get('logout',[AuthController::class,'logout']);
});