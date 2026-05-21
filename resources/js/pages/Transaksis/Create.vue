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
} from 'lucide-vue-next';
import { ref } from 'vue';
import DateInput from '@/components/DateInput.vue';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
    jenis: string;
    nama: string;
}

interface DetailRow {
    uraian: string;
    jumlah: string;
}

const props = defineProps<{
    allRekenings: RekeningData[];
    noTrans: string;
    tahun: number;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Transaksi', href: '/transaksis' },
            { title: 'Tambah', href: '#' },
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
];

const bayarOptions = [
    { value: '0', label: 'Bank' },
    { value: '1', label: 'Tunai' },
];

const tahunOptions = Array.from({ length: 5 }, (_, i) => {
    const y = props.tahun - 2 + i;

    return { value: String(y), label: String(y) };
});

// Form state
const form = ref({
    tahun: String(props.tahun),
    tanggal: new Date().toISOString().slice(0, 10),
    jenis: '1',
    bayar: '0',
    rekening: '',
    valid: false,
});

const details = ref<DetailRow[]>([{ uraian: '', jumlah: '' }]);

const errors = ref<Record<string, string>>({});
const processing = ref(false);
const openRekeningPopover = ref(false);

function getRekeningLabel(jenis: string): string {
    const rek = props.allRekenings.find((r) => r.jenis === jenis);

    return rek ? rek.nama : '';
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

function formatRupiah(val: string | number): string {
    const parsed = Math.round(
        Number(String(val).replace(/[^0-9.-]/g, '')) || 0,
    );

    if (!parsed) {
        return '';
    }

    return parsed.toLocaleString('id-ID');
}

function onJumlahBlur(index: number) {
    details.value[index].jumlah = formatRupiah(details.value[index].jumlah);
}

function parseRupiah(val: string): number {
    return Number(val.replace(/\D/g, '')) || 0;
}

function submit() {
    processing.value = true;
    errors.value = {};

    router.post(
        '/transaksis',
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
    <Head title="Tambah Transaksi" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card class="mx-auto w-full max-w-5xl">
            <CardHeader>
                <CardTitle>Tambah Transaksi</CardTitle>
                <CardDescription
                    >Input transaksi keuangan baru.</CardDescription
                >
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
                            <Label
                                >Tahun Anggaran
                                <span class="text-destructive">*</span></Label
                            >
                            <Select v-model="form.tahun">
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Pilih tahun" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem
                                        v-for="opt in tahunOptions"
                                        :key="opt.value"
                                        :value="opt.value"
                                    >
                                        {{ opt.label }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <p
                                v-if="errors.tahun"
                                class="text-sm text-destructive"
                            >
                                {{ errors.tahun }}
                            </p>
                        </div>

                        <!-- No Trans -->
                        <div class="space-y-2">
                            <Label>No Trans</Label>
                            <Input
                                :model-value="noTrans"
                                disabled
                                class="bg-muted font-mono"
                            />
                        </div>

                        <!-- Tanggal -->
                        <div class="space-y-2">
                            <Label
                                >Tanggal
                                <span class="text-destructive">*</span></Label
                            >
                            <DateInput v-model="form.tanggal" />
                            <p
                                v-if="errors.tanggal"
                                class="text-sm text-destructive"
                            >
                                {{ errors.tanggal }}
                            </p>
                        </div>

                        <!-- Jenis Transaksi -->
                        <div class="space-y-2">
                            <Label
                                >Jenis Transaksi
                                <span class="text-destructive">*</span></Label
                            >
                            <Select v-model="form.jenis">
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Pilih jenis" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem
                                        v-for="opt in transaksiOptions"
                                        :key="opt.value"
                                        :value="opt.value"
                                    >
                                        {{ opt.label }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <p
                                v-if="errors.jenis"
                                class="text-sm text-destructive"
                            >
                                {{ errors.jenis }}
                            </p>
                        </div>

                        <!-- Cara Bayar -->
                        <div class="space-y-2">
                            <Label
                                >Cara Bayar
                                <span class="text-destructive">*</span></Label
                            >
                            <Select v-model="form.bayar">
                                <SelectTrigger class="w-full">
                                    <SelectValue
                                        placeholder="Pilih cara bayar"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem
                                        v-for="opt in bayarOptions"
                                        :key="opt.value"
                                        :value="opt.value"
                                    >
                                        {{ opt.label }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <p
                                v-if="errors.bayar"
                                class="text-sm text-destructive"
                            >
                                {{ errors.bayar }}
                            </p>
                        </div>

                        <!-- Nama Kode Buku Besar (Rekening Combobox) -->
                        <div class="space-y-2">
                            <Label
                                >Nama Kode Buku Besar
                                <span class="text-destructive">*</span></Label
                            >
                            <Popover v-model:open="openRekeningPopover">
                                <PopoverTrigger as-child>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        class="w-full justify-between font-normal"
                                    >
                                        <span class="truncate">
                                            {{
                                                form.rekening
                                                    ? getRekeningLabel(
                                                          form.rekening,
                                                      )
                                                    : 'Pilih rekening...'
                                            }}
                                        </span>
                                        <ChevronsUpDown
                                            class="ml-2 h-4 w-4 shrink-0 opacity-50"
                                        />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-100 p-0" align="start">
                                    <Command>
                                        <CommandInput
                                            placeholder="Cari rekening..."
                                        />
                                        <CommandList>
                                            <CommandEmpty
                                                >Tidak ditemukan.</CommandEmpty
                                            >
                                            <CommandGroup>
                                                <CommandItem
                                                    v-for="rek in allRekenings"
                                                    :key="rek.id"
                                                    :value="`${rek.jenis} - ${rek.nama}`"
                                                    @select="
                                                        selectRekening(
                                                            rek.jenis,
                                                        )
                                                    "
                                                >
                                                    <Check
                                                        :class="
                                                            cn(
                                                                'mr-2 h-4 w-4',
                                                                form.rekening ===
                                                                    rek.jenis
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0',
                                                            )
                                                        "
                                                    />
                                                    <span
                                                        class="font-mono text-xs"
                                                        >{{ rek.jenis }}</span
                                                    >
                                                    <span
                                                        class="ml-2 truncate"
                                                        >{{ rek.nama }}</span
                                                    >
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <button
                                v-if="form.rekening"
                                type="button"
                                class="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                                @click="form.rekening = ''"
                            >
                                &times; Hapus pilihan
                            </button>
                            <p
                                v-if="errors.rekening"
                                class="text-sm text-destructive"
                            >
                                {{ errors.rekening }}
                            </p>
                        </div>
                    </div>

                    <!-- Nominatif Toggle -->
                    <!-- <div class="flex items-center gap-3">
                        <Checkbox
                            id="valid"
                            :model-value="form.valid"
                            @update:model-value="
                                (val: boolean) => (form.valid = val)
                            "
                        />
                        <Label for="valid" class="cursor-pointer"
                            >Status
                            <span class="text-destructive">*</span></Label
                        >
                    </div> -->
                </div>

                <!-- Detail Transaksi Section -->
                <div class="space-y-4">
                    <h3 class="text-base font-semibold">Detail Transaksi</h3>

                    <div class="overflow-x-auto rounded-lg border">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b bg-muted/50">
                                    <th
                                        class="px-3 py-3 text-left font-semibold"
                                    >
                                        Uraian Transaksi
                                    </th>
                                    <th
                                        class="w-48 px-3 py-3 text-right font-semibold"
                                    >
                                        Jumlah
                                    </th>
                                    <th
                                        class="w-20 px-3 py-3 text-center font-semibold"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(row, index) in details"
                                    :key="index"
                                    class="border-b last:border-0 hover:bg-muted/20"
                                >
                                    <td class="px-3 py-2">
                                        <Input
                                            v-model="row.uraian"
                                            placeholder="Uraian transaksi"
                                        />
                                        <p
                                            v-if="
                                                errors[
                                                    `details.${index}.uraian`
                                                ]
                                            "
                                            class="mt-1 text-xs text-destructive"
                                        >
                                            {{
                                                errors[
                                                    `details.${index}.uraian`
                                                ]
                                            }}
                                        </p>
                                    </td>
                                    <td class="px-3 py-2">
                                        <Input
                                            v-model="row.jumlah"
                                            type="text"
                                            class="text-right"
                                            placeholder="0"
                                            @blur="onJumlahBlur(index)"
                                        />
                                        <p
                                            v-if="
                                                errors[
                                                    `details.${index}.jumlah`
                                                ]
                                            "
                                            class="mt-1 text-xs text-destructive"
                                        >
                                            {{
                                                errors[
                                                    `details.${index}.jumlah`
                                                ]
                                            }}
                                        </p>
                                    </td>
                                    <td class="px-3 py-2">
                                        <div
                                            class="flex items-center justify-center gap-1"
                                        >
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                class="h-8 w-8"
                                                title="Copy"
                                                @click="copyDetail(index)"
                                            >
                                                <Copy class="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                class="h-8 w-8 text-destructive hover:text-destructive"
                                                title="Hapus"
                                                @click="removeDetail(index)"
                                            >
                                                <Trash2 class="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="details.length === 0">
                                    <td
                                        colspan="3"
                                        class="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        Belum ada detail. Klik tombol di bawah
                                        untuk menambah.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="flex justify-center">
                        <Button
                            variant="outline"
                            class="gap-2"
                            @click="addDetail"
                        >
                            <Plus class="h-4 w-4" />
                            Tambah Detail
                        </Button>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center gap-3 border-t pt-4">
                    <Button
                        :disabled="processing"
                        class="gap-2"
                        @click="submit"
                    >
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
