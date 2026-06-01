<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { BookText, ClipboardList, Copy, Edit, Plus, Printer, Search, Trash2, X } from 'lucide-vue-next';
import { onBeforeUnmount, ref, watch } from 'vue';
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

interface Masjid {
    id: string;
    nama: string;
}

interface JadwalImamItem {
    id: number;
    user_id: number;
    masjid_id: string;
    tanggal: string;
    hari: string;
    muadzin: string;
    imam_subuh: string;
    imam_magrib: string;
    imam_isya: string;
    created_at: string;
    user: User;
    masjid: Masjid;
}

interface PaginatedData {
    data: JadwalImamItem[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
}

const props = defineProps<{
    jadwalImams: PaginatedData;
    filters: {
        search: string | null;
        month: string | null;
        per_page: number;
    };
}>();

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Jadwal Imam', href: '/jadwal-imams' }],
    },
});

const showDeleteDialog = ref(false);
const itemToDelete = ref<JadwalImamItem | null>(null);
const showCopyDialog = ref(false);
const itemToCopy = ref<JadwalImamItem | null>(null);
const search = ref(props.filters.search ?? '');
const month = ref(props.filters.month ?? new Date().toISOString().substring(0, 7));
let searchTimer: ReturnType<typeof setTimeout> | null = null;

watch(month, () => {
    router.get('/jadwal-imams', buildQuery({ page: 1 }), {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    });
});

watch(search, (value) => {
    if (searchTimer) {
        clearTimeout(searchTimer);
    }

    searchTimer = setTimeout(() => {
        router.get(
            '/jadwal-imams',
            buildQuery({ search: value || undefined, page: 1 }),
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }, 350);
});

onBeforeUnmount(() => {
    if (searchTimer) {
        clearTimeout(searchTimer);
    }
});

function confirmCopy(item: JadwalImamItem) {
    itemToCopy.value = item;
    showCopyDialog.value = true;
}

function doCopy() {
    if (!itemToCopy.value) {
        return;
    }

    router.post(`/jadwal-imams/${itemToCopy.value.id}/duplicate`, {}, {
        onFinish: () => {
            showCopyDialog.value = false;
            itemToCopy.value = null;
        },
    });
}

function confirmDelete(item: JadwalImamItem) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) {
        return;
    }

    router.delete(`/jadwal-imams/${itemToDelete.value.id}`, {
        onFinish: () => {
            showDeleteDialog.value = false;
            itemToDelete.value = null;
        },
    });
}

function buildQuery(extra: Record<string, unknown> = {}) {
    return {
        search: search.value || undefined,
        month: month.value || undefined,
        per_page: String(props.jadwalImams.per_page),
        ...extra,
    };
}

function handleSearch() {
    if (searchTimer) clearTimeout(searchTimer);
    router.get('/jadwal-imams', buildQuery({ page: 1 }), {
        preserveState: true,
        preserveScroll: true,
    });
}

function clearSearch() {
    search.value = '';
}

function printPdf() {
    window.open(`/jadwal-imams-pdf?bulan=${month.value}`, '_blank');
}

function printRekap() {
    window.open(`/jadwal-imams-rekap-pdf?bulan=${month.value}`, '_blank');
}

function formatDate(dateStr: string): string {
    if (!dateStr) {
        return '-';
    }

    const d = new Date(dateStr);

    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}
</script>

