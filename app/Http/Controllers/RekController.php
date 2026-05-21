<?php

namespace App\Http\Controllers;

use App\Models\Rek;
use App\Models\SubRek;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;
use Inertia\Response;

class RekController extends Controller
{
    public function index(): Response
    {
        $reks = Rek::orderBy('kode')->get(['kode', 'nama', 'created_at']);

        return Inertia::render('Reks/Index', [
            'reks' => $reks,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Reks/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'kode' => ['required', 'string', 'max:1', 'unique:reks,kode'],
            'nama' => ['required', 'string', 'max:255'],
        ]);

        Rek::create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Rekening berhasil ditambahkan.']);

        return to_route('reks.index');
    }

    public function edit(Rek $rek): Response
    {
        return Inertia::render('Reks/Edit', [
            'rek' => $rek->only('kode', 'nama'),
        ]);
    }

    public function update(Request $request, Rek $rek): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
        ]);

        $rek->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Rekening berhasil diperbarui.']);

        return to_route('reks.index');
    }

    public function printPdf()
    {
        $reks = Rek::with(['subReks' => function ($q) {
            $q->orderBy('kelompok');
        }, 'subReks.rekenings' => function ($q) {
            $q->orderBy('jenis');
        }])->orderBy('kode')->get();

        $pdf = Pdf::loadView('pdf.rekening-hirarki', [
            'reks' => $reks,
            'tanggal' => now()->translatedFormat('d F Y H:i'),
        ]);

        $pdf->setPaper('A4', 'portrait');

        return $pdf->stream('rekening-hirarki.pdf');
    }

    public function destroy(Rek $rek): RedirectResponse
    {
        $subRekCount = SubRek::where('rek_id', $rek->kode)->count();

        if ($subRekCount > 0) {
            return back()->withErrors([
                'delete' => "Rekening {$rek->kode} - {$rek->nama} memiliki {$subRekCount} sub rekening. Hapus semua sub rekening terlebih dahulu sebelum menghapus rekening ini.",
            ]);
        }

        $rek->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Rekening berhasil dihapus.']);

        return to_route('reks.index');
    }
}
