<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { BookText, Edit, Plus, Trash2 } from 'lucide-vue-next';
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

const { can } = useCan();

interface RekData {
    kode: string;
    nama: string;
}

interface SubRekData {
    id: number;
    kode: string;
    kelompok: string;
    nama: string;
}

interface RekeningItem {
    id: number;
    rek_id: string;
    sub_rek_id: number;
    akun: string;
    kelompok: string;
    jenis: string;
    nama: string;
    created_at: string;
}

const props = defineProps<{
    rek: RekData;
    subRek: SubRekData;
    rekenings: RekeningItem[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Rekening',
                href: '/reks',
            },
            {
                title: 'Sub Rekening',
                href: '#',
            },
            {
                title: 'Rincian',
                href: '#',
            },
        ],
    },
});

const showDeleteDialog = ref(false);
const itemToDelete = ref<RekeningItem | null>(null);

function confirmDelete(item: RekeningItem) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) {
        return;
    }

    router.delete(`/reks/${props.rek.kode}/sub-reks/${props.subRek.id}/rekenings/${itemToDelete.value.id}`, {
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

    <Head :title="`Rekening - ${subRek.kelompok} ${subRek.nama}`" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <BookText class="h-5 w-5" />
                            Rekening: {{ subRek.kelompok }} - {{ subRek.nama }}
                        </CardTitle>
                        <CardDescription>
                            Rincian rekening di bawah sub rekening <strong>{{ subRek.kelompok }} - {{ subRek.nama
                            }}</strong>.
                        </CardDescription>
                    </div>
                    <div class="flex items-center gap-2">
                        <Button variant="outline" as-child class="gap-2">
                            <Link :href="`/reks/${rek.kode}/sub-reks`">
                                Kembali
                            </Link>
                        </Button>
                        <Button as-child class="gap-2" v-if="can('create-rekenings')">
                            <Link :href="`/reks/${rek.kode}/sub-reks/${subRek.id}/rekenings/create`">
                                <Plus class="h-4 w-4" />
                                Tambah Rekening
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div class="overflow-x-auto rounded-lg border">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="bg-muted/50 border-b">
                                <th class="px-4 py-3 text-left font-semibold">Jenis</th>
                                <th class="px-4 py-3 text-left font-semibold">Nama</th>
                                <th class="px-4 py-3 text-left font-semibold">Tgl Dibuat</th>
                                <th class="px-4 py-3 text-center font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in rekenings" :key="item.id"
                                class="border-b transition-colors last:border-0 hover:bg-muted/30">
                                <td class="px-4 py-3 font-mono font-medium">{{ item.jenis }}</td>
                                <td class="px-4 py-3">{{ item.nama }}</td>
                                <td class="text-muted-foreground px-4 py-3">{{ formatDate(item.created_at) }}</td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center justify-end gap-2">
                                        <Button variant="outline" size="sm" as-child class="gap-1"
                                            v-if="can('edit-rekenings')">
                                            <Link :href="`/mapping-rekenings/${item.id}/edit`">
                                                <Edit class="h-3.5 w-3.5" />
                                                Mapping
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" as-child class="gap-1"
                                            v-if="can('edit-rekenings')">
                                            <Link
                                                :href="`/reks/${rek.kode}/sub-reks/${subRek.id}/rekenings/${item.id}/edit`">
                                                <Edit class="h-3.5 w-3.5" />
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button variant="destructive" size="sm" class="gap-1"
                                            v-if="can('delete-rekenings')"
                                            @click="confirmDelete(item)">
                                            <Trash2 class="h-3.5 w-3.5" />
                                            Hapus
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="rekenings.length === 0">
                                <td colspan="4" class="text-muted-foreground px-4 py-8 text-center">
                                    Belum ada rekening terdaftar.
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
                    <DialogTitle>Hapus Rekening</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus rekening <strong>{{ itemToDelete?.jenis }} - {{
                            itemToDelete?.nama }}</strong>?
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
