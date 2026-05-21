<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { Edit, Plus, Trash2, Users } from 'lucide-vue-next';
import { ref } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

interface User {
    id: number;
    name: string;
    email: string;
    masjid_id: string | null;
    masjid?: { id: string; nama: string } | null;
    roles?: { id: number; name: string }[];
    created_at: string;
}

defineProps<{
    users: User[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Users',
                href: '/users',
            },
        ],
    },
});

const showDeleteDialog = ref(false);
const userToDelete = ref<User | null>(null);

function confirmDelete(user: User) {
    userToDelete.value = user;
    showDeleteDialog.value = true;
}

function deleteUser() {
    if (!userToDelete.value) {
        return;
    }

    router.delete(`/users/${userToDelete.value.id}`, {
        onFinish: () => {
            showDeleteDialog.value = false;
            userToDelete.value = null;
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

    <Head title="Users" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <Users class="h-5 w-5" />
                            Daftar User
                        </CardTitle>
                        <CardDescription>
                            Kelola semua user yang terdaftar di sistem.
                        </CardDescription>
                    </div>
                    <Button as-child class="gap-2">
                        <Link href="/users/create">
                            <Plus class="h-4 w-4" />
                            Tambah User
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
                                <th class="px-4 py-3 text-left font-semibold">Nama</th>
                                <th class="px-4 py-3 text-left font-semibold">Email</th>
                                <th class="px-4 py-3 text-left font-semibold">Tgl Dibuat</th>
                                <th class="px-4 py-3 text-left font-semibold">Masjid</th>
                                <th class="px-4 py-3 text-left font-semibold">Role</th>
                                <th class="px-4 py-3 text-center font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="user.id"
                                class="border-b transition-colors last:border-0 hover:bg-muted/30">
                                <td class="text-muted-foreground px-4 py-3">{{ index + 1 }}</td>
                                <td class="px-4 py-3 font-medium">{{ user.name }}</td>
                                <td class="px-4 py-3">{{ user.email }}</td>
                                <td class="text-muted-foreground px-4 py-3">{{ formatDate(user.created_at) }}</td>
                                <td class="text-muted-foreground px-4 py-3">{{ user.masjid?.nama || '-' }}</td>
                                <td class="px-4 py-3">
                                    <div class="flex flex-wrap gap-1">
                                        <Badge v-for="role in user.roles" :key="role.id" variant="secondary"
                                            class="text-xs">
                                            {{ role.name }}
                                        </Badge>
                                        <span v-if="!user.roles || user.roles.length === 0"
                                            class="text-muted-foreground text-xs">-</span>
                                    </div>
                                </td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center justify-end gap-2">
                                        <Button variant="outline" size="sm" as-child class="gap-1">
                                            <Link :href="`/users/${user.id}/edit`">
                                                <Edit class="h-3.5 w-3.5" />
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button variant="destructive" size="sm" class="gap-1"
                                            @click="confirmDelete(user)">
                                            <Trash2 class="h-3.5 w-3.5" />
                                            Hapus
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="users.length === 0">
                                <td colspan="7" class="text-muted-foreground px-4 py-8 text-center">
                                    Belum ada user terdaftar.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        <!-- Delete Confirmation Dialog -->
        <Dialog v-model:open="showDeleteDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus User</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus user <strong>{{ userToDelete?.name }}</strong>?
                        Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">Batal</Button>
                    </DialogClose>
                    <Button variant="destructive" @click="deleteUser">Hapus</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
