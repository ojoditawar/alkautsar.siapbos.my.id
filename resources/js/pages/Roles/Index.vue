<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { Edit, Plus, Shield, Trash2 } from 'lucide-vue-next';
import { ref } from 'vue';
import { useCan } from '@/composables/useCan';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const { can } = useCan();
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
    created_at: string;
}

defineProps<{
    roles: Role[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Roles',
                href: '/roles',
            },
        ],
    },
});

const showDeleteDialog = ref(false);
const itemToDelete = ref<Role | null>(null);

function confirmDelete(item: Role) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) {
        return;
    }

    router.delete(`/roles/${itemToDelete.value.id}`, {
        onFinish: () => {
            showDeleteDialog.value = false;
            itemToDelete.value = null;
        },
    });
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
</script>

<template>

    <Head title="Roles" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <Shield class="h-5 w-5" />
                            Daftar Role
                        </CardTitle>
                        <CardDescription>
                            Kelola role dan permissions yang tersedia di sistem.
                        </CardDescription>
                    </div>
                    <Button v-if="can('create-roles')" as-child class="gap-2">
                        <Link href="/roles/create">
                            <Plus class="h-4 w-4" />
                            Tambah Role
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div class="overflow-x-auto rounded-lg border">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="bg-muted/50 border-b">
                                <th class="px-4 py-3 text-left font-semibold">No</th>
                                <th class="px-4 py-3 text-left font-semibold">Nama Role</th>
                                <th class="px-4 py-3 text-left font-semibold">Permissions</th>
                                <th class="px-4 py-3 text-left font-semibold">Tgl Dibuat</th>
                                <th class="px-4 py-3 text-center font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(role, index) in roles" :key="role.id"
                                class="border-b transition-colors last:border-0 hover:bg-muted/30">
                                <td class="text-muted-foreground px-4 py-3">{{ index + 1 }}</td>
                                <td class="px-4 py-3 font-medium">{{ role.name }}</td>
                                <td class="px-4 py-3">
                                    <div class="flex flex-wrap gap-1">
                                        <Badge v-for="perm in role.permissions" :key="perm.id" variant="secondary" class="text-xs">
                                            {{ perm.name }}
                                        </Badge>
                                        <span v-if="role.permissions.length === 0" class="text-muted-foreground text-xs">-</span>
                                    </div>
                                </td>
                                <td class="text-muted-foreground px-4 py-3">{{ formatDate(role.created_at) }}</td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center justify-end gap-2">
                                        <Button v-if="can('edit-roles')" variant="outline" size="sm" as-child class="gap-1">
                                            <Link :href="`/roles/${role.id}/edit`">
                                                <Edit class="h-3.5 w-3.5" />
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button v-if="can('delete-roles')" variant="destructive" size="sm" class="gap-1"
                                            @click="confirmDelete(role)">
                                            <Trash2 class="h-3.5 w-3.5" />
                                            Hapus
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="roles.length === 0">
                                <td colspan="5" class="text-muted-foreground px-4 py-8 text-center">
                                    Belum ada role terdaftar.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        <!-- Delete Confirmation Dialog -->
        <Dialog v-if="can('delete-roles')" v-model:open="showDeleteDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Role</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus role <strong>{{ itemToDelete?.name }}</strong>?
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
