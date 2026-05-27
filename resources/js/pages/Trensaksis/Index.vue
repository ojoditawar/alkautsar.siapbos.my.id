<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import {
    ArrowDown,
    ArrowUp,
    ChevronLeft,
    ChevronRight,
    ChevronsUpDown,
    Copy,
    Edit,
    Plus,
    Receipt,
    Search,
    Trash2,
    X,
} from 'lucide-vue-next';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

interface TrensaksiItem {
    id: number;
    tahun: string;
    no_trans: string;
    tanggal: string;
    jenis: string;
    bayar: string;
    rekening: string;
    rekening_nama: string;
    valid: boolean;
    user_name: string;
    masjid_nama: string;
    total: number;
    uraian: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedData {
    data: TrensaksiItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}

const props = defineProps<{
    trensaksis: PaginatedData;
    rekenings: { jenis: string; nama: string }[];
    filters: {
        search: string | null;
        month: string | null;
        bayar: string | null;
        jenis: string | null;
        rekening_nama: string | null;
        per_page: number;
        sort_field?: string | null;
        sort_direction?: string | null;
    };
}>();

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Transaksi', href: '/transaksis' }],
    },
});

const jenisLabels: Record<string, string> = {
    '1': 'Saldo Awal',
    '2': 'Penerimaan',
    '3': 'Mutasi Kas',
    '4': 'Pengeluaran',
    '5': 'Pungutan Pajak',
    '6': 'Setoran Pajak',
    '7': 'Utang',
    '8': 'SPJ Petty Cash',
    '9': 'Saldo Awal Petty Cash',
    '10': 'SPJ Petty Cash-Bank',
    '11': 'Saldo Awal Petty Cash-Bank',
};

const bayarLabels: Record<string, string> = {
    '0': 'Bank',
    '1': 'Tunai',
};

const perPageOptions = [10, 20, 50, 100];

const search = ref(props.filters?.search ?? '');
const month = ref(props.filters?.month ?? '');
const bayar = ref(props.filters?.bayar || 'all');
const jenis = ref(props.filters?.jenis || 'all');
const rekeningNama = ref(props.filters?.rekening_nama || 'all');
const openRekeningPopover = ref(false);

const selectedRekeningLabel = computed(() => {
    if (rekeningNama.value === 'all' || !rekeningNama.value) return 'Semua Rekening';
    const rek = props.rekenings.find((r) => r.jenis === rekeningNama.value);
    return rek ? `${rek.jenis} - ${rek.nama}` : rekeningNama.value;
});
const sortField = ref<string>(props.filters?.sort_field ?? 'tanggal');
const sortDirection = ref<'asc' | 'desc'>(
    (props.filters?.sort_direction as 'asc' | 'desc') ?? 'asc',
);
let searchTimer: ReturnType<typeof setTimeout> | null = null;

function buildQuery(extra: Record<string, unknown> = {}) {
    return {
        search: search.value || undefined,
        month: month.value || undefined,
        bayar: (bayar.value === 'all' || !bayar.value) ? undefined : bayar.value,
        jenis: (jenis.value === 'all' || !jenis.value) ? undefined : jenis.value,
        rekening_nama: (rekeningNama.value === 'all' || !rekeningNama.value) ? undefined : rekeningNama.value,
        sort_field: sortField.value || undefined,
        sort_direction: sortDirection.value || undefined,
        per_page: String(props.trensaksis.per_page),
        ...extra,
    };
}

