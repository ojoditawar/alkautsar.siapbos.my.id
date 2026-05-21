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
        Schema::create('detail_trensaksis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trensaksi_id')->references('id')->on('trensaksis')->onDelete('cascade')->onUpdate('cascade');
            $table->string('uraian');
            $table->decimal('jumlah', 15, 2);
            $table->timestamps();
            $table->unique(['id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_trensaksis');
    }
};
