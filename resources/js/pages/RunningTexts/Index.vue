<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { CheckCircle2, Edit, Megaphone, Plus, Trash2, XCircle } from 'lucide-vue-next';
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

interface RunningTextItem {
    id: number;
    text: string;
    is_active: boolean;
    urutan: number;
    created_at: string;
}

defineProps<{
    runningTexts: RunningTextItem[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Running Text', href: '/running-texts' }],
    },
});

const showDeleteDialog = ref(false);
const itemToDelete = ref<RunningTextItem | null>(null);

function confirmDelete(item: RunningTextItem) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) {
        return;
    }

    router.delete(`/running-texts/${itemToDelete.value.id}`, {
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
    <Head title="Running Text" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <Megaphone class="h-5 w-5" />
                            Daftar Running Text
                        </CardTitle>
                        <CardDescription>
                            Pengumuman teks berjalan yang ditampilkan di Dashboard.
                        </CardDescription>
                    </div>
                    <Button v-if="can('create-running-texts')" as-child class="gap-2">
                        <Link href="/running-texts/create">
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
                                <th class="w-20 px-4 py-3 text-center font-semibold">Urutan</th>
                                <th class="px-4 py-3 text-left font-semibold">Teks</th>
                                <th class="w-28 px-4 py-3 text-center font-semibold">Status</th>
                                <th class="w-32 px-4 py-3 text-left font-semibold">Tgl Dibuat</th>
                                <th class="w-32 px-4 py-3 text-center font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in runningTexts"
                                :key="item.id"
                                class="border-b transition-colors hover:bg-muted/30"
                            >
                                <td class="px-4 py-3">{{ index + 1 }}</td>
                                <td class="px-4 py-3 text-center font-mono">{{ item.urutan }}</td>
                                <td class="px-4 py-3">
                                    <p class="line-clamp-2 whitespace-pre-line">{{ item.text }}</p>
                                </td>
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
                                <td class="px-4 py-3 text-muted-foreground">{{ formatDate(item.created_at) }}</td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center justify-center gap-2">
                                        <Button v-if="can('edit-running-texts')"
                                            size="icon"
                                            as-child
                                            class="h-9 w-9 bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                                        >
                                            <Link :href="`/running-texts/${item.id}/edit`">
                                                <Edit class="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button v-if="can('delete-running-texts')"
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
                            <tr v-if="runningTexts.length === 0">
                                <td colspan="6" class="px-4 py-8 text-center text-muted-foreground">
                                    Belum ada running text.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        <Dialog v-if="can('delete-running-texts')" v-model:open="showDeleteDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Running Text</DialogTitle>
                    <DialogDescription>
                        Yakin ingin menghapus teks ini? Tindakan ini tidak dapat dibatalkan.
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
