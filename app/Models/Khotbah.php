<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Khotbah extends Model
{
    protected $fillable = [

        'user_id',
        'nama',
        'alamat',
        'tanggal',
        'hp',
        'honor',
    ];
    protected $casts = [
        'tanggal' => 'date',
        'honor' => 'integer',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
