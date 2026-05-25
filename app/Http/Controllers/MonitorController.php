<?php

namespace App\Http\Controllers;

use App\Models\Kajian;
use App\Models\MutiaraImage;
use App\Models\MonitorConfig;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class MonitorController extends Controller
{
    public function index(): Response
    {
        $tahun = (int) now()->year;
        $user = auth()->user();
        $masjidId = $user?->masjid_id;
        $masjidId = $masjidId !== null ? (string) $masjidId : null;

        // Ambil data masjid user yang login
        $masjid = null;
        if ($user?->masjid) {
            $masjid = [
                'id' => $user->masjid->id,
                'nama' => $user->masjid->nama,
                'alamat' => $user->masjid->alamat,
                'image' => $user->masjid->image
                    ? asset($user->masjid->image)
                    : null,
            ];
        }

        // Ambil 5 gambar mutiara terbaru yg aktif dari database
        $mutiaraImages = MutiaraImage::where('masjid_id', $masjidId)
            ->where('is_active', true)
            ->orderBy('order')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(fn($m) => [
                'id' => $m->id,
                'image' => asset('storage/' . $m->image),
                'caption' => $m->caption,
            ]);

        return Inertia::render('Monitor/Index', [
            'masjid' => $masjid,
            'saldoCharts' => $this->saldoPerBulan($tahun, $masjidId),
            'ringkasanKas' => $this->ringkasanKas($tahun, $masjidId),
            'upcomingKajians' => Kajian::where('is_active', true)
                ->whereDate('tanggal', '>=', now()->toDateString())
                ->orderBy('tanggal')
                ->orderBy('waktu')
                ->take(10)
                ->get(['id', 'judul', 'pemateri', 'tanggal', 'waktu', 'tempat', 'deskripsi'])
                ->map(fn($k) => [
                    ...$k->toArray(),
                    'tanggal' => $k->tanggal?->format('Y-m-d'),
                ]),
            'monitorConfig' => $this->loadMonitorConfig($masjidId),
            'mutiaraImages' => $mutiaraImages,
            'imams' => \App\Models\ImamMasjid::where('masjid_id', $masjidId)
                ->get()
                ->map(fn($i) => [
                    'id' => $i->id,
                    'nama' => $i->nama,
                    'foto' => $i->foto ? asset('storage/' . $i->foto) : null,
                    'jabatan' => $i->jabatan,
                    'tipe' => $i->tipe,
                    'sholat' => $i->sholat,
                ]),
            'tahun' => $tahun,
        ]);
    }

    private function loadMonitorConfig(?string $masjidId): ?array
    {
        if (!$masjidId) {
            return null;
        }

        $config = MonitorConfig::where('masjid_id', $masjidId)->first();

        if (!$config) {
            return null;
        }

        return [
            'city_id' => $config->city_id,
            'iqomah_subuh' => (int) $config->iqomah_subuh,
            'iqomah_dzuhur' => (int) $config->iqomah_dzuhur,
            'iqomah_ashar' => (int) $config->iqomah_ashar,
            'iqomah_maghrib' => (int) $config->iqomah_maghrib,
            'iqomah_isya' => (int) $config->iqomah_isya,
            'sholat_subuh' => (int) $config->sholat_subuh,
            'sholat_dzuhur' => (int) $config->sholat_dzuhur,
            'sholat_ashar' => (int) $config->sholat_ashar,
            'sholat_maghrib' => (int) $config->sholat_maghrib,
            'sholat_isya' => (int) $config->sholat_isya,
            'sholat_jumat' => (int) $config->sholat_jumat,
            'streaming_start_hour' => (int) $config->streaming_start_hour,
            'streaming_start_minute' => (int) $config->streaming_start_minute,
            'streaming_end_hour' => (int) $config->streaming_end_hour,
            'streaming_end_minute' => (int) $config->streaming_end_minute,
            'streaming_youtube_url' => $config->streaming_youtube_url,
            'streaming_title' => $config->streaming_title,
        ];
    }

    /**
     * Saldo kas per bulan untuk tahun berjalan berdasarkan mapping rekening.
     */
    private function saldoPerBulan(int $tahun, ?string $masjidId): array
    {
        $jurnalCodes = ['1.01.01', '1.01.02', '1.01.03', '1.01.04', '1.01.05', '1.01.06'];
        $jurnalNames = [
            '1.01.01' => 'Kas Tunai',
            '1.01.02' => 'Kas Tunai di Petty Cash',
            '1.01.03' => 'Kas Zakat di Bank',
            '1.01.04' => 'Kas Umum Operasional di Bank',
            '1.01.05' => 'Kas Wakaf di Bank',
            '1.01.06' => 'Petty Cash di Bank',
        ];

        $result = [];

        foreach ($jurnalCodes as $jurnalCode) {
            $rows = DB::table('detail_trensaksis')
                ->join('trensaksis', 'detail_trensaksis.trensaksi_id', '=', 'trensaksis.id')
                ->leftJoin('mapping_rekenings', function ($join) {
                    $join->on(DB::raw('TRIM(trensaksis.rekening)'), '=', DB::raw('TRIM(mapping_rekenings.mapping)'))
                        ->on(DB::raw('TRIM(trensaksis.bayar)'), '=', DB::raw('TRIM(mapping_rekenings.bayar)'))
                        ->on(DB::raw('TRIM(trensaksis.jenis)'), '=', DB::raw('TRIM(mapping_rekenings.transaksi)'));
                })
                ->whereYear('trensaksis.tanggal', $tahun)
                ->when($masjidId, fn($q) => $q->where('trensaksis.masjid_id', $masjidId))
                ->whereRaw("TRIM(mapping_rekenings.jurnal) = ?", [$jurnalCode])
                ->whereNotNull('mapping_rekenings.jurnal')
                ->select(
                    DB::raw('EXTRACT(MONTH FROM trensaksis.tanggal) as bulan'),
                    'detail_trensaksis.jumlah',
                    'mapping_rekenings.kolom'
                )
                ->get();

            $debit = array_fill(0, 12, 0.0);
            $kredit = array_fill(0, 12, 0.0);

            foreach ($rows as $row) {
                $idx = ((int) $row->bulan) - 1;
                $jumlah = (float) $row->jumlah;
                $kolom = strtoupper(trim((string) $row->kolom));

                if ($kolom === 'D' || strtolower((string) $row->kolom) === 'debet') {
                    $debit[$idx] += $jumlah;
                } else {
                    $kredit[$idx] += $jumlah;
                }
            }

            $result[] = [
                'jurnal' => $jurnalCode,
                'nama' => $jurnalNames[$jurnalCode] ?? $jurnalCode,
                'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                'debit' => $debit,
                'kredit' => $kredit,
            ];
        }

        return $result;
    }

    private function ringkasanKas(int $tahun, ?string $masjidId): array
    {
        $jurnalCodes = ['1.01.01', '1.01.02', '1.01.03', '1.01.04', '1.01.05', '1.01.06'];
        $jurnalNames = [
            '1.01.01' => 'Kas Tunai',
            '1.01.02' => 'Kas Tunai di Petty Cash',
            '1.01.03' => 'Kas Zakat di Bank',
            '1.01.04' => 'Kas Umum Operasional di Bank',
            '1.01.05' => 'Kas Wakaf di Bank',
            '1.01.06' => 'Petty Cash di Bank',
        ];

        $result = [];

        foreach ($jurnalCodes as $jurnalCode) {
            $row = DB::table('detail_trensaksis')
                ->join('trensaksis', 'detail_trensaksis.trensaksi_id', '=', 'trensaksis.id')
                ->leftJoin('mapping_rekenings', function ($join) {
                    $join->on(DB::raw('TRIM(trensaksis.rekening)'), '=', DB::raw('TRIM(mapping_rekenings.mapping)'))
                        ->on(DB::raw('TRIM(trensaksis.bayar)'), '=', DB::raw('TRIM(mapping_rekenings.bayar)'))
                        ->on(DB::raw('TRIM(trensaksis.jenis)'), '=', DB::raw('TRIM(mapping_rekenings.transaksi)'));
                })
                ->whereYear('trensaksis.tanggal', $tahun)
                ->when($masjidId, fn($q) => $q->where('trensaksis.masjid_id', $masjidId))
                ->whereRaw("TRIM(mapping_rekenings.jurnal) = ?", [$jurnalCode])
                ->whereNotNull('mapping_rekenings.jurnal')
                ->select(
                    DB::raw("SUM(CASE WHEN UPPER(mapping_rekenings.kolom) = 'D' OR LOWER(mapping_rekenings.kolom) = 'debet' THEN detail_trensaksis.jumlah ELSE 0 END) as total_debit"),
                    DB::raw("SUM(CASE WHEN UPPER(mapping_rekenings.kolom) <> 'D' AND LOWER(mapping_rekenings.kolom) <> 'debet' THEN detail_trensaksis.jumlah ELSE 0 END) as total_kredit"),
                )
                ->first();

            $debit = (float) ($row->total_debit ?? 0);
            $kredit = (float) ($row->total_kredit ?? 0);

            $result[] = [
                'jurnal' => $jurnalCode,
                'nama' => $jurnalNames[$jurnalCode] ?? $jurnalCode,
                'total_debit' => $debit,
                'total_kredit' => $kredit,
                'saldo' => $debit - $kredit,
            ];
        }

        return $result;
    }
}
