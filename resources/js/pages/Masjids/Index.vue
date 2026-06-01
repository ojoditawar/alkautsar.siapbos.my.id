<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { Edit, Landmark, Plus, Trash2 } from 'lucide-vue-next';
import { ref } from 'vue';
import { useCan } from '@/composables/useCan';
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

interface Masjid {
    id: string;
    nama: string;
    alamat: string | null;
    image: string | null;
    created_at: string;
}

defineProps<{
    masjids: Masjid[];
}>();

const { can } = useCan();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Masjid',
                href: '/masjids',
            },
        ],
    },
});

const showDeleteDialog = ref(false);
const masjidToDelete = ref<Masjid | null>(null);

function confirmDelete(masjid: Masjid) {
    masjidToDelete.value = masjid;
    showDeleteDialog.value = true;
}

function deleteMasjid() {
    if (!masjidToDelete.value) {
        return;
    }

    router.delete(`/masjids/${masjidToDelete.value.id}`, {
        onFinish: () => {
            showDeleteDialog.value = false;
            masjidToDelete.value = null;
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

    <Head title="Masjid" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <Landmark class="h-5 w-5" />
                            Daftar Masjid
                        </CardTitle>
                        <CardDescription>
                            Kelola semua data masjid yang terdaftar di sistem.
                        </CardDescription>
                    </div>
                    <Button as-child class="gap-2" v-if="can('create-masjids')">
                        <Link href="/masjids/create">
                            <Plus class="h-4 w-4" />
                            Tambah Masjid
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
                                <th class="px-4 py-3 text-left font-semibold">Gambar</th>
                                <th class="px-4 py-3 text-left font-semibold">Nama</th>
                                <th class="px-4 py-3 text-left font-semibold">Alamat</th>
                                <th class="px-4 py-3 text-left font-semibold">Tgl Dibuat</th>
                                <th class="px-4 py-3 text-center font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(masjid, index) in masjids" :key="masjid.id"
                                class="border-b transition-colors last:border-0 hover:bg-muted/30">
                                <td class="text-muted-foreground px-4 py-3">{{ index + 1 }}</td>
                                <td class="px-4 py-3">
                                    <img v-if="masjid.image" :src="'/' + masjid.image" :alt="masjid.nama"
                                        class="h-12 w-16 rounded-md border object-cover" />
                                    <span v-else class="text-muted-foreground text-xs">-</span>
                                </td>
                                <td class="px-4 py-3 font-medium">{{ masjid.nama }}</td>
                                <td class="text-muted-foreground px-4 py-3">{{ masjid.alamat || '-' }}</td>
                                <td class="text-muted-foreground px-4 py-3">{{ formatDate(masjid.created_at) }}</td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center justify-end gap-2">
                                        <Button variant="outline" size="sm" as-child class="gap-1" v-if="can('edit-masjids')">
                                            <Link :href="`/masjids/${masjid.id}/edit`">
                                                <Edit class="h-3.5 w-3.5" />
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button variant="destructive" size="sm" class="gap-1" v-if="can('delete-masjids')"
                                            @click="confirmDelete(masjid)">
                                            <Trash2 class="h-3.5 w-3.5" />
                                            Hapus
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="masjids.length === 0">
                                <td colspan="6" class="text-muted-foreground px-4 py-8 text-center">
                                    Belum ada masjid terdaftar.
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
                    <DialogTitle>Hapus Masjid</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus masjid <strong>{{ masjidToDelete?.nama }}</strong>?
                        Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">Batal</Button>
                    </DialogClose>
                    <Button variant="destructive" @click="deleteMasjid">Hapus</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
