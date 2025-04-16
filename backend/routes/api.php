<?php
//Archivo donde definimos las rutas de nuestra API (Interaccion con el backend mediante solicitudes HTTP)
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController; //Se importa ProductController 
use App\Http\Controllers\ProductoController; 
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComandaController; //Se importa ComandaController


//Laravel crea automáticamente las rutas RESTful necesarias para las operaciones
// CRUD asociadas con el recurso products.Estas rutas se generan sin que tengas que escribirlas manualmente
//Laravel asignara estas rutas al ProductController que mencionaste
//Route::apiResource('products', ProductController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/', function (Request $request) {
    return 'Bienvenido a la API de iMesero';
});

// Rutas protegidas
Route::apiResource('productos', ProductoController::class)
    ->except(['index', 'show'])
    ->middleware('auth:sanctum');

// Rutas públicas
Route::get('productos', [ProductoController::class, 'index']); // Sin middleware
Route::get('productos/{producto}', [ProductoController::class, 'show']); // Sin middleware


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::delete('/delete-user',[AuthController::class,'deleteUser']);
Route::get('/usersAll',[AuthController::class, 'getAllUsers']);

// Rutas para Comanda
Route::apiResource('comandas', ComandaController::class);

Route::post('/comanda_producto', [ComandaController::class, 'addProducto']);

Route::get('/comandas/{comanda}/productos', [ComandaController::class, 'getProductosComanda']);