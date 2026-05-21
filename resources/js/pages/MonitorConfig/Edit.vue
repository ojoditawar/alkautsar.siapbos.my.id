<script setup lang="ts">
import { ref, computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import {
    ArrowLeft,
    Check,
    Clock,
    HelpCircle,
    Monitor,
    Save,
    Search,
    Tv,
} from 'lucide-vue-next';
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

interface MonitorConfigData {
    id: number;
    masjid_id: string;
    city_id: string | null;
    iqomah_subuh: number;
    iqomah_dzuhur: number;
    iqomah_ashar: number;
    iqomah_maghrib: number;
    iqomah_isya: number;
    sholat_subuh: number;
    sholat_dzuhur: number;
    sholat_ashar: number;
    sholat_maghrib: number;
    sholat_isya: number;
    sholat_jumat: number;
    streaming_start_hour: number;
    streaming_start_minute: number;
    streaming_end_hour: number;
    streaming_end_minute: number;
    streaming_youtube_url: string | null;
    streaming_title: string | null;
}

interface CityItem {
    id: string;
    lokasi: string;
}

const props = defineProps<{
    monitorConfig: MonitorConfigData;
    cities?: CityItem[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Monitor', href: '/monitor' },
            { title: 'Pengaturan', href: '#' },
        ],
    },
});

const citySearch = ref('');

const filteredCities = computed(() => {
    const list = props.cities ?? [];
    if (!citySearch.value) return list.slice(0, 50);
    const q = citySearch.value.toLowerCase();
    return list.filter(c => c.lokasi.toLowerCase().includes(q)).slice(0, 50);
});

const form = useForm({
    iqomah_subuh: props.monitorConfig.iqomah_subuh,
    iqomah_dzuhur: props.monitorConfig.iqomah_dzuhur,
    iqomah_ashar: props.monitorConfig.iqomah_ashar,
    iqomah_maghrib: props.monitorConfig.iqomah_maghrib,
    iqomah_isya: props.monitorConfig.iqomah_isya,
    sholat_subuh: props.monitorConfig.sholat_subuh,
    sholat_dzuhur: props.monitorConfig.sholat_dzuhur,
    sholat_ashar: props.monitorConfig.sholat_ashar,
    sholat_maghrib: props.monitorConfig.sholat_maghrib,
    sholat_isya: props.monitorConfig.sholat_isya,
    sholat_jumat: props.monitorConfig.sholat_jumat,
    streaming_start_hour: props.monitorConfig.streaming_start_hour,
    streaming_start_minute: props.monitorConfig.streaming_start_minute,
    streaming_end_hour: props.monitorConfig.streaming_end_hour,
    streaming_end_minute: props.monitorConfig.streaming_end_minute,
    city_id: props.monitorConfig.city_id ?? '1204',
    streaming_youtube_url: props.monitorConfig.streaming_youtube_url ?? '',
    streaming_title: props.monitorConfig.streaming_title ?? '',
});

function submit() {
    form.put('/monitor-config');
}

const prayerTimes = [
    { key: 'subuh' as const, label: 'Subuh' },
    { key: 'dzuhur' as const, label: 'Dzuhur' },
    { key: 'ashar' as const, label: 'Ashar' },
    { key: 'maghrib' as const, label: 'Maghrib' },
    { key: 'isya' as const, label: 'Isya' },
];
</script>

