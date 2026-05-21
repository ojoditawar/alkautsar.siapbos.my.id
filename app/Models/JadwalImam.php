<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JadwalImam extends Model
{
    protected $fillable = [
        'user_id',
        'masjid_id',
        'tanggal',
        'hari',
        'muadzin',
        'imam_subuh',
        'imam_magrib',
        'imam_isya',
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
}
