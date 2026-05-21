<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HijriHoliday extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'hijri_date',
        'gregorian_date',
        'is_sync',
    ];

    protected $casts = [
        'gregorian_date' => 'date',
        'is_sync' => 'boolean',
    ];
}
