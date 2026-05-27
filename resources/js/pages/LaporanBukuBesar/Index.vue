<script setup lang="ts">
import { Head, router, usePage } from '@inertiajs/vue3';
import { BookOpen, ChevronDown, FileDown, X } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import DateInput from '@/components/DateInput.vue';
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
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
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

interface RekeningOption {
    id: number;
    jenis: string;
    nama: string;
}

interface BukuBesarEntry {
    tanggal: string;
    no_trans: string;
    transaksi: string;
    uraian: string;
    debet: number;
    kredit: number;
    saldo: number;
}

interface BukuBesarGroup {
    rekening: {
        id: number;
        jenis: string;
        nama: string;
    };
    entries: BukuBesarEntry[];
    total_debet: number;
    total_kredit: number;
    saldo_akhir: number;
}

const props = defineProps<{
    filters: {
        tanggal_mulai: string;
        tanggal_akhir: string;
        masjid_id: string | null;
        rekening_id: (number | string)[];
    };
    masjids: MasjidOption[];
    rekenings: RekeningOption[];
    buku_besar: BukuBesarGroup[];
    generated: boolean;
    is_admin: boolean;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Laporan Buku Besar', href: '/laporan-buku-besar' },
        ],
    },
});

const page = usePage();
const errors = computed(() => page.props.errors as Record<string, string>);

const form = ref({
    tanggal_mulai: props.filters.tanggal_mulai,
    tanggal_akhir: props.filters.tanggal_akhir,
    masjid_id: props.filters.masjid_id ?? '',
    rekening_id: props.filters.rekening_id.map((id) => Number(id)),
});

const processing = ref(false);
const hasData = computed(() => props.buku_besar.length > 0);
const openRekeningPopover = ref(false);

const selectedRekenings = computed(() =>
    props.rekenings.filter((r) => form.value.rekening_id.includes(r.id)),
);

function toggleRekening(id: number) {
    const idx = form.value.rekening_id.indexOf(id);

    if (idx >= 0) {
        form.value.rekening_id.splice(idx, 1);
    } else {
        form.value.rekening_id.push(id);
    }
}

function removeRekening(id: number) {
    form.value.rekening_id = form.value.rekening_id.filter((rid) => rid !== id);
}

function generateReport() {
    processing.value = true;

    router.get(
        '/laporan-buku-besar',
        {
            ...form.value,
            generate: 1,
        },
        {
            preserveState: false,
            onFinish: () => {
                processing.value = false;
            },
        },
    );
}

function exportPdf() {
    window.open('/laporan-buku-besar-pdf', '_blank');
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID');
}

function getMasjidNama(): string {
    const m = props.masjids.find((x) => x.id === form.value.masjid_id);

    return m?.nama ?? '-';
}
</script>

