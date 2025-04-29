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
        Schema::table('comanda_items', function (Blueprint $table) {
            $table->boolean('pagada')->default(false)->after('estado_item_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comanda_items', function (Blueprint $table) {
            $table->dropColumn('pagada');
        });
        //
    }
};
