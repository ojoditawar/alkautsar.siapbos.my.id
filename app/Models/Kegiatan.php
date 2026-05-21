<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    protected $fillable = [
        'program_id',
        'kegiatan',
        'nama',
    ];

    public function program()
    {
        return $this->belongsTo(Program::class);
    }
}
