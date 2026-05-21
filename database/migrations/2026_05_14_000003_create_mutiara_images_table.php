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
        Schema::create('mutiara_images', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('masjid_id');
            $table->foreign('masjid_id')->references('id')->on('masjids')->onDelete('cascade');
            $table->string('image');
            $table->string('caption')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mutiara_images');
    }
};
