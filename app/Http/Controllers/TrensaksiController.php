<?php

namespace App\Http\Controllers;

use App\Models\MappingRekening;
use App\Models\Rekening;
use App\Models\Trensaksi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class TrensaksiController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = in_array($request->integer('per_page'), [10, 20, 50, 100]) ? $request->integer('per_page') : 50;
        $search = trim((string) $request->input('search', ''));
        $month = trim((string) $request->input('month', ''));
        $sortField = trim((string) $request->input('sort_field', 'tanggal'));
        $sortDirection = trim((string) $request->input('sort_direction', 'desc'));
        $bayar = trim((string) $request->input('bayar', ''));
        $jenis = $request->input('jenis', []);
        if (is_string($jenis)) {
            $jenis = $jenis !== '' ? [$jenis] : [];
        }
        $jenis = array_filter($jenis);
        $rekeningNama = $request->input('rekening_nama', []);
        if (is_string($rekeningNama)) {
            $rekeningNama = $rekeningNama !== '' ? [$rekeningNama] : [];
        }
        $rekeningNama = array_filter($rekeningNama);

        // Validasi format YYYY-MM, jika tidak valid diabaikan.
        if ($month !== '' && !preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $month)) {
            $month = '';
        }

        // Validasi sort direction
        if (!in_array($sortDirection, ['asc', 'desc'])) {
            $sortDirection = 'desc';
        }

        // Simpan filter aktif ke session agar tetap terpasang setelah store/update/destroy.
        session([
            'trensaksis.filters' => [
                'search' => $search,
                'month' => $month,
                'per_page' => $perPage,
                'sort_field' => $sortField,
                'sort_direction' => $sortDirection,
                'bayar' => $bayar,
                'jenis' => $jenis,
                'rekening_nama' => $rekeningNama,
            ],
        ]);

        $rekeningMap = Rekening::query()
            ->pluck('nama', 'jenis');

        $trensaksis = Trensaksi::with(['user:id,name', 'masjid:id,nama', 'detailTrensaksi'])
            ->when($month !== '', function ($q) use ($month) {
                [$year, $mon] = explode('-', $month);
                $start = sprintf('%s-%s-01', $year, $mon);
                $end = date('Y-m-t', strtotime($start));
                $q->whereBetween('tanggal', [$start, $end]);
            })
            ->when($bayar !== '' && $bayar !== 'all', function ($q) use ($bayar) {
                $q->where('bayar', $bayar);
            })
            ->when(!empty($jenis), function ($q) use ($jenis) {
                $q->whereIn('jenis', $jenis);
            })
            ->when(!empty($rekeningNama), function ($q) use ($rekeningNama) {
                $q->whereIn('rekening', $rekeningNama);
            })
            ->when($search !== '', function ($q) use ($search) {
                $like = '%' . mb_strtolower($search) . '%';
                $q->where(function ($qq) use ($like) {
                    $qq->whereRaw('LOWER(no_trans) like ?', [$like])
                        ->orWhereRaw('LOWER(rekening) like ?', [$like])
                        ->orWhereHas('detailTrensaksi', fn($d) => $d->whereRaw('LOWER(uraian) like ?', [$like]))
                        ->orWhereHas('masjid', fn($m) => $m->whereRaw('LOWER(nama) like ?', [$like]))
                        ->orWhereExists(function ($sub) use ($like) {
                            $sub->select(DB::raw(1))
                                ->from('rekenings')
                                ->whereColumn('rekenings.jenis', 'trensaksis.rekening')
                                ->whereRaw('LOWER(rekenings.nama) like ?', [$like]);
                        });
                });
            })
            ->when($sortField === 'tanggal', function ($q) use ($sortDirection) {
                $q->orderBy('tanggal', $sortDirection);
            }, function ($q) use ($sortDirection) {
                // Default sorting jika bukan tanggal
                $q->orderByDesc('tanggal')
                    ->orderByRaw("CAST(split_part(no_trans, '-', 1) AS INTEGER) DESC")
                    ->orderByRaw("CAST(split_part(no_trans, '-', 2) AS INTEGER) DESC");
            })
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn($t) => [
                'id' => $t->id,
                'tahun' => $t->tahun,
                'no_trans' => $t->no_trans,
                'tanggal' => $t->tanggal?->format('Y-m-d'),
                'jenis' => $t->jenis,
                'bayar' => $t->bayar,
                'rekening' => $t->rekening,
                'rekening_nama' => $rekeningMap[$t->rekening] ?? $t->rekening,
                'valid' => $t->valid,
                'user_name' => $t->user?->name,
                'masjid_nama' => $t->masjid?->nama,
                'total' => $t->detailTrensaksi->sum('jumlah'),
                'uraian' => $t->detailTrensaksi
                    ->pluck('uraian')
                    ->filter()
                    ->implode("\n"),
            ]);

        return Inertia::render('Trensaksis/Index', [
            'trensaksis' => $trensaksis,
            'rekenings' => $rekeningMap->map(fn($nama, $jenis) => [
                'jenis' => $jenis,
                'nama' => $nama,
            ])->values(),
            'filters' => [
                'search' => $search,
                'month' => $month,
                'per_page' => $perPage,
                'sort_field' => $sortField,
                'sort_direction' => $sortDirection,
                'bayar' => $bayar,
                'jenis' => $jenis,
                'rekening_nama' => $rekeningNama,
            ],
        ]);
    }

    public function create(): Response
    {
        $allRekenings = Rekening::orderBy('kelompok')->orderBy('jenis')->get(['id', 'kelompok', 'jenis', 'nama']);
        $noTrans = Trensaksi::generateNoTrensaksi(auth()->id());
        $saldoKas = $this->getSaldoKasPerBayar(auth()->user()->masjid_id);

        return Inertia::render('Trensaksis/Create', [
            'allRekenings' => $allRekenings,
            'noTrans' => $noTrans,
            'tahun' => now()->year,
            'saldoKas' => $saldoKas,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'tahun' => ['required', 'string', 'max:4'],
            'tanggal' => ['required', 'date'],
            'jenis' => ['required', 'string', 'max:2'],
            'bayar' => ['required', 'string', 'max:1'],
            'rekening' => ['required', 'string', 'max:7'],
            'valid' => ['boolean'],
            'details' => ['present', 'array'],
            'details.*.uraian' => ['required', 'string', 'max:255'],
            'details.*.jumlah' => ['required', 'numeric', 'min:0'],
        ]);

        $trensaksi = Trensaksi::create([
            'user_id' => auth()->id(),
            'masjid_id' => auth()->user()->masjid_id,
            'tahun' => $validated['tahun'],
            'no_trans' => Trensaksi::generateNoTrensaksi(auth()->id()),
            'tanggal' => $validated['tanggal'],
            'jenis' => $validated['jenis'],
            'bayar' => $validated['bayar'],
            'rekening' => $validated['rekening'],
            'valid' => $validated['valid'] ?? false,
        ]);

        foreach ($validated['details'] as $detail) {
            $trensaksi->detailTrensaksi()->create([
                'uraian' => $detail['uraian'],
                'jumlah' => $detail['jumlah'],
            ]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Transaksi berhasil ditambahkan.']);

        return $this->redirectToIndex();
    }

    public function edit(Trensaksi $trensaksi): Response
    {
        abort_if($trensaksi->valid, 403, 'Transaksi sudah ditutup (closed) dan tidak dapat diedit.');
        $trensaksi->load('detailTrensaksi');
        $allRekenings = Rekening::orderBy('kelompok')->orderBy('jenis')->get(['id', 'kelompok', 'jenis', 'nama']);

        return Inertia::render('Trensaksis/Edit', [
            'transaksi' => [
                'id' => $trensaksi->id,
                'tahun' => $trensaksi->tahun,
                'no_trans' => $trensaksi->no_trans,
                'tanggal' => $trensaksi->tanggal?->format('Y-m-d') ?? '',
                'jenis' => $trensaksi->jenis,
                'bayar' => $trensaksi->bayar,
                'rekening' => $trensaksi->rekening,
                'valid' => (bool) $trensaksi->valid,
                'details' => $trensaksi->detailTrensaksi->map(fn($d) => [
                    'id' => $d->id,
                    'uraian' => $d->uraian,
                    'jumlah' => $d->jumlah,
                ])->values(),
            ],
            'allRekenings' => $allRekenings,
            'saldoKas' => $this->getSaldoKasPerBayar($trensaksi->masjid_id),
        ]);
    }

    public function update(Request $request, Trensaksi $trensaksi): RedirectResponse
    {
        abort_if($trensaksi->valid, 403, 'Transaksi sudah ditutup (closed) dan tidak dapat diubah.');
        $validated = $request->validate([
            'tahun' => ['required', 'string', 'max:4'],
            'tanggal' => ['required', 'date'],
            'jenis' => ['required', 'string', 'max:2'],
            'bayar' => ['required', 'string', 'max:1'],
            'rekening' => ['required', 'string', 'max:7'],
            'valid' => ['boolean'],
            'details' => ['present', 'array'],
            'details.*.uraian' => ['required', 'string', 'max:255'],
            'details.*.jumlah' => ['required', 'numeric', 'min:0'],
        ]);

        $trensaksi->update([
            'tahun' => $validated['tahun'],
            'tanggal' => $validated['tanggal'],
            'jenis' => $validated['jenis'],
            'bayar' => $validated['bayar'],
            'rekening' => $validated['rekening'],
            'valid' => $validated['valid'] ?? false,
        ]);

        // Delete and re-insert details
        $trensaksi->detailTrensaksi()->delete();

        foreach ($validated['details'] as $detail) {
            $trensaksi->detailTrensaksi()->create([
                'uraian' => $detail['uraian'],
                'jumlah' => $detail['jumlah'],
            ]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Transaksi berhasil diperbarui.']);

        return $this->redirectToIndex();
    }

    public function destroy(Trensaksi $trensaksi): RedirectResponse
    {
        abort_if($trensaksi->valid, 403, 'Transaksi sudah ditutup (closed) dan tidak dapat dihapus.');
        DB::transaction(function () use ($trensaksi) {
            if ($trensaksi->detailTrensaksi()->exists()) {
                $trensaksi->detailTrensaksi()->delete();
            }

            $trensaksi->delete();
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Transaksi berhasil dihapus.']);

        return $this->redirectToIndex();
    }

    public function duplicate(Trensaksi $trensaksi): RedirectResponse
    {
        $newTrensaksi = DB::transaction(function () use ($trensaksi) {
            $new = $trensaksi->replicate(['no_trans', 'valid']);
            $new->no_trans = Trensaksi::generateNoTrensaksi(auth()->id());
            $new->valid = false;
            $new->save();

            foreach ($trensaksi->detailTrensaksi as $detail) {
                $new->detailTrensaksi()->create([
                    'uraian' => $detail->uraian,
                    'jumlah' => $detail->jumlah,
                ]);
            }

            return $new;
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Transaksi berhasil dicopy.']);

        return redirect()->route('transaksis.edit', $newTrensaksi->id);
    }

    /**
     * Redirect ke halaman index dengan filter terakhir (search / month / per_page)
     * yang tersimpan di session, sehingga tampilan tetap terpasang setelah
     * operasi store / update / destroy.
     */
    private function redirectToIndex(): RedirectResponse
    {
        $filters = session('trensaksis.filters', []);
        $params = array_filter([
            'search' => $filters['search'] ?? null,
            'month' => $filters['month'] ?? null,
            'bayar' => $filters['bayar'] ?? null,
            'per_page' => $filters['per_page'] ?? null,
        ], fn($v) => $v !== null && $v !== '');

        $rekeningNama = $filters['rekening_nama'] ?? [];
        if (!empty($rekeningNama)) {
            $params['rekening_nama'] = $rekeningNama;
        }

        $jenis = $filters['jenis'] ?? [];
        if (!empty($jenis)) {
            $params['jenis'] = $jenis;
        }

        return to_route('transaksis.index', $params);
    }

    private function getSaldoKasPerBayar(string $masjidId): array
    {
        $rekeningMap = Rekening::query()
            ->pluck('nama', 'jenis');

        $mappingByJurnal = MappingRekening::query()
            ->get(['jurnal', 'bayar'])
            ->groupBy('jurnal')
            ->map(fn($items) => $items->pluck('bayar')->unique()->values()->all());

        $rows = DB::table('detail_trensaksis')
            ->join('trensaksis', 'detail_trensaksis.trensaksi_id', '=', 'trensaksis.id')
            ->leftJoin('mapping_rekenings', function ($join) {
                $join->on(DB::raw('TRIM(trensaksis.rekening)'), '=', DB::raw('TRIM(mapping_rekenings.mapping)'))
                    ->on(DB::raw('TRIM(trensaksis.bayar)'), '=', DB::raw('TRIM(mapping_rekenings.bayar)'))
                    ->on(DB::raw('TRIM(trensaksis.jenis)'), '=', DB::raw('TRIM(mapping_rekenings.transaksi)'));
            })
            ->where('trensaksis.masjid_id', $masjidId)
            ->whereRaw("LEFT(TRIM(mapping_rekenings.jurnal), 4) = ?", ['1.01'])
            ->whereNotNull('mapping_rekenings.jurnal')
            ->select(
                'trensaksis.tahun',
                'trensaksis.bayar',
                'detail_trensaksis.jumlah',
                'mapping_rekenings.jurnal',
                'mapping_rekenings.kolom'
            )
            ->orderBy('trensaksis.tahun')
            ->orderBy('mapping_rekenings.jurnal')
            ->get();

        $grouped = [];

        foreach ($rows as $row) {
            $tahun = (string) $row->tahun;
            $jurnal = (string) $row->jurnal;
            $jumlah = (float) $row->jumlah;
            $kolom = strtoupper(trim((string) $row->kolom));
            $saldoChange = $kolom === 'D' || strtolower((string) $row->kolom) === 'debet'
                ? $jumlah
                : -$jumlah;

            $allowedBayars = $mappingByJurnal->get($jurnal, [$row->bayar]);

            foreach ($allowedBayars as $bayar) {
                $bayarKey = (string) $bayar;

                if (!isset($grouped[$tahun][$bayarKey][$jurnal])) {
                    $grouped[$tahun][$bayarKey][$jurnal] = [
                        'rekening' => $jurnal,
                        'rekening_nama' => $rekeningMap[$jurnal] ?? $jurnal,
                        'saldo' => 0,
                    ];
                }

                $grouped[$tahun][$bayarKey][$jurnal]['saldo'] += $saldoChange;
            }
        }

        $result = [];
        foreach ($grouped as $tahun => $byBayar) {
            foreach ($byBayar as $bayar => $items) {
                $result[$tahun][$bayar] = array_values($items);
            }
        }

        return $result;
    }
}
