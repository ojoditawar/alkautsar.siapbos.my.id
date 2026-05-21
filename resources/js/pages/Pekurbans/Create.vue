<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import {
    ArrowLeft,
    Check,
    ChevronsUpDown,
    Copy,
    Image as ImageIcon,
    Plus,
    Save,
    Trash2,
    X,
} from 'lucide-vue-next';
import { ref, computed, watch } from 'vue';
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
import { cn } from '@/lib/utils';

interface Trensaksi {
    id: number;
    no_trans: string;
    uraian: string;
}

const props = defineProps<{
    trensaksis: Trensaksi[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Pekurban', href: '/pekurbans' },
            { title: 'Tambah', href: '#' },
        ],
    },
});

const imagePreview = ref<string | null>(null);
const imageFile = ref<File | null>(null);

const form = useForm({
    jenis: 1,
    tahun: '',
    kelas: '',
    sapi: '',
    kelompok_pequrban: '',
    harga: 0,
    biaya_potong: 0,
    total: 0,
    image: null as File | null,
    details: [] as Array<{ nama: string; alamat: string; bagian: string; bayar: boolean; trensaksi_id: number | null }>,
});

function addDetail() {
    form.details.push({ nama: '', alamat: '', bagian: '', bayar: false, trensaksi_id: null });
}

function removeDetail(index: number) {
    form.details.splice(index, 1);
}

function copyDetail(index: number) {
    const detail = form.details[index];
    form.details.push({
        nama: detail.nama,
        alamat: detail.alamat,
        bagian: detail.bagian,
        bayar: detail.bayar,
        trensaksi_id: detail.trensaksi_id,
    });
}

function onBayarChange(detail: any) {
    if (!detail.bayar) {
        detail.trensaksi_id = null;
    }
}

const openTrensaksiPopover = ref<number | null>(null);

function getTrensaksiLabel(id: number | null): string {
    if (!id) {
        return '';
    }

    const t = props.trensaksis.find((tr) => tr.id === id);

    return t ? `${t.no_trans} - ${t.uraian}` : '';
}

function selectTrensaksi(detail: any, id: number) {
    detail.trensaksi_id = id;
    openTrensaksiPopover.value = null;
}

function handleImageUpload(event: Event) {
    try {
        const target = event.target as HTMLInputElement;

        // Check if target is valid and has files
        if (!target || !target.files) {
            console.warn('No valid input or files found.', target);
            return;
        }

        const file = target.files[0];

        // Ensure file exists and is a File object before proceeding
        if (!(file instanceof File)) {
            console.warn(
                'No valid file selected or file input changed without a file.',
                file,
            );
            removeImage();
            return;
        }

        if (!file.type.startsWith('image/')) {
            console.warn('Selected file is not an image.', file.type);
            removeImage();
            return;
        }

        imageFile.value = file;
        form.image = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    } catch (error) {
        console.error('Error in handleImageUpload:', error);
        removeImage();
    }
}

function removeImage() {
    imagePreview.value = null;
    imageFile.value = null;
    form.image = null;
    const input = document.getElementById('image') as HTMLInputElement;
    if (input) input.value = '';
}

