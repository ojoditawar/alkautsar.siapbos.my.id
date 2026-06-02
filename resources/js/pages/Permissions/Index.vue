<script setup lang="ts">
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { Edit, KeyRound, Plus, ShieldCheck, Trash2, X } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useCan } from '@/composables/useCan';
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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const { can } = useCan();

interface Permission {
    id: number;
    name: string;
    created_at: string;
}

const props = defineProps<{
    permissions: Permission[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Permissions',
                href: '/permissions',
            },
        ],
    },
});

// Group permissions by entity
interface PermissionGroup {
    entity: string;
    label: string;
    items: { id: number; name: string; action: string }[];
}

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

const actionLabels: Record<string, string> = {
    manage: 'Lihat',
    create: 'Tambah',
    edit: 'Ubah',
    delete: 'Hapus',
};

const actionColors: Record<string, string> = {
    manage: 'bg-slate-100 text-slate-700 border-slate-200',
    create: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    edit: 'bg-blue-50 text-blue-700 border-blue-200',
    delete: 'bg-red-50 text-red-700 border-red-200',
};

const permissionGroups = computed<PermissionGroup[]>(() => {
    const groups: Record<string, PermissionGroup> = {};

    for (const perm of props.permissions) {
        const parts = perm.name.split('-');
        const action = parts[0];
        const entity = parts.slice(1).join('-');

        if (!groups[entity]) {
            groups[entity] = {
                entity,
                label: entityLabels[entity] || entity,
                items: [],
            };
        }

        groups[entity].items.push({
            id: perm.id,
            name: perm.name,
            action,
        });
    }

    // Sort entities
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

    // Sort items within each group: manage, create, edit, delete
    const actionOrder = ['manage', 'create', 'edit', 'delete'];
    for (const group of result) {
        group.items.sort((a, b) => actionOrder.indexOf(a.action) - actionOrder.indexOf(b.action));
    }

    return result;
});

const totalPermissionCount = computed(() => props.permissions.length);
const totalEntityCount = computed(() => permissionGroups.value.length);

// Delete dialog
const showDeleteDialog = ref(false);
const itemToDelete = ref<Permission | null>(null);

function confirmDelete(item: Permission) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) return;

    router.delete(`/permissions/${itemToDelete.value.id}`, {
        onFinish: () => {
            showDeleteDialog.value = false;
            itemToDelete.value = null;
        },
    });
}

// Add dialog
const showAddDialog = ref(false);
const addForm = useForm({
    name: '',
});

// Build list of existing entities for quick-add suggestions
const existingEntities = computed(() => {
    return permissionGroups.value.map((g) => g.entity).sort();
});

function openAddDialog() {
    addForm.name = '';
    showAddDialog.value = true;
}

function submitAdd() {
    addForm.post('/permissions', {
        onSuccess: () => {
            showAddDialog.value = false;
            addForm.reset();
        },
    });
}
</script>

