<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailPekurban extends Model
{
    protected $fillable = [
        'pekurban_id',
        'nama',
        'alamat',
        'bagian',
        'bayar',
        'trensaksi_id',
    ];

    public function pekurban()
    {
        return $this->belongsTo(Pekurban::class);
    }

    public function trensaksi()
    {
        return $this->belongsTo(Trensaksi::class);
    }
}
