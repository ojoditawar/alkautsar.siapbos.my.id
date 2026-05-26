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
        Schema::create('jamaahs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('masjid_id');
            $table->foreign('masjid_id')->references('id')->on('masjids')->onDelete('cascade');
            $table->string('nama');
            $table->string('rt', 10)->nullable();
            $table->string('rw', 10)->nullable();
            $table->string('blok', 50)->nullable();
            $table->string('no_rumah', 20)->nullable();
            $table->string('alamat')->nullable();
            $table->string('telpon', 20)->nullable();
            $table->integer('art')->default(0);
            $table->string('foto')->nullable(); // Ditambahkan sebelum kolom status
            $table->string('status')->default('warga'); // warga / bukan warga
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jamaahs');
    }
};