<template>
    <Head title="Permissions" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <!-- Header Stats -->
        <div class="flex items-center justify-between">
            <div>
                <h1 class="flex items-center gap-2 text-2xl font-bold">
                    <KeyRound class="h-6 w-6" />
                    Permissions
                </h1>
                <p class="text-muted-foreground mt-1 text-sm">
                    {{ totalEntityCount }} entitas · {{ totalPermissionCount }} permission
                </p>
            </div>
            <Button v-if="can('create-permissions')" class="gap-2" @click="openAddDialog">
                <Plus class="h-4 w-4" />
                Tambah Permission
            </Button>
        </div>

        <!-- Grouped Cards Grid -->
        <div v-if="permissionGroups.length > 0" class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <Card v-for="group in permissionGroups" :key="group.entity"
                class="overflow-hidden border transition-shadow hover:shadow-sm">
                <CardHeader class="border-b bg-muted/30 px-4 py-3">
                    <div class="flex items-center justify-between">
                        <CardTitle class="text-sm font-bold capitalize">
                            {{ group.label }}
                        </CardTitle>
                        <Badge variant="outline" class="text-xs">
                            {{ group.items.length }}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent class="space-y-1.5 p-3">
                    <div v-for="item in group.items" :key="item.id"
                        class="group flex items-center justify-between rounded-md px-2 py-1.5 transition-colors hover:bg-accent/50">
                        <div class="flex items-center gap-2">
                            <span class="inline-block rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                                :class="actionColors[item.action] || 'bg-slate-100 text-slate-700'">
                                {{ actionLabels[item.action] || item.action }}
                            </span>
                        </div>
                        <div class="flex items-center gap-1">
                            <Button v-if="can('edit-permissions')" variant="ghost" size="icon"
                                class="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                :title="`Edit ${item.name}`" as-child>
                                <Link :href="`/permissions/${item.id}/edit`">
                                    <Edit class="h-3 w-3" />
                                </Link>
                            </Button>
                            <Button v-if="can('delete-permissions')" variant="ghost" size="icon"
                                class="h-6 w-6 text-destructive opacity-0 transition-opacity group-hover:opacity-100"
                                title="Hapus" @click="confirmDelete(item)">
                                <X class="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                    <div v-if="group.items.length === 0" class="py-4 text-center text-xs text-muted-foreground">
                        Belum ada permission
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-20 text-center">
            <KeyRound class="text-muted-foreground mb-4 h-12 w-12" />
            <h3 class="mb-1 text-lg font-semibold">Belum ada permission</h3>
            <p class="text-muted-foreground mb-6 text-sm">
                Permission digunakan untuk mengatur akses user di dalam sistem.
            </p>
            <Button v-if="can('create-permissions')" class="gap-2" @click="openAddDialog">
                <Plus class="h-4 w-4" />
                Tambah Permission Pertama
            </Button>
        </div>

        <!-- Add Permission Dialog -->
        <Dialog v-model:open="showAddDialog">
            <DialogContent class="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tambah Permission Baru</DialogTitle>
                    <DialogDescription>
                        Masukkan nama permission sesuai format: <code class="bg-muted rounded px-1 py-0.5 text-xs">action-entity</code>
                    </DialogDescription>
                </DialogHeader>

                <form @submit.prevent="submitAdd" class="space-y-4">
                    <div class="space-y-2">
                        <Label for="new-perm-name">Nama Permission</Label>
                        <Input id="new-perm-name" v-model="addForm.name" type="text"
                            placeholder="Contoh: manage-zakat, create-zakat, edit-zakat, delete-zakat"
                            class="font-mono text-sm" />
                        <p v-if="addForm.errors.name" class="text-destructive text-sm">{{ addForm.errors.name }}</p>
                    </div>

                    <!-- Quick templates -->
                    <div class="space-y-2">
                        <Label class="text-xs text-muted-foreground">Template cepat (klik untuk isi)</Label>
                        <div class="flex flex-wrap gap-1.5">
                            <button type="button" v-for="action in ['manage', 'create', 'edit', 'delete']" :key="action"
                                class="rounded border px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors hover:bg-accent"
                                :class="actionColors[action]"
                                @click="addForm.name = `${action}-`">
                                {{ actionLabels[action] }}
                            </button>
                        </div>
                    </div>

                    <DialogFooter class="gap-2 pt-2">
                        <DialogClose as-child>
                            <Button type="button" variant="outline">Batal</Button>
                        </DialogClose>
                        <Button type="submit" :disabled="addForm.processing" class="gap-2">
                            <ShieldCheck class="h-4 w-4" />
                            Simpan
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

        <!-- Delete Dialog -->
        <Dialog v-model:open="showDeleteDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Permission</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus permission <strong>{{ itemToDelete?.name }}</strong>?
                        Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">Batal</Button>
                    </DialogClose>
                    <Button variant="destructive" @click="deleteItem">Hapus</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
