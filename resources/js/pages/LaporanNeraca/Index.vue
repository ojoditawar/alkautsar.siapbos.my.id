<script setup lang="ts">
import { Head, router, usePage } from '@inertiajs/vue3';
import { FileDown, FileText } from 'lucide-vue-next';
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
import { Label } from '@/components/ui/label';
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

interface NeracaLeaf {
    level: 3;
    kode: string;
    nama: string;
    saldo: number;
}

interface NeracaSubRek {
    level: 2;
    kode: string;
    nama: string;
    saldo: number;
    children: NeracaLeaf[];
}

interface NeracaRek {
    level: 1;
    kode: string;
    nama: string;
    saldo: number;
    children: NeracaSubRek[];
}

interface NeracaData {
    aset: NeracaRek[];
    kewajiban: NeracaRek[];
    ekuitas: NeracaRek[];
}

interface Totals {
    aset: number;
    kewajiban: number;
    ekuitas: number;
}

const props = defineProps<{
    filters: {
        tanggal_mulai: string;
        tanggal_akhir: string;
        masjid_id: string | null;
    };
    masjids: MasjidOption[];
    neraca: NeracaData;
    totals: Totals;
    generated: boolean;
    is_admin: boolean;
}>();

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Laporan Neraca', href: '/laporan-neraca' }],
    },
});

const page = usePage();
const errors = computed(() => page.props.errors as Record<string, string>);

const form = ref({
    tanggal_mulai: props.filters.tanggal_mulai,
    tanggal_akhir: props.filters.tanggal_akhir,
    masjid_id: props.filters.masjid_id ?? '',
});

const processing = ref(false);

const hasData = computed(
    () =>
        props.neraca.aset.length > 0 ||
        props.neraca.kewajiban.length > 0 ||
        props.neraca.ekuitas.length > 0,
);

const totalAset = computed(() => props.totals.aset);
const totalKewajiban = computed(() => props.totals.kewajiban);
const totalEkuitas = computed(() => props.totals.ekuitas);
const totalKewEkuitas = computed(
    () => totalKewajiban.value + totalEkuitas.value,
);
const selisih = computed(() => totalAset.value - totalKewEkuitas.value);
const seimbang = computed(() => Math.abs(selisih.value) < 0.01);

function generateReport() {
    processing.value = true;
    router.get(
        '/laporan-neraca',
        { ...form.value, generate: 1 },
        {
            preserveState: false,
            onFinish: () => {
                processing.value = false;
            },
        },
    );
}

function exportPdf() {
    window.open('/laporan-neraca-pdf', '_blank');
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID');
}

function getMasjidNama(): string {
    const m = props.masjids.find((x) => x.id === form.value.masjid_id);

    return m?.nama ?? '-';
}

const sections: { key: keyof NeracaData; label: string }[] = [
    { key: 'aset', label: 'ASET' },
    { key: 'kewajiban', label: 'KEWAJIBAN' },
    { key: 'ekuitas', label: 'EKUITAS' },
];
</script>

