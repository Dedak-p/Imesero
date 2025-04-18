<?php
// database/seeders/EstadoPedidoItemSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EstadoPedidoItem;

class EstadoPedidoItemSeeder extends Seeder
{
    public function run()
    {
        $estados = [
            ['nombre' => 'por confirmar', 'orden' => 1],
            ['nombre' => 'confirmado',    'orden' => 2],
            ['nombre' => 'en cocina',     'orden' => 3],
            ['nombre' => 'de camino',     'orden' => 4],
            ['nombre' => 'entregado',     'orden' => 5],
        ];

        foreach ($estados as $e) {
            EstadoPedidoItem::updateOrCreate(
                ['orden' => $e['orden']],
                $e
            );
        }
    }
}
