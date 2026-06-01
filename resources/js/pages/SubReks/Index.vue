<script setup lang="ts">
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { BookText, Edit, Plus, Trash2 } from 'lucide-vue-next';
import { ref, computed } from 'vue';
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

interface SubRek {
    id: number;
    rek_id: string;
    kode: string;
    kelompok: string;
    nama: string;
    created_at: string;
}

const props = defineProps<{
    rek: RekData;
    subReks: SubRek[];
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
        ],
    },
});

const page = usePage();
const deleteError = computed(() => (page.props.errors as Record<string, string>)?.delete);

const showDeleteDialog = ref(false);
const itemToDelete = ref<SubRek | null>(null);

function confirmDelete(item: SubRek) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) {
        return;
    }

    router.delete(`/reks/${props.rek.kode}/sub-reks/${itemToDelete.value.id}`, {
        preserveScroll: true,
        onSuccess: () => {
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

    <Head :title="`Sub Rekening - ${rek.nama}`" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <BookText class="h-5 w-5" />
                            Sub Rekening: {{ rek.kode }} - {{ rek.nama }}
                        </CardTitle>
                        <CardDescription>
                            Kelola sub rekening di bawah rekening <strong>{{ rek.nama }}</strong>.
                        </CardDescription>
                    </div>
                    <div class="flex items-center gap-2">
                        <Button variant="outline" as-child class="gap-2">
                            <Link href="/reks">
                                Kembali
                            </Link>
                        </Button>
                        <Button as-child class="gap-2" v-if="can('create-sub-reks')">
                            <Link :href="`/reks/${rek.kode}/sub-reks/create`">
                                <Plus class="h-4 w-4" />
                                Tambah Sub Rekening
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
                                <th class="px-4 py-3 text-left font-semibold">Kelompok</th>
                                <th class="px-4 py-3 text-left font-semibold">Nama</th>
                                <th class="px-4 py-3 text-left font-semibold">Tgl Dibuat</th>
                                <th class="px-4 py-3 text-center font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in subReks" :key="item.id"
                                class="border-b transition-colors last:border-0 hover:bg-muted/30">
                                <td class="px-4 py-3 font-mono font-medium">{{ item.kelompok }}</td>
                                <td class="px-4 py-3">
                                    <Link :href="`/reks/${rek.kode}/sub-reks/${item.id}/rekenings`"
                                        class="text-primary hover:underline font-medium">
                                        {{ item.nama }}
                                    </Link>
                                </td>
                                <td class="text-muted-foreground px-4 py-3">{{ formatDate(item.created_at) }}</td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center justify-end gap-2">
                                        <Button variant="outline" size="sm" as-child class="gap-1"
                                            v-if="can('edit-sub-reks')">
                                            <Link :href="`/reks/${rek.kode}/sub-reks/${item.id}/edit`">
                                                <Edit class="h-3.5 w-3.5" />
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button variant="destructive" size="sm" class="gap-1"
                                            v-if="can('delete-sub-reks')"
                                            @click="confirmDelete(item)">
                                            <Trash2 class="h-3.5 w-3.5" />
                                            Hapus
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="subReks.length === 0">
                                <td colspan="4" class="text-muted-foreground px-4 py-8 text-center">
                                    Belum ada sub rekening terdaftar.
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
                    <DialogTitle>Hapus Sub Rekening</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus sub rekening <strong>{{ itemToDelete?.kelompok }} - {{
                            itemToDelete?.nama }}</strong>?
                        Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>
                <p v-if="deleteError"
                    class="text-destructive text-sm rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                    {{ deleteError }}
                </p>
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
