<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { CheckCircle2, Edit, Mic2, Plus, Trash2, XCircle } from 'lucide-vue-next';
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

interface KajianItem {
    id: number;
    judul: string;
    pemateri: string;
    tanggal: string;
    waktu: string | null;
    tempat: string | null;
    deskripsi: string | null;
    is_active: boolean;
    created_at: string;
}

defineProps<{
    kajians: KajianItem[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Kajian', href: '/kajians' }],
    },
});

const showDeleteDialog = ref(false);
const itemToDelete = ref<KajianItem | null>(null);

function confirmDelete(item: KajianItem) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) {
        return;
    }

    router.delete(`/kajians/${itemToDelete.value.id}`, {
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
    <Head title="Kajian" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <Mic2 class="h-5 w-5" />
                            Daftar Kajian
                        </CardTitle>
                        <CardDescription>
                            Kelola jadwal kajian masjid yang ditampilkan di Beranda.
                        </CardDescription>
                    </div>
                    <Button as-child class="gap-2">
                        <Link href="/kajians/create">
                            <Plus class="h-4 w-4" />
                            Tambah
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div class="overflow-x-auto rounded-lg border">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b bg-muted/50">
                                <th class="w-12 px-4 py-3 text-left font-semibold">No</th>
                                <th class="px-4 py-3 text-left font-semibold">Judul</th>
                                <th class="px-4 py-3 text-left font-semibold">Pemateri</th>
                                <th class="px-4 py-3 text-left font-semibold">Tanggal</th>
                                <th class="px-4 py-3 text-left font-semibold">Waktu</th>
                                <th class="px-4 py-3 text-left font-semibold">Tempat</th>
                                <th class="w-28 px-4 py-3 text-center font-semibold">Status</th>
                                <th class="w-32 px-4 py-3 text-center font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in kajians"
                                :key="item.id"
                                class="border-b transition-colors hover:bg-muted/30"
                            >
                                <td class="px-4 py-3">{{ index + 1 }}</td>
                                <td class="px-4 py-3 font-medium">{{ item.judul }}</td>
                                <td class="px-4 py-3">{{ item.pemateri }}</td>
                                <td class="px-4 py-3 text-muted-foreground">{{ formatDate(item.tanggal) }}</td>
                                <td class="px-4 py-3 text-muted-foreground">{{ item.waktu ?? '-' }}</td>
                                <td class="px-4 py-3 text-muted-foreground">{{ item.tempat ?? '-' }}</td>
                                <td class="px-4 py-3 text-center">
                                    <Badge
                                        :class="
                                            item.is_active
                                                ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                                : 'bg-slate-200 text-slate-700 hover:bg-slate-200'
                                        "
                                        class="gap-1"
                                    >
                                        <CheckCircle2 v-if="item.is_active" class="h-3 w-3" />
                                        <XCircle v-else class="h-3 w-3" />
                                        {{ item.is_active ? 'Aktif' : 'Nonaktif' }}
                                    </Badge>
                                </td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center justify-center gap-2">
                                        <Button
                                            size="icon"
                                            as-child
                                            class="h-9 w-9 bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                                        >
                                            <Link :href="`/kajians/${item.id}/edit`">
                                                <Edit class="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            type="button"
                                            size="icon"
                                            class="h-9 w-9 bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                                            @click="confirmDelete(item)"
                                        >
                                            <Trash2 class="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="kajians.length === 0">
                                <td colspan="8" class="px-4 py-8 text-center text-muted-foreground">
                                    Belum ada kajian.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        <Dialog v-model:open="showDeleteDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Kajian</DialogTitle>
                    <DialogDescription>
                        Yakin ingin menghapus kajian
                        <strong>{{ itemToDelete?.judul }}</strong>? Tindakan ini tidak dapat dibatalkan.
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
