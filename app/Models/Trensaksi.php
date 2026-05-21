<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trensaksi extends Model
{
    protected $table = 'trensaksis';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',
        'masjid_id',
        'tahun',
        'no_trans',
        'tanggal',
        'jenis',
        'bayar',
        'rekening',
        'kode',
        'valid',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'valid' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function masjid()
    {
        return $this->belongsTo(Masjid::class);
    }

    public function detailTrensaksi()
    {
        return $this->hasMany(detailTrensaksi::class);
    }

    /**
     * Generate nomor transaksi dengan format: <2 digit tahun>-<4 digit urutan>
     * Contoh: 26-0001
     *
     * Penomoran berlanjut per masjid_id (bukan per user), per tahun berjalan.
     * Jadi seluruh user yang berada di masjid yang sama akan berbagi urutan
     * yang sama dan tidak reset ketika ganti user.
     */
    public static function generateNoTrensaksi($userId)
    {
        $user = User::find($userId);
        $masjidId = $user?->masjid_id;

        $tahun2 = substr((string) now()->year, -2);
        $prefix = $tahun2 . '-';

        // Ambil seluruh no_trans yang sudah ada untuk masjid & prefix tahun ini.
        // Parsing di PHP agar portable antara MySQL & PostgreSQL.
        $existingNoTrans = self::query()
            ->when($masjidId, fn($q) => $q->where('masjid_id', $masjidId))
            ->where('no_trans', 'like', $prefix . '%')
            ->pluck('no_trans');

        $lastNumber = 0;
        foreach ($existingNoTrans as $noTrans) {
            $parts = explode('-', (string) $noTrans);
            $num = (int) end($parts);
            if ($num > $lastNumber) {
                $lastNumber = $num;
            }
        }

        $urutan = str_pad((string) ($lastNumber + 1), 4, '0', STR_PAD_LEFT);

        return $prefix . $urutan;
    }

    public function detailPekurbans()
    {
        return $this->hasMany(DetailPekurban::class);
    }
}
