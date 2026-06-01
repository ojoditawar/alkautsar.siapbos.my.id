<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    public function up(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Entities with full CRUD: create, edit, delete
        $crudEntities = [
            'users',
            'roles',
            'permissions',
            'masjids',
            'reks',
            'sub-reks',
            'rekenings',
            'programs',
            'kegiatans',
            'transaksis',
            'trensaksis',
            'jamaahs',
            'imam-masjids',
            'mutiara-images',
            'running-texts',
            'kajians',
            'pekurbans',
            'jadwal-imams',
            'khotbahs',
        ];

        $newPermissions = [];

        foreach ($crudEntities as $entity) {
            foreach (['create', 'edit', 'delete'] as $action) {
                $permName = "{$action}-{$entity}";
                Permission::firstOrCreate(['name' => $permName]);
                $newPermissions[] = $permName;
            }
        }

        // Also add missing manage-* permissions for sidebar items that don't have them
        $additionalPermissions = [
            'manage-programs',
            'manage-hijri-holidays',
            'manage-khotbahs',
            'manage-file-explorer',
            'manage-mutiara-images',
            'manage-imam-masjids',
            'manage-jamaahs',
        ];

        foreach ($additionalPermissions as $permName) {
            Permission::firstOrCreate(['name' => $permName]);
            $newPermissions[] = $permName;
        }

        // Assign all new permissions to Admin role
        $adminRole = Role::where('name', 'Admin')->first();
        if ($adminRole) {
            $adminRole->givePermissionTo($newPermissions);
        }
    }

    public function down(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $crudEntities = [
            'users', 'roles', 'permissions', 'masjids', 'reks', 'sub-reks',
            'rekenings', 'programs', 'kegiatans', 'transaksis', 'trensaksis',
            'jamaahs', 'imam-masjids', 'mutiara-images', 'running-texts',
            'kajians', 'pekurbans', 'jadwal-imams', 'khotbahs',
        ];

        foreach ($crudEntities as $entity) {
            foreach (['create', 'edit', 'delete'] as $action) {
                Permission::where('name', "{$action}-{$entity}")->delete();
            }
        }

        $additional = [
            'manage-programs', 'manage-hijri-holidays', 'manage-khotbahs',
            'manage-file-explorer', 'manage-mutiara-images',
            'manage-imam-masjids', 'manage-jamaahs',
        ];
        foreach ($additional as $permName) {
            Permission::where('name', $permName)->delete();
        }
    }
};
