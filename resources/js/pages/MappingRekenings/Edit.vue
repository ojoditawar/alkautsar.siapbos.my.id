<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import {
    ArrowLeft,
    Check,
    ChevronsUpDown,
    Copy,
    Plus,
    Save,
    Trash2,
    ArrowUpDown,
} from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
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

interface RekeningData {
    id: number;
    jenis: string;
    nama: string;
    rek_id: string;
    sub_rek_id: number;
}

interface MappingRow {
    id?: number;
    transaksi: string;
    bayar: string;
    jurnal: string;
    kolom: string;
    keterangan: string;
}

const props = defineProps<{
    rekening: RekeningData;
    mappings: MappingRow[];
    allRekenings: RekeningData[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Rekening', href: '/reks' },
            { title: 'Mapping Akun', href: '#' },
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
    { value: '8', label: 'SPJ Petty Cash' },
    { value: '9', label: 'Saldo Awal Petty Cash' },
    { value: '10', label: 'SPJ Petty Cash-Bank' },
    { value: '11', label: 'Saldo Awal Petty Cash-Bank' },
];

const bayarOptions = [
    { value: '0', label: 'Bank' },
    { value: '1', label: 'Tunai' },
];

const kolomOptions = [
    { value: 'D', label: 'Debet' },
    { value: 'K', label: 'Kredit' },
];

const filterTransaksi = ref<string>('all');

function createEmptyRow(): MappingRow {
    return {
        transaksi: '1',
        bayar: '0',
        jurnal: '',
        kolom: 'D',
        keterangan: '',
    };
}

const rows = ref<MappingRow[]>(
    props.mappings.length > 0 ? props.mappings.map((m) => ({ ...m })) : [],
);

const processing = ref(false);
const openPopoverIndex = ref<number | null>(null);

function addRow() {
    rows.value.push(createEmptyRow());
}

function copyRow(index: number) {
    const source = rows.value[index];
    rows.value.splice(index + 1, 0, {
        transaksi: source.transaksi,
        bayar: source.bayar,
        jurnal: source.jurnal,
        kolom: source.kolom,
        keterangan: source.keterangan,
    });
}

function removeRow(index: number) {
    rows.value.splice(index, 1);
}

function selectJurnal(index: number, jenis: string) {
    rows.value[index].jurnal = jenis;

    // Auto-fill keterangan dengan nama rekening
    const rek = props.allRekenings.find((r) => r.jenis === jenis);

    if (rek) {
        rows.value[index].keterangan = rek.nama;
    }

    openPopoverIndex.value = null;
}

function getJurnalLabel(jenis: string): string {
    const rek = props.allRekenings.find((r) => r.jenis === jenis);

    return rek ? `${rek.nama}` : '';
}

function getTransaksiLabel(val: string): string {
    return transaksiOptions.find((o) => o.value === val)?.label ?? val;
}

function getBayarLabel(val: string): string {
    return bayarOptions.find((o) => o.value === val)?.label ?? val;
}

const filteredRowEntries = computed(() =>
    rows.value
        .map((row, index) => ({ row, index }))
        .filter(({ row }) =>
            filterTransaksi.value === 'all'
                ? true
                : row.transaksi === filterTransaksi.value,
        ),
);

function submit() {
    processing.value = true;
    router.put(
        `/mapping-rekenings/${props.rekening.id}`,
        {
            rows: rows.value.map((r) => ({
                transaksi: r.transaksi,
                bayar: r.bayar,
                jurnal: r.jurnal,
                kolom: r.kolom,
                keterangan: r.keterangan,
            })),
        },
        {
            preserveScroll: true,
            onFinish: () => {
                processing.value = false;
            },
        },
    );
}
</script>

<template>

    <Head :title="`Mapping Akun - ${rekening.jenis}`" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card class="mx-auto w-full max-w-6xl">
            <CardHeader>
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <CardTitle>Mapping Akun</CardTitle>

                        <CardDescription class="mt-1">
                            Mapping akun untuk rekening
                            <strong>{{ rekening.jenis }} - {{ rekening.nama }}</strong>.
                        </CardDescription>
                    </div>

                    <Button variant="outline" as-child
                        class="gap-2 shrink-0 bg-blue-200 text-blue-700 hover:bg-blue-300">
                        <Link :href="`/reks/${rekening.rek_id}/sub-reks/${rekening.sub_rek_id}/rekenings`">
                            <ArrowLeft class="h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent class="space-y-6">
                <!-- Rekening Info (readonly) -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label>Jenis</Label>
                        <Input :model-value="rekening.jenis" disabled class="bg-muted" />
                    </div>
                    <div class="space-y-2">
                        <Label>Nama</Label>
                        <Input :model-value="rekening.nama" disabled class="bg-muted" />
                    </div>
                </div>

                <!-- Mapping Table -->
                <div class="space-y-4">
                    <div class="flex items-end gap-4">
                        <h3 class="text-base font-semibold">Mapping akun</h3>

                        <div class="w-full max-w-xs space-y-2">
                            <Label>Filter Jenis Transaksi</Label>
                            <Select v-model="filterTransaksi">
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Semua jenis transaksi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua jenis transaksi</SelectItem>
                                    <SelectItem v-for="opt in transaksiOptions" :key="opt.value" :value="opt.value">
                                        {{ opt.label }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div class="overflow-x-auto rounded-lg border">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b bg-muted/50">
                                    <th class="w-8 px-2 py-3 text-center">
                                        <ArrowUpDown class="mx-auto h-4 w-4" />
                                    </th>
                                    <th class="px-2 py-3 text-left font-semibold">
                                        Jenis Transaksi
                                    </th>
                                    <th class="px-2 py-3 text-left font-semibold">
                                        Cara Bayar
                                    </th>
                                    <th class="px-2 py-3 text-left font-semibold">
                                        Akun Mapping
                                    </th>
                                    <th class="w-28 px-2 py-3 text-left font-semibold">
                                        Kolom
                                    </th>
                                    <th class="px-2 py-3 text-left font-semibold">
                                        Keterangan
                                    </th>
                                    <th class="w-20 px-2 py-3 text-center font-semibold">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(
{ row, index }, displayIndex
                                    ) in filteredRowEntries" :key="`${index}-${displayIndex}`"
                                    class="border-b last:border-0 hover:bg-muted/20">
                                    <!-- Drag handle -->
                                    <td class="px-2 py-2 text-center">
                                        <ArrowUpDown class="mx-auto h-4 w-4 cursor-grab text-muted-foreground" />
                                    </td>

                                    <!-- Jenis Transaksi -->
                                    <td class="px-2 py-2">
                                        <Select v-model="row.transaksi">
                                            <SelectTrigger class="w-full min-w-[140px]">
                                                <SelectValue :placeholder="getTransaksiLabel(
                                                    row.transaksi,
                                                )
                                                    " />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem v-for="opt in transaksiOptions" :key="opt.value"
                                                    :value="opt.value">
                                                    {{ opt.label }}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>

                                    <!-- Cara Bayar -->
                                    <td class="px-2 py-2">
                                        <Select v-model="row.bayar">
                                            <SelectTrigger class="w-full min-w-[100px]">
                                                <SelectValue :placeholder="getBayarLabel(row.bayar)
                                                    " />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem v-for="opt in bayarOptions" :key="opt.value"
                                                    :value="opt.value">
                                                    {{ opt.label }}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>

                                    <!-- Akun Mapping (Combobox) -->
                                    <td class="px-2 py-2">
                                        <Popover :open="openPopoverIndex === index" @update:open="
                                            (val: boolean) =>
                                            (openPopoverIndex = val
                                                ? index
                                                : null)
                                        ">
                                            <PopoverTrigger as-child>
                                                <Button variant="outline" role="combobox"
                                                    class="w-full min-w-[200px] justify-between font-normal">
                                                    <span class="truncate">
                                                        {{
                                                            row.jurnal
                                                                ? getJurnalLabel(
                                                                    row.jurnal,
                                                                )
                                                                : 'Pilih akun...'
                                                        }}
                                                    </span>
                                                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent class="w-[320px] p-0" align="start">
                                                <Command>
                                                    <CommandInput placeholder="Cari rekening..." />
                                                    <CommandList>
                                                        <CommandEmpty>Tidak
                                                            ditemukan.</CommandEmpty>
                                                        <CommandGroup>
                                                            <CommandItem v-for="rek in allRekenings" :key="rek.id"
                                                                :value="`${rek.jenis} - ${rek.nama}`" @select="
                                                                    selectJurnal(
                                                                        index,
                                                                        rek.jenis,
                                                                    )
                                                                    ">
                                                                <Check :class="cn(
                                                                    'mr-2 h-4 w-4',
                                                                    row.jurnal ===
                                                                        rek.jenis
                                                                        ? 'opacity-100'
                                                                        : 'opacity-0',
                                                                )
                                                                    " />
                                                                <span class="font-mono text-xs">{{
                                                                    rek.jenis
                                                                    }}</span>
                                                                <span class="ml-2 truncate">{{
                                                                    rek.nama
                                                                    }}</span>
                                                            </CommandItem>
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <!-- Clear button -->
                                        <button v-if="row.jurnal" type="button"
                                            class="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                                            @click="
                                                row.jurnal = '';
                                            row.keterangan = '';
                                            ">
                                            &times; Hapus pilihan
                                        </button>
                                    </td>

                                    <!-- Kolom -->
                                    <td class="px-2 py-2">
                                        <Select v-model="row.kolom">
                                            <SelectTrigger class="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem v-for="opt in kolomOptions" :key="opt.value"
                                                    :value="opt.value">
                                                    {{ opt.label }}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>

                                    <!-- Keterangan -->
                                    <td class="px-2 py-2">
                                        <Input v-model="row.keterangan" placeholder="Nama akun / keterangan"
                                            class="min-w-[160px]" />
                                    </td>

                                    <!-- Aksi: Copy & Delete -->
                                    <td class="px-2 py-2">
                                        <div class="flex items-center justify-center gap-1">
                                            <Button variant="ghost" size="icon" class="h-8 w-8" @click="copyRow(index)"
                                                title="Copy">
                                                <Copy class="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon"
                                                class="h-8 w-8 text-destructive hover:text-destructive"
                                                @click="removeRow(index)" title="Hapus">
                                                <Trash2 class="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="rows.length === 0">
                                    <td colspan="7" class="px-4 py-8 text-center text-muted-foreground">
                                        Belum ada mapping. Klik tombol di bawah
                                        untuk menambah.
                                    </td>
                                </tr>
                                <tr v-else-if="filteredRowEntries.length === 0">
                                    <td colspan="7" class="px-4 py-8 text-center text-muted-foreground">
                                        Tidak ada mapping untuk jenis transaksi
                                        yang dipilih.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Add Row Button -->
                    <div class="flex justify-center">
                        <Button variant="outline" class="gap-2" @click="addRow">
                            <Plus class="h-4 w-4" />
                            Add to mapping akun
                        </Button>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center gap-3 border-t pt-4">
                    <Button :disabled="processing" class="gap-2" @click="submit">
                        <Save class="h-4 w-4" />
                        Simpan
                    </Button>
                    <Button variant="outline" as-child class="gap-2 bg-red-200 text-red-700 hover:bg-red-300">
                        <Link :href="`/reks/${rekening.rek_id}/sub-reks/${rekening.sub_rek_id}/rekenings`">
                            <ArrowLeft class="h-4 w-4" />
                            Batal
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
