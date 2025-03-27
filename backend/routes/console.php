<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

//Creamos un comando artisan personalizado para aejcutar frases inspiradoras cada hora
//ejecutando (php artisan inspire)
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();