watch(search, (value) => {
    if (searchTimer) {
        clearTimeout(searchTimer);
    }

    searchTimer = setTimeout(() => {
        router.get(
            '/transaksis',
            buildQuery({ search: value || undefined, page: 1 }),
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }, 350);
});

watch(month, () => {
    router.get('/transaksis', buildQuery({ page: 1 }), {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    });
});

watch(bayar, () => {
    router.get('/transaksis', buildQuery({ page: 1 }), {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    });
});

watch(jenis, () => {
    router.get('/transaksis', buildQuery({ page: 1 }), {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    });
});

watch(rekeningNama, () => {
    router.get('/transaksis', buildQuery({ page: 1 }), {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    });
});

onBeforeUnmount(() => {
    if (searchTimer) {
        clearTimeout(searchTimer);
    }
});

function clearSearch() {
    search.value = '';
}

function clearMonth() {
    month.value = '';
}

function clearBayar() {
    bayar.value = 'all';
}

function clearJenis() {
    jenis.value = 'all';
}

function clearRekeningNama() {
    rekeningNama.value = 'all';
}

function goToPage(page: number) {
    router.get('/transaksis', buildQuery({ page }), {
        preserveState: true,
        preserveScroll: true,
    });
}

function changePerPage(value: unknown) {
    if (value === null) {
        return;
    }

    router.get(
        '/transaksis',
        buildQuery({ per_page: String(value), page: 1 }),
        { preserveState: true },
    );
}

function handleSort(field: string) {
    if (sortField.value === field) {
        // Toggle direction jika field sama
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        // Set field baru dan direction ke asc
        sortField.value = field;
        sortDirection.value = 'asc';
    }

    router.get('/transaksis', buildQuery({ page: 1 }), {
        preserveState: true,
        preserveScroll: true,
    });
}

const showDeleteDialog = ref(false);
const itemToDelete = ref<TrensaksiItem | null>(null);
const showCopyDialog = ref(false);
const itemToCopy = ref<TrensaksiItem | null>(null);

function confirmDelete(item: TrensaksiItem) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) {
        return;
    }

    router.delete(`/transaksis/${itemToDelete.value.id}`, {
        onFinish: () => {
            showDeleteDialog.value = false;
            itemToDelete.value = null;
        },
    });
}

function confirmCopy(item: TrensaksiItem) {
    itemToCopy.value = item;
    showCopyDialog.value = true;
}

function copyItem() {
    if (!itemToCopy.value) {
        return;
    }

    router.post(`/transaksis/${itemToCopy.value.id}/duplicate`, {}, {
        onFinish: () => {
            showCopyDialog.value = false;
            itemToCopy.value = null;
        },
    });
}

function formatDate(dateString: string): string {
    // return new Date(dateString).toLocaleDateString('id-ID', {
    //     day: '2-digit',
    //     month: 'short',
    //     year: 'numeric',
    // });

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// function formatCurrency(value: number): string {
//     return new Intl.NumberFormat('id-ID').format(value);
// }
//
function formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}
</script>

