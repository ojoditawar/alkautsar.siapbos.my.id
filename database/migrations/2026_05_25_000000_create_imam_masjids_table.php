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
        Schema::create('imam_masjids', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('masjid_id');
            $table->foreign('masjid_id')->references('id')->on('masjids')->onDelete('cascade');
            $table->string('nama');
            $table->string('foto')->nullable();
            $table->string('jabatan')->default('Imam');
            $table->string('tipe')->default('utama'); // utama / cadangan
            $table->string('sholat')->default('SUBUH'); // SUBUH, DZUHUR, ASHAR, MAGHRIB, ISYA
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imam_masjids');
    }
};
