<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $fillable = [
        'program',
        'nama',
    ];

    public function kegiatans()
    {
        return $this->hasMany(Kegiatan::class);
    }
}
