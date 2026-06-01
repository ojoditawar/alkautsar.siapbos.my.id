<?php

namespace App\Http\Controllers;

use App\Models\Masjid;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MasjidController extends Controller
{
    public function index(): Response
    {
        $masjids = Masjid::orderBy('nama')->get(['id', 'nama', 'alamat', 'image', 'created_at']);

        return Inertia::render('Masjids/Index', [
            'masjids' => $masjids,
        ]);
    }

    public function create(): Response
    {
        abort_unless(auth()->user()->can('create-masjids'), 403);

        return Inertia::render('Masjids/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        abort_unless($request->user()->can('create-masjids'), 403);

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'alamat' => ['nullable', 'string', 'max:500'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('gambar'), $filename);
            $validated['image'] = 'gambar/' . $filename;
        }

        Masjid::create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Masjid berhasil ditambahkan.']);

        return to_route('masjids.index');
    }

    public function edit(Masjid $masjid): Response
    {
        abort_unless(auth()->user()->can('edit-masjids'), 403);

        return Inertia::render('Masjids/Edit', [
            'masjid' => $masjid->only('id', 'nama', 'alamat', 'image'),
        ]);
    }

    public function update(Request $request, Masjid $masjid): RedirectResponse
    {
        abort_unless($request->user()->can('edit-masjids'), 403);

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'alamat' => ['nullable', 'string', 'max:500'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($masjid->image && file_exists(public_path($masjid->image))) {
                unlink(public_path($masjid->image));
            }

            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('gambar'), $filename);
            $validated['image'] = 'gambar/' . $filename;
        } else {
            unset($validated['image']);
        }

        $masjid->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Masjid berhasil diperbarui.']);

        return to_route('masjids.index');
    }

    public function destroy(Masjid $masjid): RedirectResponse
    {
        abort_unless(auth()->user()->can('delete-masjids'), 403);

        // Hapus gambar jika ada
        if ($masjid->image && file_exists(public_path($masjid->image))) {
            unlink(public_path($masjid->image));
        }

        $masjid->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Masjid berhasil dihapus.']);

        return to_route('masjids.index');
    }
}
