<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MonitorConfig extends Model
{
    protected $table = 'monitor_configs';

    protected $fillable = [
        'masjid_id',
        'city_id',
        'iqomah_subuh',
        'iqomah_dzuhur',
        'iqomah_ashar',
        'iqomah_maghrib',
        'iqomah_isya',
        'sholat_subuh',
        'sholat_dzuhur',
        'sholat_ashar',
        'sholat_maghrib',
        'sholat_isya',
        'sholat_jumat',
        'streaming_start_hour',
        'streaming_start_minute',
        'streaming_end_hour',
        'streaming_end_minute',
        'streaming_youtube_url',
        'streaming_title',
    ];

    protected $casts = [
        'city_id' => 'string',
        'iqomah_subuh' => 'integer',
        'iqomah_dzuhur' => 'integer',
        'iqomah_ashar' => 'integer',
        'iqomah_maghrib' => 'integer',
        'iqomah_isya' => 'integer',
        'sholat_subuh' => 'integer',
        'sholat_dzuhur' => 'integer',
        'sholat_ashar' => 'integer',
        'sholat_maghrib' => 'integer',
        'sholat_isya' => 'integer',
        'sholat_jumat' => 'integer',
        'streaming_start_hour' => 'integer',
        'streaming_start_minute' => 'integer',
        'streaming_end_hour' => 'integer',
        'streaming_end_minute' => 'integer',
    ];

    public function masjid(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Masjid::class);
    }
}