function submit() {
    form.transform((data) => ({
        ...data,
        details: data.details.map((d) => ({
            nama: d.nama,
            alamat: d.alamat,
            bagian: d.bagian,
            bayar: d.bayar ? 1 : 0,
            trensaksi_id: d.trensaksi_id ?? '',
        })),
    })).post('/pekurbans');
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

function parseCurrency(value: string): number {
    return Number(value.replace(/[^\d]/g, '')) || 0;
}

const hargaInput = computed({
    get: () => formatCurrency(form.harga),
    set: (value: string) => {
        form.harga = parseCurrency(value);
    },
});

const biayaPotongInput = computed({
    get: () => formatCurrency(form.biaya_potong),
    set: (value: string) => {
        form.biaya_potong = parseCurrency(value);
    },
});

const totalDisplay = computed(() => formatCurrency(form.total));

watch(
    [() => form.harga, () => form.biaya_potong],
    ([newHarga, newBiayaPotong]) => {
        form.total = (newHarga || 0) + (newBiayaPotong || 0);
    },
);
</script>

<template>

    <Head title="Tambah Pekurban" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <div class="rounded-2xl bg-white p-6 shadow-md">
            <div class="mb-4 flex items-center justify-between">
                <div>
                    <h2 class="text-lg font-bold">Tambah Pekurban</h2>
                    <p class="text-sm text-muted-foreground">
                        Tambahkan data pekurban baru dengan gambar kambing.
                    </p>
                </div>
                <Link href="/pekurbans"
                    class="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                    <ArrowLeft class="h-4 w-4" />
                    Kembali
                </Link>
            </div>

            <form class="space-y-6" @submit.prevent="submit">
                <div class="grid gap-4 md:grid-cols-2">
                    <div class="grid gap-2">
                        <label for="jenis" class="text-sm font-medium">Jenis Hewan</label>
                        <select id="jenis" v-model="form.jenis"
                            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="1">Sapi</option>
                            <option value="2">Domba</option>
                            <option value="3">Kambing</option>
                        </select>
                        <p v-if="form.errors.jenis" class="text-sm text-destructive">
                            {{ form.errors.jenis }}
                        </p>
                    </div>
                    <div class="grid gap-2">
                        <label for="tahun" class="text-sm font-medium">Tahun</label>
                        <input id="tahun" v-model="form.tahun" placeholder="2024" maxlength="4"
                            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        <p v-if="form.errors.tahun" class="text-sm text-destructive">
                            {{ form.errors.tahun }}
                        </p>
                    </div>
                    <div class="grid gap-2">
                        <label for="kelas" class="text-sm font-medium">Kelas</label>
                        <input id="kelas" v-model="form.kelas" placeholder="A" maxlength="30"
                            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        <p v-if="form.errors.kelas" class="text-sm text-destructive">
                            {{ form.errors.kelas }}
                        </p>
                    </div>
                    <div class="grid gap-2">
                        <label for="sapi" class="text-sm font-medium">Sapi</label>
                        <input id="sapi" v-model="form.sapi" placeholder="Sapi A / nama kelompok sapi"
                            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        <p v-if="form.errors.sapi" class="text-sm text-destructive">
                            {{ form.errors.sapi }}
                        </p>
                    </div>
                    <div class="grid gap-2">
                        <label for="kelompok_pequrban" class="text-sm font-medium">Kelompok Pekurban *</label>
                        <input id="kelompok_pequrban" v-model="form.kelompok_pequrban" placeholder="Fulan 1"
                            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        <p v-if="form.errors.kelompok_pequrban" class="text-sm text-destructive">
                            {{ form.errors.kelompok_pequrban }}
                        </p>
                    </div>
                    <div class="grid gap-2">
                        <label for="harga" class="text-sm font-medium">Harga</label>
                        <input id="harga" v-model="hargaInput" type="text" placeholder="3500000"
                            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        <p v-if="form.errors.harga" class="text-sm text-destructive">
                            {{ form.errors.harga }}
                        </p>
                    </div>
                    <div class="grid gap-2">
                        <label for="biaya_potong" class="text-sm font-medium">Biaya Potong</label>
                        <input id="biaya_potong" v-model="biayaPotongInput" type="text" placeholder="150000"
                            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        <p v-if="form.errors.biaya_potong" class="text-sm text-destructive">
                            {{ form.errors.biaya_potong }}
                        </p>
                    </div>
                    <div class="grid gap-2 md:col-span-2">
                        <label for="total" class="text-sm font-medium">Total (Otomatis)</label>
                        <input id="total" :value="totalDisplay" type="text" placeholder="3650000"
                            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" disabled />
                        <p v-if="form.errors.total" class="text-sm text-destructive">
                            {{ form.errors.total }}
                        </p>
                    </div>
                    <div class="grid gap-2 md:col-span-2">
                        <label for="image" class="text-sm font-medium">Gambar Kambing</label>
                        <div class="flex items-start gap-4">
                            <div class="flex-1">
                                <div class="relative">
                                    <input id="image" type="file" accept="image/jpeg,image/png,image/jpg,image/gif"
                                        class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                                        @change="handleImageUpload" />
                                    <p v-if="form.errors.image" class="mt-1 text-sm text-destructive">
                                        {{ form.errors.image }}
                                    </p>
                                </div>
                                <p class="mt-1 text-xs text-muted-foreground">
                                    Format: JPEG, PNG, JPG, GIF. Maksimal: 2MB.
                                </p>
                            </div>
                            <div v-if="imagePreview" class="relative h-24 w-24 overflow-hidden rounded-lg border">
                                <img :src="imagePreview" alt="Preview" class="h-full w-full object-cover" />
                                <button type="button"
                                    class="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    @click="removeImage">
                                    <X class="h-3 w-3" />
                                </button>
                            </div>
                            <div v-else
                                class="flex h-24 w-24 items-center justify-center rounded-lg border border-dashed">
                                <ImageIcon class="h-8 w-8 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="space-y-3">
                    <div class="flex items-center gap-2">
                        <h3 class="text-sm font-semibold">Detail Pekurban</h3>
                        <button type="button"
                            class="inline-flex items-center gap-1 rounded-md border border-input bg-background px-2 py-1 text-xs hover:bg-accent hover:text-accent-foreground"
                            @click="addDetail">
                            <Plus class="h-3 w-3" />
                            Tambah
                        </button>
                    </div>
                    <div v-if="form.details.length === 0"
                        class="rounded border border-dashed px-3 py-2 text-center text-xs text-muted-foreground">
                        Belum ada detail. Klik "Tambah" untuk menambahkan.
                    </div>
                    <div v-for="(detail, index) in form.details" :key="index"
                        class="flex items-center gap-2 rounded border p-2">
                        <div class="grid flex-1 gap-2 sm:grid-cols-3">
                            <input :id="`detail-nama-${index}`" v-model="detail.nama" placeholder="Nama"
                                class="w-full rounded border border-input bg-background px-2 py-1.5 text-sm" />
                            <input :id="`detail-alamat-${index}`" v-model="detail.alamat" placeholder="Alamat"
                                class="w-full rounded border border-input bg-background px-2 py-1.5 text-sm" />
                            <input :id="`detail-bagian-${index}`" v-model="detail.bagian" placeholder="Bagian"
                                class="w-full rounded border border-input bg-background px-2 py-1.5 text-sm" />
                        </div>
                        <div class="flex flex-col gap-1">
                            <select v-model="detail.bayar"
                                class="w-full rounded border border-input bg-background px-2 py-1.5 text-sm"
                                @change="onBayarChange(detail)">
                                <option :value="false">Belum Bayar</option>
                                <option :value="true">Sudah Bayar</option>
                            </select>

                            <div v-if="detail.bayar" class="w-full">
                                <Popover :open="openTrensaksiPopover === index"
                                    @update:open="(val: boolean) => (openTrensaksiPopover = val ? index : null)">
                                    <PopoverTrigger as-child>
                                        <button type="button"
                                            class="flex w-full items-center justify-between rounded border border-input bg-background px-2 py-1.5 text-sm hover:bg-accent">
                                            <span class="truncate text-left">{{ detail.trensaksi_id ?
                                                getTrensaksiLabel(detail.trensaksi_id) : 'Pilih Transaksi' }}</span>
                                            <ChevronsUpDown class="ml-1 h-3 w-3 shrink-0 opacity-50" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent class="w-[360px] p-0" align="start">
                                        <Command>
                                            <CommandInput placeholder="Cari uraian / no trans..." />
                                            <CommandList>
                                                <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                                                <CommandGroup>
                                                    <CommandItem v-for="t in props.trensaksis" :key="t.id"
                                                        :value="`${t.no_trans} ${t.uraian}`"
                                                        @select="(ev: any) => { ev.preventDefault(); selectTrensaksi(detail, t.id); }">
                                                        <Check
                                                            :class="cn('mr-2 h-4 w-4', detail.trensaksi_id === t.id ? 'opacity-100' : 'opacity-0')" />
                                                        <div class="flex flex-col">
                                                            <span class="font-mono text-xs font-semibold">{{ t.no_trans
                                                            }}</span>
                                                            <span class="truncate text-xs text-muted-foreground">{{
                                                                t.uraian || '-' }}</span>
                                                        </div>
                                                    </CommandItem>
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <button v-if="detail.trensaksi_id" type="button"
                                    class="mt-1 text-xs text-muted-foreground hover:text-foreground"
                                    @click="detail.trensaksi_id = null">
                                    &times; Hapus pilihan
                                </button>
                            </div>
                        </div>
                        <button type="button"
                            class="flex h-8 w-8 items-center justify-center rounded border border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            @click="copyDetail(index)" title="Copy">
                            <Copy class="h-3.5 w-3.5" />
                        </button>
                        <button type="button"
                            class="flex h-8 w-8 items-center justify-center rounded border border-input bg-destructive/10 text-destructive hover:bg-destructive/20"
                            @click="removeDetail(index)" title="Hapus">
                            <Trash2 class="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-2">
                    <Link href="/pekurbans"
                        class="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                        Batal
                    </Link>
                    <button type="submit"
                        class="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                        :disabled="form.processing">
                        <Save class="h-4 w-4" />
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
