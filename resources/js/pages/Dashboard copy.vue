<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { computed, onMounted, ref } from 'vue';
import SaldoKasChart from '@/components/SaldoKasChart.vue';
import {
    Facebook,
    Heart,
    Instagram,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Search,
    Share2,
    ThumbsUp,
} from 'lucide-vue-next';

// === Data dari backend ===
interface SaldoChart {
    labels: string[];
    debit: number[];
    kredit: number[];
}

interface KajianItem {
    id: number;
    judul: string;
    pemateri: string;
    tanggal: string;
    waktu: string | null;
    tempat: string | null;
    deskripsi: string | null;
}

interface RingkasanKas {
    total_debit: number;
    total_kredit: number;
    saldo: number;
}

const dashProps = defineProps<{
    saldoChart?: SaldoChart;
    ringkasanKas?: RingkasanKas;
    upcomingKajians?: KajianItem[];
    tahun?: number;
}>();

const saldoChart = computed<SaldoChart>(
    () =>
        dashProps.saldoChart ?? {
            labels: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'Mei',
                'Jun',
                'Jul',
                'Agu',
                'Sep',
                'Okt',
                'Nov',
                'Des',
            ],
            debit: new Array(12).fill(0),
            kredit: new Array(12).fill(0),
        },
);

const ringkasanKas = computed<RingkasanKas>(
    () =>
        dashProps.ringkasanKas ?? { total_debit: 0, total_kredit: 0, saldo: 0 },
);

const upcomingKajians = computed<KajianItem[]>(
    () => dashProps.upcomingKajians ?? [],
);

function formatRp(n: number): string {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n));
}

function formatTanggalKajian(date: string): string {
    return new Date(date).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

// === Data Dummy ===
const masjid = {
    nama: 'Masjid Al Kautsar',
    label: 'DKM',
    alamat: 'Jl Anggraini Raya Perumahan Griya Anggraini Citeureup',
    lokasi: 'Citeureup - Bogor',
    telepon: '081377277995',
};

const ketua = {
    nama: 'AZHAR',
    jabatan: 'Ketua DKM',
    foto: 'https://i.pravatar.cc/150?img=12',
};

// Running text diambil dari shared prop Inertia (lihat HandleInertiaRequests).
const page = usePage();
const runningText = computed(() => {
    const items = (page.props.runningTexts as string[] | undefined) ?? [];

    if (items.length === 0) {
        return 'Selamat datang di Sistem Informasi Masjid.';
    }

    return items.join('  •  ');
});

const menus = [
    { title: 'Beranda', href: '#' },
    { title: 'Lembaga', href: '#' },
    { title: 'Inventaris', href: '#' },
    { title: 'Tausiyah', href: '#' },
    { title: 'Laporan Keuangan Masjid', href: '#' },
];

const search = ref('');

// === Tanggal saat ini ===
const todayLabel = computed(() =>
    new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }),
);

// === Jadwal Sholat (data real dari API myquran) ===
interface PrayerSchedule {
    imsak?: string;
    subuh?: string;
    terbit?: string;
    dzuhur?: string;
    ashar?: string;
    maghrib?: string;
    isya?: string;
}

interface PrayerData {
    lokasi?: string;
    daerah?: string;
    jadwal?: PrayerSchedule;
}

const prayerTimes = ref<PrayerData | null>(null);
const loading = ref(true);
const countdown = ref('');
const nextPrayer = ref<{ name: string; time: string | undefined } | null>(null);
const iqomahCountdown = ref('00:00:00');
const isIqomahMode = ref(false);
const iqomahEndTime = ref<Date | null>(null);
// myquran v2: 1204 = KAB. BOGOR (mencakup Kecamatan Citeureup).
// API tidak menyediakan level kecamatan, jadi jadwal mengikuti kabupaten.
const cityId = '1204';

const iqomahDurations: Record<string, number> = {
    SUBUH: 12,
    DZUHUR: 10,
    ASHAR: 10,
    MAGHRIB: 10,
    ISYA: 12,
};

const playAdhan = (prayerName: string) => {
    const audioFile = prayerName === 'SUBUH'
        ? '/mp3/Madina-Adzan-Fajr.mp3'
        : '/mp3/mecca_56_22.mp3';
    const audio = new Audio(audioFile);
    audio.play().catch((error) => {
        console.error('Gagal memutar adzan:', error);
    });
};

