<?php
//Este archivo crea y elimina tablas en la base de datos cuando ejecutas migraciones en laravel

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//Devuelve una clase que hereda de Migration
return new class extends Migration
{
    /**
     * Este método se ejecuta cuando corres la migración (php artisan migrate). En este caso se crean tres tablas ,
     * la tabla users , la tabla password_reset_tokens y la tabla sessions
     * 
     */
    public function up(): void
    {   
        //Mediane Schema creamos la tabla , y medainte Blueprint generamos las columanas de la tabla 
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Este metodo se ejcuta cuando ejecutas php artisan migrate:rollback y revierte los cambios. Elimina las tables si existen
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
