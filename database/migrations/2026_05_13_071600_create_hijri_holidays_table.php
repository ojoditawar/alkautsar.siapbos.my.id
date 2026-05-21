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
        Schema::create('hijri_holidays', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('hijri_date')->nullable(); // e.g. "10 Dzulhijjah"
            $table->date('gregorian_date'); // The actual date for the year
            $table->boolean('is_sync')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hijri_holidays');
    }
};
