<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Daftar permissions (manage/view level)
        $permissions = [
            'manage-users',
            'manage-masjids',
            'manage-reks',
            'manage-roles',
            'manage-permissions',
            'manage-transaksis',
            'manage-laporan-buku-besar',
            'manage-laporan-neraca',
            'manage-validasi-buku-besar',
            'manage-running-texts',
            'manage-kajians',
            'manage-pekurbans',
            'manage-jadwal-imams',
            'manage-monitor-configs',
            'manage-programs',
            'manage-hijri-holidays',
            'manage-khotbahs',
            'manage-file-explorer',
            'manage-mutiara-images',
            'manage-imam-masjids',
            'manage-jamaahs',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Granular CRUD permissions
        $crudEntities = [
            'users', 'roles', 'permissions', 'masjids', 'reks', 'sub-reks',
            'rekenings', 'programs', 'kegiatans', 'transaksis', 'trensaksis',
            'jamaahs', 'imam-masjids', 'mutiara-images', 'running-texts',
            'kajians', 'pekurbans', 'jadwal-imams', 'khotbahs',
        ];

        $granularPermissions = [];
        foreach ($crudEntities as $entity) {
            foreach (['create', 'edit', 'delete'] as $action) {
                $permName = "{$action}-{$entity}";
                Permission::firstOrCreate(['name' => $permName]);
                $granularPermissions[] = $permName;
            }
        }

        // All permissions for Admin
        $allPermissions = array_merge($permissions, $granularPermissions);

        // Buat role Admin dengan semua permissions
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $adminRole->syncPermissions($allPermissions);
    }
}
