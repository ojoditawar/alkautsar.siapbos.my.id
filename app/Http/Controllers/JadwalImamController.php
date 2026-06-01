<?php

namespace App\Http\Controllers;

use App\Models\JadwalImam;
use App\Models\Masjid;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JadwalImamController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = in_array($request->integer('per_page'), [10, 20, 50, 100]) ? $request->integer('per_page') : 50;
        $search = trim((string) $request->input('search', ''));
        $month = trim((string) $request->input('month', ''));

        if ($month !== '' && !preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $month)) {
            $month = '';
        }

        $query = JadwalImam::with(['user:id,name', 'masjid:id,nama'])
            ->when($month !== '', function ($q) use ($month) {
                [$year, $mon] = explode('-', $month);
                $q->whereYear('tanggal', $year)
                    ->whereMonth('tanggal', $mon);
            })
            ->when($search, function ($q) use ($search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('muadzin', 'ilike', "%{$search}%")
                        ->orWhere('imam_subuh', 'ilike', "%{$search}%")
                        ->orWhere('imam_magrib', 'ilike', "%{$search}%")
                        ->orWhere('imam_isya', 'ilike', "%{$search}%")
                        ->orWhere('hari', 'ilike', "%{$search}%");
                });
            })
            ->orderByDesc('tanggal');

        $jadwalImams = $query->paginate($perPage)->withQueryString();

        return Inertia::render('JadwalImams/Index', [
            'jadwalImams' => $jadwalImams,
            'filters' => [
                'search' => $search,
                'month' => $month,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function create(): Response
    {
        abort_unless(auth()->user()->can('create-jadwal-imams'), 403);

        return Inertia::render('JadwalImams/Create', [
            'masjids' => Masjid::select('id', 'nama')->orderBy('nama')->get(),
            'existingNames' => $this->getExistingNames(),
        ]);
    }

    public function store(Request $request)
    {
        abort_unless($request->user()->can('create-jadwal-imams'), 403);

        $validated = $request->validate([
            'masjid_id' => 'required|uuid|exists:masjids,id',
            'rows' => 'required|array|min:1',
            'rows.*.tanggal' => 'required|date',
            'rows.*.hari' => 'required|string|max:10',
            'rows.*.muadzin' => 'required|string|max:255',
            'rows.*.imam_subuh' => 'required|string|max:255',
            'rows.*.imam_magrib' => 'required|string|max:255',
            'rows.*.imam_isya' => 'required|string|max:255',
        ]);

        foreach ($validated['rows'] as $row) {
            JadwalImam::create([
                'masjid_id' => $validated['masjid_id'],
                'user_id' => auth()->id(),
                'tanggal' => $row['tanggal'],
                'hari' => $row['hari'],
                'muadzin' => $row['muadzin'],
                'imam_subuh' => $row['imam_subuh'],
                'imam_magrib' => $row['imam_magrib'],
                'imam_isya' => $row['imam_isya'],
            ]);
        }

        return redirect()->route('jadwal-imams.index')->with('success', 'Jadwal imam berhasil ditambahkan.');
    }

    public function edit(JadwalImam $jadwalImam): Response
    {
        abort_unless(auth()->user()->can('edit-jadwal-imams'), 403);

        return Inertia::render('JadwalImams/Edit', [
            'jadwalImam' => $jadwalImam->load(['user:id,name', 'masjid:id,nama']),
            'masjids' => Masjid::select('id', 'nama')->orderBy('nama')->get(),
            'existingNames' => $this->getExistingNames(),
        ]);
    }

    public function update(Request $request, JadwalImam $jadwalImam)
    {
        abort_unless($request->user()->can('edit-jadwal-imams'), 403);

        $validated = $request->validate([
            'masjid_id' => 'required|uuid|exists:masjids,id',
            'tanggal' => 'required|date',
            'hari' => 'required|string|max:10',
            'muadzin' => 'required|string|max:255',
            'imam_subuh' => 'required|string|max:255',
            'imam_magrib' => 'required|string|max:255',
            'imam_isya' => 'required|string|max:255',
        ]);

        $jadwalImam->update($validated);

        return redirect()->route('jadwal-imams.index')->with('success', 'Jadwal imam berhasil diperbarui.');
    }

    public function destroy(JadwalImam $jadwalImam)
    {
        abort_unless(auth()->user()->can('delete-jadwal-imams'), 403);

        $jadwalImam->delete();

        return redirect()->route('jadwal-imams.index')->with('success', 'Jadwal imam berhasil dihapus.');
    }

    public function duplicate(JadwalImam $jadwalImam)
    {
        abort_unless(auth()->user()->can('create-jadwal-imams'), 403);

        $newJadwal = $jadwalImam->replicate();
        $newJadwal->save();

        return redirect()->route('jadwal-imams.edit', $newJadwal->id)
            ->with('success', 'Data jadwal imam berhasil dicopy.');
    }

    private function getExistingNames(): array
    {
        $names = collect();

        $names = $names->merge(JadwalImam::whereNotNull('muadzin')->where('muadzin', '!=', '')->pluck('muadzin'));
        $names = $names->merge(JadwalImam::whereNotNull('imam_subuh')->where('imam_subuh', '!=', '')->pluck('imam_subuh'));
        $names = $names->merge(JadwalImam::whereNotNull('imam_magrib')->where('imam_magrib', '!=', '')->pluck('imam_magrib'));
        $names = $names->merge(JadwalImam::whereNotNull('imam_isya')->where('imam_isya', '!=', '')->pluck('imam_isya'));

        return $names->map(fn($n) => trim($n))
            ->filter()
            ->unique()
            ->sort()
            ->values()
            ->toArray();
    }
}
