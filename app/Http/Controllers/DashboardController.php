<?php

namespace App\Http\Controllers;

use App\Models\Kajian;
use App\Models\MappingRekening;
use App\Models\Rekening;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard', $this->buildData());
    }

    // 96704a80-e2c5-4010-bb39-d3a3df637ef0

    public function beranda(): Response
    {
        return Inertia::render('Beranda/Index', $this->buildData());
    }

    /**
     * Data bersama untuk halaman Dashboard (publik) dan Beranda (admin).
     */
    private function buildData(): array
    {
        $tahun = (int) now()->year;
        $masjidId = auth()->user()?->masjid_id;
        $masjidId = $masjidId !== null ? (string) $masjidId : null;

        return [
            'saldoCharts' => $this->saldoPerBulan($tahun, $masjidId),
            'ringkasanKas' => $this->ringkasanKas($tahun, $masjidId),
            'upcomingKajians' => Kajian::where('is_active', true)
                ->whereDate('tanggal', '>=', now()->toDateString())
                ->orderBy('tanggal')
                ->orderBy('waktu')
                ->take(5)
                ->get(['id', 'judul', 'pemateri', 'tanggal', 'waktu', 'tempat', 'deskripsi'])
                ->map(fn($k) => [
                    ...$k->toArray(),
                    'tanggal' => $k->tanggal?->format('Y-m-d'),
                ]),
            'holidays' => \App\Models\HijriHoliday::whereDate('gregorian_date', '>=', now()->toDateString())
                ->orderBy('gregorian_date')
                // ->take(5)
                ->get()
                ->map(function ($h) {
                    $days = now()->startOfDay()->diffInDays($h->gregorian_date->startOfDay());
                    $daysText = $days == 0 ? 'hari ini' : ($days == 1 ? 'besok' : "$days hari lagi");
                    $blinkText = "<span class='blink'>$daysText</span>";
                    return "{$h->name} -> " . " {$blinkText} " . " ({$h->hijri_date} / " . $h->gregorian_date->translatedFormat('d M Y') . ")";
                })
                ->implode(' "  < • >  " '),
            'tahun' => $tahun,
        ];
    }

    /**
     * Saldo kas per bulan untuk tahun berjalan berdasarkan mapping rekening.
     * Menghitung total debit/kredit per bulan untuk multiple jurnal kas.
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
