<?php

namespace App\Http\Controllers;

use App\Models\ImamMasjid;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ImamMasjidController extends Controller
{
    public function index(): Response
    {
        $masjidId = auth()->user()->masjid_id;

        $imams = ImamMasjid::where('masjid_id', $masjidId)
            ->orderBy('tipe', 'asc')
            ->orderBy('sholat', 'asc')
            ->get()
            ->map(fn ($imam) => [
                'id' => $imam->id,
                'masjid_id' => $imam->masjid_id,
                'nama' => $imam->nama,
                'foto' => $imam->foto ? asset('storage/' . $imam->foto) : null,
                'jabatan' => $imam->jabatan,
                'tipe' => $imam->tipe,
                'sholat' => $imam->sholat,
                'created_at' => $imam->created_at,
            ]);

        return Inertia::render('ImamMasjids/Index', [
            'imams' => $imams,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('ImamMasjids/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'foto' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'jabatan' => ['required', 'string', 'max:255'],
            'tipe' => ['required', 'string', 'in:utama,cadangan'],
            'sholat' => ['required', 'string', 'in:SUBUH,DZUHUR,ASHAR,MAGHRIB,ISYA'],
        ]);

        $fotoPath = null;
        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('imam-images', 'public');
        }

        ImamMasjid::create([
            'masjid_id' => auth()->user()->masjid_id,
            'nama' => $validated['nama'],
            'foto' => $fotoPath,
            'jabatan' => $validated['jabatan'],
            'tipe' => $validated['tipe'],
            'sholat' => $validated['sholat'],
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Imam Masjid berhasil ditambahkan.']);

        return to_route('imam-masjids.index');
    }

    public function edit(ImamMasjid $imamMasjid): Response
    {
        $masjidId = auth()->user()->masjid_id;

        if ($imamMasjid->masjid_id !== $masjidId) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('ImamMasjids/Edit', [
            'imamMasjid' => [
                'id' => $imamMasjid->id,
                'masjid_id' => $imamMasjid->masjid_id,
                'nama' => $imamMasjid->nama,
                'foto' => $imamMasjid->foto ? asset('storage/' . $imamMasjid->foto) : null,
                'jabatan' => $imamMasjid->jabatan,
                'tipe' => $imamMasjid->tipe,
                'sholat' => $imamMasjid->sholat,
            ],
        ]);
    }

    public function update(Request $request, ImamMasjid $imamMasjid): RedirectResponse
    {
        $masjidId = auth()->user()->masjid_id;

        if ($imamMasjid->masjid_id !== $masjidId) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'foto' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'jabatan' => ['required', 'string', 'max:255'],
            'tipe' => ['required', 'string', 'in:utama,cadangan'],
            'sholat' => ['required', 'string', 'in:SUBUH,DZUHUR,ASHAR,MAGHRIB,ISYA'],
        ]);

        $data = [
            'nama' => $validated['nama'],
            'jabatan' => $validated['jabatan'],
            'tipe' => $validated['tipe'],
            'sholat' => $validated['sholat'],
        ];

        if ($request->hasFile('foto')) {
            // Delete old photo if exists
            if ($imamMasjid->foto) {
                Storage::disk('public')->delete($imamMasjid->foto);
            }

            $data['foto'] = $request->file('foto')->store('imam-images', 'public');
        }

        $imamMasjid->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Imam Masjid berhasil diperbarui.']);

        return to_route('imam-masjids.index');
    }

    public function destroy(ImamMasjid $imamMasjid): RedirectResponse
    {
        $masjidId = auth()->user()->masjid_id;

        if ($imamMasjid->masjid_id !== $masjidId) {
            abort(403, 'Unauthorized action.');
        }

        // Delete photo file if exists
        if ($imamMasjid->foto) {
            Storage::disk('public')->delete($imamMasjid->foto);
        }

        $imamMasjid->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Imam Masjid berhasil dihapus.']);

        return to_route('imam-masjids.index');
    }
}
