<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kajian extends Model
{
    protected $fillable = [
        'judul',
        'pemateri',
        'tanggal',
        'waktu',
        'tempat',
        'deskripsi',
        'is_active',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'is_active' => 'boolean',
    ];
}
