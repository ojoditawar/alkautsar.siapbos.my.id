<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Tambah PRIMARY KEY pada kolom id tabel rekenings
     */
    public function up(): void
    {
        // Sinkronkan sequence dengan nilai id terbesar
        DB::statement("
            SELECT setval(
                'rekenings_id_seq',
                COALESCE((SELECT MAX(id) FROM rekenings), 1)
            )
        ");

        // Tambahkan primary key jika belum ada
        DB::statement("
            ALTER TABLE rekenings
            ADD CONSTRAINT rekenings_pkey PRIMARY KEY (id)
        ");
    }

    /**
     * Rollback
     */
    public function down(): void
    {
        DB::statement("
            ALTER TABLE rekenings
            DROP CONSTRAINT IF EXISTS rekenings_pkey
        ");
    }
};