<template>

    <Head title="Jadwal Imam" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <BookText class="h-5 w-5" />
                            Jadwal Imam
                        </CardTitle>
                        <CardDescription>
                            Kelola jadwal imam, muadzin, dan sholat.
                        </CardDescription>
                    </div>
                    <div class="flex gap-2">
                        <Button as-child class="gap-2" v-if="can('create-jadwal-imams')">
                            <Link href="/jadwal-imams/create">
                                <Plus class="h-4 w-4" />
                                Tambah
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div class="mb-4 flex flex-wrap items-center gap-3">
                    <div class="relative min-w-[200px] flex-1">
                        <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input v-model="search" placeholder="Cari muadzin, imam..." class="pl-9"
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
                    <div class="ml-auto flex items-center gap-2">
                        <input v-model="month" type="month"
                            class="rounded-md border border-input bg-background px-3 py-2 text-sm"
                            @click="($event.target as HTMLInputElement).showPicker()" />
                        <Button variant="outline" class="gap-2" @click="printPdf">
                            <Printer class="h-4 w-4" />
                            Cetak PDF
                        </Button>
                        <Button variant="outline" class="gap-2" @click="printRekap">
                            <ClipboardList class="h-4 w-4" />
                            Rekap PDF
                        </Button>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b bg-muted/50 text-left">
                                <th class="px-3 py-2">#</th>
                                <th class="px-3 py-2">Tanggal</th>
                                <th class="px-3 py-2">Hari</th>
                                <th class="px-3 py-2">Muadzin</th>
                                <th class="px-3 py-2">Imam Subuh</th>
                                <th class="px-3 py-2">Imam Magrib</th>
                                <th class="px-3 py-2">Imam Isya</th>
                                <th class="px-3 py-2 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in jadwalImams.data" :key="item.id"
                                class="cursor-pointer border-b transition-colors hover:bg-muted/30"
                                @click="router.visit(`/jadwal-imams/${item.id}/edit`)">
                                <td class="px-3 py-2 text-muted-foreground">
                                    {{ (jadwalImams.current_page - 1) * jadwalImams.per_page + index + 1 }}
                                </td>
                                <td class="px-3 py-2">{{ formatDate(item.tanggal) }}</td>
                                <td class="px-3 py-2">{{ item.hari }}</td>
                                <td class="px-3 py-2">{{ item.muadzin }}</td>
                                <td class="px-3 py-2">{{ item.imam_subuh }}</td>
                                <td class="px-3 py-2">{{ item.imam_magrib }}</td>
                                <td class="px-3 py-2">{{ item.imam_isya }}</td>
                                <td class="px-3 py-2" @click.stop>
                                    <div class="flex items-center justify-center gap-1">
                                        <Button size="icon" variant="ghost"
                                            class="h-8 w-8 text-blue-600 hover:text-blue-700"
                                            @click="confirmCopy(item)">
                                            <Copy class="h-4 w-4" />
                                        </Button>
                                        <Button as-child size="icon" variant="ghost"
                                            class="h-8 w-8 text-green-600 hover:text-green-700"
                                            v-if="can('edit-jadwal-imams')">
                                            <Link :href="`/jadwal-imams/${item.id}/edit`">
                                                <Edit class="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button size="icon" variant="ghost"
                                            class="h-8 w-8 text-red-600 hover:text-red-700"
                                            v-if="can('delete-jadwal-imams')"
                                            @click="confirmDelete(item)">
                                            <Trash2 class="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="jadwalImams.data.length === 0">
                                <td colspan="8" class="py-12 text-center text-muted-foreground">
                                    Belum ada data jadwal imam.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mt-4 flex items-center justify-between">
                    <div class="text-sm text-muted-foreground">
                        Menampilkan {{ jadwalImams.data.length }} dari {{ jadwalImams.total }} data
                    </div>
                    <div class="flex gap-2">
                        <Button variant="outline" size="sm" :disabled="jadwalImams.current_page === 1" @click="
                            router.get('/jadwal-imams', buildQuery({ page: jadwalImams.current_page - 1 }))
                            ">
                            Sebelumnya
                        </Button>
                        <Button variant="outline" size="sm"
                            :disabled="jadwalImams.current_page === jadwalImams.last_page" @click="
                                router.get('/jadwal-imams', buildQuery({ page: jadwalImams.current_page + 1 }))
                                ">
                            Selanjutnya
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Dialog v-model:open="showCopyDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Copy Jadwal Imam</DialogTitle>
                    <DialogDescription>
                        Apakah data jadwal imam tanggal
                        <strong>{{ itemToCopy ? formatDate(itemToCopy.tanggal) : '' }}</strong>
                        akan dicopy?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">Batal</Button>
                    </DialogClose>
                    <Button @click="doCopy">Ya, Copy</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Dialog v-model:open="showDeleteDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Jadwal Imam</DialogTitle>
                    <DialogDescription>
                        Yakin ingin menghapus jadwal imam tanggal
                        <strong>{{ itemToDelete ? formatDate(itemToDelete.tanggal) : '' }}</strong>?
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
