<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            
            // Relacionar el pedido con un usuario
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            // Relacionar el pedido con un producto
            $table->foreignId('producto_id')->constrained('productos')->onDelete('cascade');
            
            // Mesa ID como campo normal (no clave foránea)
            $table->unsignedBigInteger('mesa_id')->nullable();
            
            // Relacionar el pedido con una comanda
            $table->foreignId('comanda_id')->constrained('comandas')->onDelete('cascade');
            
            // Estado del pedido
            $table->string('estado')->default('pendiente');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
