<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rek extends Model
{
    protected $table = 'reks';
    protected $primaryKey = 'kode';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'kode',
        'nama',
    ];

    public function subReks()
    {
        return $this->hasMany(SubRek::class, 'rek_id', 'kode');
    }
}
