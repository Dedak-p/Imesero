<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('categoria_id')
                  ->constrained('categorias')
                  ->onDelete('cascade');
            $table->string('imagen')->nullable();   // URL de la imagen
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->text('ingredientes')->nullable();
            $table->decimal('precio', 8, 2);
            $table->boolean('disponible')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('productos');
    }
};

