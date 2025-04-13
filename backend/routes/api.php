<?php
//Archivo donde definimos las rutas de nuestra API (Interaccion con el backend mediante solicitudes HTTP)
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProductoController; 
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComandaController;


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


//Pedidos 
Route::get('/pedidos',[PedidoController::class,'show']);
Route::get('/pedidos/{pedido}',[PedidoController::class,'show']);
Route::post('/pedidos',[PedidoController::class, 'store']);
Route::post('/pedidosAuth',[PedidoController::class, 'storeWithAuth'])->middleware('auth:sanctum');
Route::delete('/pedidos/{pedido}',[PedidoController::class,'delete']);

//Comandas
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/comandas', [ComandaController::class, 'index']);
    Route::put('/comandas/{id}', [ComandaController::class, 'cerrar']);
    Route::delete('/comandas/{comanda}', [ComandaController::class, 'destroy']);
});