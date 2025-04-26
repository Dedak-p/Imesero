<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    public function run()
    {
        // Extraemos todas las categorías únicas de tu antiguo array
        $nombres = [
            'Primeros', 'Segundos',
            'Bebidas', 'Postres'
        ];

        foreach ($nombres as $nombre) {
            Categoria::updateOrCreate(
                ['nombre_es' => $nombre],
                ['nombre_es' => $nombre]
            );
        }
    }
}
