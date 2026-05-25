<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImamMasjid extends Model
{
    protected $table = 'imam_masjids';

    protected $fillable = [
        'masjid_id',
        'nama',
        'foto',
        'jabatan',
        'tipe',
        'sholat',
    ];

    public function masjid()
    {
        return $this->belongsTo(Masjid::class);
    }
}
