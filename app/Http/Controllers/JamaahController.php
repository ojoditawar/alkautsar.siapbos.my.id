<?php

namespace App\Http\Controllers;

use App\Models\Jamaah;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class JamaahController extends Controller
{
    public function index(Request $request): Response
    {
        $masjidId = auth()->user()->masjid_id;
        $search = $request->input('search');
        $status = $request->input('status');
        $alamat = $request->input('alamat');
        $blok = $request->input('blok');
        $rt = $request->input('rt');
        $rw = $request->input('rw');
        $perPage = $request->input('per_page', 10);

        $query = Jamaah::where('masjid_id', $masjidId);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('no_rumah', 'like', "%{$search}%");
            });
        }

        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        if ($alamat && $alamat !== 'all') {
            $query->where('alamat', $alamat);
        }

        if ($blok && $blok !== 'all') {
            $query->where('blok', $blok);
        }

        if ($rt && $rt !== 'all') {
            $query->where('rt', $rt);
        }

        if ($rw && $rw !== 'all') {
            $query->where('rw', $rw);
        }

        $jamaahs = $query->orderBy('nama', 'asc')->paginate($perPage)->withQueryString();

        // Ambil list filter unik berdasarkan data yang ada di database masjid ini
        $uniqueAlamat = Jamaah::where('masjid_id', $masjidId)->whereNotNull('alamat')->distinct()->pluck('alamat')->toArray();
        $uniqueBlok = Jamaah::where('masjid_id', $masjidId)->whereNotNull('blok')->distinct()->pluck('blok')->toArray();
        $uniqueRT = Jamaah::where('masjid_id', $masjidId)->whereNotNull('rt')->distinct()->pluck('rt')->toArray();
        $uniqueRW = Jamaah::where('masjid_id', $masjidId)->whereNotNull('rw')->distinct()->pluck('rw')->toArray();

        // Transform collection to append full photo assets URL
        $jamaahs->getCollection()->transform(fn ($j) => [
            'id' => $j->id,
            'masjid_id' => $j->masjid_id,
            'nama' => $j->nama,
            'rt' => $j->rt,
            'rw' => $j->rw,
            'blok' => $j->blok,
            'no_rumah' => $j->no_rumah,
            'alamat' => $j->alamat,
            'telpon' => $j->telpon,
            'art' => (int) $j->art,
            'foto' => $j->foto ? asset('storage/' . $j->foto) : null,
            'status' => $j->status,
            'created_at' => $j->created_at,
        ]);

        return Inertia::render('Jamaahs/Index', [
            'jamaahs' => $jamaahs,
            'filters' => [
                'search' => $search,
                'status' => $status ?? 'all',
                'alamat' => $alamat ?? 'all',
                'blok' => $blok ?? 'all',
                'rt' => $rt ?? 'all',
                'rw' => $rw ?? 'all',
                'per_page' => (int) $perPage,
            ],
            'uniqueFilters' => [
                'alamat' => $uniqueAlamat,
                'blok' => $uniqueBlok,
                'rt' => $uniqueRT,
                'rw' => $uniqueRW,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Jamaahs/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'rt' => ['nullable', 'string', 'max:10'],
            'rw' => ['nullable', 'string', 'max:10'],
            'blok' => ['nullable', 'string', 'max:50'],
            'no_rumah' => ['nullable', 'string', 'max:20'],
            'alamat' => ['nullable', 'string', 'max:255'],
            'telpon' => ['nullable', 'string', 'max:20'],
            'art' => ['required', 'integer', 'min:0'],
            'foto' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'status' => ['required', 'string', 'in:warga,bukan warga'],
        ]);

        $fotoPath = null;
        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('jamaah-photos', 'public');
        }

        Jamaah::create([
            'masjid_id' => auth()->user()->masjid_id,
            'nama' => $validated['nama'],
            'rt' => $validated['rt'] ?? null,
            'rw' => $validated['rw'] ?? null,
            'blok' => $validated['blok'] ?? null,
            'no_rumah' => $validated['no_rumah'] ?? null,
            'alamat' => $validated['alamat'] ?? null,
            'telpon' => $validated['telpon'] ?? null,
            'art' => $validated['art'],
            'foto' => $fotoPath,
            'status' => $validated['status'],
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Data Jamaah berhasil ditambahkan.']);

        return to_route('jamaahs.index');
    }

    public function edit(Jamaah $jamaah): Response
    {
        $masjidId = auth()->user()->masjid_id;

        if ($jamaah->masjid_id !== $masjidId) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Jamaahs/Edit', [
            'jamaah' => [
                'id' => $jamaah->id,
                'masjid_id' => $jamaah->masjid_id,
                'nama' => $jamaah->nama,
                'rt' => $jamaah->rt,
                'rw' => $jamaah->rw,
                'blok' => $jamaah->blok,
                'no_rumah' => $jamaah->no_rumah,
                'alamat' => $jamaah->alamat,
                'telpon' => $jamaah->telpon,
                'art' => (int) $jamaah->art,
                'foto' => $jamaah->foto ? asset('storage/' . $jamaah->foto) : null,
                'status' => $jamaah->status,
            ],
        ]);
    }

    public function update(Request $request, Jamaah $jamaah): RedirectResponse
    {
        $masjidId = auth()->user()->masjid_id;

        if ($jamaah->masjid_id !== $masjidId) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'rt' => ['nullable', 'string', 'max:10'],
            'rw' => ['nullable', 'string', 'max:10'],
            'blok' => ['nullable', 'string', 'max:50'],
            'no_rumah' => ['nullable', 'string', 'max:20'],
            'alamat' => ['nullable', 'string', 'max:255'],
            'telpon' => ['nullable', 'string', 'max:20'],
            'art' => ['required', 'integer', 'min:0'],
            'foto' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'status' => ['required', 'string', 'in:warga,bukan warga'],
        ]);

        $data = [
            'nama' => $validated['nama'],
            'rt' => $validated['rt'] ?? null,
            'rw' => $validated['rw'] ?? null,
            'blok' => $validated['blok'] ?? null,
            'no_rumah' => $validated['no_rumah'] ?? null,
            'alamat' => $validated['alamat'] ?? null,
            'telpon' => $validated['telpon'] ?? null,
            'art' => $validated['art'],
            'status' => $validated['status'],
        ];

        if ($request->hasFile('foto')) {
            // Delete old photo if exists
            if ($jamaah->foto) {
                Storage::disk('public')->delete($jamaah->foto);
            }

            $data['foto'] = $request->file('foto')->store('jamaah-photos', 'public');
        }

        $jamaah->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Data Jamaah berhasil diperbarui.']);

        return to_route('jamaahs.index');
    }

    public function destroy(Jamaah $jamaah): RedirectResponse
    {
        $masjidId = auth()->user()->masjid_id;

        if ($jamaah->masjid_id !== $masjidId) {
            abort(403, 'Unauthorized action.');
        }

        // Delete photo file if exists
        if ($jamaah->foto) {
            Storage::disk('public')->delete($jamaah->foto);
        }

        $jamaah->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Data Jamaah berhasil dihapus.']);

        return to_route('jamaahs.index');
    }
}
