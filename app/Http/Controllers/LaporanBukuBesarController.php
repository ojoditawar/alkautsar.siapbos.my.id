<?php

namespace App\Http\Controllers;

use App\Models\Masjid;
use App\Models\Rekening;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class LaporanBukuBesarController extends Controller
{
    public function index(Request $request): Response
    {
        $user = Auth::user();
        $isAdmin = $user->hasRole('Admin');

        if ($isAdmin) {
            $masjids = Masjid::query()->orderBy('nama')->get(['id', 'nama']);
            $defaultMasjidId = $masjids->first()?->id;
        } else {
            $masjids = Masjid::query()->where('id', $user->masjid_id)->get(['id', 'nama']);
            $defaultMasjidId = $user->masjid_id;
        }

        $masjidId = $request->input('masjid_id', $defaultMasjidId);

        if (!$isAdmin) {
            $masjidId = $user->masjid_id;
        }

        $filters = [
            'tanggal_mulai' => $request->input('tanggal_mulai', now()->startOfMonth()->format('Y-m-d')),
            'tanggal_akhir' => $request->input('tanggal_akhir', now()->format('Y-m-d')),
            'masjid_id' => $masjidId,
            'rekening_id' => array_values(array_filter((array) $request->input('rekening_id', []))),
        ];

        $bukuBesar = [];
        $generated = $request->boolean('generate');

        if ($generated) {
            $bukuBesar = $this->calculateBukuBesar($filters);

            session([
                'buku_besar_data' => $bukuBesar,
                'buku_besar_params' => $filters,
            ]);
        }

        return Inertia::render('LaporanBukuBesar/Index', [
            'filters' => $filters,
            'masjids' => $masjids,
            'rekenings' => Rekening::query()->orderBy('jenis')->get(['id', 'jenis', 'nama']),
            'buku_besar' => $bukuBesar,
            'generated' => $generated,
            'is_admin' => $isAdmin,
        ]);
    }

    private function calculateBukuBesar(array $filters): array
    {
        $query = DB::table('detail_trensaksis')
            ->join('trensaksis', 'detail_trensaksis.trensaksi_id', '=', 'trensaksis.id')
            ->leftJoin('masjids', 'trensaksis.masjid_id', '=', 'masjids.id')
            ->leftJoin('mapping_rekenings', function ($join) {
                $join->on(DB::raw('TRIM(trensaksis.rekening)'), '=', DB::raw('TRIM(mapping_rekenings.mapping)'))
                    ->on(DB::raw('TRIM(trensaksis.bayar)'), '=', DB::raw('TRIM(mapping_rekenings.bayar)'))
                    ->on(DB::raw('TRIM(trensaksis.jenis)'), '=', DB::raw('TRIM(mapping_rekenings.transaksi)'));
            })
            ->whereBetween('trensaksis.tanggal', [$filters['tanggal_mulai'], $filters['tanggal_akhir']])
            ->when(!empty($filters['masjid_id']), fn($q) => $q->where('trensaksis.masjid_id', $filters['masjid_id']))
            ->select(
                'trensaksis.no_trans',
                'trensaksis.tanggal',
                'masjids.nama as nama_masjid',
                'detail_trensaksis.uraian',
                'detail_trensaksis.jumlah',
                'mapping_rekenings.jurnal',
                'mapping_rekenings.kolom',
                'mapping_rekenings.transaksi',
                'trensaksis.jenis',
                'trensaksis.bayar',
                'trensaksis.id as trensaksi',
                'trensaksis.user_id'
            )
            ->orderBy('mapping_rekenings.jurnal')
            ->orderBy('trensaksis.tanggal')
            ->orderBy('trensaksis.no_trans')
            ->orderBy('trensaksis.jenis');

        $transaksiData = $query->get();

        $rekeningQuery = Rekening::query();
        if (!empty($filters['rekening_id'])) {
            $rekeningQuery->whereIn('id', (array) $filters['rekening_id']);
        }

        $rekenings = $rekeningQuery->orderBy('jenis')->get();

        $bukuBesar = [];

        foreach ($rekenings as $rekening) {
            $entries = [];
            $saldoAwal = $this->getSaldoAwal($rekening->id, $filters['tanggal_mulai'], $filters['masjid_id']);
            $runningSaldo = $saldoAwal;

            if ($saldoAwal != 0) {
                $entries[] = [
                    'tanggal' => $filters['tanggal_mulai'],
                    'no_trans' => '',
                    'transaksi' => '',
                    'uraian' => 'Saldo Awal',
                    'debet' => $saldoAwal > 0 ? $saldoAwal : 0,
                    'kredit' => $saldoAwal < 0 ? abs($saldoAwal) : 0,
                    'saldo' => $runningSaldo,
                ];
            }

            $rekeningTransaksi = $transaksiData->filter(function ($item) use ($rekening) {
                return $item->jurnal === $rekening->jenis;
            });

            foreach ($rekeningTransaksi as $item) {
                $debet = 0;
                $kredit = 0;

                if ($item->kolom === 'D' || strtolower((string) $item->kolom) === 'debet') {
                    $debet = (float) $item->jumlah;
                    $runningSaldo += (float) $item->jumlah;
                } else {
                    $kredit = (float) $item->jumlah;
                    $runningSaldo -= (float) $item->jumlah;
                }

                $jenisMap = [
                    '1' => 'Saldo Awal',
                    '2' => 'Penerimaan',
                    '3' => 'Mutasi Kas',
                    '4' => 'Pengeluaran',
                    '5' => 'Pungutan Pajak',
                    '6' => 'Setoran Pajak',
                    '7' => 'Utang',
                    '8' => 'SPJ Petty Cash',
                    '9' => 'Saldo Awal Petty Cash',
                ];

                $entries[] = [
                    'tanggal' => $item->tanggal,
                    'no_trans' => $item->no_trans,
                    'transaksi' => $jenisMap[$item->jenis] ?? $item->jenis,
                    'uraian' => $item->uraian,
                    'debet' => $debet,
                    'kredit' => $kredit,
                    'saldo' => $runningSaldo,
                ];
            }

            if (!empty($entries)) {
                $bukuBesar[] = [
                    'rekening' => [
                        'id' => $rekening->id,
                        'jenis' => $rekening->jenis,
                        'nama' => $rekening->nama,
                    ],
                    'entries' => $entries,
                    'total_debet' => collect($entries)->sum('debet'),
                    'total_kredit' => collect($entries)->sum('kredit'),
                    'saldo_akhir' => $runningSaldo,
                ];
            }
        }

        return $bukuBesar;
    }

    private function getSaldoAwal(int $rekeningId, string $tanggalMulai, string $masjidId): float
    {
        $rekening = Rekening::find($rekeningId);
        if (!$rekening) {
            return 0;
        }

        $saldoData = DB::table('detail_trensaksis')
            ->join('trensaksis', 'detail_trensaksis.trensaksi_id', '=', 'trensaksis.id')
            ->leftJoin('mapping_rekenings', function ($join) {
                $join->on(DB::raw('TRIM(trensaksis.rekening)'), '=', DB::raw('TRIM(mapping_rekenings.mapping)'))
                    ->on(DB::raw('TRIM(trensaksis.bayar)'), '=', DB::raw('TRIM(mapping_rekenings.bayar)'))
                    ->on(DB::raw('TRIM(trensaksis.jenis)'), '=', DB::raw('TRIM(mapping_rekenings.transaksi)'));
            })
            ->where('mapping_rekenings.jurnal', $rekening->jenis)
            ->where('trensaksis.tanggal', '<', $tanggalMulai)
            ->when(!empty($masjidId), fn($q) => $q->where('trensaksis.masjid_id', $masjidId))
            ->select('detail_trensaksis.jumlah', 'mapping_rekenings.kolom')
            ->get();

        $saldo = 0;
        foreach ($saldoData as $item) {
            if ($item->kolom === 'D' || strtolower((string) $item->kolom) === 'debet') {
                $saldo += (float) $item->jumlah;
            } else {
                $saldo -= (float) $item->jumlah;
            }
        }

        return $saldo;
    }
}
