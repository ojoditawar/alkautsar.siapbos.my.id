<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import {
    Copy,
    Calendar,
    Edit,
    Image as ImageIcon,
    Plus,
    Search,
    Trash2,
    X,
    FileText,
} from 'lucide-vue-next';
import { ref } from 'vue';
import { useCan } from '@/composables/useCan';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const { can } = useCan();

interface User {
    id: number;
    name: string;
}

interface DetailPekurbanItem {
    id: number;
    nama: string;
    alamat: string | null;
    bagian: string | null;
    bayar: boolean;
}

interface PekurbanItem {
    id: number;
    user_id: number;
    jenis: number;
    tahun: string | null;
    kelas: string | null;
    sapi: string | null;
    image: string | null;
    kelompok_pequrban: string;
    harga: number;
    biaya_potong: number;
    total: number;
    created_at: string;
    user: User;
    detail_pekurbans?: DetailPekurbanItem[];
}

interface PaginatedData {
    data: PekurbanItem[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
}

const props = defineProps<{
    pekurbans: PaginatedData;
    filters: {
        search: string | null;
        tahun: string | null;
        jenis: string | null;
        per_page: number;
    };
}>();

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Pekurban', href: '/pekurbans' }],
    },
});

const showDeleteDialog = ref(false);
const itemToDelete = ref<PekurbanItem | null>(null);
const showCopyDialog = ref(false);
const itemToCopy = ref<PekurbanItem | null>(null);
const showDetailDialog = ref(false);
const selectedItem = ref<PekurbanItem | null>(null);
const search = ref(props.filters.search || '');
const tahun = ref(props.filters.tahun || '');
const jenis = ref(props.filters.jenis || '');
const status_bayar = ref(props.filters.status_bayar !== null ? String(props.filters.status_bayar) : 'all');

function showDetail(item: PekurbanItem) {
    selectedItem.value = item;
    showDetailDialog.value = true;
}

function confirmDelete(item: PekurbanItem) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) {
        return;
    }

    router.delete(`/pekurbans/${itemToDelete.value.id}`, {
        onFinish: () => {
            showDeleteDialog.value = false;
            itemToDelete.value = null;
        },
    });
}

function buildQuery(extra: Record<string, unknown> = {}) {
    return {
        search: search.value || undefined,
        tahun: tahun.value && tahun.value !== 'all' ? tahun.value : undefined,
        jenis: jenis.value && jenis.value !== 'all' ? jenis.value : undefined,
        status_bayar: status_bayar.value !== 'all' ? status_bayar.value : undefined,
        per_page: String(props.pekurbans.per_page),
        ...extra,
    };
}

function handleSearch() {
    router.get('/pekurbans', buildQuery({ page: 1 }), {
        preserveState: true,
        preserveScroll: true,
    });
}

function clearSearch() {
    search.value = '';
    tahun.value = 'all';
    jenis.value = 'all';
    status_bayar.value = 'all';
    handleSearch();
}

function formatRupiah(n: number): string {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(n);
}

function getImageUrl(image: string | null): string {
    if (!image) return '';
    return `/storage/${image}`;
}

function getJenisLabel(jenis: number): string {
    switch (jenis) {
        case 1:
            return 'Sapi';
        case 2:
            return 'Domba';
        case 3:
            return 'Kambing';
        default:
            return '-';
    }
}

