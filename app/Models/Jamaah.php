<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jamaah extends Model
{
    protected $table = 'jamaahs';

    protected $fillable = [
        'masjid_id',
        'nama',
        'rt',
        'rw',
        'blok',
        'no_rumah',
        'alamat',
        'telpon',
        'art',
        'foto',
        'status',
    ];

    public function masjid()
    {
        return $this->belongsTo(Masjid::class);
    }
}
