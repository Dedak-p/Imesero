<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComandaItemsTable extends Migration
{
    public function up()
    {
        Schema::create('comanda_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('comanda_id')
                  ->constrained('comandas')
                  ->onDelete('cascade');
            $table->foreignId('producto_id')
                  ->constrained('productos')
                  ->onDelete('restrict');
            $table->integer('cantidad')->default(1);
            $table->decimal('precio_unitario', 8, 2);
            $table->foreignId('estado_item_id')
                  ->constrained('estado_pedido_items')
                  ->onDelete('restrict');
            $table->timestamps();
        });

        // Agregar restricción para que 'cantidad' sea >= 0
        DB::statement('ALTER TABLE comanda_items ADD CONSTRAINT cantidad_positive CHECK (cantidad >= 0)');
    } 

    public function down()
    {
        Schema::dropIfExists('comanda_items');
    }
};
