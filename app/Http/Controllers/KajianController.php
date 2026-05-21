<?php

namespace App\Http\Controllers;

use App\Models\Kajian;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KajianController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Kajians/Index', [
            'kajians' => Kajian::orderBy('tanggal', 'desc')
                ->get(['id', 'judul', 'pemateri', 'tanggal', 'waktu', 'tempat', 'deskripsi', 'is_active', 'created_at'])
                ->map(fn ($k) => [
                    ...$k->toArray(),
                    'tanggal' => $k->tanggal?->format('Y-m-d'),
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Kajians/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request);

        Kajian::create($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kajian berhasil ditambahkan.']);

        return to_route('kajians.index');
    }

    public function edit(Kajian $kajian): Response
    {
        return Inertia::render('Kajians/Edit', [
            'kajian' => [
                'id' => $kajian->id,
                'judul' => $kajian->judul,
                'pemateri' => $kajian->pemateri,
                'tanggal' => $kajian->tanggal?->format('Y-m-d'),
                'waktu' => $kajian->waktu,
                'tempat' => $kajian->tempat,
                'deskripsi' => $kajian->deskripsi,
                'is_active' => (bool) $kajian->is_active,
            ],
        ]);
    }

    public function update(Request $request, Kajian $kajian): RedirectResponse
    {
        $data = $this->validateData($request);

        $kajian->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kajian berhasil diperbarui.']);

        return to_route('kajians.index');
    }

    public function destroy(Kajian $kajian): RedirectResponse
    {
        $kajian->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kajian berhasil dihapus.']);

        return to_route('kajians.index');
    }

    private function validateData(Request $request): array
    {
        $data = $request->validate([
            'judul' => ['required', 'string', 'max:255'],
            'pemateri' => ['required', 'string', 'max:255'],
            'tanggal' => ['required', 'date'],
            'waktu' => ['nullable', 'date_format:H:i'],
            'tempat' => ['nullable', 'string', 'max:255'],
            'deskripsi' => ['nullable', 'string', 'max:2000'],
            'is_active' => ['boolean'],
        ]);

        $data['is_active'] = $data['is_active'] ?? false;

        return $data;
    }
}
