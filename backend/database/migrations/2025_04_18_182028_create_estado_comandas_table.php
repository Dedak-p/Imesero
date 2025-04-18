<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateEstadoComandasTable extends Migration
{
    public function up()
    {
        // 1) Creamos la tabla de estados
        Schema::create('estado_comandas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->integer('orden')->default(0);
            $table->timestamps();
        });

        // 2) Insertamos los valores iniciales para evitar errores en la migracion
        DB::table('estado_comandas')->insert([
            ['id'=>1,'nombre'=>'borrador',   'orden'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['id'=>2,'nombre'=>'confirmada', 'orden'=>2,'created_at'=>now(),'updated_at'=>now()],
            ['id'=>3,'nombre'=>'pagada',     'orden'=>3,'created_at'=>now(),'updated_at'=>now()],
        ]);

        // 3) Modificamos la tabla comandas
        Schema::table('comandas', function (Blueprint $table) {
            // Si ya existiera un campo string 'estado', primero dropColumn('estado');
            $table->dropColumn('estado');

            // Añadimos la FK con default = 1 (borrador)
            $table->foreignId('estado_comanda_id')
                  ->default(1)
                  ->constrained('estado_comandas')
                  ->onDelete('restrict');
        });
    }

    public function down()
    {
        Schema::table('comandas', function (Blueprint $table) {
            $table->dropForeign(['estado_comanda_id']);
            $table->dropColumn('estado_comanda_id');
            $table->string('estado')->default('borrador');
        });
        Schema::dropIfExists('estado_comandas');
    }
}
