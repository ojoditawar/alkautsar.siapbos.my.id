<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pekurban extends Model
{
    protected $fillable = [
        'user_id',
        'jenis',
        'tahun',
        'kelas',
        'sapi',
        'image',
        'kelompok_pequrban',
        'harga',
        'biaya_potong',
        'total',
    ];

    protected $casts = [
        'jenis' => 'integer',
        'harga' => 'integer',
        'biaya_potong' => 'integer',
        'total' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function detail_pekurbans()
    {
        return $this->hasMany(DetailPekurban::class);
    }
}