<template>

    <Head title="Transaksi" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <Receipt class="h-5 w-5" />
                            Daftar Transaksi

                            <Badge class="bg-green-100 text-green-900 hover:bg-green-100">
                                {{ props.trensaksis.total }} data
                            </Badge>
                        </CardTitle>
                        <CardDescription>
                            Kelola semua data transaksi keuangan.
                        </CardDescription>
                    </div>
                    <div class="flex flex-wrap items-center gap-3">

                        <Button as-child class="gap-2">
                            <Link href="/transaksis/create">
                                <Plus class="h-4 w-4" />
                                Tambah
                            </Link>
                        </Button>
                    </div>
                </div>
                <div class="flex flex-wrap gap-4 justify-between bg-zinc-100 p-4 rounded-md">
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-muted-foreground">Bulan</span>
                        <div class="relative">
                            <Input v-model="month" type="month"
                                class="h-9 w-44 cursor-pointer pr-8 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:opacity-0" />
                            <button v-if="month" type="button"
                                class="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                @click="clearMonth">
                                <X class="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-muted-foreground">Cara Bayar</span>
                        <Select v-model="bayar">
                            <SelectTrigger class="h-9 w-32">
                                <SelectValue placeholder="Semua" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem v-for="(label, value) in bayarLabels" :key="value" :value="String(value)">
                                    {{ label }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-muted-foreground">Jenis</span>
                        <Select v-model="jenis">
                            <SelectTrigger class="h-9 w-48">
                                <SelectValue placeholder="Semua" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem v-for="(label, value) in jenisLabels" :key="value" :value="String(value)">
                                    {{ label }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-muted-foreground">Rekening</span>
                        <Popover v-model:open="openRekeningPopover">
                            <PopoverTrigger as-child>
                                <Button variant="outline" role="combobox" class="h-9 w-64 justify-between font-normal">
                                    <span class="truncate">{{ selectedRekeningLabel }}</span>
                                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-[400px] p-0" align="start">
                                <Command>
                                    <CommandInput placeholder="Cari kode atau nama rekening..." />
                                    <CommandList>
                                        <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                                        <CommandGroup>
                                            <CommandItem
                                                value="all"
                                                @select="() => { rekeningNama = 'all'; openRekeningPopover = false; }">
                                                Semua Rekening
                                                <span v-if="rekeningNama === 'all'" class="ml-auto text-primary">✓</span>
                                            </CommandItem>
                                            <CommandItem
                                                v-for="rek in rekenings"
                                                :key="rek.jenis"
                                                :value="`${rek.jenis} - ${rek.nama}`"
                                                @select="() => { rekeningNama = rek.jenis; openRekeningPopover = false; }">
                                                {{ rek.jenis }} - {{ rek.nama }}
                                                <span v-if="rekeningNama === rek.jenis" class="ml-auto text-primary">✓</span>
                                            </CommandItem>
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div class="relative">
                        <Search
                            class="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input v-model="search" type="search" placeholder="Search..." class="h-9 w-56 pr-8 pl-8" />
                        <button v-if="search" type="button"
                            class="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            @click="clearSearch">
                            <X class="h-4 w-4" />
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-muted-foreground">Per page</span>
                        <Select :model-value="String(props.trensaksis.per_page)" @update:model-value="changePerPage">
                            <SelectTrigger class="h-9 w-20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="opt in perPageOptions" :key="opt" :value="String(opt)">
                                    {{ opt }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div class="overflow-x-auto rounded-lg border">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b bg-muted/50">
                                <th class="w-35 px-4 py-3 text-left font-semibold">
                                    <button type="button"
                                        class="flex items-center gap-1 hover:text-emerald-600 transition-colors"
                                        @click="handleSort('tanggal')">
                                        Tanggal
                                        <ArrowUp v-if="sortField === 'tanggal' && sortDirection === 'asc'"
                                            class="h-4 w-4" />
                                        <ArrowDown v-if="sortField === 'tanggal' && sortDirection === 'desc'"
                                            class="h-4 w-4" />
                                    </button>
                                </th>
                                <th class="w-25 px-4 py-3 text-left font-semibold">
                                    No Trans
                                </th>
                                <th class="w-40 px-4 py-3 text-left font-semibold">
                                    Jenis
                                </th>
                                <th class="w-24 px-4 py-3 text-left font-semibold">
                                    Bayar
                                </th>
                                <th class="w-60 px-4 py-3 text-left font-semibold">
                                    Nama Rekening
                                </th>
                                <th class="w-40 px-4 py-3 text-right font-semibold">
                                    Total
                                </th>
                                <th class="min-w-[220px] px-4 py-3 text-left font-semibold">
                                    Uraian
                                </th>

                                <th class="w-28 px-4 py-3 text-center font-semibold">
                                    Valid
                                </th>
                                <th class="w-28 px-4 py-3 text-center font-semibold">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in props.trensaksis.data" :key="item.id"
                                class="border-b transition-colors last:border-0 hover:bg-muted/30">
                                <td class="px-4 py-3">
                                    <Link :href="`/transaksis/${item.id}/edit`">
                                        {{ formatDate(item.tanggal) }}
                                    </Link>
                                </td>
                                <td class="px-4 py-3">
                                    <Link :href="`/transaksis/${item.id}/edit`">
                                        {{ item.no_trans }}</Link>
                                </td>
                                <td class="px-4 py-3">
                                    <Link :href="`/transaksis/${item.id}/edit`">
                                        {{
                                            jenisLabels[item.jenis] ??
                                            item.jenis
                                        }}
                                    </Link>
                                </td>
                                <td class="px-4 py-3">
                                    <Link :href="`/transaksis/${item.id}/edit`">
                                        {{
                                            bayarLabels[item.bayar] ??
                                            item.bayar
                                        }}
                                    </Link>
                                </td>
                                <td class="px-4 py-3">
                                    <Link :href="`/transaksis/${item.id}/edit`">
                                        {{ item.rekening_nama }}
                                    </Link>
                                </td>
                                <td class="px-4 py-3 text-right">
                                    <Link :href="`/transaksis/${item.id}/edit`">
                                        {{ formatCurrency(item.total) }}
                                    </Link>
                                </td>
                                <td class="px-4 py-3">
                                    <Link :href="`/transaksis/${item.id}/edit`" class="block whitespace-pre-line">
                                        {{ item.uraian }}
                                    </Link>
                                </td>
                                <td class="px-4 py-3">
                                    <Badge :class="item.valid
                                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                        : 'bg-red-100 text-red-900 hover:bg-yellow-300'
                                        ">
                                        {{ item.valid ? 'Closed' : 'Opened' }}
                                    </Badge>
                                </td>
                                <td class="px-4 py-3">
                                    <div class="flex items-center justify-center gap-1">
                                        <template v-if="!item.valid">
                                            <Button variant="ghost" size="icon" as-child
                                                class="h-8 w-8 text-blue-500 hover:text-blue-600">
                                                <Link :href="`/transaksis/${item.id}/edit`">
                                                    <Edit class="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </template>
                                        <Button variant="ghost" size="icon"
                                            class="h-8 w-8 text-green-500 hover:text-green-600" title="Copy Data"
                                            @click="confirmCopy(item)">
                                            <Copy class="h-4 w-4" />
                                        </Button>
                                        <template v-if="!item.valid">
                                            <Button variant="ghost" size="icon"
                                                class="h-8 w-8 text-red-500 hover:text-red-600"
                                                @click="confirmDelete(item)">
                                                <Trash2 class="h-4 w-4" />
                                            </Button>
                                        </template>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="props.trensaksis.data.length === 0">
                                <td colspan="9" class="px-4 py-8 text-center text-muted-foreground">
                                    Belum ada transaksi.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="props.trensaksis.last_page > 1" class="flex items-center justify-between pt-4">
                    <!-- <p class="text-sm text-muted-foreground">
                        Menampilkan {{ props.trensaksis.from }}–{{
                            props.trensaksis.to
                        }}
                        dari {{ props.trensaksis.total }} data
                    </p> -->
                    <p class="text-sm text-muted-foreground">
                        Menampilkan {{ props.trensaksis.from }} sampai
                        {{ props.trensaksis.to }} dari total
                        {{ props.trensaksis.total }} transaksi
                    </p>

                    <div class="flex items-center gap-1">
                        <Button variant="outline" size="icon" class="h-8 w-8"
                            :disabled="props.trensaksis.current_page <= 1"
                            @click="goToPage(props.trensaksis.current_page - 1)">
                            <ChevronLeft class="h-4 w-4" />
                        </Button>
                        <template v-for="link in props.trensaksis.links" :key="link.label">
                            <Button v-if="link.url && !link.label.includes('&')" size="sm"
                                :variant="link.active ? 'default' : 'outline'" class="h-8 min-w-8" @click="
                                    router.get(
                                        link.url,
                                        {},
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        },
                                    )
                                    ">
                                {{ link.label }}
                            </Button>
                        </template>
                        <Button variant="outline" size="icon" class="h-8 w-8" :disabled="props.trensaksis.current_page >=
                            props.trensaksis.last_page
                            " @click="goToPage(props.trensaksis.current_page + 1)">
                            <ChevronRight class="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Delete Dialog -->
        <Dialog v-model:open="showDeleteDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Transaksi</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus transaksi
                        <strong>{{ itemToDelete?.no_trans }}</strong>? Tindakan ini tidak dapat dibatalkan.
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

        <!-- Copy Dialog -->
        <Dialog v-model:open="showCopyDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Copy Transaksi</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menyalin transaksi
                        <strong>{{ itemToCopy?.no_trans }}</strong>? Data akan diduplikasi dan diarahkan ke halaman
                        edit.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">Batal</Button>
                    </DialogClose>
                    <Button @click="copyItem">Copy</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
