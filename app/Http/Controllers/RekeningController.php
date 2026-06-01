<?php

namespace App\Http\Controllers;

use App\Models\Rek;
use App\Models\Rekening;
use App\Models\SubRek;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RekeningController extends Controller
{
    public function index(Rek $rek, SubRek $subRek): Response
    {
        $rekenings = Rekening::where('sub_rek_id', $subRek->id)
            ->orderBy('jenis')
            ->get(['id', 'rek_id', 'sub_rek_id', 'akun', 'kelompok', 'jenis', 'nama', 'created_at']);

        return Inertia::render('Rekenings/Index', [
            'rek' => $rek->only('kode', 'nama'),
            'subRek' => $subRek->only('id', 'kode', 'kelompok', 'nama'),
            'rekenings' => $rekenings,
        ]);
    }

    public function create(Rek $rek, SubRek $subRek): Response
    {
        abort_unless(auth()->user()->can('create-rekenings'), 403);

        return Inertia::render('Rekenings/Create', [
            'rek' => $rek->only('kode', 'nama'),
            'subRek' => $subRek->only('id', 'kode', 'kelompok', 'nama'),
        ]);
    }

    public function store(Request $request, Rek $rek, SubRek $subRek): RedirectResponse
    {
        abort_unless($request->user()->can('create-rekenings'), 403);

        $validated = $request->validate([
            'jenis' => ['required', 'string', 'max:4'],
            'nama' => ['required', 'string', 'max:255'],
        ]);

        Rekening::create([
            'sub_rek_id' => $subRek->id,
            'jenis' => $validated['jenis'],
            'nama' => $validated['nama'],
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Rekening berhasil ditambahkan.']);

        return to_route('reks.sub-reks.rekenings.index', [$rek->kode, $subRek->id]);
    }

    public function edit(Rek $rek, SubRek $subRek, Rekening $rekening): Response
    {
        abort_unless(auth()->user()->can('edit-rekenings'), 403);

        return Inertia::render('Rekenings/Edit', [
            'rek' => $rek->only('kode', 'nama'),
            'subRek' => $subRek->only('id', 'kode', 'kelompok', 'nama'),
            'rekening' => $rekening->only('id', 'rek_id', 'sub_rek_id', 'akun', 'kelompok', 'jenis', 'nama'),
        ]);
    }

    public function update(Request $request, Rek $rek, SubRek $subRek, Rekening $rekening): RedirectResponse
    {
        abort_unless($request->user()->can('edit-rekenings'), 403);

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
        ]);

        $rekening->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Rekening berhasil diperbarui.']);

        return to_route('reks.sub-reks.rekenings.index', [$rek->kode, $subRek->id]);
    }

    public function destroy(Rek $rek, SubRek $subRek, Rekening $rekening): RedirectResponse
    {
        abort_unless(auth()->user()->can('delete-rekenings'), 403);

        $rekening->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Rekening berhasil dihapus.']);

        return to_route('reks.sub-reks.rekenings.index', [$rek->kode, $subRek->id]);
    }
}
