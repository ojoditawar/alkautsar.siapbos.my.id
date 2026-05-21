<?php

namespace App\Http\Controllers;

use App\Models\Masjid;
use App\Models\Rek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class LaporanNeracaController extends Controller
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
            'tanggal_mulai' => $request->input('tanggal_mulai', now()->startOfYear()->format('Y-m-d')),
            'tanggal_akhir' => $request->input('tanggal_akhir', now()->format('Y-m-d')),
            'masjid_id' => $masjidId,
        ];

        $neraca = [
            'aset' => [],
            'kewajiban' => [],
            'ekuitas' => [],
        ];
        $totals = [
            'aset' => 0,
            'kewajiban' => 0,
            'ekuitas' => 0,
        ];

        $generated = $request->boolean('generate');

        if ($generated) {
            $neraca = $this->calculateNeraca($filters);
            $totals = $this->calculateSectionTotals($neraca);

            session([
                'neraca_data' => $neraca,
                'neraca_totals' => $totals,
                'neraca_params' => $filters,
            ]);
        }

        return Inertia::render('LaporanNeraca/Index', [
            'filters' => $filters,
            'masjids' => $masjids,
            'neraca' => $neraca,
            'totals' => $totals,
            'generated' => $generated,
            'is_admin' => $isAdmin,
        ]);
    }

    private function calculateNeraca(array $filters): array
    {
        $neraca = [
            'aset' => [],
            'kewajiban' => [],
            'ekuitas' => [],
        ];

        $transactionData = DB::table('detail_transaksis')
            ->join('transaksis', 'detail_transaksis.transaksi_id', '=', 'transaksis.id')
            ->leftJoin('mapping_rekenings', function ($join) {
                $join->on(DB::raw('TRIM(transaksis.rekening)'), '=', DB::raw('TRIM(mapping_rekenings.mapping)'))
                    ->on(DB::raw('TRIM(transaksis.bayar)'), '=', DB::raw('TRIM(mapping_rekenings.bayar)'))
                    ->on(DB::raw('TRIM(transaksis.jenis)'), '=', DB::raw('TRIM(mapping_rekenings.transaksi)'));
            })
            ->whereBetween('transaksis.tanggal', [$filters['tanggal_mulai'], $filters['tanggal_akhir']])
            ->when(!empty($filters['masjid_id']), fn($q) => $q->where('transaksis.masjid_id', $filters['masjid_id']))
            ->select(
                'detail_transaksis.jumlah',
                'mapping_rekenings.jurnal',
                'mapping_rekenings.kolom',
            )
            ->get();

        $reks = Rek::with(['subReks.rekenings'])->orderBy('kode')->get();

        foreach ($reks as $rek) {
            $rekCode = substr((string) ($rek->kode ?? ''), 0, 1);

            $section = match ($rekCode) {
                '1' => 'aset',
                '2' => 'kewajiban',
                '3' => 'ekuitas',
                default => null,
            };

            if ($section === null) {
                continue;
            }

            $rekItem = [
                'level' => 1,
                'kode' => $rek->kode,
                'nama' => $rek->nama,
                'saldo' => 0,
                'children' => [],
            ];

            foreach ($rek->subReks->sortBy('kelompok') as $subRek) {
                $subRekItem = [
                    'level' => 2,
                    'kode' => $subRek->kelompok,
                    'nama' => $subRek->nama,
                    'saldo' => 0,
                    'children' => [],
                ];

                foreach ($subRek->rekenings->sortBy('jenis') as $rekening) {
                    $saldo = $this->calculateSaldoFromMapping($rekening, $transactionData);

                    $rekeningItem = [
                        'level' => 3,
                        'kode' => $rekening->jenis ?? $rekening->akun,
                        'nama' => $rekening->nama,
                        'saldo' => $saldo,
                    ];

                    $subRekItem['children'][] = $rekeningItem;
                    $subRekItem['saldo'] += $saldo;
                }

                if (!empty($subRekItem['children'])) {
                    $rekItem['children'][] = $subRekItem;
                    $rekItem['saldo'] += $subRekItem['saldo'];
                }
            }

            if (!empty($rekItem['children'])) {
                $neraca[$section][] = $rekItem;
            }
        }

        return $neraca;
    }

    private function calculateSaldoFromMapping($rekening, $transactionData): float
    {
        $saldo = 0;
        $accountCode = $rekening->jenis ?? $rekening->akun ?? '';
        $firstDigit = substr((string) $accountCode, 0, 1);

        foreach ($transactionData as $data) {
            if ($data->jurnal != $accountCode) {
                continue;
            }

            $isDebit = ($data->kolom === 'D' || strtolower((string) $data->kolom) === 'debet');
            $jumlah = (float) $data->jumlah;

            if ($firstDigit === '1') {
                $saldo += $isDebit ? $jumlah : -$jumlah;
            } elseif ($firstDigit === '2' || $firstDigit === '3') {
                $saldo += $isDebit ? -$jumlah : $jumlah;
            }
        }

        return $saldo;
    }

    private function calculateSectionTotals(array $neraca): array
    {
        $totals = ['aset' => 0, 'kewajiban' => 0, 'ekuitas' => 0];
        foreach ($neraca as $section => $items) {
            foreach ($items as $item) {
                $totals[$section] += $item['saldo'] ?? 0;
            }
        }
        return $totals;
    }
}
