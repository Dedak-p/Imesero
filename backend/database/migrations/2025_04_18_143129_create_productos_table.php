<<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('categoria_id')                // Relacionamos con 'categoria_id'
                  ->constrained('categorias')                 // Hace referencia a la tabla 'categorias'
                  ->onDelete('cascade');                      // Si se elimina una categoria, se eliminan sus productos
            $table->string('imagen')->nullable();            // URL de la imagen
            $table->string('nombre_es');                     // Nombre del producto en español
            $table->string('nombre_ca');                     // Nombre del producto en catalán
            $table->string('nombre_en');                     // Nombre del producto en inglés
            $table->text('descripcion_es')->nullable();     // Descripción del producto en español
            $table->text('descripcion_ca')->nullable();     // Descripción del producto en catalán
            $table->text('descripcion_en')->nullable();     // Descripción del producto en inglés
            $table->text('ingredientes_es')->nullable();    // Ingredientes del producto en español
            $table->text('ingredientes_ca')->nullable();    // Ingredientes del producto en catalán
            $table->text('ingredientes_en')->nullable();    // Ingredientes del producto en inglés
            $table->decimal('precio', 8, 2);                 // Precio del producto
            $table->boolean('disponible')->default(true);    // Disponibilidad del producto
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
