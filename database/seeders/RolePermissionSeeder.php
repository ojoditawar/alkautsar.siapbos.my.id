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

        // Daftar permissions
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
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Buat role Admin dengan semua permissions
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $adminRole->syncPermissions($permissions);
    }
}
