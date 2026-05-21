<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import {
    ArrowLeft,
    Check,
    ChevronDown,
    ChevronsUpDown,
    Copy,
    Plus,
    Save,
    Trash2,
} from 'lucide-vue-next';
import { computed, ref } from 'vue';
import DateInput from '@/components/DateInput.vue';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
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
import { cn } from '@/lib/utils';

interface RekeningData {
    id: number;
    kelompok: string;
    jenis: string;
    nama: string;
}

interface DetailRow {
    id?: number;
    uraian: string;
    jumlah: string;
}

interface SaldoKasItem {
    rekening: string;
    rekening_nama: string;
    saldo: number;
}

interface TransaksiData {
    id: number;
    tahun: string;
    no_trans: string;
    tanggal: string;
    jenis: string;
    bayar: string;
    rekening: string;
    valid: boolean;
    details: DetailRow[];
}

const props = defineProps<{
    transaksi: TransaksiData;
    allRekenings: RekeningData[];
    saldoKas: Record<string, Record<string, SaldoKasItem[]>>;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Transaksi', href: '/transaksis' },
            { title: 'Edit', href: '#' },
        ],
    },
});

const transaksiOptions = [
    { value: '1', label: 'Saldo Awal' },
    { value: '2', label: 'Penerimaan' },
    { value: '3', label: 'Mutasi Kas' },
    { value: '4', label: 'Pengeluaran' },
    { value: '5', label: 'Pungutan Pajak' },
    { value: '6', label: 'Setoran Pajak' },
    { value: '7', label: 'Utang' },
    { value: '8', label: 'SPJ Petty Cash' },
    { value: '9', label: 'Saldo Awal Petty Cash' },
    { value: '10', label: 'SPJ Petty Cash-Bank' },
    { value: '11', label: 'Saldo Awal Petty Cash-Bank' },
];

const bayarOptions = [
    { value: '0', label: 'Bank' },
    { value: '1', label: 'Tunai' },
];

const currentYear = new Date().getFullYear();
const tahunOptions = Array.from({ length: 5 }, (_, i) => {
    const y = currentYear - 2 + i;

    return { value: String(y), label: String(y) };
});

// Form state
const form = ref({
    tahun: props.transaksi.tahun,
    tanggal: props.transaksi.tanggal,
    jenis: props.transaksi.jenis,
    bayar: props.transaksi.bayar,
    rekening: props.transaksi.rekening,
    valid: props.transaksi.valid,
});

// function formatRupiah(val: string | number): string {
//     const raw = String(val).trim();

//     if (!raw) {
//         return '';
//     }

//     const cleaned = raw.replace(/[^0-9,]/g, '');

//     if (!cleaned) {
//         return '';
//     }

//     const commaIndex = cleaned.lastIndexOf(',');

//     let integerPart = cleaned;
//     let decimalPart = '';
//     let hasDecimal = false;

//     if (commaIndex !== -1) {
//         hasDecimal = true;
//         integerPart = cleaned.slice(0, commaIndex);
//         decimalPart = cleaned.slice(commaIndex + 1);
//     }

//     integerPart = integerPart.replace(/\D/g, '');
//     decimalPart = decimalPart.replace(/\D/g, '').slice(0, 2);

//     if (!integerPart && !decimalPart) {
//         return '';
//     }

//     const formattedInteger = integerPart
//         ? Number(integerPart).toLocaleString('id-ID')
//         : '0';

//     if (hasDecimal) {
//         return `${formattedInteger},${decimalPart}`;
//     }

//     return formattedInteger;
// }

function formatRupiah(val: string | number): string {
    const raw = String(val).trim();

    if (!raw) {
        return '';
    }

    // Bersihkan selain angka dan titik desimal
    const cleaned = raw.replace(/[^0-9.]/g, '');

    if (!cleaned) {
        return '';
    }

    const dotIndex = cleaned.lastIndexOf('.');

    let integerPart = cleaned;
    let decimalPart = '';
    let hasDecimal = false;

    if (dotIndex !== -1) {
        hasDecimal = true;
        integerPart = cleaned.slice(0, dotIndex);
        decimalPart = cleaned.slice(dotIndex + 1);
    }

    integerPart = integerPart.replace(/\D/g, '');
    decimalPart = decimalPart.replace(/\D/g, '').slice(0, 2);

    if (!integerPart && !decimalPart) {
        return '';
    }

    const formattedInteger = integerPart
        ? Number(integerPart).toLocaleString('en-US')
        : '0';

    if (hasDecimal) {
        return `${formattedInteger}.${decimalPart}`;
    }

    return formattedInteger;
}

