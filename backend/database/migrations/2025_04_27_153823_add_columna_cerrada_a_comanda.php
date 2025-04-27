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
        Schema::table('comandas', function (Blueprint $table) {
            $table->boolean('cerrada')->default(false)->after('estado_comanda_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comandas', function (Blueprint $table) {
            $table->dropColumn('cerrada');
        });
        //
    }
};

