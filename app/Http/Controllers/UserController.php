<?php

namespace App\Http\Controllers;

use App\Models\Masjid;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::with(['masjid:id,nama', 'roles:id,name'])->orderBy('name')->get(['id', 'name', 'email', 'masjid_id', 'created_at']);

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    public function create(): Response
    {
        abort_unless(auth()->user()->can('create-users'), 403);
        $masjids = Masjid::orderBy('nama')->get(['id', 'nama']);
        $roles = Role::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Users/Create', [
            'masjids' => $masjids,
            'roles' => $roles,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        abort_unless($request->user()->can('create-users'), 403);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'masjid_id' => ['nullable', 'string', 'exists:masjids,id'],
            'role_ids' => ['array'],
            'role_ids.*' => ['integer', 'exists:roles,id'],
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        if (!empty($validated['role_ids'])) {
            $roleNames = Role::whereIn('id', $validated['role_ids'])->pluck('name')->toArray();
            $user->syncRoles($roleNames);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'User berhasil ditambahkan.']);

        return to_route('users.index');
    }

    public function edit(User $user): Response
    {
        abort_unless(auth()->user()->can('edit-users'), 403);
        $masjids = Masjid::orderBy('nama')->get(['id', 'nama']);
        $roles = Role::orderBy('name')->get(['id', 'name']);
        $user->load('roles:id,name');

        return Inertia::render('Users/Edit', [
            'user' => array_merge($user->only('id', 'name', 'email', 'masjid_id'), [
                'role_ids' => $user->roles->pluck('id'),
            ]),
            'masjids' => $masjids,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        abort_unless($request->user()->can('edit-users'), 403);

        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'masjid_id' => ['nullable', 'string', 'exists:masjids,id'],
            'role_ids' => ['nullable', 'array'],
            'role_ids.*' => ['integer', 'exists:roles,id'],
        ];

        if ($request->filled('password') && $request->filled('password_confirmation')) {
            $rules['password'] = ['required', 'confirmed', Rules\Password::defaults()];
        }

        $validated = $request->validate($rules);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->masjid_id = $validated['masjid_id'] ?? null;

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $roleIds = $validated['role_ids'] ?? $request->input('role_ids', []);
        $roleIds = array_map('intval', array_filter((array) $roleIds));

        if (!empty($roleIds)) {
            $roleNames = Role::whereIn('id', $roleIds)->pluck('name')->toArray();
            $user->syncRoles($roleNames);
        } else {
            $user->syncRoles([]);
        }

        $user->save();

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'User berhasil diperbarui.']);

        return to_route('users.index');
    }

    public function destroy(User $user): RedirectResponse
    {
        abort_unless(auth()->user()->can('delete-users'), 403);

        $user->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'User berhasil dihapus.']);

        return to_route('users.index');
    }
}
