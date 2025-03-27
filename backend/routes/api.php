<?php
//Archivo donde definimos las rutas de nuestra API (Interaccion con el backend mediante solicitudes HTTP)
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController; //Se importa ProductController 


//Laravel crea automáticamente las rutas RESTful necesarias para las operaciones
// CRUD asociadas con el recurso products.Estas rutas se generan sin que tengas que escribirlas manualmente
//Laravel asignara estas rutas al ProductController que mencionaste
Route::apiResource('products', ProductController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
