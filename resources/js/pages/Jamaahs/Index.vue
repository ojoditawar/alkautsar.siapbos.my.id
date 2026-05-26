<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import {
    Edit,
    Plus,
    Trash2,
    Users,
    User,
    Phone,
    MapPin,
    Home,
    ChevronLeft,
    ChevronRight,
} from 'lucide-vue-next';
import { ref, computed } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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

interface JamaahItem {
    id: number;
    masjid_id: string;
    nama: string;
    rt: string | null;
    rw: string | null;
    blok: string | null;
    no_rumah: string | null;
    alamat: string | null;
    telpon: string | null;
    art: number;
    foto: string | null;
    status: 'warga' | 'bukan warga';
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedJamaahs {
    data: JamaahItem[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}

const props = defineProps<{
    jamaahs: PaginatedJamaahs;
    filters: {
        search: string | null;
        status: string;
        alamat: string;
        blok: string;
        rt: string;
        rw: string;
        per_page: number;
    };
    uniqueFilters: {
        alamat: string[];
        blok: string[];
        rt: string[];
        rw: string[];
    };
}>();

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Data Jamaah', href: '/jamaahs' }],
    },
});

const search = ref(props.filters.search || '');
const statusFilter = ref(props.filters.status || 'all');
const alamatFilter = ref(props.filters.alamat || 'all');
const blokFilter = ref(props.filters.blok || 'all');
const rtFilter = ref(props.filters.rt || 'all');
const rwFilter = ref(props.filters.rw || 'all');

const perPageOptions = [10, 20, 50, 100];

function buildQuery(extra: Record<string, unknown> = {}) {
    return {
        search: search.value || undefined,
        status: statusFilter.value !== 'all' ? statusFilter.value : undefined,
        alamat: alamatFilter.value !== 'all' ? alamatFilter.value : undefined,
        blok: blokFilter.value !== 'all' ? blokFilter.value : undefined,
        rt: rtFilter.value !== 'all' ? rtFilter.value : undefined,
        rw: rwFilter.value !== 'all' ? rwFilter.value : undefined,
        per_page: String(props.jamaahs.per_page),
        ...extra,
    };
}

function handleSearch() {
    router.get('/jamaahs', buildQuery({ page: 1 }), {
        preserveState: true,
        preserveScroll: true,
    });
}

function changePerPage(value: unknown) {
    if (value === null) return;
    router.get(
        '/jamaahs',
        buildQuery({
            per_page: String(value),
            page: 1,
        }),
        { preserveState: true }
    );
}

function clearSearch() {
    search.value = '';
    statusFilter.value = 'all';
    alamatFilter.value = 'all';
    blokFilter.value = 'all';
    rtFilter.value = 'all';
    rwFilter.value = 'all';
    handleSearch();
}

const showDeleteDialog = ref(false);
const itemToDelete = ref<JamaahItem | null>(null);

function confirmDelete(item: JamaahItem) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) return;

    router.delete(`/jamaahs/${itemToDelete.value.id}`, {
        onFinish: () => {
            showDeleteDialog.value = false;
            itemToDelete.value = null;
        },
    });
}
</script>

