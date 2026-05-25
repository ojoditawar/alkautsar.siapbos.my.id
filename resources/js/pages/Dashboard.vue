<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { computed, onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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
interface SaldoChartItem {
    jurnal: string;
    nama: string;
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

interface RingkasanKasItem {
    jurnal: string;
    nama: string;
    total_debit: number;
    total_kredit: number;
    saldo: number;
}

const dashProps = defineProps<{
    saldoCharts?: SaldoChartItem[];
    ringkasanKas?: RingkasanKasItem[];
    upcomingKajians?: KajianItem[];
    holidays?: string;
    tahun?: number;
}>();

const saldoCharts = computed<SaldoChartItem[]>(
    () =>
        dashProps.saldoCharts ?? [
            {
                jurnal: '1.01.01',
                nama: 'Kas Tunai',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                debit: [],
                kredit: [],
            },
        ],
);

const modules = [Navigation, Pagination, Autoplay];

const ringkasanKas = computed<RingkasanKasItem[]>(
    () =>
        dashProps.ringkasanKas ?? [
            {
                jurnal: '1.01.01',
                nama: 'Kas Tunai',
                total_debit: 0,
                total_kredit: 0,
                saldo: 0,
            },
        ],
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
const holidayText = computed(() => {
    return dashProps.holidays || 'Belum ada data hari besar Islam.';
});

const kajianText = computed(() => {
    let text = dashProps.upcomingKajians?.map(k => `${k.judul} oleh ${k.pemateri} (${formatTanggalKajian(k.tanggal)})`).join('  •  ') ?? '';
    return text || 'Belum ada jadwal kajian terbaru.';
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

            <div class="mx-auto flex max-w-[100vw] flex-col items-start gap-3 px-3 py-2 sm:max-w-7xl sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-6 sm:px-4 sm:py-3 md:px-6 md:py-4">
                <!-- Logo / nama masjid -->
                <div class="flex items-start gap-2 my-auto">
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 sm:h-12 sm:w-12 md:h-14 md:w-14">
                        <svg viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6 sm:h-8 sm:w-8 md:h-9 md:w-9">
                            <path
                                d="M12 2c.55 0 1 .45 1 1v1.07A7.002 7.002 0 0 1 19 11v3h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h1v-3a7.002 7.002 0 0 1 6-6.93V3c0-.55.45-1 1-1Z" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-sm font-semibold tracking-wider text-slate-500 uppercase sm:text-base md:text-lg lg:text-xl">
                            {{ masjid.label }}
                        </p>
                        <h1 class="text-xl leading-tight font-bold text-slate-900 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                            {{ masjid.nama }}
                        </h1>
                    </div>
                </div>

                <!-- Lokasi + jadwal sholat -->
                <div class="flex w-full flex-1 flex-col items-end gap-2 sm:items-end">
                    <div class="flex w-full items-center justify-between gap-2 my-1 sm:gap-4 sm:my-2">
                        <p class="text-lg font-extrabold text-blue-800 italic capitalize sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                            {{ prayerTimes?.lokasi || masjid.lokasi }}
                        </p>
                        <p class="text-sm text-blue-700 sm:text-base md:text-lg lg:text-xl xl:text-2xl">{{ todayLabel }}</p>
                    </div>
                    <div class="grid w-full grid-cols-4 gap-0.5 rounded-lg bg-slate-50 p-1 sm:grid-cols-7 sm:gap-1">
                        <div v-for="slot in prayerSlots" :key="slot.name"
                            class="flex flex-col items-center rounded-md py-0.5 text-center sm:py-1"
                            :class="[loading ? 'animate-pulse' : '']">
                            <span class="text-xs font-semibold tracking-wider text-slate-700 sm:text-sm md:text-base lg:text-lg xl:text-xl">
                                {{ slot.name }}
                            </span>
                            <span class="text-xs font-bold text-emerald-700 sm:text-sm md:text-base lg:text-lg xl:text-xl">
                                {{ slot.time }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Running text kajian (Atas) -->
            <div class="bg-emerald-700 text-yellow-200">
                <div class="overflow-hidden py-1.5 text-center text-sm font-medium whitespace-nowrap sm:py-2 sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                    <div class="marquee-1 inline-block">
                        <span class="px-10 sm:px-20">Info Kajian : {{ kajianText }} </span>
                        <span class="px-10 sm:px-20">Info Kajian : {{ kajianText }} </span>
                    </div>
                </div>
            </div>

            <div class="grid w-full grid-cols-1 gap-3 rounded-xl bg-emerald-800/20 p-3 backdrop-blur-sm sm:grid-cols-3 sm:gap-4 sm:p-4">
                <div class="flex flex-col items-center justify-center">
                    <div class="text-sm font-bold sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                        MENUJU {{ nextPrayer?.name ?? '--' }} KURANG
                    </div>
                    <div class="text-3xl font-bold text-emerald-700 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                        {{ countdown }}
                    </div>
                </div>

                <div class="flex flex-col items-center justify-center">
                    <div class="text-sm font-bold sm:text-base md:text-lg lg:text-xl xl:text-2xl">WAKTU IQOMAH</div>
                    <div class="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" :class="[
                        iqomahCountdown !== '00:00:00' ? 'text-red-700' : 'text-emerald-700',
                        { 'animate-pulse': iqomahCountdown !== '00:00:00' }
                    ]">
                        {{ iqomahCountdown }}
                    </div>
                </div>

                <div class="flex flex-col items-center justify-center text-center sm:items-start sm:text-left">
                    <h2 class="text-xl leading-tight font-extrabold text-emerald-900 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                        <span class="inline-block rounded bg-emerald-400 px-1.5 text-emerald-100 uppercase text-sm sm:text-base md:text-lg">sm</span>
                        SmartMasjid
                    </h2>
                    <p class="mt-1 text-xs leading-relaxed font-medium text-emerald-900/90 sm:text-sm md:text-base lg:text-lg">
                        Sistem informasi & manajemen keuangan masjid digital.
                    </p>
                </div>
            </div>

            <!-- Running text hari besar (Bawah) -->
            <div class="bg-emerald-700 text-white">
                <div class="overflow-hidden py-1.5 text-center text-sm font-medium whitespace-nowrap sm:py-2 sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                    <div class="marquee-2 inline-block">
                        <span class="px-10 sm:px-20" v-html="'Hari Besar Islam : ' + holidayText"></span>
                        <span class="px-10 sm:px-20" v-html="'Hari Besar Islam : ' + holidayText"></span>
                    </div>
                </div>
            </div>

            <!-- Menu bar + search -->
            <div class="border-t border-slate-100">
                <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-6 sm:py-3">
                    <nav class="flex flex-wrap items-center gap-3 sm:gap-6">
                        <a v-for="(m, i) in menus" :key="m.title" :href="m.href"
                            class="text-xs font-semibold transition-colors sm:text-sm md:text-base"
                            :class="i === 0
                                ? 'text-emerald-700'
                                : 'text-slate-700 hover:text-emerald-700'
                                ">
                            {{ m.title }}
                        </a>
                    </nav>
                    <div class="relative w-full sm:w-auto">
                        <Search
                            class="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 sm:left-3 sm:h-4 sm:w-4" />
                        <input v-model="search" type="search" placeholder="Search..."
                            class="h-8 w-full rounded-md border border-slate-200 bg-slate-50 pr-3 pl-8 text-xs outline-none focus:border-emerald-500 focus:bg-white sm:h-9 sm:w-72 sm:pl-9 sm:text-sm" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Green section (hero + footer info, full-width menyentuh navbar) -->
        <section
            class="hero-section flex min-h-[calc(100vh-280px)] items-center bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-300">
            <!-- Chart saldo kas + daftar kajian -->
            <div class="mx-auto w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div class="grid gap-4 lg:grid-cols-5">
                    <!-- Chart -->
                    <div class="rounded-2xl bg-white p-4 shadow-md sm:p-6 lg:col-span-3">
                        <div class="mb-4 flex flex-wrap items-start justify-between gap-2">
                            <div>
                                <h3 class="text-base font-bold text-slate-900 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                                    Saldo Kas Sampai Hari Ini
                                </h3>
                                <p class="text-xs text-slate-500 sm:text-sm md:text-base">
                                    Total pemasukan vs pengeluaran per bulan.
                                </p>
                            </div>
                        </div>

                        <Swiper :modules="modules" :slides-per-view="1" :space-between="20"
                            :pagination="{ clickable: true }" :navigation="true"
                            :autoplay="{ delay: 5000, disableOnInteraction: false }" class="saldo-carousel">
                            <SwiperSlide v-for="(chart, index) in saldoCharts" :key="chart.jurnal">
                                <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
                                    <div class="mb-3 flex flex-wrap items-start justify-between gap-2 sm:mb-4">
                                        <div>
                                            <h4 class="text-sm font-bold text-slate-700 sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                                                {{ chart.nama }} ({{ chart.jurnal }})
                                            </h4>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-xs text-slate-500 sm:text-sm">
                                                Saldo tahun berjalan
                                            </p>
                                            <p class="text-base font-bold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl" :class="ringkasanKas[index]?.saldo >= 0
                                                ? 'text-emerald-600'
                                                : 'text-rose-600'
                                                ">
                                                {{ formatRp(ringkasanKas[index]?.saldo ?? 0) }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="mb-3 grid grid-cols-2 gap-2 text-sm sm:mb-4 sm:gap-3 md:text-base lg:text-lg">
                                        <div class="rounded-lg bg-emerald-50 p-2">
                                            <p class="text-xs text-emerald-700 sm:text-sm">
                                                Total Debit
                                            </p>
                                            <p class="font-bold text-emerald-800">
                                                {{ formatRp(ringkasanKas[index]?.total_debit ?? 0) }}
                                            </p>
                                        </div>
                                        <div class="rounded-lg bg-rose-50 p-2">
                                            <p class="text-xs text-rose-700 sm:text-sm">
                                                Total Kredit
                                            </p>
                                            <p class="font-bold text-rose-800">
                                                {{ formatRp(ringkasanKas[index]?.total_kredit ?? 0) }}
                                            </p>
                                        </div>
                                    </div>

                                    <SaldoKasChart :labels="chart.labels" :debit="chart.debit" :kredit="chart.kredit" />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <!-- Upcoming Kajian -->
                    <div class="rounded-2xl bg-white p-4 shadow-md sm:p-6 lg:col-span-2">
                        <div class="mb-4">
                            <h3 class="text-base font-bold text-slate-900 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                                Kajian Mendatang
                            </h3>
                            <p class="text-xs text-slate-500 sm:text-sm md:text-base">
                                Jadwal kajian terdekat di masjid.
                            </p>
                        </div>

                        <div v-if="upcomingKajians.length === 0"
                            class="rounded-lg bg-slate-50 p-4 text-center text-xs text-slate-500 sm:p-6 sm:text-sm md:text-base">
                            Belum ada jadwal kajian mendatang.
                        </div>
                        <ul v-else class="space-y-2 sm:space-y-3">
                            <li v-for="kajian in upcomingKajians" :key="kajian.id"
                                class="rounded-lg border border-slate-100 p-2.5 transition hover:border-emerald-300 hover:bg-emerald-50/40 sm:p-3">
                                <p class="text-sm font-semibold text-slate-900 sm:text-base md:text-lg lg:text-xl">
                                    {{ kajian.judul }}
                                </p>
                                <p class="text-xs text-emerald-700 sm:text-sm md:text-base">
                                    {{ kajian.pemateri }}
                                </p>
                                <p class="mt-1 text-xs text-slate-500 sm:text-sm md:text-base">
                                    {{ formatTanggalKajian(kajian.tanggal) }}
                                    <span v-if="kajian.waktu">
                                        · {{ kajian.waktu }}</span>
                                </p>
                                <p v-if="kajian.tempat" class="mt-0.5 text-xs text-slate-500 sm:text-sm md:text-base">
                                    {{ kajian.tempat }}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer info (di atas background hijau yang sama) -->
        <div class="w-full px-3 pt-3 pb-6 sm:px-6 sm:pt-4 sm:pb-10">
            <div class="grid gap-4 rounded-2xl bg-emerald-400 p-4 shadow-md sm:p-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
                <!-- Masjid info -->
                <div class="flex items-start gap-3">
                    <div
                        class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 sm:h-10 sm:w-10 md:h-12 md:w-12">
                        <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7">
                            <path
                                d="M12 2c.55 0 1 .45 1 1v1.07A7.002 7.002 0 0 1 19 11v3h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h1v-3a7.002 7.002 0 0 1 6-6.93V3c0-.55.45-1 1-1Z" />
                        </svg>
                    </div>
                    <div class="text-xs sm:text-sm md:text-base">
                        <p class="font-bold text-slate-900">
                            Masjid {{ masjid.nama }}
                        </p>
                        <p class="mt-1 leading-relaxed text-slate-600">
                            {{ masjid.alamat }}
                        </p>
                    </div>
                </div>

                <!-- Ketua DKM -->
                <div class="flex items-center gap-3 border-slate-100 sm:gap-4 md:border-x md:px-4">
                    <img :src="ketua.foto" :alt="ketua.nama"
                        class="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-100 sm:h-14 sm:w-14 md:h-16 md:w-16" />
                    <div>
                        <p class="font-bold text-slate-900 text-sm sm:text-base md:text-lg lg:text-xl">
                            {{ ketua.nama }}
                        </p>
                        <p class="text-xs text-slate-500 sm:text-sm md:text-base">
                            {{ ketua.jabatan }}
                        </p>
                        <button
                            class="mt-1.5 rounded-md border border-emerald-600 px-2.5 py-1 text-xs font-bold tracking-wide text-emerald-700 transition hover:bg-emerald-600 hover:text-white sm:mt-2 sm:px-3 sm:text-sm">
                            PROFILE
                        </button>
                    </div>
                </div>

                <!-- Pusat info -->
                <div class="flex items-start gap-3">
                    <div class="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600 sm:h-10 sm:w-10 md:h-12 md:w-12">
                        <Phone class="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </div>
                    <div class="flex-1 text-xs sm:text-sm md:text-base">
                        <p class="font-bold text-slate-900">
                            Pusat Info Masjid
                        </p>
                        <p class="mt-1 text-slate-700">
                            {{ masjid.telepon }}
                        </p>
                        <div class="social-links mt-2 flex items-center gap-1.5 text-slate-500 sm:mt-3 sm:gap-2">
                            <a href="#" class="rounded-full bg-slate-100 p-1.5 hover:bg-slate-200 sm:p-2" title="Pesan">
                                <MessageCircle class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </a>
                            <a href="#" class="rounded-full bg-slate-100 p-1.5 hover:bg-slate-200 sm:p-2" title="Email">
                                <Mail class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </a>
                            <a href="#" class="rounded-full bg-slate-100 p-1.5 hover:bg-slate-200 sm:p-2" title="Lokasi">
                                <MapPin class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </a>
                            <span class="mx-0.5 h-4 w-px bg-slate-200 sm:mx-1" />
                            <a href="#" class="rounded-full bg-slate-100 p-1.5 hover:bg-slate-200 sm:p-2" title="Like">
                                <ThumbsUp class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </a>
                            <a href="#" class="rounded-full bg-slate-100 p-1.5 hover:bg-slate-200 sm:p-2" title="Donasi">
                                <Heart class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </a>
                            <a href="#" class="rounded-full bg-slate-100 p-1.5 hover:bg-slate-200 sm:p-2" title="Facebook">
                                <Facebook class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </a>
                            <a href="#" class="rounded-full bg-slate-100 p-1.5 hover:bg-slate-200 sm:p-2" title="Instagram">
                                <Instagram class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </a>
                            <a href="#" class="rounded-full bg-slate-100 p-1.5 hover:bg-slate-200 sm:p-2" title="Bagikan">
                                <Share2 class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.marquee-1 {
    animation: marquee-1 40s linear infinite;
}

.marquee-2 {
    animation: marquee-2 50s linear infinite;
}

@keyframes marquee-1 {
    0% {
        transform: translateX(-50%);
    }

    100% {
        transform: translateX(0);
    }
}

@keyframes marquee-2 {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

:deep(.blink) {
    animation: blink 1s steps(5, start) infinite;
    font-weight: bold;
    color: #fef3c7;
    font-size: 24px;
    /* yellow-100 or similar for contrast */
}

@keyframes blink {
    to {
        visibility: hidden;
    }
}

/* ══════════════════════════════════════════════════════════════════
   RESPONSIVE — HP → Tablet → Laptop → TV 32" → 4K
   ══════════════════════════════════════════════════════════════════ */

/* ── Main container max-width untuk TV ── */
@media (min-width: 1920px) {
    .min-h-screen.bg-emerald-800\/20 {
        max-width: 1920px;
        margin: 0 auto;
    }

    /* Sticky header expansion */
    .sticky .max-w-7xl,
    .border-t .max-w-7xl,
    section .max-w-7xl {
        max-width: 90rem !important;
    }
}

@media (min-width: 2560px) {
    .min-h-screen.bg-emerald-800\/20 {
        max-width: 2560px;
    }

    .sticky .max-w-7xl,
    .border-t .max-w-7xl,
    section .max-w-7xl {
        max-width: 120rem !important;
    }
}

/* ── Prayer grid mobile: 4 col default, 3 col very small ── */
@media (max-width: 360px) {
    .grid.grid-cols-4 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

/* ── Footer social icons wrapping di mobile kecil ── */
@media (max-width: 400px) {
    .social-links {
        flex-wrap: wrap;
    }
}

/* ── Green section min-height for TV ── */
@media (min-width: 1920px) {
    .hero-section {
        min-height: calc(100vh - 350px);
    }
}

/* ── Swiper carousel larger on TV ── */
@media (min-width: 1920px) {
    .saldo-carousel {
        --swiper-navigation-size: 2.5rem;
        --swiper-pagination-bullet-size: 0.75rem;
    }
}
</style>
