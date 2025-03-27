<?php

use Illuminate\Http\Request;

//Este archivo maneja la solicitud incicial y se encarga de ejecutar el nucleo de la aplicación Laravel.
define('LARAVEL_START', microtime(true)); //Define una constante llamada LARAVEL_START que almacena el tiempo actual 

// Comprobación si la aplicación se encuentra en modo de mantenimiento 
//Aqui se verifica si el archivo maintenance.php existe dentro del directorio storage/framework . Si el archivo esta presente , Laravel esta en modo de mantenimiento.
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance; //En caso de ser encontrado muestra la pagina de mantenimiento
} 

// Register the Composer autoloader...
//Se incluye el archivo especificado 
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
(require_once __DIR__.'/../bootstrap/app.php')
    ->handleRequest(Request::capture());
