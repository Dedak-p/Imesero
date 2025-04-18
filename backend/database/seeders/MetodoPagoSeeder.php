<?php
// database/seeders/MetodoPagoSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MetodoPago;

class MetodoPagoSeeder extends Seeder
{
    public function run()
    {
        foreach (['Pago completo', 'Pago parcial'] as $nombre) {
            MetodoPago::updateOrCreate(['nombre' => $nombre]);
        }
    }
}