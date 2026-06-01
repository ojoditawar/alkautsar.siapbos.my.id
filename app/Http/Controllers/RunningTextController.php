<?php

namespace App\Http\Controllers;

use App\Models\RunningText;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RunningTextController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('RunningTexts/Index', [
            'runningTexts' => RunningText::orderBy('urutan')
                ->orderByDesc('id')
                ->get(['id', 'text', 'is_active', 'urutan', 'created_at']),
        ]);
    }

    public function create(): Response
    {
        abort_unless(auth()->user()->can('create-running-texts'), 403);

        return Inertia::render('RunningTexts/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        abort_unless($request->user()->can('create-running-texts'), 403);

        $data = $request->validate([
            'text' => ['required', 'string', 'max:1000'],
            'is_active' => ['boolean'],
            'urutan' => ['nullable', 'integer', 'min:0'],
        ]);

        RunningText::create([
            'text' => $data['text'],
            'is_active' => $data['is_active'] ?? true,
            'urutan' => $data['urutan'] ?? 0,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Running text berhasil ditambahkan.']);

        return to_route('running-texts.index');
    }

    public function edit(RunningText $runningText): Response
    {
        abort_unless(auth()->user()->can('edit-running-texts'), 403);

        return Inertia::render('RunningTexts/Edit', [
            'runningText' => $runningText->only('id', 'text', 'is_active', 'urutan'),
        ]);
    }

    public function update(Request $request, RunningText $runningText): RedirectResponse
    {
        abort_unless($request->user()->can('edit-running-texts'), 403);

        $data = $request->validate([
            'text' => ['required', 'string', 'max:1000'],
            'is_active' => ['boolean'],
            'urutan' => ['nullable', 'integer', 'min:0'],
        ]);

        $runningText->update([
            'text' => $data['text'],
            'is_active' => $data['is_active'] ?? false,
            'urutan' => $data['urutan'] ?? 0,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Running text berhasil diperbarui.']);

        return to_route('running-texts.index');
    }

    public function destroy(RunningText $runningText): RedirectResponse
    {
        abort_unless(auth()->user()->can('delete-running-texts'), 403);

        $runningText->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Running text berhasil dihapus.']);

        return to_route('running-texts.index');
    }
}
