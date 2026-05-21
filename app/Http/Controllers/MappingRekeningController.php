<?php

namespace App\Http\Controllers;

use App\Models\Rekening;
use App\Models\MappingRekening;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MappingRekeningController extends Controller
{
    public function edit(Rekening $rekening): Response
    {
        $rekening->load('mappingAkun');

        // Semua rekening untuk dropdown Akun Mapping
        $allRekenings = Rekening::orderBy('jenis')
            ->get(['id', 'jenis', 'nama']);

        return Inertia::render('MappingRekenings/Edit', [
            'rekening' => array_merge($rekening->only('id', 'jenis', 'nama', 'rek_id', 'sub_rek_id')),
            'mappings' => $rekening->mappingAkun->map(fn($m) => [
                'id' => $m->id,
                'transaksi' => $m->transaksi,
                'bayar' => $m->bayar,
                'jurnal' => $m->jurnal,
                'kolom' => $m->kolom,
                'keterangan' => $m->keterangan,
            ])->values(),
            'allRekenings' => $allRekenings,
        ]);
    }

    public function update(Request $request, Rekening $rekening): RedirectResponse
    {
        $validated = $request->validate([
            'rows' => ['present', 'array'],
            'rows.*.transaksi' => ['required', 'string', 'max:2'],
            'rows.*.bayar' => ['required', 'string', 'max:1'],
            'rows.*.jurnal' => ['required', 'string', 'max:7'],
            'rows.*.kolom' => ['required', 'string', 'in:D,K'],
            'rows.*.keterangan' => ['nullable', 'string', 'max:255'],
        ]);

        // Hapus semua mapping lama, insert ulang
        $rekening->mappingAkun()->delete();

        foreach ($validated['rows'] as $row) {
            $rekening->mappingAkun()->create([
                'transaksi' => $row['transaksi'],
                'bayar' => $row['bayar'],
                'jurnal' => $row['jurnal'],
                'kolom' => $row['kolom'],
                'keterangan' => $row['keterangan'] ?? null,
            ]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Mapping akun berhasil disimpan.']);

        return back();
    }
}
