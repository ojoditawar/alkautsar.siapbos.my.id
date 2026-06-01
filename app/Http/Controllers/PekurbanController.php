<?php

namespace App\Http\Controllers;

use App\Models\DetailPekurban;
use App\Models\Pekurban;
use App\Models\Trensaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class PekurbanController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = in_array($request->integer('per_page'), [10, 20, 50, 100]) ? $request->integer('per_page') : 50;
        $search = trim((string) $request->input('search', ''));
        $tahun = trim((string) $request->input('tahun', ''));
        $jenis = trim((string) $request->input('jenis', ''));
        $status_bayar = $request->input('status_bayar');

        $query = Pekurban::with(['user:id,name', 'detail_pekurbans:id,pekurban_id,nama,alamat,bagian,bayar'])
            ->when($search, function ($q) use ($search) {
                $q->where('kelas', 'like', "%{$search}%")
                    ->orWhere('sapi', 'like', "%{$search}%")
                    ->orWhere('kelompok_pequrban', 'like', "%{$search}%");
            })
            ->when($tahun, function ($q) use ($tahun) {
                $q->where('tahun', $tahun);
            })
            ->when($jenis, function ($q) use ($jenis) {
                $q->where('jenis', $jenis);
            })
            ->when($status_bayar !== null && $status_bayar !== 'all', function ($q) use ($status_bayar) {
                $q->whereHas('detail_pekurbans', function ($sub) use ($status_bayar) {
                    $sub->where('bayar', $status_bayar);
                });
                // Also filter the details themselves so only relevant participants are shown
                $q->with(['detail_pekurbans' => function ($sub) use ($status_bayar) {
                    $sub->where('bayar', $status_bayar);
                }]);
            })
            ->orderByDesc('created_at');

        $pekurbans = $query->paginate($perPage)->withQueryString();

        return Inertia::render('Pekurbans/Index', [
            'pekurbans' => $pekurbans,
            'filters' => [
                'search' => $search,
                'tahun' => $tahun,
                'jenis' => $jenis,
                'status_bayar' => $status_bayar,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function create(): Response
    {
        abort_unless(auth()->user()->can('create-pekurbans'), 403);

        $trensaksis = Trensaksi::with('detailTrensaksi:id,trensaksi_id,uraian')
            ->orderBy('tanggal', 'desc')
            ->get()
            ->map(fn($t) => [
                'id' => $t->id,
                'no_trans' => $t->no_trans,
                'uraian' => $t->detailTrensaksi->pluck('uraian')->filter()->implode(', '),
            ]);

        return Inertia::render('Pekurbans/Create', [
            'trensaksis' => $trensaksis,
        ]);
    }

    public function store(Request $request)
    {
        abort_unless($request->user()->can('create-pekurbans'), 403);

        $validated = $request->validate([
            'jenis' => 'nullable|integer|in:1,2,3',
            'tahun' => 'nullable|string|max:4',
            'kelas' => 'nullable|string|max:30',
            'sapi' => 'nullable|string|max:255',
            'kelompok_pequrban' => 'required|string|max:255',
            'harga' => 'nullable|integer|min:0',
            'biaya_potong' => 'nullable|integer|min:0',
            'total' => 'nullable|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'details' => 'nullable|array',
            'details.*.nama' => 'nullable|string|max:255',
            'details.*.alamat' => 'nullable|string',
            'details.*.bagian' => 'nullable|string|max:255',
            'details.*.bayar' => 'nullable',
            'details.*.trensaksi_id' => 'nullable|integer',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('pekurban', 'public');
        }

        $pekurban = Pekurban::create([
            'user_id' => auth()->id(),
            'jenis' => $validated['jenis'] ?? 1,
            'tahun' => $validated['tahun'],
            'kelas' => $validated['kelas'],
            'sapi' => $validated['sapi'],
            'image' => $imagePath,
            'kelompok_pequrban' => $validated['kelompok_pequrban'],
            'harga' => $validated['harga'] ?? 0,
            'biaya_potong' => $validated['biaya_potong'] ?? 0,
            'total' => $validated['total'] ?? 0,
        ]);

        // Save detail pekurbans
        if (isset($validated['details']) && is_array($validated['details'])) {
            foreach ($validated['details'] as $detail) {
                if (!empty($detail['nama'])) {
                    DetailPekurban::create([
                        'pekurban_id' => $pekurban->id,
                        'nama' => $detail['nama'],
                        'alamat' => $detail['alamat'] ?? null,
                        'bagian' => $detail['bagian'] ?? null,
                        'bayar' => $detail['bayar'] ?? 0,
                        'trensaksi_id' => $detail['trensaksi_id'] ?? null,
                    ]);
                }
            }
        }

        return redirect()->route('pekurbans.index')->with('success', 'Pekurban berhasil ditambahkan.');
    }

    public function edit(Pekurban $pekurban): Response
    {
        abort_unless(auth()->user()->can('edit-pekurbans'), 403);

        $trensaksis = Trensaksi::with('detailTrensaksi:id,trensaksi_id,uraian')
            ->orderBy('tanggal', 'desc')
            ->get()
            ->map(fn($t) => [
                'id' => $t->id,
                'no_trans' => $t->no_trans,
                'uraian' => $t->detailTrensaksi->pluck('uraian')->filter()->implode(', '),
            ]);

        return Inertia::render('Pekurbans/Edit', [
            'pekurban' => $pekurban->load('user:id,name', 'detail_pekurbans'),
            'trensaksis' => $trensaksis,
        ]);
    }

    public function update(Request $request, Pekurban $pekurban)
    {
        abort_unless($request->user()->can('edit-pekurbans'), 403);

        $validated = $request->validate([
            'jenis' => 'nullable|integer|in:1,2,3',
            'tahun' => 'nullable|string|max:4',
            'kelas' => 'nullable|string|max:30',
            'sapi' => 'nullable|string|max:255',
            'kelompok_pequrban' => 'required|string|max:255',
            'harga' => 'nullable|integer|min:0',
            'biaya_potong' => 'nullable|integer|min:0',
            'total' => 'nullable|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'details' => 'nullable|array',
            'details.*.nama' => 'nullable|string|max:255',
            'details.*.alamat' => 'nullable|string',
            'details.*.bagian' => 'nullable|string|max:255',
            'details.*.bayar' => 'nullable',
            'details.*.trensaksi_id' => 'nullable|integer',
        ]);

        $imagePath = $pekurban->image;
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($pekurban->image) {
                Storage::disk('public')->delete($pekurban->image);
            }
            $imagePath = $request->file('image')->store('pekurban', 'public');
        }

        $pekurban->update([
            'jenis' => $validated['jenis'] ?? $pekurban->jenis,
            'tahun' => $validated['tahun'],
            'kelas' => $validated['kelas'],
            'sapi' => $validated['sapi'],
            'image' => $imagePath,
            'kelompok_pequrban' => $validated['kelompok_pequrban'],
            'harga' => $validated['harga'] ?? 0,
            'biaya_potong' => $validated['biaya_potong'] ?? 0,
            'total' => $validated['total'] ?? 0,
        ]);

        // Update detail pekurbans
        $pekurban->detail_pekurbans()->delete();
        if (isset($validated['details']) && is_array($validated['details'])) {
            foreach ($validated['details'] as $detail) {
                if (!empty($detail['nama'])) {
                    DetailPekurban::create([
                        'pekurban_id' => $pekurban->id,
                        'nama' => $detail['nama'],
                        'alamat' => $detail['alamat'] ?? null,
                        'bagian' => $detail['bagian'] ?? null,
                        'bayar' => $detail['bayar'] ?? 0,
                        'trensaksi_id' => $detail['trensaksi_id'] ?? null,
                    ]);
                }
            }
        }

        return redirect()->route('pekurbans.index')->with('success', 'Pekurban berhasil diperbarui.');
    }

    public function destroy(Pekurban $pekurban)
    {
        abort_unless(auth()->user()->can('delete-pekurbans'), 403);

        // Delete image if exists
        if ($pekurban->image) {
            Storage::disk('public')->delete($pekurban->image);
        }

        $pekurban->delete();

        return redirect()->route('pekurbans.index')->with('success', 'Pekurban berhasil dihapus.');
    }

    public function duplicate(Pekurban $pekurban)
    {
        abort_unless(auth()->user()->can('create-pekurbans'), 403);

        $newPekurban = DB::transaction(function () use ($pekurban) {
            $pekurban->load('detail_pekurbans');

            // copy data utama
            $newPekurban = $pekurban->replicate();

            // sesuaikan field yang ingin dibedakan
            $newPekurban->kelompok_pequrban = $pekurban->kelompok_pequrban . ' (Copy)';

            // kalau mau field tertentu dikosongkan, aktifkan contoh ini:
            // $newPekurban->kelas = null;
            // $newPekurban->sapi = null;

            $newPekurban->save();

            // copy detail peserta
            foreach ($pekurban->detail_pekurbans as $detail) {
                $newDetail = $detail->replicate();
                $newDetail->pekurban_id = $newPekurban->id;
                $newDetail->save();
            }

            return $newPekurban;
        });

        return redirect()
            ->route('pekurbans.edit', $newPekurban->id)
            ->with('success', 'Data pekurban beserta detail peserta berhasil dicopy.');
    }
}
