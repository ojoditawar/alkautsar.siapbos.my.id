<script setup lang="ts">
import { Head, router, usePage } from '@inertiajs/vue3';
import { CheckCircle2, FileCheck2, Lock, Unlock } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface MasjidOption {
    id: string;
    nama: string;
}

interface TrensaksiRow {
    id: number;
    no_trans: string;
    tanggal: string;
    rekening: string;
    rekening_nama: string;
    valid: boolean;
    total: number;
    uraian: string;
}

interface Summary {
    total: number;
    closed: number;
    open: number;
}

const props = defineProps<{
    trensaksis: TrensaksiRow[];
    masjids: MasjidOption[];
    filters: {
        masjid_id: string | null;
        month: string;
        status: 'all' | 'open' | 'closed';
    };
    summary: Summary;
    is_admin: boolean;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Validasi Buku Besar', href: '/validasi-buku-besar' },
        ],
    },
});

const page = usePage();
const errors = computed(() => page.props.errors as Record<string, string>);

const masjidId = ref(props.filters.masjid_id ?? '');
const month = ref(props.filters.month);
const status = ref<'all' | 'open' | 'closed'>(props.filters.status);

const selected = ref<number[]>([]);

function reload() {
    router.get(
        '/validasi-buku-besar',
        {
            masjid_id: masjidId.value || undefined,
            month: month.value || undefined,
            status: status.value,
        },
        { preserveState: true, preserveScroll: true, replace: true },
    );
}

watch([masjidId, month, status], () => {
    selected.value = [];
    reload();
});

const allIds = computed(() => props.trensaksis.map((t) => t.id));
const allSelected = computed(
    () =>
        allIds.value.length > 0 &&
        allIds.value.every((id) => selected.value.includes(id)),
);

function toggleAll(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    selected.value = checked ? [...allIds.value] : [];
}

