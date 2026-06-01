<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import {
    ChevronLeft,
    ChevronRight,
    Edit,
    Plus,
    Receipt,
    Search,
    Trash2,
    X,
} from 'lucide-vue-next';
import { onBeforeUnmount, ref, watch } from 'vue';
import { useCan } from '@/composables/useCan';

const { can } = useCan();
import { Badge } from '@/components/ui/badge';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface TransaksiItem {
    id: number;
    tahun: string;
    no_trans: string;
    tanggal: string;
    jenis: string;
    bayar: string;
    rekening: string;
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
    data: TransaksiItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}

const props = defineProps<{
    transaksis: PaginatedData;
    filters: {
        search: string | null;
        per_page: number;
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
};

const bayarLabels: Record<string, string> = {
    '0': 'Bank',
    '1': 'Tunai',
};

const perPageOptions = [10, 20, 50, 100];

const search = ref(props.filters?.search ?? '');
let searchTimer: ReturnType<typeof setTimeout> | null = null;

watch(search, (value) => {
    if (searchTimer) {
        clearTimeout(searchTimer);
    }

    searchTimer = setTimeout(() => {
        router.get(
            '/transaksis',
            {
                search: value || undefined,
                per_page: String(props.transaksis.per_page),
                page: 1,
            },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }, 350);
});

onBeforeUnmount(() => {
    if (searchTimer) {
        clearTimeout(searchTimer);
    }
});

function clearSearch() {
    search.value = '';
}

function goToPage(page: number) {
    router.get(
        '/transaksis',
        {
            page,
            search: search.value || undefined,
            per_page: String(props.transaksis.per_page),
        },
        { preserveState: true, preserveScroll: true },
    );
}

function changePerPage(value: unknown) {
    if (value === null) {
        return;
    }

    router.get(
        '/transaksis',
        {
            per_page: String(value),
            search: search.value || undefined,
            page: 1,
        },
        { preserveState: true },
    );
}

const showDeleteDialog = ref(false);
const itemToDelete = ref<TransaksiItem | null>(null);

function confirmDelete(item: TransaksiItem) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) return;

    router.delete(`/transaksis/${itemToDelete.value.id}`, {
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

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID').format(value);
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
                        </CardTitle>
                        <CardDescription>
                            Kelola semua data transaksi keuangan.
                        </CardDescription>
                    </div>
                    <div class="flex flex-wrap items-center gap-3">
                        <div class="relative">
                            <Search
                                class="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            />
                            <Input
                                v-model="search"
                                type="search"
                                placeholder="Search..."
                                class="h-9 w-56 pr-8 pl-8"
                            />
                            <button
                                v-if="search"
                                type="button"
                                class="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                @click="clearSearch"
                            >
                                <X class="h-4 w-4" />
                            </button>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-muted-foreground"
                                >Per page</span
                            >
                            <Select
                                :model-value="String(props.transaksis.per_page)"
                                @update:model-value="changePerPage"
                            >
                                <SelectTrigger class="h-9 w-20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem
                                        v-for="opt in perPageOptions"
                                        :key="opt"
                                        :value="String(opt)"
                                    >
                                        {{ opt }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button v-if="can('create-transaksis')" as-child class="gap-2">
                            <Link href="/transaksis/create">
                                <Plus class="h-4 w-4" />
                                Tambah Transaksi
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div class="overflow-x-auto rounded-lg border">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b bg-muted/50">
                                <th
                                    class="w-35 px-4 py-3 text-left font-semibold"
                                >
                                    Tanggal
                                </th>
                                <th
                                    class="w-20 px-4 py-3 text-left font-semibold"
                                >
                                    No Trans
                                </th>
                                <th
                                    class="w-24 px-4 py-3 text-left font-semibold"
                                >
                                    Jenis
                                </th>
                                <th
                                    class="w-24 px-4 py-3 text-left font-semibold"
                                >
                                    Bayar
                                </th>
                                <th
                                    class="w-10 px-4 py-3 text-left font-semibold"
                                >
                                    Rekening
                                </th>
                                <th
                                    class="w-32 px-4 py-3 text-right font-semibold"
                                >
                                    Total
                                </th>
                                <th
                                    class="min-w-[220px] px-4 py-3 text-left font-semibold"
                                >
                                    Uraian
                                </th>

                                <th
                                    class="w-28 px-4 py-3 text-center font-semibold"
                                >
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="item in props.transaksis.data"
                                :key="item.id"
                                class="border-b transition-colors last:border-0 hover:bg-muted/30"
                            >
                                <td class="px-4 py-3">
                                    {{ formatDate(item.tanggal) }}
                                </td>
                                <td class="px-4 py-3">
                                    {{ item.no_trans }}
                                </td>
                                <td class="px-4 py-3">
                                    {{ jenisLabels[item.jenis] ?? item.jenis }}
                                </td>
                                <td class="px-4 py-3">
                                    {{ bayarLabels[item.bayar] ?? item.bayar }}
                                </td>
                                <td class="px-4 py-3">
                                    {{ item.rekening }}
                                </td>
                                <td class="px-4 py-3 text-right">
                                    {{ formatCurrency(item.total) }}
                                </td>
                                <td class="px-4 py-3">
                                    <Link :href="`/transaksis/${item.id}/edit`">
                                        {{ item.uraian }}</Link
                                    >
                                </td>
                                <td class="px-4 py-3">
                                    <div
                                        class="flex items-center justify-center gap-1"
                                    >
                                        <Button v-if="can('edit-transaksis')"
                                            variant="ghost"
                                            size="icon"
                                            as-child
                                            class="h-8 w-8 text-blue-500 hover:text-blue-600"
                                        >
                                            <Link
                                                :href="`/transaksis/${item.id}/edit`"
                                            >
                                                <Edit class="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button v-if="can('delete-transaksis')"
                                            variant="ghost"
                                            size="icon"
                                            class="h-8 w-8 text-red-500 hover:text-red-600"
                                            @click="confirmDelete(item)"
                                        >
                                            <Trash2 class="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="props.transaksis.data.length === 0">
                                <td
                                    colspan="9"
                                    class="px-4 py-8 text-center text-muted-foreground"
                                >
                                    Belum ada transaksi.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div
                    v-if="props.transaksis.last_page > 1"
                    class="flex items-center justify-between pt-4"
                >
                    <p class="text-sm text-muted-foreground">
                        Menampilkan {{ props.transaksis.from }}–{{
                            props.transaksis.to
                        }}
                        dari {{ props.transaksis.total }} data
                    </p>
                    <div class="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            class="h-8 w-8"
                            :disabled="props.transaksis.current_page <= 1"
                            @click="goToPage(props.transaksis.current_page - 1)"
                        >
                            <ChevronLeft class="h-4 w-4" />
                        </Button>
                        <template
                            v-for="link in props.transaksis.links"
                            :key="link.label"
                        >
                            <Button
                                v-if="link.url && !link.label.includes('&')"
                                size="sm"
                                :variant="link.active ? 'default' : 'outline'"
                                class="h-8 min-w-8"
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
                            :disabled="
                                props.transaksis.current_page >=
                                props.transaksis.last_page
                            "
                            @click="goToPage(props.transaksis.current_page + 1)"
                        >
                            <ChevronRight class="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Delete Dialog -->
        <Dialog v-if="can('delete-transaksis')" v-model:open="showDeleteDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Transaksi</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus transaksi
                        <strong>{{ itemToDelete?.no_trans }}</strong
                        >? Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">Batal</Button>
                    </DialogClose>
                    <Button variant="destructive" @click="deleteItem"
                        >Hapus</Button
                    >
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
