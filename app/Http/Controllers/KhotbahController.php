<?php

namespace App\Http\Controllers;

use App\Models\Khotbah;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KhotbahController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim((string) $request->input('search', ''));
        $perPage = $request->integer('per_page', 10);

        $khotbahs = Khotbah::query()
            ->with('user')
            ->when($search, function ($query) use ($search) {
                $query->where('nama', 'like', "%{$search}%")
                    ->orWhere('alamat', 'like', "%{$search}%")
                    ->orWhere('hp', 'like', "%{$search}%");
            })
            ->orderBy('tanggal', 'asc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Khotbahs/Index', [
            'khotbahs' => $khotbahs,
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Khotbahs/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'alamat' => 'required|string|max:255',
            'tanggal' => ['required', 'date', function ($attribute, $value, $fail) {
                // if (date('N', strtotime($value)) !== 5) {
                //     $fail('Tanggal harus hari Jumat.');
                // }
                if ((int) date('N', strtotime($value)) !== 5) {
                    $fail('Tanggal harus hari Jumat.');
                }
            }],
            'hp' => 'nullable|string|max:20',
            'honor' => 'nullable|integer',
        ]);

        Khotbah::create([
            ...$validated,
            'user_id' => auth()->id(),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Data khotbah berhasil ditambahkan.']);

        return redirect()->route('khotib-jumat.index');
    }

    public function edit(Khotbah $khotbah): Response
    {
        return Inertia::render('Khotbahs/Edit', [
            'khotbah' => $khotbah,
        ]);
    }
    public function update(Request $request, Khotbah $khotbah): RedirectResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:100',
            'alamat' => 'required|string|max:255',
            'tanggal' => ['required', 'date', function ($attribute, $value, $fail) {
                if ((int) date('N', strtotime($value)) !== 5) {
                    $fail('Tanggal harus hari Jumat.');
                }
            }],
            'hp' => 'nullable|string|max:20',
            'honor' => 'nullable|integer',
        ]);

        $khotbah->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Data khotbah berhasil diperbarui.']);

        return redirect()->route('khotib-jumat.index');
    }

    public function destroy(Khotbah $khotbah): RedirectResponse
    {
        $khotbah->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Data khotbah berhasil dihapus.']);

        return redirect()->route('khotib-jumat.index');
    }
}