<template>
    <Head title="Laporan Neraca" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold">Laporan Neraca (Balance Sheet)</h1>
            <div class="flex items-center gap-2">
                <Button
                    class="gap-2"
                    :disabled="processing"
                    @click="generateReport"
                >
                    <FileText class="h-4 w-4" />
                    {{ processing ? 'Memproses...' : 'Generate Laporan' }}
                </Button>
                <Button
                    variant="secondary"
                    class="gap-2 bg-green-600 text-white hover:bg-green-700"
                    :disabled="!hasData"
                    @click="exportPdf"
                >
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
                        <div class="space-y-2 md:col-span-2">
                            <Label
                                >Masjid
                                <span class="text-destructive">*</span></Label
                            >
                            <Select
                                v-model="form.masjid_id"
                                :disabled="!props.is_admin"
                            >
                                <SelectTrigger class="w-full">
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
                            <Label
                                >Tanggal mulai
                                <span class="text-destructive">*</span></Label
                            >
                            <DateInput v-model="form.tanggal_mulai" />
                            <p
                                v-if="errors.tanggal_mulai"
                                class="text-sm text-destructive"
                            >
                                {{ errors.tanggal_mulai }}
                            </p>
                        </div>

                        <div class="space-y-2">
                            <Label
                                >Tanggal akhir
                                <span class="text-destructive">*</span></Label
                            >
                            <DateInput v-model="form.tanggal_akhir" />
                            <p
                                v-if="errors.tanggal_akhir"
                                class="text-sm text-destructive"
                            >
                                {{ errors.tanggal_akhir }}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Result -->
        <Card v-if="hasData">
            <CardHeader>
                <CardTitle>LAPORAN NERACA - {{ getMasjidNama() }}</CardTitle>
                <CardDescription>
                    Periode: {{ formatDate(form.tanggal_mulai) }} -
                    {{ formatDate(form.tanggal_akhir) }}
                </CardDescription>
            </CardHeader>
            <CardContent class="space-y-8">
                <div v-for="section in sections" :key="section.key">
                    <h2
                        class="border-b-2 border-gray-500 pb-2 text-lg font-bold tracking-wider uppercase"
                    >
                        {{ section.label }}
                    </h2>
                    <div class="mt-2">
                        <div
                            v-if="neraca[section.key].length === 0"
                            class="py-4 text-center text-sm text-muted-foreground italic"
                        >
                            Tidak ada data.
                        </div>
                        <template v-else>
                            <div
                                v-for="lv1 in neraca[section.key]"
                                :key="lv1.kode"
                                class="mb-2"
                            >
                                <!-- Level 1 -->
                                <div
                                    class="flex items-center justify-between border-b border-gray-400 bg-muted/60 px-3 py-2 font-bold"
                                >
                                    <span>{{ lv1.kode }} - {{ lv1.nama }}</span>
                                    <span
                                        >Rp
                                        {{ formatCurrency(lv1.saldo) }}</span
                                    >
                                </div>
                                <!-- Level 2 -->
                                <div
                                    v-for="lv2 in lv1.children"
                                    :key="lv2.kode"
                                >
                                    <div
                                        class="flex items-center justify-between border-b border-dotted border-gray-300 py-1.5 pr-3 pl-6 font-semibold"
                                    >
                                        <span
                                            >{{ lv2.kode }} -
                                            {{ lv2.nama }}</span
                                        >
                                        <span
                                            >Rp
                                            {{
                                                formatCurrency(lv2.saldo)
                                            }}</span
                                        >
                                    </div>
                                    <!-- Level 3 -->
                                    <div
                                        v-for="lv3 in lv2.children"
                                        :key="lv3.kode"
                                        class="flex items-center justify-between border-b border-dotted border-gray-200 py-1 pr-3 pl-12 text-sm text-muted-foreground"
                                    >
                                        <span
                                            >{{ lv3.kode }} -
                                            {{ lv3.nama }}</span
                                        >
                                        <span
                                            >Rp
                                            {{
                                                formatCurrency(lv3.saldo)
                                            }}</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>

                <!-- Totals -->
                <div class="space-y-2 rounded-lg border p-4">
                    <div
                        class="flex items-center justify-between border-b pb-2 font-bold"
                    >
                        <span>TOTAL ASET</span>
                        <span>Rp {{ formatCurrency(totalAset) }}</span>
                    </div>
                    <div class="flex items-center justify-between font-bold">
                        <span>TOTAL KEWAJIBAN + EKUITAS</span>
                        <span>Rp {{ formatCurrency(totalKewEkuitas) }}</span>
                    </div>
                </div>

                <!-- Status -->
                <div
                    class="rounded-lg border-2 p-4 text-center text-lg font-bold"
                    :class="
                        seimbang
                            ? 'border-green-600 bg-green-50 text-green-700 dark:bg-green-950/20'
                            : 'border-red-600 bg-red-50 text-red-700 dark:bg-red-950/20'
                    "
                >
                    <template v-if="seimbang">Status Neraca: SEIMBANG</template>
                    <template v-else>
                        Status Neraca: TIDAK SEIMBANG (Selisih: Rp
                        {{ formatCurrency(selisih) }})
                    </template>
                </div>
            </CardContent>
        </Card>

        <!-- Empty state -->
        <Card v-else-if="props.generated && !hasData">
            <CardContent class="py-16 text-center">
                <FileText class="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 class="mt-4 font-semibold">Tidak ada data</h3>
                <p class="mt-1 text-sm text-muted-foreground">
                    Tidak ditemukan transaksi/rekening untuk filter yang
                    dipilih.
                </p>
            </CardContent>
        </Card>

        <Card v-else>
            <CardContent class="py-16 text-center">
                <FileText class="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 class="mt-4 font-semibold">Belum ada data laporan</h3>
                <p class="mt-1 text-sm text-muted-foreground">
                    Klik tombol "Generate Laporan" untuk membuat laporan neraca.
                </p>
            </CardContent>
        </Card>
    </div>
</template>
