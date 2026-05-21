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
        Schema::create('rekenings', function (Blueprint $table) {
            $table->string('rek_id', 1);
            $table->foreign('rek_id')->references('kode')->on('reks')->restrictOnDelete()->restrictOnUpdate();
            $table->foreignId('sub_rek_id')->references('id')->on('sub_reks')->restrictOnDelete()->restrictOnUpdate();
            $table->string('akun', 1);
            $table->string('kelompok', 4);
            $table->string('jenis', 7);
            $table->string('nama', 255);
            $table->string('id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekenings');
    }
};