const details = ref<DetailRow[]>(
    props.transaksi.details.length > 0
        ? props.transaksi.details.map((d) => ({
            ...d,
            jumlah: formatRupiahFromDatabase(d.jumlah),
        }))
        : [{ uraian: '', jumlah: '' }],
);

const errors = ref<Record<string, string>>({});
const processing = ref(false);
const openRekeningPopover = ref(false);
const saldoAccordionOpen = ref(false);

function getRekeningLabel(jenis: string): string {
    const rek = props.allRekenings.find((r) => r.jenis === jenis);

    return rek ? `${rek.jenis} ${rek.nama}` : '';
}

function selectRekening(jenis: string) {
    form.value.rekening = jenis;
    openRekeningPopover.value = false;
}

function addDetail() {
    details.value.push({ uraian: '', jumlah: '' });
}

function copyDetail(index: number) {
    const source = details.value[index];

    details.value.splice(index + 1, 0, {
        uraian: source.uraian,
        jumlah: source.jumlah,
    });
}

function removeDetail(index: number) {
    details.value.splice(index, 1);
}

function onJumlahInput(index: number) {
    details.value[index].jumlah = formatRupiah(details.value[index].jumlah);
}

// function onJumlahBlur(index: number) {
//     details.value[index].jumlah = formatRupiah(details.value[index].jumlah);
// }

function onJumlahBlur(index: number) {
    const value = parseRupiah(details.value[index].jumlah);

    if (!value) {
        details.value[index].jumlah = '';
        return;
    }

    details.value[index].jumlah = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

// function parseRupiah(val: string): number {
//     const raw = String(val).trim();

//     if (!raw) {
//         return 0;
//     }

//     const commaIndex = raw.lastIndexOf(',');

//     if (commaIndex === -1) {
//         return Number(raw.replace(/\D/g, '')) || 0;
//     }

//     const integerPart = raw.slice(0, commaIndex).replace(/\D/g, '');
//     const decimalPart = raw.slice(commaIndex + 1).replace(/\D/g, '');
//     const normalized = `${integerPart || '0'}.${decimalPart}`;

//     return Number(normalized) || 0;
// }

function parseRupiah(val: string): number {
    const raw = String(val).trim();

    if (!raw) {
        return 0;
    }

    // Format input: 22,409,900.00
    const normalized = raw.replace(/,/g, '');

    return Number(normalized) || 0;
}

const currentSaldoKas = computed<SaldoKasItem[]>(() => {
    return props.saldoKas?.[form.value.tahun]?.[form.value.bayar] ?? [];
});

const bayarLabel = computed(() => {
    return (
        bayarOptions.find((opt) => opt.value === form.value.bayar)?.label ?? '-'
    );
});

function formatRupiahFromDatabase(val: string | number): string {
    const raw = String(val).trim();

    if (!raw) {
        return '';
    }

    const numberValue = Number(raw);

    if (Number.isNaN(numberValue)) {
        return '';
    }

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numberValue);
}
// function formatCurrency(value: number): string {
//     return new Intl.NumberFormat('id-ID').format(value);
// }

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

function submit() {
    processing.value = true;
    errors.value = {};

    router.put(
        `/transaksis/${props.transaksi.id}`,
        {
            tahun: form.value.tahun,
            tanggal: form.value.tanggal,
            jenis: form.value.jenis,
            bayar: form.value.bayar,
            rekening: form.value.rekening,
            valid: form.value.valid,
            details: details.value.map((d) => ({
                uraian: d.uraian,
                jumlah: parseRupiah(d.jumlah),
            })),
        },
        {
            onError: (errs) => {
                errors.value = errs;
            },
            onFinish: () => {
                processing.value = false;
            },
        },
    );
}
</script>

