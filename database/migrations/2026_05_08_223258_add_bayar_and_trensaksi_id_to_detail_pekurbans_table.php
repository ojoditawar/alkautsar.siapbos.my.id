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
        Schema::table('detail_pekurbans', function (Blueprint $table) {
            $table->boolean('bayar')
                ->default(false)
                ->after('bagian');

            $table->foreignId('trensaksi_id')
                ->nullable()
                ->after('bayar')
                ->constrained('trensaksis')
                ->restrictOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('detail_pekurbans', function (Blueprint $table) {
            $table->dropForeign(['trensaksi_id']);
            $table->dropColumn(['bayar', 'trensaksi_id']);
        });
    }
};
