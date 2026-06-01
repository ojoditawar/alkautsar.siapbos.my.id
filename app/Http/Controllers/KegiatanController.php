<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KegiatanController extends Controller
{
    public function index(Program $program)
    {
        return Inertia::render('Kegiatans/Index', [
            'program' => $program,
            'kegiatans' => $program->kegiatans()
                ->latest()
                ->get(),
        ]);
    }

    public function create(Program $program)
    {
        abort_unless(auth()->user()->can('create-kegiatans'), 403);

        return Inertia::render('Kegiatans/Create', [
            'program' => $program,
        ]);
    }

    public function store(Request $request, Program $program)
    {
        abort_unless($request->user()->can('create-kegiatans'), 403);

        $validated = $request->validate([
            'kegiatan' => ['required', 'string', 'max:255'],
            'nama' => ['required', 'string', 'max:255'],
        ]);

        $program->kegiatans()->create($validated);

        return redirect("/programs/{$program->id}/kegiatans");
    }

    public function edit(Program $program, Kegiatan $kegiatan)
    {
        abort_unless(auth()->user()->can('edit-kegiatans'), 403);

        if ($kegiatan->program_id !== $program->id) {
            abort(404);
        }

        return Inertia::render('Kegiatans/Edit', [
            'program' => $program,
            'kegiatan' => $kegiatan,
        ]);
    }

    public function update(Request $request, Program $program, Kegiatan $kegiatan)
    {
        abort_unless($request->user()->can('edit-kegiatans'), 403);

        if ($kegiatan->program_id !== $program->id) {
            abort(404);
        }

        $validated = $request->validate([
            'kegiatan' => ['required', 'string', 'max:255'],
            'nama' => ['required', 'string', 'max:255'],
        ]);

        $kegiatan->update($validated);

        return redirect("/programs/{$program->id}/kegiatans");
    }

    public function destroy(Program $program, Kegiatan $kegiatan)
    {
        abort_unless(auth()->user()->can('delete-kegiatans'), 403);

        if ($kegiatan->program_id !== $program->id) {
            abort(404);
        }

        $kegiatan->delete();

        return redirect("/programs/{$program->id}/kegiatans");
    }
}
