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
        Schema::table('monitor_configs', function (Blueprint $table) {
            $table->integer('sholat_jumat')->nullable()->default(10)->after('sholat_isya');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('monitor_configs', function (Blueprint $table) {
            $table->dropColumn('sholat_jumat');
        });
    }
};
