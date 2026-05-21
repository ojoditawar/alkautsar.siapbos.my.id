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
        Schema::create('monitor_configs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('masjid_id');
            $table->foreign('masjid_id')
                  ->references('id')
                  ->on('masjids')
                  ->cascadeOnDelete();

            $table->integer('iqomah_subuh')->default(12);
            $table->integer('iqomah_dzuhur')->default(10);
            $table->integer('iqomah_ashar')->default(10);
            $table->integer('iqomah_maghrib')->default(10);
            $table->integer('iqomah_isya')->default(12);
            $table->integer('sholat_subuh')->default(20);
            $table->integer('sholat_dzuhur')->default(25);
            $table->integer('sholat_ashar')->default(25);
            $table->integer('sholat_maghrib')->default(20);
            $table->integer('sholat_isya')->default(30);
            $table->integer('streaming_start_hour')->default(11);
            $table->integer('streaming_start_minute')->default(15);
            $table->integer('streaming_end_hour')->default(11);
            $table->integer('streaming_end_minute')->default(30);
            $table->string('streaming_youtube_url')->nullable();
            $table->string('streaming_title')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monitor_configs');
    }
};
