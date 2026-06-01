<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProgramController extends Controller
{
    public function index(): Response
    {
        // $programs = Program::orderBy('program')->get(['id', 'program', 'nama', 'created_at']);

        return Inertia::render('Programs/Index', [
               'programs' => Program::with('kegiatans')
                   ->orderBy('program', 'asc')
                   ->get(),
           ]);
    }

    public function create(): Response
    {
        abort_unless(auth()->user()->can('create-programs'), 403);

        return Inertia::render('Programs/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        abort_unless($request->user()->can('create-programs'), 403);

        $request->validate([
            'program' => ['required', 'string', 'max:20', 'unique:programs,program'],
            'nama'    => ['required', 'string', 'max:255'],
        ]);

        Program::create($request->only('program', 'nama'));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Program berhasil ditambahkan.']);

        return to_route('programs.index');
    }

    public function edit(Program $program): Response
    {
        abort_unless(auth()->user()->can('edit-programs'), 403);

        return Inertia::render('Programs/Edit', [
            'program' => $program->only('id', 'program', 'nama'),
        ]);
    }

    public function update(Request $request, Program $program): RedirectResponse
    {
        abort_unless($request->user()->can('edit-programs'), 403);

        $request->validate([
            'program' => ['required', 'string', 'max:20', 'unique:programs,program,' . $program->id],
            'nama'    => ['required', 'string', 'max:255'],
        ]);

        $program->update($request->only('program', 'nama'));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Program berhasil diperbarui.']);

        return to_route('programs.index');
    }

    public function destroy(Program $program): RedirectResponse
    {
        abort_unless(auth()->user()->can('delete-programs'), 403);

        $program->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Program berhasil dihapus.']);

        return to_route('programs.index');
    }
}
