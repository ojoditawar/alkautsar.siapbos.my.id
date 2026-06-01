<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save, ShieldCheck, ShieldOff } from 'lucide-vue-next';
import { computed } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


interface PermissionData {
    id: number;
    name: string;
}

interface RoleData {
    id: number;
    name: string;
    permissions: number[];
}

const props = defineProps<{
    role: RoleData;
    permissions: PermissionData[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Roles',
                href: '/roles',
            },
            {
                title: 'Edit Role',
                href: '#',
            },
        ],
    },
});

const form = useForm({
    name: props.role.name,
    permissions: [...props.role.permissions],
});

function togglePermission(id: number) {
    const index = form.permissions.indexOf(id);

    if (index > -1) {
        form.permissions.splice(index, 1);
    } else {
        form.permissions.push(id);
    }
}

function isChecked(id: number): boolean {
    return form.permissions.includes(id);
}

function toggleGroup(entityIds: number[], checked: boolean) {
    if (checked) {
        for (const id of entityIds) {
            if (!form.permissions.includes(id)) {
                form.permissions.push(id);
            }
        }
    } else {
        form.permissions = form.permissions.filter((id) => !entityIds.includes(id));
    }
}

function isGroupChecked(entityIds: number[]): boolean {
    return entityIds.length > 0 && entityIds.every((id) => form.permissions.includes(id));
}

function isGroupPartiallyChecked(entityIds: number[]): boolean {
    const checked = entityIds.filter((id) => form.permissions.includes(id));
    return checked.length > 0 && checked.length < entityIds.length;
}

interface PermissionGroup {
    entity: string;
    label: string;
    actions: { action: string; id: number }[];
    ids: number[];
}

const permissionGroups = computed<PermissionGroup[]>(() => {
    const groups: Record<string, PermissionGroup> = {};

    const entityLabels: Record<string, string> = {
        users: 'Users',
        roles: 'Roles',
        permissions: 'Permissions',
        masjids: 'Masjid',
        reks: 'Rekening',
        'sub-reks': 'Sub Rekening',
        rekenings: 'Detail Rekening',
        programs: 'Program',
        kegiatans: 'Kegiatan',
        transaksis: 'Transaksi',
        trensaksis: 'Trensaksi',
        jamaahs: 'Data Jamaah',
        'imam-masjids': 'Imam & Badal',
        'mutiara-images': 'Gambar Mutiara',
        'running-texts': 'Running Text',
        kajians: 'Kajian',
        pekurbans: 'Pekurban',
        'jadwal-imams': 'Jadwal Imam',
        khotbahs: 'Khotib Jumat',
        'laporan-buku-besar': 'Lap. Buku Besar',
        'laporan-neraca': 'Lap. Neraca',
        'validasi-buku-besar': 'Validasi Buku Besar',
        'monitor-configs': 'Config Monitor',
        'hijri-holidays': 'Hari Besar Islam',
        'file-explorer': 'File Manager',
    };

    const sorted = [...props.permissions].sort((a, b) => {
        const aIsManage = a.name.startsWith('manage-') ? 0 : 1;
        const bIsManage = b.name.startsWith('manage-') ? 0 : 1;
        if (aIsManage !== bIsManage) return aIsManage - bIsManage;
        return a.name.localeCompare(b.name);
    });

    for (const perm of sorted) {
        const parts = perm.name.split('-');
        const action = parts[0];
        const entity = parts.slice(1).join('-');

        if (!groups[entity]) {
            groups[entity] = {
                entity,
                label: entityLabels[entity] || entity,
                actions: [],
                ids: [],
            };
        }

        groups[entity].actions.push({ action, id: perm.id });
        groups[entity].ids.push(perm.id);
    }

    const manageEntities = ['users', 'roles', 'permissions'];
    const result = Object.values(groups);

    result.sort((a, b) => {
        const aIdx = manageEntities.indexOf(a.entity);
        const bIdx = manageEntities.indexOf(b.entity);
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
        return a.label.localeCompare(b.label);
    });

    return result;
});

function actionLabel(action: string): string {
    const labels: Record<string, string> = {
        manage: 'Lihat',
        create: 'Tambah',
        edit: 'Ubah',
        delete: 'Hapus',
    };
    return labels[action] || action;
}

function actionColor(action: string): string {
    const colors: Record<string, string> = {
        manage: 'bg-slate-100 text-slate-700 border-slate-200',
        create: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        edit: 'bg-blue-50 text-blue-700 border-blue-200',
        delete: 'bg-red-50 text-red-700 border-red-200',
    };
    return colors[action] || 'bg-slate-100 text-slate-700';
}

function submit() {
    form.put(`/roles/${props.role.id}`);
}
</script>

<template>
    <Head :title="`Edit Role - ${role.name}`" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card class="mx-auto w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Edit Role</CardTitle>
                <CardDescription>Perbarui data role <strong>{{ role.name }}</strong>.</CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="space-y-2">
                        <Label for="name">Nama Role</Label>
                        <Input id="name" v-model="form.name" type="text" placeholder="Nama role" />
                        <p v-if="form.errors.name" class="text-destructive text-sm">{{ form.errors.name }}</p>
                    </div>

                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <Label class="text-base font-semibold">Permissions</Label>
                            <Badge variant="outline" class="text-xs">
                                {{ form.permissions.length }} dipilih
                            </Badge>
                        </div>

                        <div v-if="permissionGroups.length > 0" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card v-for="group in permissionGroups" :key="group.entity"
                                class="overflow-hidden border transition-shadow hover:shadow-sm">
                                <div
                                    class="flex items-center justify-between border-b bg-muted/30 px-4 py-2.5">
                                    <Label class="text-sm font-bold capitalize">{{ group.label }}</Label>
                                    <Button type="button" variant="ghost" size="icon"
                                                class="h-6 w-6"
                                                title="Pilih semua / hapus semua"
                                                @click="toggleGroup(group.ids, !isGroupChecked(group.ids))">
                                                <ShieldCheck v-if="isGroupChecked(group.ids)"
                                                    class="h-3.5 w-3.5 text-emerald-600" />
                                                <ShieldOff v-else
                                                    class="h-3.5 w-3.5 text-muted-foreground" />
                                            </Button>
                                </div>

                                <CardContent class="space-y-2 p-3">
                                    <div v-for="item in group.actions" :key="item.id"
                                        class="flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-accent/50">
                                        <Checkbox :id="`perm-${item.id}`"
                                            :model-value="isChecked(item.id)"
                                            @update:model-value="togglePermission(item.id)" />
                                        <Label :for="`perm-${item.id}`"
                                            class="flex cursor-pointer items-center gap-2 text-sm font-normal">
                                            <span class="inline-block rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                                                :class="actionColor(item.action)">
                                                {{ actionLabel(item.action) }}
                                            </span>
                                        </Label>
                                    </div>

                                    <div v-if="group.actions.length === 0" class="py-2 text-center text-xs text-muted-foreground">
                                        Tidak ada permission
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <p v-else class="text-muted-foreground text-sm">Belum ada permission.</p>
                    </div>

                    <div class="flex items-center gap-3 border-t pt-4">
                        <Button type="submit" :disabled="form.processing" class="gap-2">
                            <Save class="h-4 w-4" />
                            Simpan
                        </Button>
                        <Button variant="outline" as-child class="gap-2">
                            <Link href="/roles">
                                <ArrowLeft class="h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
