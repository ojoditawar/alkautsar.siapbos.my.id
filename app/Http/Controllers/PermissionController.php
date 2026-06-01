<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index(): Response
    {
        $permissions = Permission::orderBy('name')
            ->get(['id', 'name', 'created_at']);

        return Inertia::render('Permissions/Index', [
            'permissions' => $permissions,
        ]);
    }

    public function create(): Response
    {
        abort_unless(auth()->user()->can('create-permissions'), 403);

        return Inertia::render('Permissions/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        abort_unless($request->user()->can('create-permissions'), 403);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:permissions,name'],
        ]);

        Permission::create(['name' => $validated['name']]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Permission berhasil ditambahkan.']);

        return to_route('permissions.index');
    }

    public function edit(Permission $permission): Response
    {
        abort_unless(auth()->user()->can('edit-permissions'), 403);

        return Inertia::render('Permissions/Edit', [
            'permission' => $permission->only('id', 'name'),
        ]);
    }

    public function update(Request $request, Permission $permission): RedirectResponse
    {
        abort_unless($request->user()->can('edit-permissions'), 403);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:permissions,name,' . $permission->id],
        ]);

        $permission->update(['name' => $validated['name']]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Permission berhasil diperbarui.']);

        return to_route('permissions.index');
    }

    public function destroy(Permission $permission): RedirectResponse
    {
        abort_unless(auth()->user()->can('delete-permissions'), 403);

        $permission->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Permission berhasil dihapus.']);

        return to_route('permissions.index');
    }
}
