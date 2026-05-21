<?php

namespace App\Http\Controllers;

use App\Models\Masjid;
use App\Models\Rekening;
use App\Models\Trensaksi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ValidasiBukuBesarController extends Controller
{
    /**
     * Halaman validasi / closing buku besar.
     *
     * Hanya Admin yang dapat memproses (middleware di routes).
     */
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

        $masjidId = (string) $request->input('masjid_id', $defaultMasjidId);
        if (!$isAdmin) {
            $masjidId = (string) $user->masjid_id;
        }

        $month = trim((string) $request->input('month', now()->format('Y-m')));
        if (!preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $month)) {
            $month = now()->format('Y-m');
        }

        [$year, $mon] = explode('-', $month);
        $start = sprintf('%s-%s-01', $year, $mon);
        $end = date('Y-m-t', strtotime($start));

        $status = (string) $request->input('status', 'all'); // all|open|closed

        $rekeningMap = Rekening::query()->pluck('nama', 'jenis');

        $trensaksis = Trensaksi::with(['detailTrensaksi'])
            ->when($masjidId !== '', fn($q) => $q->where('masjid_id', $masjidId))
            ->whereBetween('tanggal', [$start, $end])
            ->when($status === 'open', fn($q) => $q->where('valid', false))
            ->when($status === 'closed', fn($q) => $q->where('valid', true))
            ->orderBy('tanggal')
            ->orderByRaw("CAST(split_part(no_trans, '-', 1) AS INTEGER)")
            ->orderByRaw("CAST(split_part(no_trans, '-', 2) AS INTEGER)")
            ->get()
            ->map(fn($t) => [
                'id' => $t->id,
                'no_trans' => $t->no_trans,
                'tanggal' => $t->tanggal?->format('Y-m-d'),
                'rekening' => $t->rekening,
                'rekening_nama' => $rekeningMap[$t->rekening] ?? $t->rekening,
                'valid' => (bool) $t->valid,
                'total' => $t->detailTrensaksi->sum('jumlah'),
                'uraian' => $t->detailTrensaksi->pluck('uraian')->filter()->implode("\n"),
            ]);

        $summary = [
            'total' => $trensaksis->count(),
            'closed' => $trensaksis->where('valid', true)->count(),
            'open' => $trensaksis->where('valid', false)->count(),
        ];

        return Inertia::render('ValidasiBukuBesar/Index', [
            'trensaksis' => $trensaksis->values(),
            'masjids' => $masjids,
            'filters' => [
                'masjid_id' => $masjidId,
                'month' => $month,
                'status' => $status,
            ],
            'summary' => $summary,
            'is_admin' => $isAdmin,
        ]);
    }

    /**
     * Tandai sekumpulan transaksi sebagai valid (closed).
     * Hanya Admin (enforced di route middleware).
     */
    public function validateTransaksi(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'ids' => ['required', 'array', 'min:1'],
            'ids.*' => ['integer'],
        ]);

        $count = Trensaksi::whereIn('id', $data['ids'])->update(['valid' => true]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "{$count} transaksi berhasil divalidasi (Closed).",
        ]);

        return back();
    }

    /**
     * Batalkan validasi sekumpulan transaksi (open kembali).
     * Hanya Admin (enforced di route middleware).
     */
    public function invalidateTransaksi(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'ids' => ['required', 'array', 'min:1'],
            'ids.*' => ['integer'],
        ]);

        $count = Trensaksi::whereIn('id', $data['ids'])->update(['valid' => false]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "{$count} transaksi berhasil dibatalkan validasinya (Opened).",
        ]);

        return back();
    }
}