const playIqomahSound = () => {
    const audio = new Audio('/mp3/button-42.mp3');
    audio.play().catch((error) => {
        console.error('Gagal memutar suara iqomah:', error);
    });
};

const fetchPrayerTimes = async () => {
    try {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const response = await fetch(
            `https://api.myquran.com/v2/sholat/jadwal/${cityId}/${year}/${month}/${day}`,
        );
        const json = await response.json();
        prayerTimes.value = json.data as PrayerData;
    } catch (error) {
        console.error('Gagal mengambil jadwal sholat:', error);
    } finally {
        loading.value = false;
    }
};

const updateCountdown = () => {
    const jadwal = prayerTimes.value?.jadwal;

    if (!jadwal) {
        countdown.value = '--:--';
        iqomahCountdown.value = '00:00:00';
        nextPrayer.value = null;
        return;
    }

    const now = new Date();

    // Handle iqomah countdown
    if (isIqomahMode.value && iqomahEndTime.value) {
        const diffMs = iqomahEndTime.value.getTime() - now.getTime();

        if (diffMs > 0) {
            const diffSeconds = Math.floor(diffMs / 1000);
            const minutesLeft = Math.floor(diffSeconds / 60);
            const secondsLeft = diffSeconds % 60;
            iqomahCountdown.value = `00:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
        } else {
            // Iqomah selesai, reset mode
            isIqomahMode.value = false;
            iqomahEndTime.value = null;
            iqomahCountdown.value = '00:00:00';
        }
    }

    // Gunakan prayerSlots untuk mendapatkan data (termasuk data dummy)
    const prayers = prayerSlots.value;

    let nextPrayerTime = null;
    let minDiff = Infinity;

    for (const prayer of prayers) {
        if (!prayer.time) {
            continue;
        }

        const [hours, minutes] = prayer.time.split(':').map(Number);
        const prayerDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hours,
            minutes,
        );
        let diffMs = prayerDate.getTime() - now.getTime();

        // Jika sholat sudah lewat hari ini, cek besok
        if (diffMs <= 0) {
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const prayerTomorrow = new Date(
                tomorrow.getFullYear(),
                tomorrow.getMonth(),
                tomorrow.getDate(),
                hours,
                minutes,
            );
            diffMs = prayerTomorrow.getTime() - now.getTime();
        }

        if (diffMs < minDiff) {
            minDiff = diffMs;
            nextPrayerTime = prayer;
        }
    }

    if (nextPrayerTime && nextPrayerTime.time) {
        nextPrayer.value = {
            name: nextPrayerTime.name,
            time: nextPrayerTime.time,
        };
        const diffSeconds = Math.floor(minDiff / 1000);
        const hoursLeft = Math.floor(diffSeconds / 3600);
        const minutesLeft = Math.floor((diffSeconds % 3600) / 60);
        const secondsLeft = diffSeconds % 60;

        if (hoursLeft > 0) {
            countdown.value = `${hoursLeft}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
        } else {
            countdown.value = `${minutesLeft}:${String(secondsLeft).padStart(2, '0')}`;
        }

        // Jika countdown mencapai 0:00:00, aktifkan mode iqomah (kecuali TERBIT)
        if (
            diffSeconds <= 0 &&
            nextPrayerTime.name !== 'TERBIT' &&
            !isIqomahMode.value
        ) {
            isIqomahMode.value = true;
            const duration = iqomahDurations[nextPrayerTime.name] || 10;
            iqomahEndTime.value = new Date(
                now.getTime() + duration * 60 * 1000,
            );
            iqomahCountdown.value = `00:${String(duration).padStart(2, '0')}:00`;
            playAdhan(nextPrayerTime.name);
            playIqomahSound();
        }
    }
};

setInterval(updateCountdown, 1000);

