<?php

namespace App\Http\Controllers;

use App\Models\MonitorConfig;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class MonitorConfigController extends Controller
{
    public function edit(): Response
    {
        $masjidId = auth()->user()->masjid_id;

        $monitorConfig = MonitorConfig::where('masjid_id', $masjidId)->first();

        // Fetch cities from MyQuran API
        $cities = [];
        try {
            $response = Http::timeout(10)->get('https://api.myquran.com/v2/sholat/kota/semua');
            if ($response->successful()) {
                $data = $response->json();
                $cities = $data['data'] ?? [];
            }
        } catch (\Exception $e) {
            // If API fails, just use an empty array; the view can handle it.
            $cities = [];
        }

        if (!$monitorConfig) {
            $monitorConfig = MonitorConfig::create([
                'masjid_id' => $masjidId,
                'iqomah_subuh' => 0,
                'iqomah_dzuhur' => 0,
                'iqomah_ashar' => 0,
                'iqomah_maghrib' => 0,
                'iqomah_isya' => 0,
                'sholat_subuh' => 0,
                'sholat_dzuhur' => 0,
                'sholat_ashar' => 0,
                'sholat_maghrib' => 0,
                'sholat_isya' => 0,
                'streaming_start_hour' => 0,
                'streaming_start_minute' => 0,
                'streaming_end_hour' => 0,
                'streaming_end_minute' => 0,
                'streaming_youtube_url' => null,
                'streaming_title' => null,
            ]);
        }

        return Inertia::render('MonitorConfig/Edit', [
            'monitorConfig' => $monitorConfig->toArray(),
            'cities' => $cities,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $this->validateData($request);

        $masjidId = auth()->user()->masjid_id;

        MonitorConfig::updateOrCreate(
            ['masjid_id' => $masjidId],
            $data
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Konfigurasi monitor berhasil diperbarui.']);

        return to_route('monitor-config.edit');
    }

    private function validateData(Request $request): array
    {
        return $request->validate([
            'city_id' => ['required', 'string', 'max:10'],
            'iqomah_subuh' => ['required', 'integer', 'min:0', 'max:60'],
            'iqomah_dzuhur' => ['required', 'integer', 'min:0', 'max:60'],
            'iqomah_ashar' => ['required', 'integer', 'min:0', 'max:60'],
            'iqomah_maghrib' => ['required', 'integer', 'min:0', 'max:60'],
            'iqomah_isya' => ['required', 'integer', 'min:0', 'max:60'],
            'sholat_subuh' => ['required', 'integer', 'min:0', 'max:1440'],
            'sholat_dzuhur' => ['required', 'integer', 'min:0', 'max:1440'],
            'sholat_ashar' => ['required', 'integer', 'min:0', 'max:1440'],
            'sholat_maghrib' => ['required', 'integer', 'min:0', 'max:1440'],
            'sholat_isya' => ['required', 'integer', 'min:0', 'max:1440'],
            'sholat_jumat' => ['required', 'integer', 'min:0', 'max:1440'],
            'streaming_start_hour' => ['required', 'integer', 'min:0', 'max:23'],
            'streaming_start_minute' => ['required', 'integer', 'min:0', 'max:59'],
            'streaming_end_hour' => ['required', 'integer', 'min:0', 'max:23'],
            'streaming_end_minute' => ['required', 'integer', 'min:0', 'max:59'],
            'streaming_youtube_url' => ['nullable', 'string', 'max:500'],
            'streaming_title' => ['nullable', 'string', 'max:255'],
        ]);
    }
}
