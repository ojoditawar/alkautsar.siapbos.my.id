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
        Schema::create('jadwal_imams', function (Blueprint $table) {
            $table->id();
            $table->uuid('masjid_id');
               $table->foreign('masjid_id')
                   ->references('id')
                   ->on('masjids')
                   ->restrictOnDelete();

               $table->foreignId('user_id')->constrained()->restrictOnDelete();

               $table->date('tanggal');
               $table->string('hari', 10);
               $table->string('muadzin');
               $table->string('imam_subuh');
               $table->string('imam_magrib');
               $table->string('imam_isya');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwal_imams');
    }
};