<template>

    <Head :title="`Edit Transaksi ${transaksi.no_trans}`" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card class="mx-auto w-full max-w-5xl">
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle>Edit {{ transaksi.no_trans }}</CardTitle>
                        <CardDescription>Ubah data transaksi.</CardDescription>
                    </div>
                    <Button variant="destructive" size="sm" class="gap-1"
                        @click="router.delete(`/transaksis/${transaksi.id}`)">
                        <Trash2 class="h-3.5 w-3.5" />
                        Delete
                    </Button>
                </div>
            </CardHeader>
            <CardContent class="space-y-6">
                <!-- Periode Section -->
                <div class="space-y-4 rounded-lg border p-4">
                    <div>
                        <h3 class="text-base font-semibold">Periode</h3>
                        <p class="text-sm text-muted-foreground">
                            Data periode dan jenis transaksi.
                        </p>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <!-- Tahun Anggaran -->
                        <div class="space-y-2">
                            <Label>Tahun Anggaran
                                <span class="text-destructive">*</span></Label>
                            <Select v-model="form.tahun">
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Pilih tahun" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="opt in tahunOptions" :key="opt.value" :value="opt.value">
                                        {{ opt.label }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <p v-if="errors.tahun" class="text-sm text-destructive">
                                {{ errors.tahun }}
                            </p>
                        </div>

                        <!-- No Trans -->
                        <div class="space-y-2">
                            <Label>No Trans</Label>
                            <Input :model-value="transaksi.no_trans" disabled class="bg-muted font-mono" />
                        </div>

                        <!-- Tanggal -->
                        <div class="space-y-2">
                            <Label>Tanggal
                                <span class="text-destructive">*</span></Label>
                            <DateInput v-model="form.tanggal" />
                            <p v-if="errors.tanggal" class="text-sm text-destructive">
                                {{ errors.tanggal }}
                            </p>
                        </div>

                        <!-- Jenis Transaksi -->
                        <div class="space-y-2">
                            <Label>Jenis Transaksi
                                <span class="text-destructive">*</span></Label>
                            <Select v-model="form.jenis">
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Pilih jenis" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="opt in transaksiOptions" :key="opt.value" :value="opt.value">
                                        {{ opt.label }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <p v-if="errors.jenis" class="text-sm text-destructive">
                                {{ errors.jenis }}
                            </p>
                        </div>

                        <!-- Cara Bayar -->
                        <div class="space-y-2">
                            <Label>Cara Bayar
                                <span class="text-destructive">*</span></Label>
                            <Select v-model="form.bayar">
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Pilih cara bayar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="opt in bayarOptions" :key="opt.value" :value="opt.value">
                                        {{ opt.label }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <p v-if="errors.bayar" class="text-sm text-destructive">
                                {{ errors.bayar }}
                            </p>
                        </div>

                        <!-- Nama Kode Buku Besar -->
                        <div class="space-y-2">
                            <Label>Nama Kode Buku Besar
                                <span class="text-destructive">*</span></Label>
                            <Popover v-model:open="openRekeningPopover">
                                <PopoverTrigger as-child>
                                    <Button variant="outline" role="combobox"
                                        class="w-full justify-between font-normal">
                                        <span class="truncate">
                                            {{
                                                form.rekening
                                                    ? getRekeningLabel(
                                                        form.rekening,
                                                    )
                                                    : 'Pilih rekening...'
                                            }}
                                        </span>
                                        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-[400px] p-0" align="start">
                                    <Command>
                                        <CommandInput placeholder="Cari rekening..." />
                                        <CommandList>
                                            <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem v-for="rek in allRekenings" :key="rek.id"
                                                    :value="`${rek.jenis} - ${rek.nama}`" @select="
                                                        selectRekening(
                                                            rek.jenis,
                                                        )
                                                        ">
                                                    <Check :class="cn(
                                                        'mr-2 h-4 w-4',
                                                        form.rekening ===
                                                            rek.jenis
                                                            ? 'opacity-100'
                                                            : 'opacity-0',
                                                    )
                                                        " />
                                                    <span class="font-mono text-xs">{{ rek.jenis }}</span>
                                                    <span class="ml-2 truncate">{{ rek.nama }}</span>
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <button v-if="form.rekening" type="button"
                                class="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                                @click="form.rekening = ''">
                                &times; Hapus pilihan
                            </button>
                            <p v-if="errors.rekening" class="text-sm text-destructive">
                                {{ errors.rekening }}
                            </p>
                        </div>

                        <div class="space-y-2 md:col-span-2">
                            <button type="button"
                                class="flex w-full items-center justify-between rounded-md border bg-muted/30 px-4 py-3 text-left"
                                @click="
                                    saldoAccordionOpen = !saldoAccordionOpen
                                    ">
                                <div>
                                    <p class="font-medium">
                                        Saldo kas {{ bayarLabel }}
                                    </p>
                                    <p class="text-xs text-muted-foreground">
                                        Informasi saldo kas berdasarkan cara
                                        bayar dan tahun anggaran.
                                    </p>
                                </div>
                                <ChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" :class="{
                                    'rotate-180': saldoAccordionOpen,
                                }" />
                            </button>

                            <div v-if="saldoAccordionOpen" class="rounded-md border bg-muted/30 p-4 text-sm">
                                <div v-if="currentSaldoKas.length > 0" class="space-y-3">
                                    <div v-for="item in currentSaldoKas"
                                        :key="`${form.tahun}-${form.bayar}-${item.rekening}`"
                                        class="flex items-start justify-between gap-4 rounded-md border bg-background/60 px-4 py-3">
                                        <div>
                                            <p class="font-medium">
                                                {{ item.rekening_nama }}
                                            </p>
                                            <p class="text-xs text-muted-foreground">
                                                {{ item.rekening }}
                                            </p>
                                        </div>
                                        <p class="text-right font-semibold">
                                            Rp {{ formatCurrency(item.saldo) }}
                                        </p>
                                    </div>
                                </div>
                                <p v-else class="text-xs text-muted-foreground">
                                    Belum ada saldo kas
                                    {{ bayarLabel.toLowerCase() }} untuk tahun
                                    {{ form.tahun }}.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Detail Transaksi Section -->
                <div class="space-y-4">
                    <h3 class="text-base font-semibold">Detail Transaksi</h3>

                    <div class="overflow-x-auto rounded-lg border">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b bg-muted/50">
                                    <th class="px-3 py-3 text-left font-semibold">
                                        Uraian Transaksi
                                    </th>
                                    <th class="w-48 px-3 py-3 text-right font-semibold">
                                        Jumlah
                                    </th>
                                    <th class="w-20 px-3 py-3 text-center font-semibold">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, index) in details" :key="index"
                                    class="border-b last:border-0 hover:bg-muted/20">
                                    <td class="px-3 py-2">
                                        <Input v-model="row.uraian" placeholder="Uraian transaksi" />
                                        <p v-if="
                                            errors[
                                            `details.${index}.uraian`
                                            ]
                                        " class="mt-1 text-xs text-destructive">
                                            {{
                                                errors[
                                                `details.${index}.uraian`
                                                ]
                                            }}
                                        </p>
                                    </td>
                                    <td class="px-3 py-2">
                                        <Input v-model="row.jumlah" type="text" inputmode="decimal" class="text-right"
                                            placeholder="0" @input="onJumlahInput(index)" @blur="onJumlahBlur(index)" />
                                        <p v-if="
                                            errors[
                                            `details.${index}.jumlah`
                                            ]
                                        " class="mt-1 text-xs text-destructive">
                                            {{
                                                errors[
                                                `details.${index}.jumlah`
                                                ]
                                            }}
                                        </p>
                                    </td>
                                    <td class="px-3 py-2">
                                        <div class="flex items-center justify-center gap-1">
                                            <Button variant="ghost" size="icon" class="h-8 w-8" title="Copy"
                                                @click="copyDetail(index)">
                                                <Copy class="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon"
                                                class="h-8 w-8 text-destructive hover:text-destructive" title="Hapus"
                                                @click="removeDetail(index)">
                                                <Trash2 class="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="details.length === 0">
                                    <td colspan="3" class="px-4 py-6 text-center text-muted-foreground">
                                        Belum ada detail. Klik tombol di bawah
                                        untuk menambah.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="flex justify-center">
                        <Button variant="outline" class="gap-2" @click="addDetail">
                            <Plus class="h-4 w-4" />
                            Tambah Detail
                        </Button>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center gap-3 border-t pt-4">
                    <Button :disabled="processing" class="gap-2" @click="submit">
                        <Save class="h-4 w-4" />
                        Simpan
                    </Button>
                    <Button variant="outline" as-child class="gap-2">
                        <Link href="/transaksis">
                            <ArrowLeft class="h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
