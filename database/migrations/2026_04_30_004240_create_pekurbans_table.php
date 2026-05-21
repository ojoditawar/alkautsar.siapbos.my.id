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
        Schema::create('pekurbans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->restrictOnDelete();
            $table->tinyInteger('jenis')->default(1)->comment('1=Sapi, 2=Domba, 3=Kambing');
            $table->string('tahun')->nullable();
            $table->string('kelas')->nullable(); // contoh: A
            $table->string('sapi')->nullable(); // contoh: sapi A / nama kelompok sapi
            $table->string('image')->nullable();
            $table->string('kelompok_pequrban'); // contoh: Fulan 1
            $table->bigInteger('harga')->default(0); // 3500000
            $table->bigInteger('biaya_potong')->default(0); // 150000
            $table->bigInteger('total')->default(0); // 3650000
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pekurbans');
    }
};
