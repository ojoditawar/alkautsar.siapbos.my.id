<script setup lang="ts">
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { BookText, Edit, Plus, Printer, Trash2 } from 'lucide-vue-next';
import { ref, computed } from 'vue';
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

interface Rek {
    kode: string;
    nama: string;
    created_at: string;
}

defineProps<{
    reks: Rek[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Rekening',
                href: '/reks',
            },
        ],
    },
});

const page = usePage();
const deleteError = computed(() => (page.props.errors as Record<string, string>)?.delete);

const showDeleteDialog = ref(false);
const rekToDelete = ref<Rek | null>(null);

function confirmDelete(rek: Rek) {
    rekToDelete.value = rek;
    showDeleteDialog.value = true;
}

function deleteRek() {
    if (!rekToDelete.value) {
        return;
    }

    router.delete(`/reks/${rekToDelete.value.kode}`, {
        preserveScroll: true,
        onSuccess: () => {
            showDeleteDialog.value = false;
            rekToDelete.value = null;
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

    <Head title="Rekening" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <BookText class="h-5 w-5" />
                            Daftar Rekening
                        </CardTitle>
                        <CardDescription>
                            Kelola semua data rekening yang terdaftar di sistem.
                        </CardDescription>
                    </div>
                    <div class="flex items-center gap-2">
                        <Button variant="outline" as-child class="gap-2">
                            <a href="/reks/print-pdf" target="_blank">
                                <Printer class="h-4 w-4" />
                                Print PDF
                            </a>
                        </Button>
                        <Button as-child class="gap-2">
                            <Link href="/reks/create">
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
                                <th class="px-4 py-3 text-left font-semibold">Kode</th>
                                <th class="px-4 py-3 text-left font-semibold">Nama</th>
                                <th class="px-4 py-3 text-left font-semibold">Tgl Dibuat</th>
                                <th class="px-4 py-3 text-center font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="rek in reks" :key="rek.kode"
                                class="border-b transition-colors last:border-0 hover:bg-muted/30">
                                <td class="px-4 py-3 font-mono font-medium">{{ rek.kode }}</td>
                                <td class="px-4 py-3">
                                    <Link :href="`/reks/${rek.kode}/sub-reks`"
                                        class="text-primary hover:underline font-medium">
                                        {{ rek.nama }}
                                    </Link>
                                </td>
                                <td class="text-muted-foreground px-4 py-3">{{ formatDate(rek.created_at) }}</td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center justify-end gap-2">
                                        <Button variant="outline" size="sm" as-child class="gap-1">
                                            <Link :href="`/reks/${rek.kode}/edit`">
                                                <Edit class="h-3.5 w-3.5" />
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button variant="destructive" size="sm" class="gap-1"
                                            @click="confirmDelete(rek)">
                                            <Trash2 class="h-3.5 w-3.5" />
                                            Hapus
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="reks.length === 0">
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
                        Apakah Anda yakin ingin menghapus rekening <strong>{{ rekToDelete?.kode }} - {{
                            rekToDelete?.nama }}</strong>?
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
                    <Button variant="destructive" @click="deleteRek">Hapus</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
