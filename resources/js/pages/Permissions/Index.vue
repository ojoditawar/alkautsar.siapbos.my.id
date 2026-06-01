<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { Edit, KeyRound, Plus, Trash2 } from 'lucide-vue-next';
import { ref } from 'vue';
import { useCan } from '@/composables/useCan';
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
    created_at: string;
}

defineProps<{
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

const showDeleteDialog = ref(false);
const itemToDelete = ref<Permission | null>(null);

function confirmDelete(item: Permission) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) {
        return;
    }

    router.delete(`/permissions/${itemToDelete.value.id}`, {
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

    <Head title="Permissions" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <KeyRound class="h-5 w-5" />
                            Daftar Permission
                        </CardTitle>
                        <CardDescription>
                            Kelola semua permission yang tersedia di sistem.
                        </CardDescription>
                    </div>
                    <Button v-if="can('create-permissions')" as-child class="gap-2">
                        <Link href="/permissions/create">
                            <Plus class="h-4 w-4" />
                            Tambah Permission
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
                                <th class="px-4 py-3 text-left font-semibold">Nama Permission</th>
                                <th class="px-4 py-3 text-left font-semibold">Tgl Dibuat</th>
                                <th class="px-4 py-3 text-center font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(perm, index) in permissions" :key="perm.id"
                                class="border-b transition-colors last:border-0 hover:bg-muted/30">
                                <td class="text-muted-foreground px-4 py-3">{{ index + 1 }}</td>
                                <td class="px-4 py-3 font-medium">{{ perm.name }}</td>
                                <td class="text-muted-foreground px-4 py-3">{{ formatDate(perm.created_at) }}</td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center justify-end gap-2">
                                        <Button v-if="can('edit-permissions')" variant="outline" size="sm" as-child class="gap-1">
                                            <Link :href="`/permissions/${perm.id}/edit`">
                                                <Edit class="h-3.5 w-3.5" />
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button v-if="can('delete-permissions')" variant="destructive" size="sm" class="gap-1"
                                            @click="confirmDelete(perm)">
                                            <Trash2 class="h-3.5 w-3.5" />
                                            Hapus
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="permissions.length === 0">
                                <td colspan="4" class="text-muted-foreground px-4 py-8 text-center">
                                    Belum ada permission terdaftar.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        <!-- Delete Confirmation Dialog -->
        <Dialog v-if="can('delete-permissions')" v-model:open="showDeleteDialog">
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
