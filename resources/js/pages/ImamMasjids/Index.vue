<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import {
    Edit,
    Plus,
    Trash2,
    User,
    UserCheck,
    UserX,
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

interface ImamMasjidItem {
    id: number;
    masjid_id: string;
    nama: string;
    foto: string | null;
    jabatan: string;
    tipe: 'utama' | 'cadangan';
    sholat: 'SUBUH' | 'DZUHUR' | 'ASHAR' | 'MAGHRIB' | 'ISYA';
    created_at: string;
}

const props = defineProps<{
    imams: ImamMasjidItem[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Daftar Imam Masjid', href: '/imam-masjids' }],
    },
});

const showDeleteDialog = ref(false);
const itemToDelete = ref<ImamMasjidItem | null>(null);

function confirmDelete(item: ImamMasjidItem) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) return;

    router.delete(`/imam-masjids/${itemToDelete.value.id}`, {
        onFinish: () => {
            showDeleteDialog.value = false;
            itemToDelete.value = null;
        },
    });
}
</script>

<template>
    <Head title="Imam & Badal" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <UserCheck class="h-5 w-5 text-emerald-600" />
                            Daftar Imam & Cadangan (Badal)
                        </CardTitle>
                        <CardDescription>
                            Kelola data Imam Utama dan Imam Cadangan untuk setiap waktu sholat yang ditampilkan di monitor masjid.
                        </CardDescription>
                    </div>
                    <div class="flex gap-2">
                        <Button v-if="can('create-imam-masjids')" as-child class="gap-2 bg-emerald-600 hover:bg-emerald-700">
                            <Link href="/imam-masjids/create">
                                <Plus class="h-4 w-4" />
                                Tambah Imam
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div v-if="imams.length === 0" class="py-12 text-center text-sm text-muted-foreground">
                    Belum ada data Imam. Klik "Tambah Imam" untuk menambahkan.
                </div>

                <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div v-for="item in imams" :key="item.id"
                        class="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
                        
                        <!-- Header with Tipe & Sholat Tags -->
                        <div class="flex items-center justify-between px-3 py-2 border-b bg-slate-50">
                            <span :class="[
                                'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full',
                                item.tipe === 'utama' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            ]">
                                Imam {{ item.tipe }}
                            </span>
                            <span class="text-[10px] font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                {{ item.sholat }}
                            </span>
                        </div>

                        <!-- Image Profile -->
                        <div class="flex items-center justify-center py-6 bg-slate-50/50">
                            <div class="relative h-28 w-28 overflow-hidden rounded-full ring-4" :class="item.tipe === 'utama' ? 'ring-emerald-500/20' : 'ring-amber-500/20'">
                                <img v-if="item.foto" :src="item.foto" :alt="item.nama"
                                    class="h-full w-full object-cover" />
                                <div v-else class="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                                    <User class="h-12 w-12" />
                                </div>
                            </div>
                        </div>

                        <!-- Info details -->
                        <div class="space-y-1 p-3 text-center border-t">
                            <p class="truncate text-sm font-black text-slate-800">
                                {{ item.nama }}
                            </p>
                            <p class="text-xs text-muted-foreground">
                                {{ item.jabatan }}
                            </p>
                        </div>

                        <!-- Actions -->
                        <div class="flex items-center justify-end gap-1 border-t px-3 py-2 bg-slate-50/30">
                            <Button v-if="can('edit-imam-masjids')" variant="ghost" size="icon" class="h-8 w-8 text-slate-600 hover:text-emerald-600" title="Edit" as-child>
                                <Link :href="`/imam-masjids/${item.id}/edit`">
                                    <Edit class="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button v-if="can('delete-imam-masjids')" variant="ghost" size="icon" class="h-8 w-8 text-destructive hover:text-destructive"
                                title="Hapus" @click="confirmDelete(item)">
                                <Trash2 class="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>

    <!-- Delete Dialog -->
    <Dialog v-if="can('delete-imam-masjids')" v-model:open="showDeleteDialog">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Hapus Imam</DialogTitle>
                <DialogDescription>
                    Apakah Anda yakin ingin menghapus data Imam
                    <strong>{{ itemToDelete?.nama }}</strong>?
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
