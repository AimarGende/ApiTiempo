<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LocalizacionesController;

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

Route::get('recoger', [LocalizacionesController::class, 'RecogerDatos']);
Route::post('insertar', [LocalizacionesController::class, 'InsertarDatos']);
Route::post('actualizar',[LocalizacionesController::class, 'ActualizarDatos']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
