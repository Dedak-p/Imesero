<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagosTable extends Migration
{
    public function up()
    {
        Schema::create('pagos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('metodo_pago_id')
                  ->constrained('metodos_pago')
                  ->onDelete('restrict');
            $table->foreignId('comanda_id')
                  ->constrained('comandas')
                  ->onDelete('cascade');
            $table->decimal('monto', 10, 2);
            $table->string('referencia')->nullable(); // código de transacción, etc.
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pagos');
    }
}
