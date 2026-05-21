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
        Schema::create('detail_pekurbans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pekurban_id')->constrained()->cascadeOnDelete();
            $table->string('nama');
            $table->text('alamat')->nullable();
            $table->string('bagian')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_pekurbans');
    }
};
