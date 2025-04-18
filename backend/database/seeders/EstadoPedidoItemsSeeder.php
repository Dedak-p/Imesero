<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EstadoPedidoItem;

class EstadoPedidoItemsSeeder extends Seeder
{
    public function run()
    {
        $estados = [
            ['nombre'=>'pendiente','orden'=>1],
            ['nombre'=>'confirmado','orden'=>2],
            ['nombre'=>'en_cocina','orden'=>3],
            ['nombre'=>'servido','orden'=>4],
        ];

        foreach ($estados as $e) {
            EstadoPedidoItem::updateOrCreate(['nombre'=>$e['nombre']], $e);
        }
    }
}

