<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstadoPedidoItemsTable extends Migration
{
    public function up()
    {
        Schema::create('estado_pedido_items', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();  // 'pendiente', 'confirmado', 'en_cocina', 'servido', …
            $table->integer('orden')->default(0); // para ordenar en UI
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('estado_pedido_items');
    }
};
