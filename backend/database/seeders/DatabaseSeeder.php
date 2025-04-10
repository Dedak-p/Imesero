<?php

namespace Database\Seeders;

//Importamos el modelo User
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
//Clase base que necesitamos extender para poder usar la funcionalidad seeding.
use Illuminate\Database\Seeder;
use Database\Seeders\ProductoSeeder;

//Clase que extiende Seeder
class DatabaseSeeder extends Seeder
{
    /**
     * Metodo es el que se ejecuta cuando se corre el comando de seeding(php artisan db:seed). Dentro de este metodo es donde definimos que datos
     * se van a insertar en la base de datos . En este caso estamos utilizando una fabrica(Facotry) de Laravel para crear usuarios de prueba.
     */
    public function run(): void
    {   
        // User::factory(10)->create(); Este codigo hubiera creado 10 usuarios de prueba
        //Este codigo crea un usuario de prueba con los valores especificados para name y email
        $this->call(ProductoSeeder::class);
    }
}