const prayerSlots = computed(() => [
    { name: 'IMSAK', time: prayerTimes.value?.jadwal?.imsak ?? '--:--' },
    { name: 'SUBUH', time: prayerTimes.value?.jadwal?.subuh ?? '--:--' },
    { name: 'TERBIT', time: prayerTimes.value?.jadwal?.terbit ?? '--:--' },

    { name: 'DZUHUR', time: prayerTimes.value?.jadwal?.dzuhur ?? '--:--' },
    // { name: 'DZUHUR', time: '08:15' },
    { name: 'ASHAR', time: prayerTimes.value?.jadwal?.ashar ?? '--:--' },
    { name: 'MAGHRIB', time: prayerTimes.value?.jadwal?.maghrib ?? '--:--' },
    // { name: 'MAGHRIB', time: '15:42' },
    { name: 'ISYA', time: prayerTimes.value?.jadwal?.isya ?? '--:--' },
]);

onMounted(() => {
    fetchPrayerTimes();
});
</script>

<template>
    <div class="min-h-screen bg-emerald-800/20 pb-5">
        <!-- Header (sticky) -->
        <div class="sticky top-0 z-40 bg-white shadow-sm">
            <div class="mx-auto flex max-w-7xl flex-wrap items-start justify-between gap-6 px-0 py-0">
                <!-- Logo / nama masjid -->
                <div class="flex items-start gap-2 my-auto">
                    <div
                        class="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <svg viewBox="0 0 24 24" fill="currentColor" class="h-9 w-9">
                            <path
                                d="M12 2c.55 0 1 .45 1 1v1.07A7.002 7.002 0 0 1 19 11v3h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h1v-3a7.002 7.002 0 0 1 6-6.93V3c0-.55.45-1 1-1Zm-2 14H8v5h2v-5Zm6 0h-2v5h2v-5Zm-3 0h-2v5h2v-5Z" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                            {{ masjid.label }}
                        </p>
                        <h1 class="text-2xl leading-tight font-bold text-slate-900">
                            {{ masjid.nama }}
                        </h1>
                    </div>
                </div>

                <!-- Lokasi + jadwal sholat -->
                <div class="flex flex-1 flex-col items-end gap-2">
                    <div class="flex w-full items-center justify-between gap-4 my-2">
                        <p class="ml-15 text-2xl font-extrabold text-blue-800 italic">
                            {{ prayerTimes?.lokasi || masjid.lokasi }}
                        </p>
                        <p class="text-sm text-slate-500">{{ todayLabel }}</p>
                    </div>
                    <div class="grid w-full grid-cols-7 gap-1 rounded-lg bg-slate-50 p-1">
                        <div v-for="slot in prayerSlots" :key="slot.name"
                            class="flex flex-col items-center rounded-md py-1 text-center"
                            :class="[loading ? 'animate-pulse' : '']">
                            <span class="text-md font-semibold tracking-wider text-slate-700">
                                {{ slot.name }}
                            </span>
                            <span class="text-md font-bold text-emerald-700">
                                {{ slot.time }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contoh: Kedip sangat cepat (0.5 detik) -->
            <!-- <div 
            v-if="isIqomahMode" 
                class="animate-pulse text-red-600 font-bold"
                style="animation-duration: 0.5s;"
            >
                IQOMAH: {{ iqomahCountdown }}
            </div> -->

            <div class="grid w-full grid-cols-3 rounded-xl bg-emerald-800/20 p-4 backdrop-blur-sm">
                <div class="flex flex-col items-center justify-center">
                    <div class="font-bold">
                        MENUJU {{ nextPrayer?.name ?? '--' }} KURANG
                    </div>
                    <div class="text-5xl font-bold text-emerald-700">
                        {{ countdown }}
                    </div>
                </div>

                <div class="flex flex-col items-center justify-center">
                    <div class="font-bold">WAKTU IQOMAH</div>
                    <div class="text-5xl font-bold" :class="[
                        iqomahCountdown !== '00:00:00' ? 'text-red-700' : 'text-emerald-700',
                        { 'animate-pulse': iqomahCountdown !== '00:00:00' }
                    ]">
                        {{ iqomahCountdown }}
                    </div>
                </div>

                <div class="flex flex-col items-start justify-center text-left">
                    <h2 class="text-3xl leading-tight font-extrabold text-emerald-900 md:text-4xl">
                        <span class="inline-block rounded bg-emerald-400 px-2 text-emerald-100 uppercase">sm</span>
                        SmartMasjid
                    </h2>
                    <p class="mt-1 text-sm leading-relaxed font-medium text-emerald-900/90">
                        Sistem informasi & manajemen keuangan masjid digital.
                    </p>
                </div>
            </div>

            <!-- Running text -->
            <div class="bg-emerald-700 text-white">
                <div class="overflow-hidden py-2 text-center text-sm font-medium whitespace-nowrap">
                    <div class="marquee inline-block">
                        <span class="px-20">{{ runningText }} </span>
                        <span class="px-20">{{ runningText }} </span>
                    </div>
                </div>
            </div>

            <!-- Menu bar + search -->
            <div class="border-t border-slate-100">
                <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-3">
                    <nav class="flex flex-wrap items-center gap-6">
                        <a v-for="(m, i) in menus" :key="m.title" :href="m.href"
                            class="text-sm font-semibold transition-colors" :class="i === 0
                                ? 'text-emerald-700'
                                : 'text-slate-700 hover:text-emerald-700'
                                ">
                            {{ m.title }}
                        </a>
                    </nav>
                    <div class="relative">
                        <Search
                            class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input v-model="search" type="search" placeholder="Search..."
                            class="h-9 w-72 rounded-md border border-slate-200 bg-slate-50 pr-3 pl-9 text-sm outline-none focus:border-emerald-500 focus:bg-white" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Green section (hero + footer info, full-width menyentuh navbar) -->
        <section
            class="flex min-h-[calc(100vh-280px)] items-center bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-300">
            <!-- Chart saldo kas + daftar kajian -->
            <div class="mx-auto w-full max-w-7xl px-6 py-8">
                <div class="grid gap-4 lg:grid-cols-5">
                    <!-- Chart -->
                    <div class="rounded-2xl bg-white p-6 shadow-md lg:col-span-3">
                        <div class="mb-4 flex flex-wrap items-start justify-between gap-2">
                            <div>
                                <h3 class="text-lg font-bold text-slate-900">
                                    Saldo Kas Tunai Sampai Hari Ini
                                    <!-- {{
                                        dashProps.tahun ??
                                        new Date().getFullYear()
                                    }} -->
                                </h3>
                                <p class="text-xs text-slate-500">
                                    Total pemasukan vs pengeluaran per bulan.
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="text-xs text-slate-500">
                                    Saldo tahun berjalan
                                </p>
                                <p class="text-xl font-bold" :class="ringkasanKas.saldo >= 0
                                    ? 'text-emerald-600'
                                    : 'text-rose-600'
                                    ">
                                    {{ formatRp(ringkasanKas.saldo) }}
                                </p>
                            </div>
                        </div>

                        <div class="mb-4 grid grid-cols-2 gap-3 text-sm">
                            <div class="rounded-lg bg-emerald-50 p-3">
                                <p class="text-xs text-emerald-700">
                                    Total Debit
                                </p>
                                <p class="font-bold text-emerald-800">
                                    {{ formatRp(ringkasanKas.total_debit) }}
                                </p>
                            </div>
                            <div class="rounded-lg bg-rose-50 p-3">
                                <p class="text-xs text-rose-700">
                                    Total Kredit
                                </p>
                                <p class="font-bold text-rose-800">
                                    {{ formatRp(ringkasanKas.total_kredit) }}
                                </p>
                            </div>
                        </div>

                        <SaldoKasChart :labels="saldoChart.labels" :debit="saldoChart.debit"
                            :kredit="saldoChart.kredit" />
                    </div>

                    <!-- Upcoming Kajian -->
                    <div class="rounded-2xl bg-white p-6 shadow-md lg:col-span-2">
                        <div class="mb-4">
                            <h3 class="text-lg font-bold text-slate-900">
                                Kajian Mendatang
                            </h3>
                            <p class="text-xs text-slate-500">
                                Jadwal kajian terdekat di masjid.
                            </p>
                        </div>

                        <div v-if="upcomingKajians.length === 0"
                            class="rounded-lg bg-slate-50 p-6 text-center text-sm text-slate-500">
                            Belum ada jadwal kajian mendatang.
                        </div>
                        <ul v-else class="space-y-3">
                            <li v-for="kajian in upcomingKajians" :key="kajian.id"
                                class="rounded-lg border border-slate-100 p-3 transition hover:border-emerald-300 hover:bg-emerald-50/40">
                                <p class="font-semibold text-slate-900">
                                    {{ kajian.judul }}
                                </p>
                                <p class="text-xs text-emerald-700">
                                    {{ kajian.pemateri }}
                                </p>
                                <p class="mt-1 text-xs text-slate-500">
                                    {{ formatTanggalKajian(kajian.tanggal) }}
                                    <span v-if="kajian.waktu">
                                        · {{ kajian.waktu }}</span>
                                </p>
                                <p v-if="kajian.tempat" class="mt-0.5 text-xs text-slate-500">
                                    {{ kajian.tempat }}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer info (di atas background hijau yang sama) -->
        <div class="w-full px-6 pt-4 pb-10">
            <div class="grid gap-4 rounded-2xl bg-emerald-400 p-6 shadow-md md:grid-cols-3">
                <!-- Masjid info -->
                <div class="flex items-start gap-3">
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <svg viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                            <path
                                d="M12 2c.55 0 1 .45 1 1v1.07A7.002 7.002 0 0 1 19 11v3h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h1v-3a7.002 7.002 0 0 1 6-6.93V3c0-.55.45-1 1-1Z" />
                        </svg>
                    </div>
                    <div class="text-sm">
                        <p class="font-bold text-slate-900">
                            Masjid {{ masjid.nama }}
                        </p>
                        <p class="mt-1 leading-relaxed text-slate-600">
                            {{ masjid.alamat }}
                        </p>
                    </div>
                </div>

                <!-- Ketua DKM -->
                <div class="flex items-center gap-4 border-slate-100 md:border-x md:px-4">
                    <img :src="ketua.foto" :alt="ketua.nama"
                        class="h-14 w-14 rounded-full object-cover ring-2 ring-emerald-100" />
                    <div>
                        <p class="font-bold text-slate-900">
                            {{ ketua.nama }}
                        </p>
                        <p class="text-sm text-slate-500">
                            {{ ketua.jabatan }}
                        </p>
                        <button
                            class="mt-2 rounded-md border border-emerald-600 px-3 py-1 text-xs font-bold tracking-wide text-emerald-700 transition hover:bg-emerald-600 hover:text-white">
                            PROFILE
                        </button>
                    </div>
                </div>

                <!-- Pusat info -->
                <div class="flex items-start gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                        <Phone class="h-5 w-5" />
                    </div>
                    <div class="flex-1 text-sm">
                        <p class="font-bold text-slate-900">
                            Pusat Info Masjid
                        </p>
                        <p class="mt-1 text-slate-700">
                            {{ masjid.telepon }}
                        </p>
                        <div class="mt-3 flex items-center gap-2 text-slate-500">
                            <a href="#" class="rounded-full bg-slate-100 p-2 hover:bg-slate-200" title="Pesan">
                                <MessageCircle class="h-4 w-4" />
                            </a>
                            <a href="#" class="rounded-full bg-slate-100 p-2 hover:bg-slate-200" title="Email">
                                <Mail class="h-4 w-4" />
                            </a>
                            <a href="#" class="rounded-full bg-slate-100 p-2 hover:bg-slate-200" title="Lokasi">
                                <MapPin class="h-4 w-4" />
                            </a>
                            <span class="mx-1 h-4 w-px bg-slate-200" />
                            <a href="#" class="rounded-full bg-slate-100 p-2 hover:bg-slate-200" title="Like">
                                <ThumbsUp class="h-4 w-4" />
                            </a>
                            <a href="#" class="rounded-full bg-slate-100 p-2 hover:bg-slate-200" title="Donasi">
                                <Heart class="h-4 w-4" />
                            </a>
                            <a href="#" class="rounded-full bg-slate-100 p-2 hover:bg-slate-200" title="Facebook">
                                <Facebook class="h-4 w-4" />
                            </a>
                            <a href="#" class="rounded-full bg-slate-100 p-2 hover:bg-slate-200" title="Instagram">
                                <Instagram class="h-4 w-4" />
                            </a>
                            <a href="#" class="rounded-full bg-slate-100 p-2 hover:bg-slate-200" title="Bagikan">
                                <Share2 class="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.marquee {
    animation: marquee 40s linear infinite;
}

@keyframes marquee {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}
</style>