function toggleOne(id: number, e: Event) {
    const checked = (e.target as HTMLInputElement).checked;

    if (checked) {
        if (!selected.value.includes(id)) {
            selected.value.push(id);
        }
    } else {
        selected.value = selected.value.filter((x) => x !== id);
    }
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

function validateSelected() {
    if (selected.value.length === 0) {
        return;
    }

    router.post(
        '/validasi-buku-besar/validate',
        { ids: selected.value },
        {
            preserveScroll: true,
            onSuccess: () => {
                selected.value = [];
            },
        },
    );
}

function invalidateSelected() {
    if (selected.value.length === 0) {
        return;
    }

    router.post(
        '/validasi-buku-besar/invalidate',
        { ids: selected.value },
        {
            preserveScroll: true,
            onSuccess: () => {
                selected.value = [];
            },
        },
    );
}

function validateAllOpen() {
    const ids = props.trensaksis.filter((t) => !t.valid).map((t) => t.id);

    if (ids.length === 0) {
        return;
    }

    router.post(
        '/validasi-buku-besar/validate',
        { ids },
        { preserveScroll: true, onSuccess: () => (selected.value = []) },
    );
}

// const monthInput = ref(null);

// const openMonthPicker = () => {
//     monthInput.value?.showPicker?.();
//     monthInput.value?.focus();
// };
</script>

<template>
    <Head title="Validasi Buku Besar" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <FileCheck2 class="h-5 w-5" />
                            Validasi / Closing Buku Besar
                        </CardTitle>
                        <CardDescription>
                            Kunci (Closed) atau buka kembali (Opened) transaksi
                            agar data tidak dapat diubah/dihapus. Hanya Admin
                            yang dapat memproses.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent class="space-y-4">
                <!-- Filter -->
                <div class="grid gap-4 md:grid-cols-3">
                    <div class="space-y-2">
                        <label class="text-sm font-medium">Masjid</label>
                        <Select v-model="masjidId" :disabled="!props.is_admin">
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih masjid" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    v-for="m in masjids"
                                    :key="m.id"
                                    :value="m.id"
                                >
                                    {{ m.nama }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <p
                            v-if="errors.masjid_id"
                            class="text-sm text-destructive"
                        >
                            {{ errors.masjid_id }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-medium">Bulan</label>

                        <div class="relative">
                            <Input
                                v-model="month"
                                type="month"
                                class="cursor-pointer [appearance:none] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:opacity-0"
                            />
                            <!-- Ikon kalender manual di pojok kanan (opsional, karena yang asli kita buat transparan) -->
                            <CalendarIcon
                                class="pointer-events-none absolute top-2.5 right-3 h-4 w-4 opacity-50"
                            />
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-medium">Status</label>
                        <Select v-model="status">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem value="open">Opened</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <!-- Summary + Actions -->
                <div
                    class="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/30 px-4 py-3"
                >
                    <div class="flex flex-wrap items-center gap-4 text-sm">
                        <span
                            >Total: <strong>{{ summary.total }}</strong></span
                        >
                        <span class="text-green-700"
                            >Closed: <strong>{{ summary.closed }}</strong></span
                        >
                        <span class="text-red-700"
                            >Opened: <strong>{{ summary.open }}</strong></span
                        >
                        <span class="text-muted-foreground"
                            >Terpilih:
                            <strong>{{ selected.length }}</strong></span
                        >
                    </div>
                    <div
                        v-if="props.is_admin"
                        class="flex flex-wrap items-center gap-2"
                    >
                        <Button
                            class="gap-2 bg-green-600 hover:bg-green-700"
                            :disabled="selected.length === 0"
                            @click="validateSelected"
                        >
                            <Lock class="h-4 w-4" />
                            Validasi Terpilih
                        </Button>
                        <Button
                            variant="secondary"
                            class="gap-2"
                            :disabled="selected.length === 0"
                            @click="invalidateSelected"
                        >
                            <Unlock class="h-4 w-4" />
                            Batalkan Validasi
                        </Button>
                        <Button
                            variant="outline"
                            class="gap-2"
                            :disabled="summary.open === 0"
                            @click="validateAllOpen"
                        >
                            <CheckCircle2 class="h-4 w-4" />
                            Validasi Semua Opened ({{ summary.open }})
                        </Button>
                    </div>
                </div>

                <!-- Table -->
                <div class="overflow-x-auto rounded-lg border">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b bg-muted/50">
                                <th class="w-10 px-4 py-3 text-center">
                                    <input
                                        type="checkbox"
                                        :checked="allSelected"
                                        :disabled="
                                            !props.is_admin ||
                                            trensaksis.length === 0
                                        "
                                        @change="toggleAll"
                                    />
                                </th>
                                <th
                                    class="w-32 px-4 py-3 text-left font-semibold"
                                >
                                    Tanggal
                                </th>
                                <th
                                    class="w-28 px-4 py-3 text-left font-semibold"
                                >
                                    No Trans
                                </th>
                                <th
                                    class="w-64 px-4 py-3 text-left font-semibold"
                                >
                                    Nama Rekening
                                </th>
                                <th class="px-4 py-3 text-left font-semibold">
                                    Uraian
                                </th>
                                <th
                                    class="w-36 px-4 py-3 text-right font-semibold"
                                >
                                    Total
                                </th>
                                <th
                                    class="w-28 px-4 py-3 text-center font-semibold"
                                >
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="item in trensaksis"
                                :key="item.id"
                                class="border-b transition-colors last:border-0 hover:bg-muted/30"
                            >
                                <td class="px-4 py-3 text-center">
                                    <input
                                        type="checkbox"
                                        :checked="selected.includes(item.id)"
                                        :disabled="!props.is_admin"
                                        @change="(e) => toggleOne(item.id, e)"
                                    />
                                </td>
                                <td class="px-4 py-3">
                                    {{ formatDate(item.tanggal) }}
                                </td>
                                <td class="px-4 py-3 font-mono">
                                    {{ item.no_trans }}
                                </td>
                                <td class="px-4 py-3">
                                    {{ item.rekening_nama }}
                                </td>
                                <td class="px-4 py-3 whitespace-pre-line">
                                    {{ item.uraian }}
                                </td>
                                <td class="px-4 py-3 text-right font-mono">
                                    {{ formatCurrency(item.total) }}
                                </td>
                                <td class="px-4 py-3 text-center">
                                    <Badge
                                        :class="
                                            item.valid
                                                ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                                : 'bg-red-100 text-red-900 hover:bg-red-100'
                                        "
                                    >
                                        {{ item.valid ? 'Closed' : 'Opened' }}
                                    </Badge>
                                </td>
                            </tr>
                            <tr v-if="trensaksis.length === 0">
                                <td
                                    colspan="7"
                                    class="px-4 py-8 text-center text-muted-foreground"
                                >
                                    Tidak ada transaksi untuk filter yang
                                    dipilih.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
