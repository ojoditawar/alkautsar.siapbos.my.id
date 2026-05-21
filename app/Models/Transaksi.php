<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
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
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function masjid()
    {
        return $this->belongsTo(Masjid::class);
    }

    public function detailTransaksi()
    {
        return $this->hasMany(detailTransaksi::class);
    }

    /**
     * Generate nomor transaksi berdasarkan bp bendahara dan urutan
     */
    public static function generateNoTransaksi($userId)
    {
        $user = User::with('bendahara')->find($userId);

        if (!$user || !$user->bendahara) {
            // Fallback jika user tidak memiliki bendahara
            $bp = '00';
        } else {
            $bp = str_pad($user->bendahara->bp, 2, '0', STR_PAD_LEFT);
        }

        // Ambil nomor urut terbesar yang pernah dipakai untuk prefix bp ini
        // (bukan count row), agar nomor tidak mundur ketika ada data dihapus.
        // Parsing di PHP agar portable antara MySQL & PostgreSQL.
        $prefix = $bp . '-';
        $existingNoTrans = self::where('no_trans', 'like', $prefix . '%')
            ->pluck('no_trans');

        $lastNumber = 0;
        foreach ($existingNoTrans as $noTrans) {
            $parts = explode('-', (string) $noTrans);
            $num = (int) end($parts);
            if ($num > $lastNumber) {
                $lastNumber = $num;
            }
        }

        $urutan = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);

        return $prefix . $urutan;
    }


    // public function tahun()
    // {
    //     return $this->belongsTo(Tahun::class);
    // }
}
