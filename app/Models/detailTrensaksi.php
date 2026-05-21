<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class detailTrensaksi extends Model
{
    protected $table = 'detail_trensaksis';

    protected $fillable = [
        'trensaksi_id',
        'uraian',
        'jumlah',
    ];

    public function trensaksi()
    {
        return $this->belongsTo(Trensaksi::class);
    }
}