function getJenisColor(jenis: number): string {
    switch (jenis) {
        case 1:
            return 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300';
        case 2:
            return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
        case 3:
            return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
        default:
            return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
}
function confirmDuplicate(item: PekurbanItem) {
    itemToCopy.value = item;
    showCopyDialog.value = true;
}

function handleDuplicate() {
    if (!itemToCopy.value) return;

    router.post(`/pekurbans/${itemToCopy.value.id}/duplicate`, {}, {
        onFinish: () => {
            showCopyDialog.value = false;
            itemToCopy.value = null;
        }
    });
}

function printPdf() {
    const query = buildQuery();
    // Filter out undefined values to prevent "undefined" string in URL
    const cleanQuery = Object.fromEntries(
        Object.entries(query).filter(([_, v]) => v !== undefined && v !== null)
    );
    const params = new URLSearchParams(cleanQuery as any).toString();
    window.open(`/pekurbans-pdf?${params}`, '_blank');
}
</script>

<template>

    <Head title="Pekurban" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <Calendar class="h-5 w-5" />
                            Daftar Pekurban
                        </CardTitle>
                        <CardDescription>
                            Kelola data pekurban dengan gambar kambing.
                        </CardDescription>
                    </div>
                    <div class="flex gap-2">
                        <Button variant="outline" class="gap-2" @click="printPdf">
                            <FileText class="h-4 w-4" />
                            Cetak PDF
                        </Button>
                        <Button as-child class="gap-2" v-if="can('create-pekurbans')">
                            <Link href="/pekurbans/create">
                                <Plus class="h-4 w-4" />
                                Tambah
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <!-- Search & Filter -->
                <div class="mb-4 flex flex-wrap items-center gap-3">
                    <div class="relative min-w-[200px] flex-1">
                        <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input v-model="search" placeholder="Cari kelas, sapi, kelompok..." class="pl-9"
                            @keyup.enter="handleSearch" />
                    </div>
                    <Select v-model="tahun" @update:model-value="handleSearch">
                        <SelectTrigger class="w-[150px]">
                            <SelectValue placeholder="Tahun" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Tahun</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                            <SelectItem value="2027">2027</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select v-model="jenis" @update:model-value="handleSearch">
                        <SelectTrigger class="w-[150px]">
                            <SelectValue placeholder="Jenis" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Jenis</SelectItem>
                            <SelectItem value="1">Sapi</SelectItem>
                            <SelectItem value="2">Domba</SelectItem>
                            <SelectItem value="3">Kambing</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select v-model="status_bayar" @update:model-value="handleSearch">
                        <SelectTrigger class="w-[180px]">
                            <SelectValue placeholder="Status Bayar" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="0">Belum Transfer</SelectItem>
                            <SelectItem value="1">Sudah Lunas</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" class="gap-2" @click="clearSearch">
                        <X class="h-4 w-4" />
                        Reset
                    </Button>
                    <Button class="gap-2" @click="handleSearch">
                        <Search class="h-4 w-4" />
                        Cari
                    </Button>
                </div>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div v-for="(item, index) in pekurbans.data" :key="item.id"
                        class="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
                        <div class="cursor-pointer" @click="showDetail(item)">
                            <div v-if="item.image" class="relative h-40 w-full overflow-hidden bg-muted">
                                <img :src="getImageUrl(item.image)" alt="Gambar"
                                    class="h-full w-full object-cover transition-transform hover:scale-105" />
                            </div>
                            <div v-else class="flex h-40 w-full items-center justify-center bg-muted">
                                <ImageIcon class="h-12 w-12 text-muted-foreground" />
                            </div>
                        </div>
                        <div class="p-3">
                            <div class="mb-2 flex items-center justify-between gap-2">
                                <div class="flex flex-wrap items-center gap-1">
                                    <span
                                        class="dark:text-emerald-90000 rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900">
                                        {{ item.tahun ?? '-' }}
                                    </span>
                                    <span
                                        :class="`rounded-full px-1.5 py-0.5 text-xs font-semibold ${getJenisColor(item.jenis)}`">
                                        {{ getJenisLabel(item.jenis) }}
                                    </span>
                                    <span
                                        class="rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                        {{ item.kelas ?? '-' }}
                                    </span>
                                </div>

                                <Button type="button"
                                    class="h-7 w-5 shrink-0 bg-blue-600 p-0 text-white hover:bg-blue-700"
                                    @click="confirmDuplicate(item)" title="Copy Data">
                                    <Copy class="h-4 w-4" />
                                </Button>
                            </div>

                            <div class="mb-1 cursor-pointer truncate text-base font-semibold hover:text-blue-600"
                                @click="showDetail(item)">
                                {{ item.kelompok_pequrban }}
                            </div>
                            <p v-if="item.sapi" class="mb-2 truncate text-xs font-semibold text-green-900">
                                {{ item.sapi }}
                            </p>
                            <div class="space-y-0.5 text-xs">
                                <div class="flex justify-between">
                                    <span class="text-muted-foreground">Harga:</span>
                                    <span class="text-muted-foreground">{{
                                        formatRupiah(item.harga)
                                    }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-muted-foreground">Biaya:</span>
                                    <span class="text-muted-foreground">{{
                                        formatRupiah(item.biaya_potong)
                                    }}</span>
                                </div>
                                <div class="flex justify-between border-t pt-0.5">
                                    <span class="font-semibold">Total:</span>
                                    <span class="font-semibold">{{
                                        formatRupiah(item.total)
                                    }}</span>
                                </div>
                            </div>
                            <div class="mt-3 flex items-center justify-between gap-2">
                                <span class="text-xs"
                                    :class="(item.detail_pekurbans?.filter(d => d.bayar).length ?? 0) === (item.detail_pekurbans?.length ?? 0) && (item.detail_pekurbans?.length ?? 0) > 0 ? 'text-green-900 font-semibold' : 'text-red-500 font-semibold'">
                                    Bayar: {{item.detail_pekurbans?.filter(d => d.bayar).length ?? 0}} dari {{
                                        item.detail_pekurbans?.length ?? 0 }}
                                    <span
                                        v-if="(item.detail_pekurbans?.filter(d => d.bayar).length ?? 0) === (item.detail_pekurbans?.length ?? 0) && (item.detail_pekurbans?.length ?? 0) > 0"
                                        class="ml-1">→ Lunas</span>
                                </span>
                                <div class="flex gap-2">
                                    <Button as-child
                                        class="h-9 w-9 bg-green-600 p-0 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                                        v-if="can('edit-pekurbans')">
                                        <Link :href="`/pekurbans/${item.id}/edit`">
                                            <Edit class="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button type="button"
                                        class="h-9 w-9 bg-red-600 p-0 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                                        v-if="can('delete-pekurbans')"
                                        @click="confirmDelete(item)">
                                        <Trash2 class="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="pekurbans.data.length === 0"
                        class="col-span-full py-12 text-center text-muted-foreground">
                        Belum ada data pekurban.
                    </div>
                </div>

                <!-- Pagination -->
                <div class="mt-4 flex items-center justify-between">
                    <div class="text-sm text-muted-foreground">
                        Menampilkan {{ pekurbans.data.length }} dari
                        {{ pekurbans.total }} data
                    </div>
                    <div class="flex gap-2">
                        <Button variant="outline" size="sm" :disabled="pekurbans.current_page === 1" @click="
                            router.get(
                                '/pekurbans',
                                buildQuery({
                                    page: pekurbans.current_page - 1,
                                }),
                            )
                            ">
                            Sebelumnya
                        </Button>
                        <Button variant="outline" size="sm" :disabled="pekurbans.current_page === pekurbans.last_page
                            " @click="
                                router.get(
                                    '/pekurbans',
                                    buildQuery({
                                        page: pekurbans.current_page + 1,
                                    }),
                                )
                                ">
                            Selanjutnya
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Dialog v-model:open="showDetailDialog">
            <!-- <DialogContent class="max-w-2xl"> -->
            <DialogContent class="w-full max-w-5xl">
                <DialogHeader>
                    <DialogTitle>Detail Pekurban —
                        {{ selectedItem?.kelompok_pequrban }}</DialogTitle>
                    <DialogDescription>
                        Daftar nama, alamat, dan bagian pekurban.
                    </DialogDescription>
                </DialogHeader>
                <div class="max-h-96 overflow-y-auto">
                    <div v-if="selectedItem?.detail_pekurbans && selectedItem.detail_pekurbans.length > 0"
                        class="space-y-2">
                        <div v-for="detail in selectedItem.detail_pekurbans" :key="detail.id"
                            class="grid grid-cols-4 gap-4 rounded border px-4 py-3 text-sm">
                            <div>{{ detail.nama }}</div>

                            <div>{{ detail.alamat ?? '-' }}</div>

                            <div class="font-medium text-emerald-700">
                                {{ detail.bagian ?? '-' }}
                            </div>

                            <div class="font-semibold" :class="detail.bayar ? 'text-emerald-700' : 'text-red-600'">
                                {{ detail.bayar ? 'Lunas' : 'Belum Transfer' }}
                            </div>
                        </div>
                    </div>

                    <div v-else class="py-8 text-center text-sm text-muted-foreground">
                        Belum ada detail pekurban.
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">Tutup</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Dialog v-model:open="showDeleteDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Pekurban</DialogTitle>
                    <DialogDescription>
                        Yakin ingin menghapus pekurban
                        <strong>{{ itemToDelete?.kelompok_pequrban }}</strong>? Tindakan ini tidak dapat dibatalkan.
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

        <Dialog v-model:open="showCopyDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Copy Data Pekurban</DialogTitle>
                    <DialogDescription>
                        Yakin ingin menduplikasi data pekurban
                        <strong>{{ itemToCopy?.kelompok_pequrban }}</strong> beserta seluruh detail pesertanya?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">Batal</Button>
                    </DialogClose>
                    <Button class="bg-blue-600 hover:bg-blue-700" @click="handleDuplicate">Ya, Copy</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
