<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import {
    Edit,
    Eye,
    Image as ImageIcon,
    Plus,
    Trash2,
    ToggleLeft,
    ToggleRight,
} from 'lucide-vue-next';
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

interface MutiaraImageItem {
    id: number;
    masjid_id: string;
    image: string;
    caption: string | null;
    is_active: boolean;
    order: number;
    created_at: string;
}

const props = defineProps<{
    images: MutiaraImageItem[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Kata-kata Mutiara', href: '/mutiara-images' }],
    },
});

const showDeleteDialog = ref(false);
const itemToDelete = ref<MutiaraImageItem | null>(null);
const showPreviewDialog = ref(false);
const previewItem = ref<MutiaraImageItem | null>(null);

function getImageUrl(image: string): string {
    return `/storage/${image}`;
}

function confirmDelete(item: MutiaraImageItem) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) return;

    router.delete(`/mutiara-images/${itemToDelete.value.id}`, {
        onFinish: () => {
            showDeleteDialog.value = false;
            itemToDelete.value = null;
        },
    });
}

function showPreview(item: MutiaraImageItem) {
    previewItem.value = item;
    showPreviewDialog.value = true;
}

function toggleActive(item: MutiaraImageItem) {
    router.put(
        `/mutiara-images/${item.id}`,
        {
            is_active: !item.is_active,
            caption: item.caption,
            order: item.order,
            _method: 'put',
        },
        {
            preserveScroll: true,
        },
    );
}
</script>

<template>
    <Head title="Gambar Mutiara" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <ImageIcon class="h-5 w-5" />
                            Kumpulan Kata-kata Mutiara
                        </CardTitle>
                        <CardDescription>
                            Kelola Kata-kata Mutiara untuk tampilan monitor masjid.
                        </CardDescription>
                    </div>
                    <div class="flex gap-2">
                        <Button v-if="can('create-mutiara-images')" as-child class="gap-2">
                            <Link href="/mutiara-images/create">
                                <Plus class="h-4 w-4" />
                                Tambah Gambar
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div v-if="images.length === 0" class="py-12 text-center text-sm text-muted-foreground">
                    Belum ada gambar. Klik "Tambah Gambar" untuk menambahkan.
                </div>

                <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div v-for="item in images" :key="item.id"
                        class="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
                        <!-- Image -->
                        <div class="relative h-48 w-full cursor-pointer overflow-hidden bg-muted" @click="showPreview(item)">
                            <img :src="getImageUrl(item.image)" :alt="item.caption || 'Gambar Mutiara'"
                                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>

                        <!-- Caption & Order -->
                        <div class="space-y-1 p-3">
                            <p class="truncate text-sm font-medium">
                                {{ item.caption || '(tanpa caption)' }}
                            </p>
                            <div class="flex items-center justify-between">
                                <span class="text-xs text-muted-foreground">
                                    Urutan: {{ item.order }}
                                </span>
                                <span class="text-xs text-muted-foreground">
                                    {{ item.is_active ? 'Aktif' : 'Nonaktif' }}
                                </span>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="flex items-center justify-between border-t px-3 py-2">
                            <Button variant="ghost" size="sm" class="gap-1 text-xs"
                                @click="toggleActive(item)">
                                <ToggleRight v-if="item.is_active" class="h-3.5 w-3.5 text-green-600" />
                                <ToggleLeft v-else class="h-3.5 w-3.5 text-muted-foreground" />
                                {{ item.is_active ? 'Aktif' : 'Nonaktif' }}
                            </Button>
                            <div class="flex gap-1">
                                <Button variant="ghost" size="icon" class="h-8 w-8" title="Preview"
                                    @click="showPreview(item)">
                                    <Eye class="h-4 w-4" />
                                </Button>
                                <Button v-if="can('edit-mutiara-images')" variant="ghost" size="icon" class="h-8 w-8" title="Edit" as-child>
                                    <Link :href="`/mutiara-images/${item.id}/edit`">
                                        <Edit class="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button v-if="can('delete-mutiara-images')" variant="ghost" size="icon" class="h-8 w-8 text-destructive hover:text-destructive"
                                    title="Hapus" @click="confirmDelete(item)">
                                    <Trash2 class="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>

    <!-- Preview Dialog -->
    <Dialog v-model:open="showPreviewDialog">
        <DialogContent class="w-full max-w-3xl">
            <DialogHeader>
                <DialogTitle>{{ previewItem?.caption || 'Preview Gambar' }}</DialogTitle>
                <DialogDescription v-if="previewItem">
                    Urutan: {{ previewItem.order }} &middot;
                    {{ previewItem.is_active ? 'Aktif' : 'Nonaktif' }}
                </DialogDescription>
            </DialogHeader>
            <div v-if="previewItem" class="flex items-center justify-center">
                <img :src="getImageUrl(previewItem.image)" :alt="previewItem.caption || 'Gambar Mutiara'"
                    class="max-h-[70vh] w-full rounded-lg object-contain" />
            </div>
            <DialogFooter>
                <DialogClose as-child>
                    <Button variant="outline">Tutup</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>

    <!-- Delete Dialog -->
    <Dialog v-if="can('delete-mutiara-images')" v-model:open="showDeleteDialog">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Hapus Gambar</DialogTitle>
                <DialogDescription>
                    Apakah Anda yakin ingin menghapus gambar
                    <strong>{{ itemToDelete?.caption || '(tanpa caption)' }}</strong>?
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
</template>
