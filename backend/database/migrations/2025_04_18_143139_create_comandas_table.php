<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComandasTable extends Migration
{
    public function up()
    {
        Schema::create('comandas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mesa_id')
                  ->constrained('mesas')
                  ->onDelete('cascade');
            $table->foreignId('user_id')
                  ->nullable()
                  ->constrained()
                  ->onDelete('set null');
            $table->boolean('anonimo')->default(false);
            $table->enum('estado', ['borrador','abierta','cerrada','pagada'])
                  ->default('borrador');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('comandas');
    }
};