<template>
    <Head title="Data Jamaah" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <Users class="h-5 w-5 text-emerald-600" />
                            Data Jamaah Masjid
                        </CardTitle>
                        <CardDescription>
                            Kelola data kependudukan warga/jamaah masjid di wilayah Griya Anggraini.
                        </CardDescription>
                    </div>
                    <Button as-child class="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white self-start sm:self-auto">
                        <Link href="/jamaahs/create">
                            <Plus class="h-4 w-4" />
                            Tambah Jamaah
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent class="space-y-4">
                
                <!-- Filters & Search -->
                <div class="space-y-3">
                    <div class="flex gap-2">
                        <div class="relative flex-1">
                            <Input
                                v-model="search"
                                type="search"
                                placeholder="Cari nama atau nomor rumah..."
                                class="w-full pl-9 text-xs sm:text-sm"
                                @keyup.enter="handleSearch"
                            />
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                                    <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
                                </svg>
                            </span>
                        </div>
                        <Button variant="outline" class="text-xs sm:text-sm" @click="clearSearch">
                            Reset
                        </Button>
                        <Button class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm" @click="handleSearch">
                            Cari
                        </Button>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-3 sm:grid-cols-5">
                        <div>
                            <select
                                v-model="statusFilter"
                                class="w-full rounded-md border border-input bg-background px-3 py-2 text-xs sm:text-sm outline-none"
                                @change="handleSearch"
                            >
                                <option value="all">Semua Status</option>
                                <option value="warga">Warga</option>
                                <option value="bukan warga">Bukan Warga</option>
                            </select>
                        </div>
                        <div>
                            <select
                                v-model="alamatFilter"
                                class="w-full rounded-md border border-input bg-background px-3 py-2 text-xs sm:text-sm outline-none"
                                @change="handleSearch"
                            >
                                <option value="all">Semua Alamat</option>
                                <option v-for="val in uniqueFilters.alamat" :key="val" :value="val">{{ val }}</option>
                            </select>
                        </div>
                        <div>
                            <select
                                v-model="blokFilter"
                                class="w-full rounded-md border border-input bg-background px-3 py-2 text-xs sm:text-sm outline-none"
                                @change="handleSearch"
                            >
                                <option value="all">Semua Blok</option>
                                <option v-for="val in uniqueFilters.blok" :key="val" :value="val">Blok {{ val }}</option>
                            </select>
                        </div>
                        <div>
                            <select
                                v-model="rtFilter"
                                class="w-full rounded-md border border-input bg-background px-3 py-2 text-xs sm:text-sm outline-none"
                                @change="handleSearch"
                            >
                                <option value="all">Semua RT</option>
                                <option v-for="val in uniqueFilters.rt" :key="val" :value="val">RT {{ val }}</option>
                            </select>
                        </div>
                        <div>
                            <select
                                v-model="rwFilter"
                                class="w-full rounded-md border border-input bg-background px-3 py-2 text-xs sm:text-sm outline-none"
                                @change="handleSearch"
                            >
                                <option value="all">Semua RW</option>
                                <option v-for="val in uniqueFilters.rw" :key="val" :value="val">RW {{ val }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Data Table -->
                <div class="overflow-x-auto rounded-lg border">
                    <table class="w-full border-collapse text-left text-xs sm:text-sm">
                        <thead class="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b">
                            <tr>
                                <th class="p-3 text-center w-12">Foto</th>
                                <th class="p-3">Nama Lengkap</th>
                                <th class="p-3 text-center">RT/RW</th>
                                <th class="p-3 text-center">Blok</th>
                                <th class="p-3 text-center">No. Rumah</th>
                                <th class="p-3">Alamat</th>
                                <th class="p-3">Telepon</th>
                                <th class="p-3 text-center w-24">Jumlah ART</th>
                                <th class="p-3 text-center w-28">Status</th>
                                <th class="p-3 text-center w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y">
                            <tr v-if="jamaahs.data.length === 0">
                                <td colspan="10" class="p-8 text-center text-slate-500">
                                    Tidak ada data jamaah ditemukan.
                                </td>
                            </tr>
                            <tr v-for="item in jamaahs.data" :key="item.id" class="hover:bg-slate-50/40">
                                <td class="p-3 text-center">
                                    <div class="flex items-center justify-center">
                                        <div class="h-10 w-10 overflow-hidden rounded-full border bg-slate-100 flex items-center justify-center text-slate-400">
                                            <img v-if="item.foto" :src="item.foto" :alt="item.nama" class="h-full w-full object-cover" />
                                            <User v-else class="h-5 w-5" />
                                        </div>
                                    </div>
                                </td>
                                <td class="p-3 font-bold text-slate-800">
                                    {{ item.nama }}
                                </td>
                                <td class="p-3 text-center font-semibold text-slate-600">
                                    {{ item.rt ?? '-' }} / {{ item.rw ?? '-' }}
                                </td>
                                <td class="p-3 text-center font-bold text-slate-700">
                                    {{ item.blok ?? '-' }}
                                </td>
                                <td class="p-3 text-center text-slate-600">
                                    {{ item.no_rumah ?? '-' }}
                                </td>
                                <td class="p-3 text-slate-600 truncate max-w-[150px]" :title="item.alamat ?? ''">
                                    {{ item.alamat ?? '-' }}
                                </td>
                                <td class="p-3 text-slate-600 font-mono">
                                    <div v-if="item.telpon" class="flex items-center gap-1">
                                        <Phone class="h-3 w-3 text-slate-400" />
                                        {{ item.telpon }}
                                    </div>
                                    <span v-else>-</span>
                                </td>
                                <td class="p-3 text-center font-semibold text-slate-700">
                                    {{ item.art }}
                                </td>
                                <td class="p-3 text-center">
                                    <span :class="[
                                        'text-[10px] font-bold uppercase px-2.5 py-1 rounded-full',
                                        item.status === 'warga' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                                    ]">
                                        {{ item.status }}
                                    </span>
                                </td>
                                <td class="p-3 text-center">
                                    <div class="flex items-center justify-center gap-1">
                                        <Button variant="ghost" size="icon" class="h-8 w-8 text-slate-600 hover:text-emerald-600" title="Edit" as-child>
                                            <Link :href="`/jamaahs/${item.id}/edit`">
                                                <Edit class="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" class="h-8 w-8 text-destructive hover:text-destructive"
                                            title="Hapus" @click="confirmDelete(item)">
                                            <Trash2 class="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination Footer -->
                <div class="mt-4 flex flex-col items-center justify-between gap-4 border-t pt-4 sm:flex-row">
                    <div class="flex items-center gap-4 text-xs sm:text-sm text-slate-500">
                        <span>
                            Menampilkan {{ jamaahs.from ?? 0 }}–{{ jamaahs.to ?? 0 }} dari {{ jamaahs.total }} data jamaah
                        </span>
                        <div class="flex items-center gap-2">
                            <span>Per halaman:</span>
                            <Select
                                :model-value="String(props.jamaahs.per_page)"
                                @update:model-value="changePerPage"
                            >
                                <SelectTrigger class="h-8 w-16 text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem
                                        v-for="opt in perPageOptions"
                                        :key="opt"
                                        :value="String(opt)"
                                        class="text-xs"
                                    >
                                        {{ opt }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            class="h-8 w-8"
                            :disabled="jamaahs.current_page <= 1"
                            @click="
                                router.get(
                                    '/jamaahs',
                                    buildQuery({
                                        page: jamaahs.current_page - 1,
                                    }),
                                    { preserveState: true, preserveScroll: true }
                                )
                            "
                        >
                            <ChevronLeft class="h-4 w-4" />
                        </Button>
                        <template
                            v-for="link in jamaahs.links"
                            :key="link.label"
                        >
                            <Button
                                v-if="link.url && !link.label.includes('Sebelumnya') && !link.label.includes('Selanjutnya') && !link.label.includes('&')"
                                size="sm"
                                :variant="link.active ? 'default' : 'outline'"
                                class="h-8 min-w-8 text-xs"
                                :class="link.active ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''"
                                @click="
                                    router.get(
                                        link.url,
                                        {},
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        },
                                    )
                                "
                            >
                                {{ link.label }}
                            </Button>
                        </template>
                        <Button
                            variant="outline"
                            size="icon"
                            class="h-8 w-8"
                            :disabled="jamaahs.current_page >= jamaahs.last_page"
                            @click="
                                router.get(
                                    '/jamaahs',
                                    buildQuery({
                                        page: jamaahs.current_page + 1,
                                    }),
                                    { preserveState: true, preserveScroll: true }
                                )
                            "
                        >
                            <ChevronRight class="h-4 w-4" />
                        </Button>
                    </div>
                </div>

            </CardContent>
        </Card>
    </div>

    <!-- Delete Dialog -->
    <Dialog v-model:open="showDeleteDialog">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Hapus Jamaah</DialogTitle>
                <DialogDescription>
                    Apakah Anda yakin ingin menghapus data jamaah
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
