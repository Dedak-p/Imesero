<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Usuario normal
        User::updateOrCreate(
            ['email' => 'user@example.com'],
            [
                'name'     => 'Usuario Prueba',
                'password' => Hash::make('secret123'), // cambia si quieres otra contraseña
                'role'     => 'user',
            ]
        );

        // Usuario administrador
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name'     => 'Administrador',
                'password' => Hash::make('admin1234'), // cambia si prefieres
                'role'     => 'admin',
            ]
        );
    }
}