<template>
    <Head title="Pengaturan Monitor" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <Monitor class="h-5 w-5" />
                            Pengaturan Monitor
                        </CardTitle>
                        <CardDescription>
                            Atur durasi iqomah, sholat, dan jadwal streaming
                            untuk dashboard Monitor.
                        </CardDescription>
                    </div>
                    <Button variant="outline" as-child class="gap-2">
                        <Link href="/monitor">
                            <ArrowLeft class="h-4 w-4" />
                            Kembali ke Monitor
                        </Link>
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <form class="space-y-8" @submit.prevent="submit">
                    <!-- ============================================ -->
                    <!-- Bagian 0: Lokasi / Kota -->
                    <!-- ============================================ -->
                    <div class="rounded-lg border p-4">
                        <div class="mb-4 flex items-center gap-2">
                            <Search class="h-5 w-5 text-blue-600" />
                            <h3 class="text-base font-semibold">
                                Lokasi Jadwal Sholat
                            </h3>
                        </div>
                        <div class="grid gap-4 sm:grid-cols-1">
                            <div class="grid gap-1.5">
                                <Label for="city_id"
                                    >Pilih Kota / Kabupaten</Label
                                >
                                <div class="relative">
                                    <Search
                                        class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                    />
                                    <Input
                                        id="city_search"
                                        v-model="citySearch"
                                        type="text"
                                        placeholder="Cari kota..."
                                        class="pl-9"
                                    />
                                </div>
                                <div
                                    class="mt-1 max-h-48 overflow-y-auto rounded-md border"
                                >
                                    <button
                                        v-for="city in filteredCities"
                                        :key="city.id"
                                        type="button"
                                        class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-accent"
                                        :class="{
                                            'bg-primary/10 font-semibold':
                                                form.city_id === city.id,
                                        }"
                                        @click="
                                            form.city_id = city.id;
                                            citySearch = '';
                                        "
                                    >
                                        <Check
                                            v-if="form.city_id === city.id"
                                            class="h-4 w-4 text-primary"
                                        />
                                        <span v-else class="h-4 w-4"></span>
                                        {{ city.lokasi }}
                                    </button>
                                    <p
                                        v-if="filteredCities.length === 0"
                                        class="px-3 py-4 text-center text-xs text-muted-foreground"
                                    >
                                        Kota tidak ditemukan
                                    </p>
                                </div>
                                <p
                                    v-if="form.errors.city_id"
                                    class="text-sm text-destructive"
                                >
                                    {{ form.errors.city_id }}
                                </p>
                                <p class="text-xs text-muted-foreground">
                                    Data jadwal sholat akan mengikuti kota yang
                                    dipilih.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- ============================================ -->
                    <!-- Bagian 1: Durasi Iqomah -->
                    <!-- ============================================ -->
                    <div class="rounded-lg border p-4">
                        <div class="mb-4 flex items-center gap-2">
                            <Clock class="h-5 w-5 text-amber-600" />
                            <h3 class="text-base font-semibold">
                                Durasi Iqomah (menit)
                            </h3>
                            <span
                                class="group relative ml-auto inline-flex cursor-help items-center text-xs text-muted-foreground"
                            >
                                <HelpCircle class="h-4 w-4" />
                                <span
                                    class="absolute top-6 right-0 z-10 w-56 rounded border bg-popover p-2 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                                >
                                    Waktu antara adzan dan iqomah untuk setiap
                                    sholat wajib.
                                </span>
                            </span>
                        </div>
                        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
                            <div
                                v-for="p in prayerTimes"
                                :key="p.key"
                                class="grid gap-1.5"
                            >
                                <Label :for="'iqomah_' + p.key">
                                    {{ p.label }}
                                </Label>
                                <Input
                                    :id="'iqomah_' + p.key"
                                    v-model="
                                        form[
                                            ('iqomah_' +
                                                p.key) as keyof typeof form
                                        ]
                                    "
                                    type="number"
                                    min="0"
                                    max="60"
                                    placeholder="10"
                                />
                                <p
                                    v-if="
                                        form.errors[
                                            ('iqomah_' +
                                                p.key) as keyof typeof form.errors
                                        ]
                                    "
                                    class="text-sm text-destructive"
                                >
                                    {{ form.errors['iqomah_' + p.key] }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- ============================================ -->
                    <!-- Bagian 2: Durasi Sholat -->
                    <!-- ============================================ -->
                    <div class="rounded-lg border p-4">
                        <div class="mb-4 flex items-center gap-2">
                            <Clock class="h-5 w-5 text-emerald-600" />
                            <h3 class="text-base font-semibold">
                                Durasi Sholat (menit)
                            </h3>
                            <span
                                class="group relative ml-auto inline-flex cursor-help items-center text-xs text-muted-foreground"
                            >
                                <HelpCircle class="h-4 w-4" />
                                <span
                                    class="absolute top-6 right-0 z-10 w-56 rounded border bg-popover p-2 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                                >
                                    Lama waktu tampilan "Sholat Sedang
                                    Berlangsung" setelah iqomah selesai.
                                </span>
                            </span>
                        </div>
                        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
                            <div
                                v-for="p in prayerTimes"
                                :key="p.key"
                                class="grid gap-1.5"
                            >
                                <Label :for="'sholat_' + p.key">
                                    {{ p.label }}
                                </Label>
                                <Input
                                    :id="'sholat_' + p.key"
                                    v-model="
                                        form[
                                            ('sholat_' +
                                                p.key) as keyof typeof form
                                        ]
                                    "
                                    type="number"
                                    min="0"
                                    max="1440"
                                    placeholder="25"
                                />
                                <p
                                    v-if="
                                        form.errors[
                                            ('sholat_' +
                                                p.key) as keyof typeof form.errors
                                        ]
                                    "
                                    class="text-sm text-destructive"
                                >
                                    {{ form.errors['sholat_' + p.key] }}
                                </p>
                            </div>
                        </div>
                    <!-- Jumat (pengganti Dzuhur) -->
                    <div class="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-5">
                        <div class="grid gap-1.5">
                            <Label for="sholat_jumat">
                                Jumat 🕌
                                <span class="text-xs text-muted-foreground"
                                    >(pengganti Dzuhur)</span
                                >
                            </Label>
                            <Input
                                id="sholat_jumat"
                                v-model="form.sholat_jumat"
                                type="number"
                                min="0"
                                max="1440"
                                placeholder="10"
                            />
                            <p
                                v-if="form.errors.sholat_jumat"
                                class="text-sm text-destructive"
                            >
                                {{ form.errors.sholat_jumat }}
                            </p>
                        </div>
                    </div>
                    </div>

                    <!-- ============================================ -->
                    <!-- Bagian 3: Streaming -->
                    <!-- ============================================ -->
                    <div class="rounded-lg border p-4">
                        <div class="mb-4 flex items-center gap-2">
                            <Tv class="h-5 w-5 text-red-600" />
                            <h3 class="text-base font-semibold">
                                Jadwal Streaming
                            </h3>
                            <span
                                class="group relative ml-auto inline-flex cursor-help items-center text-xs text-muted-foreground"
                            >
                                <HelpCircle class="h-4 w-4" />
                                <span
                                    class="absolute top-6 right-0 z-10 w-56 rounded border bg-popover p-2 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                                >
                                    Monitor akan otomatis menampilkan video
                                    YouTube pada jam yang ditentukan.
                                </span>
                            </span>
                        </div>

                        <div class="grid gap-6 md:grid-cols-2">
                            <!-- Waktu Mulai -->
                            <div class="space-y-3">
                                <h4 class="text-sm font-medium">Waktu Mulai</h4>
                                <div class="grid grid-cols-2 gap-2">
                                    <div class="grid gap-1.5">
                                        <Label for="streaming_start_hour">
                                            Jam
                                        </Label>
                                        <Input
                                            id="streaming_start_hour"
                                            v-model="form.streaming_start_hour"
                                            type="number"
                                            min="0"
                                            max="23"
                                            placeholder="11"
                                        />
                                    </div>
                                    <div class="grid gap-1.5">
                                        <Label for="streaming_start_minute">
                                            Menit
                                        </Label>
                                        <Input
                                            id="streaming_start_minute"
                                            v-model="
                                                form.streaming_start_minute
                                            "
                                            type="number"
                                            min="0"
                                            max="59"
                                            placeholder="15"
                                        />
                                    </div>
                                </div>
                                <p
                                    v-if="
                                        form.errors.streaming_start_hour ||
                                        form.errors.streaming_start_minute
                                    "
                                    class="text-sm text-destructive"
                                >
                                    {{
                                        form.errors.streaming_start_hour ||
                                        form.errors.streaming_start_minute
                                    }}
                                </p>
                            </div>

                            <!-- Waktu Selesai -->
                            <div class="space-y-3">
                                <h4 class="text-sm font-medium">
                                    Waktu Selesai
                                </h4>
                                <div class="grid grid-cols-2 gap-2">
                                    <div class="grid gap-1.5">
                                        <Label for="streaming_end_hour">
                                            Jam
                                        </Label>
                                        <Input
                                            id="streaming_end_hour"
                                            v-model="form.streaming_end_hour"
                                            type="number"
                                            min="0"
                                            max="23"
                                            placeholder="11"
                                        />
                                    </div>
                                    <div class="grid gap-1.5">
                                        <Label for="streaming_end_minute">
                                            Menit
                                        </Label>
                                        <Input
                                            id="streaming_end_minute"
                                            v-model="form.streaming_end_minute"
                                            type="number"
                                            min="0"
                                            max="59"
                                            placeholder="30"
                                        />
                                    </div>
                                </div>
                                <p
                                    v-if="
                                        form.errors.streaming_end_hour ||
                                        form.errors.streaming_end_minute
                                    "
                                    class="text-sm text-destructive"
                                >
                                    {{
                                        form.errors.streaming_end_hour ||
                                        form.errors.streaming_end_minute
                                    }}
                                </p>
                            </div>
                        </div>

                        <!-- YouTube URL & Title -->
                        <div class="mt-6 grid gap-4 sm:grid-cols-2">
                            <div class="grid gap-1.5">
                                <Label for="streaming_youtube_url">
                                    URL YouTube (Embed)
                                </Label>
                                <Input
                                    id="streaming_youtube_url"
                                    v-model="form.streaming_youtube_url"
                                    type="text"
                                    placeholder="https://www.youtube.com/embed/..."
                                />
                                <p class="text-xs text-muted-foreground">
                                    Gunakan format embed:
                                    https://www.youtube.com/embed/VIDEO_ID
                                </p>
                                <p
                                    v-if="form.errors.streaming_youtube_url"
                                    class="text-sm text-destructive"
                                >
                                    {{ form.errors.streaming_youtube_url }}
                                </p>
                            </div>
                            <div class="grid gap-1.5">
                                <Label for="streaming_title">
                                    Judul Streaming
                                </Label>
                                <Input
                                    id="streaming_title"
                                    v-model="form.streaming_title"
                                    type="text"
                                    placeholder="🔴 Siaran Langsung"
                                />
                                <p
                                    v-if="form.errors.streaming_title"
                                    class="text-sm text-destructive"
                                >
                                    {{ form.errors.streaming_title }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Submit -->
                    <div class="flex items-center justify-end gap-2">
                        <Button variant="outline" as-child>
                            <Link href="/monitor">Batal</Link>
                        </Button>
                        <Button
                            type="submit"
                            class="gap-2"
                            :disabled="form.processing"
                        >
                            <Save class="h-4 w-4" />
                            Simpan Pengaturan
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
