<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LocalizacionesController;
use App\Http\Controllers\RegisterController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Ruta para llamar al metodo register del RegisterController y registrar un usuario
Route::post('register', [RegisterController::class, 'register']);
//Ruta para llamar al metodo login del RegisterController y hacer login un usuario
Route::post('login', [RegisterController::class, 'login']);
//Ruta para recoger todos los datos de la tabla locations
Route::get('recoger', [LocalizacionesController::class, 'RecogerDatos']);

Route::middleware('auth:api')->group(function () {  
    Route::get('logout', [RegisterController::class, 'logout']);

});
