<?php

//Código que configura una aplicación Laravel
//Importación de las clases
use Illuminate\Foundation\Application; //Crea la aplicación Laravel
use Illuminate\Foundation\Configuration\Exceptions; //Controla las excepciones
use Illuminate\Foundation\Configuration\Middleware; //Filtra las solicitudes

//Crea una nueva aplicación Laravel , pasando por parametro la carpeta principal del proyecto
return Application::configure(basePath: dirname(__DIR__))
//Configurar las rutas , le dice a Laravel donde encontrar los archivos que manejan las URL
    ->withRouting(
        web: __DIR__.'/../routes/web.php', //Define las URL para las pàginas web normales
        api: __DIR__.'/../routes/api.php', //Define las URL para las Apis 
        commands: __DIR__.'/../routes/console.php', //Define comandos especiales que podemos ejecutar mediante la terminal
        health: '/up', //Agrega una url para verificar si la aplicación esta funcionando
    )
    //Configurar los Middleware , un middleware es un filtro que decide si una solicitud puede continuar
    //en este ejemplo aun no se han agregado middleware 
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    //Configura como manejar los errores , por ahora esta vacío pero se podrían 
    //definir respuestas personalizadas en caso de errores
    ->withExceptions(function (Exceptions $exceptions) {
        
    })->create(); //Crea la aplicación