<template>

    <Head title="Laporan Buku Besar" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold">
                Laporan Buku Besar (General Ledger)
            </h1>
            <div class="flex items-center gap-2">
                <Button class="gap-2" :disabled="processing" @click="generateReport">
                    <BookOpen class="h-4 w-4" />
                    {{ processing ? 'Memproses...' : 'Generate Laporan' }}
                </Button>
                <Button variant="secondary" class="gap-2 bg-green-600 text-white hover:bg-green-700"
                    :disabled="!hasData" @click="exportPdf">
                    <FileDown class="h-4 w-4" />
                    Export PDF
                </Button>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Filter Laporan</CardTitle>
            </CardHeader>
            <CardContent>
                <div class="rounded-lg border p-4">
                    <div class="grid gap-4 md:grid-cols-2">
                        <!-- Masjid -->
                        <div class="space-y-2">
                            <Label>Masjid
                                <span class="text-destructive">*</span></Label>
                            <Select v-model="form.masjid_id" :disabled="!props.is_admin">
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Pilih masjid" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="m in masjids" :key="m.id" :value="m.id">
                                        {{ m.nama }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <p v-if="errors.masjid_id" class="text-sm text-destructive">
                                {{ errors.masjid_id }}
                            </p>
                        </div>

                        <!-- Rekening multi-select with tags -->
                        <div class="space-y-2">
                            <Label>Rekening</Label>
                            <Popover v-model:open="openRekeningPopover">
                                <PopoverTrigger as-child>
                                    <div
                                        class="flex min-h-10 w-full cursor-pointer flex-wrap items-center gap-1 rounded-md border border-input bg-background px-3 py-2 hover:bg-accent">
                                        <Badge v-for="rek in selectedRekenings" :key="rek.id" variant="secondary"
                                            class="gap-1">
                                            {{ rek.nama }}
                                            <button type="button" class="hover:text-destructive" @click.stop="
                                                removeRekening(rek.id)
                                                ">
                                                <X class="h-3 w-3" />
                                            </button>
                                        </Badge>
                                        <span v-if="
                                            selectedRekenings.length === 0
                                        " class="text-sm text-muted-foreground">
                                            Pilih rekening atau kosongkan untuk
                                            semua rekening
                                        </span>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent class="w-[400px] p-0" align="start">
                                    <Command>
                                        <CommandInput placeholder="Cari rekening..." />
                                        <CommandList>
                                            <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem v-for="r in rekenings" :key="r.id"
                                                    :value="`${r.jenis} - ${r.nama}`" @select="
                                                        (ev: any) => { ev.preventDefault(); toggleRekening(r.id); }
                                                    ">
                                                    <span :class="form.rekening_id.includes(
                                                        r.id,
                                                    )
                                                        ? 'font-semibold'
                                                        : ''
                                                        ">
                                                        {{ r.jenis }} -
                                                        {{ r.nama }}
                                                    </span>
                                                    <span v-if="
                                                        form.rekening_id.includes(
                                                            r.id,
                                                        )
                                                    " class="ml-auto text-primary">✓</span>
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <!-- Tanggal mulai -->
                        <div class="space-y-2">
                            <Label>Tanggal mulai
                                <span class="text-destructive">*</span></Label>
                            <DateInput v-model="form.tanggal_mulai" />
                            <p v-if="errors.tanggal_mulai" class="text-sm text-destructive">
                                {{ errors.tanggal_mulai }}
                            </p>
                        </div>

                        <!-- Tanggal akhir -->
                        <div class="space-y-2">
                            <Label>Tanggal akhir
                                <span class="text-destructive">*</span></Label>
                            <DateInput v-model="form.tanggal_akhir" />
                            <p v-if="errors.tanggal_akhir" class="text-sm text-destructive">
                                {{ errors.tanggal_akhir }}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Result Card -->
        <Card v-if="hasData">
            <CardHeader>
                <CardTitle>Laporan Buku Besar - {{ getMasjidNama() }}</CardTitle>
                <CardDescription>
                    Periode: {{ formatDate(form.tanggal_mulai) }} -
                    {{ formatDate(form.tanggal_akhir) }}
                </CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
                <Collapsible v-for="group in buku_besar" :key="group.rekening.id" v-slot="{ open }" :default-open="false" class="rounded-lg border">
                    <CollapsibleTrigger class="w-full">
                        <div class="flex cursor-pointer items-center justify-between gap-4 p-4 hover:bg-muted/30 transition-colors">
                            <div class="text-left">
                                <h3 class="font-semibold">
                                    {{ group.rekening.nama }}
                                </h3>
                                <p class="text-sm text-muted-foreground">
                                    Jenis: {{ group.rekening.jenis }}
                                </p>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="text-right">
                                    <p class="text-xs text-muted-foreground">
                                        Saldo Akhir
                                    </p>
                                    <p class="text-lg font-bold text-green-600">
                                        Rp {{ formatCurrency(group.saldo_akhir) }}
                                    </p>
                                </div>
                                <ChevronDown class="h-5 w-5 text-muted-foreground transition-transform duration-200" :class="{ 'rotate-180': open }" />
                            </div>
                        </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                        <div class="border-t overflow-x-auto">
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b bg-muted/50 text-xs tracking-wider uppercase">
                                        <th class="w-28 px-3 py-2 text-left">
                                            Tanggal
                                        </th>
                                        <th class="w-24 px-3 py-2 text-left">
                                            No. Trans
                                        </th>
                                        <th class="px-3 py-2 text-left">Uraian</th>
                                        <th class="w-36 px-3 py-2 text-right">
                                            Debet
                                        </th>
                                        <th class="w-36 px-3 py-2 text-right">
                                            Kredit
                                        </th>
                                        <th class="w-40 px-3 py-2 text-right">
                                            Saldo
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(entry, idx) in group.entries" :key="idx"
                                        class="border-b last:border-0 hover:bg-muted/20">
                                        <td class="px-3 py-2">
                                            {{ formatDate(entry.tanggal) }}
                                        </td>
                                        <td class="px-3 py-2">
                                            {{ entry.no_trans || '' }}
                                        </td>
                                        <td class="px-3 py-2">
                                            {{ entry.uraian }}
                                        </td>
                                        <td class="px-3 py-2 text-right">
                                            {{
                                                entry.debet
                                                    ? `Rp
                                            ${formatCurrency(entry.debet)}`
                                                    : '-'
                                            }}
                                        </td>
                                        <td class="px-3 py-2 text-right">
                                            {{
                                                entry.kredit
                                                    ? `Rp
                                            ${formatCurrency(entry.kredit)}`
                                                    : '-'
                                            }}
                                        </td>
                                        <td class="px-3 py-2 text-right font-medium text-green-600">
                                            Rp {{ formatCurrency(entry.saldo) }}
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr class="border-t bg-muted/40 font-semibold">
                                        <td colspan="3" class="px-3 py-2 text-right">
                                            Total
                                        </td>
                                        <td class="px-3 py-2 text-right">
                                            Rp
                                            {{ formatCurrency(group.total_debet) }}
                                        </td>
                                        <td class="px-3 py-2 text-right">
                                            Rp
                                            {{ formatCurrency(group.total_kredit) }}
                                        </td>
                                        <td class="px-3 py-2 text-right text-green-600">
                                            Rp
                                            {{ formatCurrency(group.saldo_akhir) }}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>

        <!-- Empty state -->
        <Card v-else-if="props.generated && !hasData">
            <CardContent class="py-16 text-center">
                <BookOpen class="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 class="mt-4 font-semibold">Tidak ada data</h3>
                <p class="mt-1 text-sm text-muted-foreground">
                    Tidak ditemukan transaksi untuk filter yang dipilih.
                </p>
            </CardContent>
        </Card>

        <Card v-else>
            <CardContent class="py-16 text-center">
                <BookOpen class="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 class="mt-4 font-semibold">Belum ada data laporan</h3>
                <p class="mt-1 text-sm text-muted-foreground">
                    Klik tombol "Generate Laporan" untuk membuat laporan buku
                    besar.
                </p>
            </CardContent>
        </Card>
    </div>
</template>
