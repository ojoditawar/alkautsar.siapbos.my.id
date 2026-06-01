<?php

namespace App\Http\Controllers;

use App\Models\Rek;
use App\Models\Rekening;
use App\Models\SubRek;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubRekController extends Controller
{
    public function index(Rek $rek): Response
    {
        $subReks = SubRek::where('rek_id', $rek->kode)
            ->orderBy('kelompok')
            ->get(['id', 'rek_id', 'kode', 'kelompok', 'nama', 'created_at']);

        return Inertia::render('SubReks/Index', [
            'rek' => $rek->only('kode', 'nama'),
            'subReks' => $subReks,
        ]);
    }

    public function create(Rek $rek): Response
    {
        abort_unless(auth()->user()->can('create-sub-reks'), 403);

        return Inertia::render('SubReks/Create', [
            'rek' => $rek->only('kode', 'nama'),
        ]);
    }

    public function store(Request $request, Rek $rek): RedirectResponse
    {
        abort_unless($request->user()->can('create-sub-reks'), 403);

        $validated = $request->validate([
            'kelompok' => ['required', 'string', 'max:2'],
            'nama' => ['required', 'string', 'max:255'],
        ]);

        SubRek::create([
            'rek_id' => $rek->kode,
            'kode' => $rek->kode,
            'kelompok' => $rek->kode . '.' . $validated['kelompok'],
            'nama' => $validated['nama'],
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Sub Rekening berhasil ditambahkan.']);

        return to_route('reks.sub-reks.index', $rek->kode);
    }

    public function edit(Rek $rek, SubRek $subRek): Response
    {
        abort_unless(auth()->user()->can('edit-sub-reks'), 403);

        return Inertia::render('SubReks/Edit', [
            'rek' => $rek->only('kode', 'nama'),
            'subRek' => $subRek->only('id', 'rek_id', 'kode', 'kelompok', 'nama'),
        ]);
    }

    public function update(Request $request, Rek $rek, SubRek $subRek): RedirectResponse
    {
        abort_unless($request->user()->can('edit-sub-reks'), 403);

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
        ]);

        $subRek->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Sub Rekening berhasil diperbarui.']);

        return to_route('reks.sub-reks.index', $rek->kode);
    }

    public function destroy(Rek $rek, SubRek $subRek): RedirectResponse
    {
        abort_unless(auth()->user()->can('delete-sub-reks'), 403);

        $rekeningCount = Rekening::where('sub_rek_id', $subRek->id)->count();

        if ($rekeningCount > 0) {
            return back()->withErrors([
                'delete' => "Sub Rekening {$subRek->kelompok} - {$subRek->nama} memiliki {$rekeningCount} rekening. Hapus semua rekening terlebih dahulu sebelum menghapus sub rekening ini.",
            ]);
        }

        $subRek->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Sub Rekening berhasil dihapus.']);

        return to_route('reks.sub-reks.index', $rek->kode);
    }
}
