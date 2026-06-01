<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { Edit, Plus, Search, Trash2, X, Users } from 'lucide-vue-next';
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
import { Input } from '@/components/ui/input';

const { can } = useCan();

interface User {
    id: number;
    name: string;
}

interface PetugasItem {
    id: number;
    user_id: number;
    nama: string;
    alamat: string;
    tanggal: string;
    hp: string | null;
    honor: number;
    created_at: string;
    user?: User;
}

interface PaginatedData {
    data: PetugasItem[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
}

const props = defineProps<{
    khotbahs: PaginatedData;
    filters: {
        search: string | null;
        per_page: number;
    };
}>();

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Khotib Jumat', href: '/khotib-jumat' }],
    },
});

const showDeleteDialog = ref(false);
const itemToDelete = ref<PetugasItem | null>(null);
const search = ref(props.filters.search ?? '');

function confirmDelete(item: PetugasItem) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) return;

    router.delete(`/khotib-jumat/${itemToDelete.value.id}`, {
        onFinish: () => {
            showDeleteDialog.value = false;
            itemToDelete.value = null;
        },
    });
}

function buildQuery(extra: Record<string, unknown> = {}) {
    return {
        search: search.value || undefined,
        per_page: String(props.petugas.per_page),
        ...extra,
    };
}

function handleSearch() {
    router.get('/khotib-jumat', buildQuery({ page: 1 }), {
        preserveState: true,
        preserveScroll: true,
    });
}

function clearSearch() {
    search.value = '';
    router.get('/khotib-jumat', buildQuery({ page: 1 }), {
        preserveState: true,
        preserveScroll: true,
    });
}

function formatDate(dateStr: string): string {
    if (!dateStr) return '-';

    const d = new Date(dateStr);

    return d.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

function formatRupiah(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value ?? 0);
}
</script>

<template>

    <Head title="Khotib-Jumat" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <Users class="h-5 w-5" />
                            Daftar Khotib Jumat
                        </CardTitle>
                        <CardDescription>
                            Kelola data khotib jumat, alamat, tanggal, nomor HP, dan honor.
                        </CardDescription>
                    </div>

                    <Button as-child class="gap-2" v-if="can('create-khotbahs')">
                        <Link href="/khotib-jumat/create">
                            <Plus class="h-4 w-4" />
                            Tambah
                        </Link>
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <div class="mb-4 flex flex-wrap items-center gap-3">
                    <div class="relative min-w-[220px] flex-1">
                        <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input v-model="search" placeholder="Cari nama, alamat, HP..." class="pl-9"
                            @keyup.enter="handleSearch" />
                    </div>

                    <Button variant="outline" class="gap-2" @click="clearSearch">
                        <X class="h-4 w-4" />
                        Reset
                    </Button>

                    <Button class="gap-2" @click="handleSearch">
                        <Search class="h-4 w-4" />
                        Cari
                    </Button>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b bg-muted/50 text-left">
                                <th class="px-3 py-2">#</th>
                                <th class="px-3 py-2">Nama</th>
                                <th class="px-3 py-2">Alamat</th>
                                <th class="px-3 py-2">Tanggal</th>
                                <th class="px-3 py-2">HP</th>
                                <th class="px-3 py-2 text-right">Honor</th>
                                <th class="px-3 py-2">User</th>
                                <th class="px-3 py-2 text-center">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(item, index) in khotbahs.data" :key="item.id"
                                class="cursor-pointer border-b transition-colors hover:bg-muted/30"
                                @click="router.visit(`/khotib-jumat/${item.id}/edit`)">
                                <td class="px-3 py-2 text-muted-foreground">
                                    {{ (khotbahs.current_page - 1) * khotbahs.per_page + index + 1 }}
                                </td>

                                <td class="px-3 py-2 font-medium">
                                    {{ item.nama }}
                                </td>

                                <td class="px-3 py-2">
                                    {{ item.alamat }}
                                </td>

                                <td class="px-3 py-2">
                                    {{ formatDate(item.tanggal) }}
                                </td>

                                <td class="px-3 py-2">
                                    {{ item.hp ?? '-' }}
                                </td>

                                <td class="px-3 py-2 text-right">
                                    {{ formatRupiah(item.honor) }}
                                </td>

                                <td class="px-3 py-2">
                                    {{ item.user?.name ?? '-' }}
                                </td>

                                <td class="px-3 py-2" @click.stop>
                                    <div class="flex items-center justify-center gap-1">
                                        <Button as-child size="icon" variant="ghost"
                                            class="h-8 w-8 text-green-600 hover:text-green-700"
                                            v-if="can('edit-khotbahs')">
                                            <Link :href="`/khotib-jumat/${item.id}/edit`">
                                                <Edit class="h-4 w-4" />
                                            </Link>
                                        </Button>

                                        <Button size="icon" variant="ghost"
                                            class="h-8 w-8 text-red-600 hover:text-red-700"
                                            v-if="can('delete-khotbahs')"
                                            @click="confirmDelete(item)">
                                            <Trash2 class="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>

                            <tr v-if="khotbahs.data.length === 0">
                                <td colspan="8" class="py-12 text-center text-muted-foreground">
                                    Belum ada data khotbah.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mt-4 flex items-center justify-between">
                    <div class="text-sm text-muted-foreground">
                        Menampilkan {{ khotbahs.data.length }} dari {{ khotbahs.total }} data
                    </div>

                    <div class="flex gap-2">
                        <Button variant="outline" size="sm" :disabled="khotbahs.current_page === 1"
                            @click="router.get('/khotbahs', buildQuery({ page: khotbahs.current_page - 1 }))">
                            Sebelumnya
                        </Button>

                        <Button variant="outline" size="sm" :disabled="khotbahs.current_page === khotbahs.last_page"
                            @click="router.get('/khotbahs', buildQuery({ page: khotbahs.current_page + 1 }))">
                            Selanjutnya
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Dialog v-model:open="showDeleteDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Data Petugas</DialogTitle>
                    <DialogDescription>
                        Yakin ingin menghapus data
                        <strong>{{ itemToDelete?.nama }}</strong>?
                        Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">Batal</Button>
                    </DialogClose>

                    <Button variant="destructive" @click="deleteItem">
                        Hapus
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>