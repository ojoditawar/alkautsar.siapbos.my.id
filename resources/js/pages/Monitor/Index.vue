<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import SaldoKasChart from '@/components/SaldoKasChart.vue';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    MapPin,
    Mic,
    Pause,
    Play,
    Image as ImageIcon,
    TrendingUp,
    User,
    Tv,
} from 'lucide-vue-next';

// ============================================================
// Props dari backend
// ============================================================
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

interface MasjidInfo {
    id: string;
    nama: string;
    alamat: string;
    image: string | null;
}

interface MonitorConfigData {
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

interface MutiaraImageItem {
    id: number;
    image: string;
    caption: string | null;
}

const props = defineProps<{
    masjid?: MasjidInfo | null;
    saldoCharts?: SaldoChartItem[];
    ringkasanKas?: RingkasanKasItem[];
    upcomingKajians?: KajianItem[];
    monitorConfig?: MonitorConfigData | null;
    mutiaraImages?: MutiaraImageItem[];
    tahun?: number;
}>();

// ============================================================
// Konfigurasi Streaming
// ============================================================
interface StreamingSchedule {
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    youtubeUrl: string;
    title: string;
}

// Default jadwal streaming (11:15 - 11:30)
const streamingConfig = computed<StreamingSchedule>(() => ({
    startHour: props.monitorConfig?.streaming_start_hour ?? 11,
    startMinute: props.monitorConfig?.streaming_start_minute ?? 15,
    endHour: props.monitorConfig?.streaming_end_hour ?? 11,
    endMinute: props.monitorConfig?.streaming_end_minute ?? 30,
    youtubeUrl:
        props.monitorConfig?.streaming_youtube_url ??
        'https://www.youtube.com/embed/ltOMRnBoqLM?autoplay=1&mute=0&playsinline=1&rel=0',
    title: props.monitorConfig?.streaming_title ?? '🔴 Siaran Langsung',
}));

const isStreamingActive = ref(false);
let streamingCheckIntervalRef: ReturnType<typeof setInterval> | null = null;

// ============================================================
// Auto-rotate slides
// ============================================================
const SLIDE_INTERVAL = 15_000; // 15 detik per slide
const slides = ['sholat', 'kajian', 'keuangan', 'mutiara', 'streaming'] as const;
type Slide = (typeof slides)[number];

const currentSlide = ref<Slide>('sholat');
const isPaused = ref(false);
let rotateTimer: ReturnType<typeof setInterval> | null = null;
let countdownTimer: ReturnType<typeof setInterval> | null = null;
let chartSlideTimer: ReturnType<typeof setInterval> | null = null;
const mutiaraIndex = ref(0);
const MUTIARA_INTERVAL = 6_000;
let mutiaraTimer: ReturnType<typeof setInterval> | null = null;

function nextMutiara() {
    const images = props.mutiaraImages ?? [];
    if (images.length > 1) {
        mutiaraIndex.value = (mutiaraIndex.value + 1) % images.length;
    }
}

function prevMutiara() {
    const images = props.mutiaraImages ?? [];
    if (images.length > 1) {
        mutiaraIndex.value = (mutiaraIndex.value - 1 + images.length) % images.length;
    }
}

function goToSlide(slide: Slide) {
    currentSlide.value = slide;
    resetRotation();
}

function nextSlide() {
    const idx = slides.indexOf(currentSlide.value);
    currentSlide.value = slides[(idx + 1) % slides.length];
}

function prevSlide() {
    const idx = slides.indexOf(currentSlide.value);
    currentSlide.value = slides[(idx - 1 + slides.length) % slides.length];
}

function togglePause() {
    isPaused.value = !isPaused.value;
    if (isPaused.value) {
        stopRotation();
    } else {
        startRotation();
    }
}

function startRotation() {
    stopRotation();
    if (!isPaused.value && !isIqomahMode.value && !isSholatMode.value && !isStreamingActive.value) {
        rotateTimer = setInterval(nextSlide, SLIDE_INTERVAL);
    }
}

function stopRotation() {
    if (rotateTimer) {
        clearInterval(rotateTimer);
        rotateTimer = null;
    }
}

function resetRotation() {
    if (!isPaused.value && !isStreamingActive.value) {
        startRotation();
    }
}

// ============================================================
// Cek jadwal streaming
// ============================================================
function checkStreamingSchedule() {
    const now = new Date();
    // Sesuaikan ke timezone kota (sama seperti jadwal sholat)
    const cityNow = new Date(now.getTime() + tzDiff.value * 60 * 60 * 1000);
    const currentHour = cityNow.getHours();
    const currentMinute = cityNow.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    const startTimeInMinutes =
        streamingConfig.value.startHour * 60 +
        streamingConfig.value.startMinute;
    const endTimeInMinutes =
        streamingConfig.value.endHour * 60 + streamingConfig.value.endMinute;

    const wasActive = isStreamingActive.value;
    const isNowActive =
        currentTimeInMinutes >= startTimeInMinutes &&
        currentTimeInMinutes < endTimeInMinutes;

    isStreamingActive.value = isNowActive;

    // Jika status streaming berubah
    if (wasActive !== isNowActive) {
        if (isNowActive) {
            // Streaming mulai: paksa ke slide streaming dan hentikan rotasi
            currentSlide.value = 'streaming';
            isPaused.value = false; // Reset pause state
            stopRotation();
        } else {
            // Streaming selesai: lanjutkan rotasi normal
            startRotation();
        }
    } else if (isNowActive && currentSlide.value !== 'streaming') {
        // Jika streaming aktif tapi slide bukan streaming, pindahkan ke streaming
        currentSlide.value = 'streaming';
        stopRotation();
    }
}

// ============================================================
// Slide 1: Jadwal Sholat & Countdown
// ============================================================
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

const cityId = computed(() => props.monitorConfig?.city_id ?? '1204');

// ============================================================
// Timezone Utility: Sesuaikan sholat dgn zona waktu browser
// ============================================================
// Mapping timezone Indonesia berdasarkan prefix kode kota myquran
function getCityUtcOffset(cityId: string): number {
    const id = parseInt(cityId, 10);
    if (isNaN(id)) return 7; // default WIB

    // WIB (UTC+7): Sumatera, Jawa, Kalbar, Kalteng
    // Kode kota 1xxx = Aceh, 2xxx = Sumut, 3xxx = Sumbar, 4xxx = Riau, 5xxx = Jambi
    // 6xxx = Sumsel, 7xxx = Bengkulu, 8xxx = Lampung, 9xxx = Kep. Babel
    // 10xx-12xx = DKI, Jabar, Banten
    // 13xx = Jateng, 14xx = DIY, 15xx = Jatim
    // 16xx = Kalbar, 17xx = Kalteng
    if (
        id <= 1799 ||
        (id >= 5000 && id <= 5299) // Jambi juga WIB
    )
        return 7;

    // WITA (UTC+8): Bali, Sulteng, Sulsel, Kaltim, Kaltara, NTB, NTT, Gorontalo
    // 18xx = Kalsel, 19xx = Kaltim, 20xx = Kaltara
    // 21xx = Sulut, 22xx = Sulteng, 23xx = Sulsel, 24xx = Sultra, 25xx = Gorontalo
    // 26xx = Sulbar, 27xx = Bali, 28xx = NTB, 29xx = NTT
    if (
        (id >= 1800 && id <= 2999) ||
        (id >= 3500 && id <= 3699) // Maluku Utara
    )
        return 8;

    // WIT (UTC+9): Maluku, Papua, Papua Barat, Papua Selatan
    if (
        (id >= 3000 && id <= 3499) || // Maluku
        (id >= 3700 && id <= 3999) // Papua
    )
        return 9;

    return 7; // default WIB
}

const browserUtcOffset = -(new Date().getTimezoneOffset() / 60);
const cityUtcOffset = computed(() => getCityUtcOffset(cityId.value));
const tzDiff = computed(() => cityUtcOffset.value - browserUtcOffset);
const tzLabel = computed(() => {
    const offset = cityUtcOffset.value;
    if (offset === 8) return 'WITA';
    if (offset === 9) return 'WIT';
    return 'WIB';
}); // selisih jam

// Jika waktu sholat dari API dalam zona WITA (UTC+8) dan browser WIB (UTC+7),
// tzDiff = +1, artinya waktu sholat perlu dikurangi 1 jam untuk disamakan dgn browser
// agar perhitungan countdown akurat.

const prayerTimes = ref<PrayerData | null>(null);
const loadingSholat = ref(true);
const countdown = ref('--:--:--');
const nextPrayer = ref<{ name: string; time: string | undefined } | null>(null);

// === KODE ASLI ===
const iqomahDurations = computed(() => ({
    SUBUH: props.monitorConfig?.iqomah_subuh ?? 12,
    DZUHUR: props.monitorConfig?.iqomah_dzuhur ?? 10,
    ASHAR: props.monitorConfig?.iqomah_ashar ?? 10,
    MAGHRIB: props.monitorConfig?.iqomah_maghrib ?? 10,
    ISYA: props.monitorConfig?.iqomah_isya ?? 12,
}));
const sholatDurations = computed(() => {
    const today = new Date().getDay(); // 5 = Jumat
    const isFriday = today === 5;
    return {
        SUBUH: props.monitorConfig?.sholat_subuh ?? 20,
        DZUHUR: isFriday
            ? (props.monitorConfig?.sholat_jumat ?? 10)
            : (props.monitorConfig?.sholat_dzuhur ?? 25),
        ASHAR: props.monitorConfig?.sholat_ashar ?? 25,
        MAGHRIB: props.monitorConfig?.sholat_maghrib ?? 20,
        ISYA: props.monitorConfig?.sholat_isya ?? 30,
    };
});

const prayerSlots = computed(() => [
    {
        name: 'IMSAK',
        time:
            (prayerTimes.value?.jadwal?.imsak ?? '--:--') + ' ' + tzLabel.value,
        icon: '🌙',
    },
    {
        name: 'SUBUH',
        time:
            (prayerTimes.value?.jadwal?.subuh ?? '--:--') + ' ' + tzLabel.value,
        icon: '🌅',
    },
    {
        name: 'TERBIT',
        time:
            (prayerTimes.value?.jadwal?.terbit ?? '--:--') +
            ' ' +
            tzLabel.value,
        icon: '☀️',
    },
    {
        name: 'DZUHUR',
        time:
            (prayerTimes.value?.jadwal?.dzuhur ?? '--:--') +
            ' ' +
            tzLabel.value,
        icon: '🌤️',
    },
    {
        name: 'ASHAR',
        time:
            (prayerTimes.value?.jadwal?.ashar ?? '--:--') + ' ' + tzLabel.value,
        icon: '🌇',
    },
    {
        name: 'MAGHRIB',
        time:
            (prayerTimes.value?.jadwal?.maghrib ?? '--:--') +
            ' ' +
            tzLabel.value,
        icon: '🌆',
    },
    {
        name: 'ISYA',
        time:
            (prayerTimes.value?.jadwal?.isya ?? '--:--') + ' ' + tzLabel.value,
        icon: '🌃',
    },
]);

const isIqomahMode = ref(false);
const iqomahEndTime = ref<Date | null>(null);
const iqomahCountdown = ref('00:00:00');

const isSholatMode = ref(false);
const sholatEndTime = ref<Date | null>(null);
const sholatCountdown = ref('00:00:00');

const activePrayerName = ref<string | null>(null);

// Tampilkan JUMAT di hari Jumat (ganti DZUHUR)
const sholatDisplayName = computed(() => {
    if (activePrayerName.value === 'DZUHUR') {
        const today = new Date().getDay();
        return today === 5 ? 'JUMAT' : 'DZUHUR';
    }
    return activePrayerName.value ?? '';
});

// Deteksi mode Jumat
const isJumatMode = computed(() => {
    return new Date().getDay() === 5 && activePrayerName.value === 'DZUHUR';
});

async function fetchPrayerTimes() {
    try {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const response = await fetch(
            'https://api.myquran.com/v2/sholat/jadwal/' +
            cityId.value +
            '/' +
            year +
            '/' +
            month +
            '/' +
            day,
        );
        const json = await response.json();
        const data = json.data as PrayerData;

        // // === KODE TESTING HARI JUMAT (1 MENIT MENUJU SHOLAT) ===
        // if (new Date().getDay() === 5 && data?.jadwal) {
        //     const testDate = new Date(Date.now() + 60 * 1000); // +1 menit
        //     const h = String(testDate.getHours()).padStart(2, '0');
        //     const m = String(testDate.getMinutes()).padStart(2, '0');
        //     data.jadwal.dzuhur = h + ':' + m;
        // }
        // // === AKHIR KODE TESTING ===
        prayerTimes.value = data;
    } catch (error) {
        console.error('Gagal mengambil jadwal sholat:', error);
    } finally {
        loadingSholat.value = false;
    }
}

function updateCountdown() {
    const jadwal = prayerTimes.value?.jadwal;
    if (!jadwal) {
        countdown.value = '--:--:--';
        nextPrayer.value = null;
        return;
    }

    const now = new Date();

    // Handle sholat countdown
    if (isSholatMode.value && sholatEndTime.value) {
        const diffMs = sholatEndTime.value.getTime() - now.getTime();
        if (diffMs > 0) {
            const diffSeconds = Math.floor(diffMs / 1000);
            const m = Math.floor(diffSeconds / 60);
            const s = diffSeconds % 60;
            sholatCountdown.value = `00:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        } else {
            isSholatMode.value = false;
            sholatEndTime.value = null;
            sholatCountdown.value = '00:00:00';
            activePrayerName.value = null;
            startRotation();
        }
    }

    // Handle iqomah countdown
    if (isIqomahMode.value && iqomahEndTime.value) {
        const diffMs = iqomahEndTime.value.getTime() - now.getTime();
        if (diffMs > 0) {
            const diffSeconds = Math.floor(diffMs / 1000);
            const m = Math.floor(diffSeconds / 60);
            const s = diffSeconds % 60;
            iqomahCountdown.value = `00:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        } else {
            isIqomahMode.value = false;
            iqomahEndTime.value = null;
            iqomahCountdown.value = '00:00:00';

            if (
                activePrayerName.value &&
                sholatDurations.value[
                activePrayerName.value as keyof typeof sholatDurations.value
                ]
            ) {
                isSholatMode.value = true;
                const duration =
                    sholatDurations.value[
                    activePrayerName.value as keyof typeof sholatDurations.value
                    ];
                sholatEndTime.value = new Date(
                    now.getTime() + duration * 60 * 1000,
                );
                sholatCountdown.value = `00:${String(duration).padStart(2, '0')}:00`;
                currentSlide.value = 'sholat';
                stopRotation();
            } else {
                startRotation();
            }
        }
    }

    const prayers = prayerSlots.value;
    let nextTime: { name: string; time: string } | null = null;
    let minDiff = Infinity;

    for (const prayer of prayers) {
        if (!prayer.time || prayer.time.startsWith('--:--')) continue;

        const [timePart] = prayer.time.split(' ');
        const [hours, minutes] = timePart.split(':').map(Number);
        const adjustedHours = hours - tzDiff.value;
        const prayerDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            adjustedHours,
            minutes,
        );
        let diffMs = prayerDate.getTime() - now.getTime();

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
            nextTime = { name: prayer.name, time: prayer.time };
        }
    }

    if (nextTime) {
        nextPrayer.value = nextTime;
        const diffSeconds = Math.floor(minDiff / 1000);
        const h = Math.floor(diffSeconds / 3600);
        const m = Math.floor((diffSeconds % 3600) / 60);
        const s = diffSeconds % 60;
        countdown.value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

        if (
            diffSeconds <= 0 &&
            nextTime.name !== 'TERBIT' &&
            !isIqomahMode.value &&
            !isSholatMode.value &&
            !isStreamingActive.value // Jangan ganggu streaming
        ) {
            // Hari Jumat untuk DZUHUR: skip iqomah, langsung sholat
            if (nextTime.name === 'DZUHUR' && new Date().getDay() === 5) {
                isSholatMode.value = true;
                activePrayerName.value = nextTime.name;
                const jumatDur = sholatDurations.value.DZUHUR;
                sholatEndTime.value = new Date(
                    now.getTime() + jumatDur * 60 * 1000,
                );
                sholatCountdown.value =
                    '00:' + String(jumatDur).padStart(2, '0') + ':00';
                currentSlide.value = 'sholat';
                stopRotation();
            } else {
                isIqomahMode.value = true;
                activePrayerName.value = nextTime.name;

                const duration =
                    iqomahDurations.value[
                    nextTime.name as keyof typeof iqomahDurations.value
                    ] || 10;
                iqomahEndTime.value = new Date(
                    now.getTime() + duration * 60 * 1000,
                );
                iqomahCountdown.value = `00:${String(duration).padStart(2, '0')}:00`;
                currentSlide.value = 'sholat';
                stopRotation();
            }
        }
    }
}

// ============================================================
// Slide 3: Keuangan - auto-rotate chart
// ============================================================
const currentChartIndex = ref(0);
const CHART_INTERVAL = 8_000;

const totalSaldo = computed(() =>
    (props.ringkasanKas ?? []).reduce((sum, item) => sum + item.saldo, 0),
);

function nextChart() {
    const charts = props.saldoCharts ?? [];
    if (charts.length > 0) {
        currentChartIndex.value = (currentChartIndex.value + 1) % charts.length;
    }
}

function prevChart() {
    const charts = props.saldoCharts ?? [];
    if (charts.length > 0) {
        currentChartIndex.value =
            (currentChartIndex.value - 1 + charts.length) % charts.length;
    }
}

const currentChart = computed(() => {
    const charts = props.saldoCharts ?? [];
    return charts[currentChartIndex.value] ?? null;
});

const currentRingkasan = computed(() => {
    const ringkasan = props.ringkasanKas ?? [];
    return ringkasan[currentChartIndex.value] ?? null;
});

// ============================================================
// Helpers
// ============================================================
function formatRp(n: number): string {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n));
}

function formatTanggal(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

function formatWaktu(waktu: string | null): string {
    if (!waktu) return '';
    return waktu.substring(0, 5);
}

const todayLabel = computed(() =>
    new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }),
);

const bgStyle = computed(() => {
    const defaultImage = '/gambar/1777954256_Alkautsar3.png';
    const userImage =
        props.masjid?.image && props.masjid.image.trim() !== ''
            ? props.masjid.image
            : null;

    const bgImageStyle = userImage
        ? `url("${userImage}"), url("${defaultImage}")`
        : `url("${defaultImage}")`;

    return {
        backgroundImage: bgImageStyle,
        backgroundSize: '100% 100%, 100% 100%',
        backgroundPosition: 'center, center',
        backgroundRepeat: 'no-repeat, no-repeat',
        opacity: 0.4,
    };
});

// ============================================================
// Lifecycle
// ============================================================
onMounted(() => {
    fetchPrayerTimes();
    countdownTimer = setInterval(updateCountdown, 1000);
    chartSlideTimer = setInterval(nextChart, CHART_INTERVAL);
    mutiaraTimer = setInterval(nextMutiara, MUTIARA_INTERVAL);
    // Setup streaming schedule checker (cek setiap detik)
    streamingCheckIntervalRef = setInterval(checkStreamingSchedule, 1000);

    startRotation();
});

onUnmounted(() => {
    stopRotation();

    if (countdownTimer) {
        clearInterval(countdownTimer);
    }

    if (chartSlideTimer) {
        clearInterval(chartSlideTimer);
    }

    if (mutiaraTimer) {
        clearInterval(mutiaraTimer);
    }

    if (streamingCheckIntervalRef) {
        clearInterval(streamingCheckIntervalRef);
    }
});
</script>

<template>

    <Head title="Monitor" />

    <div class="monitor-container">
        <!-- Background overlay -->
        <div class="bg-overlay" :style="bgStyle">
            <div class="bg-mask"></div>
        </div>

        <!-- Main Content -->
        <div class="content-wrapper">
            <!-- Header -->
            <div class="header" v-if="!isSholatMode && !isStreamingActive">
                <div class="header-left">
                    <h1 class="text-xl font-bold text-slate-800 drop-shadow-md sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                        {{ props.masjid?.nama ?? 'Monitor Masjid' }}
                    </h1>
                    <p class="text-xs text-slate-700 sm:text-sm md:text-base lg:text-lg xl:text-xl">{{ todayLabel }}</p>
                </div>
                <div class="header-right">
                    <button class="control-btn" :title="isPaused ? 'Lanjutkan rotasi' : 'Jeda rotasi'"
                        @click="togglePause">
                        <Play v-if="isPaused" class="h-4 w-4" />
                        <Pause v-else class="h-4 w-4" />
                    </button>
                </div>
            </div>

            <!-- Streaming Active Banner -->
            <div v-if="isStreamingActive && currentSlide === 'streaming'" class="streaming-banner">
                <Tv class="h-5 w-5" />
                <span>Streaming Sedang Berlangsung</span>
                <span class="streaming-time">
                    {{ String(streamingConfig.startHour).padStart(2, '0') }}:{{
                        String(streamingConfig.startMinute).padStart(2, '0')
                    }}
                    - {{ String(streamingConfig.endHour).padStart(2, '0') }}:{{
                        String(streamingConfig.endMinute).padStart(2, '0')
                    }}
                </span>
            </div>

            <!-- Slide Navigation Dots -->
            <div class="slide-nav" v-if="!isSholatMode && !isStreamingActive">
                <button v-for="slide in slides" :key="slide" class="slide-dot"
                    :class="{ active: currentSlide === slide }" :title="slide === 'sholat'
                        ? 'Jadwal Sholat'
                        : slide === 'kajian'
                            ? 'Jadwal Kajian'
                            : slide === 'keuangan'
                                ? 'Laporan Keuangan'
                                : slide === 'mutiara'
                                    ? 'Mutiara Islam'
                                    : 'Streaming / Live'
                        " @click="goToSlide(slide)">
                    <Clock v-if="slide === 'sholat'" class="h-4 w-4" />
                    <Mic v-else-if="slide === 'kajian'" class="h-4 w-4" />
                    <TrendingUp v-else-if="slide === 'keuangan'" class="h-4 w-4" />
                    <ImageIcon v-else-if="slide === 'mutiara'" class="h-4 w-4" />
                    <Tv v-else-if="slide === 'streaming'" class="h-4 w-4" />
                    <span class="ml-1.5 hidden text-xs font-medium sm:inline">
                        {{
                            slide === 'sholat'
                                ? 'Sholat'
                                : slide === 'kajian'
                                    ? 'Kajian'
                                    : slide === 'keuangan'
                                        ? 'Keuangan'
                                        : slide === 'mutiara'
                                            ? 'Mutiara'
                                            : 'Streaming'
                        }}
                    </span>
                </button>
            </div>

            <!-- SLIDE IQOMAH (Fullscreen) -->
            <div v-if="isIqomahMode"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-md">
                <div
                    class="flex w-full max-w-[95vw] flex-col items-center justify-center rounded-[2rem] border border-amber-500/40 bg-slate-900/90 p-8 shadow-[0_0_80px_rgba(0,0,0,0.5)] sm:max-w-3xl sm:rounded-[3rem] sm:p-12 md:max-w-4xl md:p-14 lg:max-w-5xl lg:p-16 xl:max-w-6xl 2xl:max-w-7xl">
                    <p
                        class="mb-3 text-center text-2xl font-extrabold tracking-wide text-amber-400 uppercase drop-shadow-lg sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                        Sisa Waktu Iqomah
                    </p>
                    <p
                        class="text-center font-mono text-6xl leading-none font-black tracking-widest text-amber-300 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem]">
                        {{ iqomahCountdown }}
                    </p>
                    <p class="mt-6 text-center text-lg font-semibold tracking-wider text-emerald-300 sm:mt-8 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                        Isi dengan Sholat Sunnah dan Dzikir Yang Baik
                    </p>
                </div>
            </div>

            <!-- SLIDE JEDA SHOLAT (Prioritas Utama) -->
            <div v-else-if="isSholatMode"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-md">
                <!-- Tampilan Jumat Khusus -->
                <div v-if="isJumatMode"
                    class="flex w-full max-w-[95vw] flex-col items-center justify-center rounded-[2rem] border border-emerald-500/40 bg-slate-900/90 p-6 shadow-[0_0_80px_rgba(0,0,0,0.5)] sm:max-w-3xl sm:rounded-[3rem] sm:p-8 md:max-w-4xl md:p-10 lg:max-w-5xl lg:p-12 xl:max-w-6xl 2xl:max-w-7xl">
                    <p
                        class="mb-3 text-center text-2xl font-extrabold tracking-wide text-emerald-400 uppercase drop-shadow-lg sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                        Kegiatan Sholat JUMAT Sedang Berlangsung
                    </p>
                    <p class="mb-4 text-center text-sm leading-relaxed font-medium text-amber-200 sm:mb-5 sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                        Alat Komunikasi Termasuk Handphone mohon di Non Aktifkan
                        (Mode Silent) untuk menjaga Kekhusyukan dan Kesempurnaan
                        Ibadah Sholat Jumat
                    </p>
                    <p
                        class="text-center font-mono text-5xl leading-none font-black tracking-widest text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] sm:text-7xl md:text-[9rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem]">
                        {{ sholatCountdown }}
                    </p>
                    <p class="mt-4 text-center text-sm font-semibold text-emerald-300 sm:mt-5 sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                        Terima Kasih Atas Perhatian dan Kerja Sama nya 🙏<br />
                        Semoga Allah Meridhoi Kita Semua, AaaMiiin 🤲
                    </p>
                </div>
                <!-- Tampilan Sholat Biasa -->
                <div v-else
                    class="flex w-full max-w-[95vw] flex-col items-center justify-center rounded-[2rem] border border-slate-700/50 bg-slate-900/90 p-8 shadow-[0_0_80px_rgba(0,0,0,0.5)] sm:max-w-3xl sm:rounded-[3rem] sm:p-12 md:max-w-4xl md:p-14 lg:max-w-5xl lg:p-16 xl:max-w-6xl 2xl:max-w-7xl">
                    <p
                        class="mb-4 text-center text-3xl font-extrabold tracking-wide text-rose-500 uppercase drop-shadow-lg sm:mb-5 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                        Kegiatan Sholat {{ sholatDisplayName }} Sedang
                        Berlangsung...
                    </p>
                    <p class="mb-8 text-center text-xl font-semibold tracking-wider text-slate-300 sm:mb-10 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                        Harap Tenang
                    </p>
                    <p
                        class="text-center font-mono text-6xl leading-none font-black tracking-widest text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem]">
                        {{ sholatCountdown }}
                    </p>
                </div>
            </div>

            <!-- SLIDE STREAMING -->
            <div v-else-if="currentSlide === 'streaming'" class="slide-area slide-streaming">
                <div class="streaming-container">
                    <div class="streaming-header">
                        <Tv class="h-6 w-6" />
                        <h2 class="streaming-title">
                            {{ streamingConfig.title }}
                        </h2>
                    </div>

                    <!-- YouTube Player (hanya aktif saat jadwal streaming) -->
                    <div v-if="isStreamingActive" class="video-wrapper">
                        <iframe :src="streamingConfig.youtubeUrl" class="video-iframe" frameborder="0" allow="
                                accelerometer;
                                autoplay;
                                clipboard-write;
                                encrypted-media;
                                gyroscope;
                                picture-in-picture;
                            " allowfullscreen>
                        </iframe>
                    </div>
                    <!-- Placeholder saat streaming tidak aktif -->
                    <div v-else class="video-wrapper"
                        style="display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.3);border-radius:0.75rem;padding-bottom:56.25%;position:relative">
                        <div
                            style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;color:#94a3b8">
                            <Tv class="h-12 w-12 text-slate-600" />
                            <p class="text-lg font-medium">Streaming Offline</p>
                            <p class="text-sm">Jadwal: {{ ("00" + streamingConfig.startHour).slice(-2) }}:{{ ("00" +
                                streamingConfig.startMinute).slice(-2) }} - {{ ("00" +
                                    streamingConfig.endHour).slice(-2) }}:{{ ("00" + streamingConfig.endMinute).slice(-2) }}
                            </p>
                        </div>
                    </div>

                    <!-- Streaming Info -->
                    <div class="streaming-info">
                        <div class="streaming-schedule">
                            <Clock class="h-4 w-4" />
                            <span>Jadwal Streaming:
                                {{
                                    String(streamingConfig.startHour).padStart(2, '0')
                                }}:{{
                                    String(streamingConfig.startMinute).padStart(2, '0')
                                }}
                                -
                                {{
                                    String(streamingConfig.endHour).padStart(2, '0')
                                }}:{{
                                    String(streamingConfig.endMinute).padStart(2, '0')
                                }}</span>
                        </div>
                        <div class="streaming-status" :class="{ active: isStreamingActive }">
                            <span class="status-dot"></span>
                            <span>{{
                                isStreamingActive
                                    ? 'LIVE - Sedang Berlangsung'
                                    : 'Offline - Menunggu Jadwal'
                            }}</span>
                        </div>
                    </div>

                    <!-- Message when not active -->
                    <div v-if="!isStreamingActive" class="streaming-waiting">
                        <p>
                            Streaming akan dimulai pada jadwal yang telah
                            ditentukan
                        </p>
                    </div>
                </div>
            </div>

            <!-- SLIDE 1: JADWAL SHOLAT -->
            <div v-else-if="currentSlide === 'sholat'" class="slide-area slide-sholat">
                <!-- Countdown Box -->
                <div class="countdown-box">
                    <template v-if="nextPrayer">
                        <p class="text-sm font-medium text-slate-600 md:text-base lg:text-lg xl:text-xl">
                            Menuju {{ nextPrayer.name }}
                        </p>
                        <p class="countdown-text text-5xl font-black tracking-widest text-slate-800 drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                            {{ countdown }}
                        </p>
                    </template>
                    <template v-else>
                        <p class="text-3xl font-bold text-slate-400">
                            Memuat jadwal...
                        </p>
                    </template>
                </div>

                <!-- Prayer Slots Grid -->
                <div class="prayer-grid">
                    <div v-for="slot in prayerSlots" :key="slot.name" class="prayer-slot" :class="{
                        'is-next':
                            nextPrayer?.name === slot.name &&
                            !isIqomahMode &&
                            !isSholatMode,
                        'is-iqomah':
                            nextPrayer?.name === slot.name &&
                            (isIqomahMode || isSholatMode),
                    }">
                        <span class="text-lg">{{ slot.icon }}</span>
                        <span class="text-xs font-semibold tracking-wide uppercase">{{ slot.name }}</span>
                        <span class="text-sm font-bold">{{ slot.time }}</span>
                    </div>
                </div>

                <p class="mt-2 text-xs text-blue-700">
                    {{ prayerTimes?.lokasi ?? ''
                    }}{{
                        prayerTimes?.daerah ? ', ' + prayerTimes.daerah : ''
                    }}
                    - {{ tzLabel }}
                </p>
            </div>

            <!-- SLIDE 2: JADWAL KAJIAN -->
            <div v-else-if="currentSlide === 'kajian'" class="slide-area slide-kajian">
                <div class="kajian-list-wrapper">
                    <div v-if="
                        !props.upcomingKajians ||
                        props.upcomingKajians.length === 0
                    " class="empty-state">
                        <Mic class="h-12 w-12 text-white/40" />
                        <p class="text-slate-400">
                            Belum ada jadwal kajian mendatang.
                        </p>
                    </div>
                    <div v-else class="kajian-grid">
                        <div v-for="kajian in props.upcomingKajians" :key="kajian.id" class="kajian-card">
                            <div class="kajian-date">
                                <Calendar class="h-4 w-4" />
                                <span>{{ formatTanggal(kajian.tanggal) }}</span>
                                <span v-if="kajian.waktu" class="kajian-time">
                                    <Clock class="h-3.5 w-3.5" />
                                    {{ formatWaktu(kajian.waktu) }}
                                </span>
                            </div>
                            <h3 class="kajian-title">{{ kajian.judul }}</h3>
                            <div class="kajian-meta">
                                <span v-if="kajian.pemateri" class="kajian-pemateri">
                                    <User class="h-3.5 w-3.5" />
                                    {{ kajian.pemateri }}
                                </span>
                                <span v-if="kajian.tempat" class="kajian-tempat">
                                    <MapPin class="h-3.5 w-3.5" />
                                    {{ kajian.tempat }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SLIDE 3: LAPORAN KEUANGAN -->
            <div v-else-if="currentSlide === 'keuangan'" class="slide-area slide-keuangan">
                <!-- Total Saldo -->
                <div class="total-saldo-box">
                    <p class="text-xs font-medium text-slate-600 md:text-sm lg:text-base xl:text-lg">
                        Total Saldo Kas {{ props.tahun }}
                    </p>
                    <p class="text-3xl font-black text-slate-800 drop-shadow-lg md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                        {{ formatRp(totalSaldo) }}
                    </p>
                </div>

                <!-- Chart Navigator -->
                <div v-if="(props.saldoCharts ?? []).length > 1" class="chart-nav">
                    <button class="chart-nav-btn" @click="prevChart">
                        <ChevronLeft class="h-4 w-4" />
                    </button>
                    <span class="text-sm font-medium text-white/80">
                        {{ currentChart?.nama ?? '-' }}
                        ({{ currentChartIndex + 1 }}/{{
                            (props.saldoCharts ?? []).length
                        }})
                    </span>
                    <button class="chart-nav-btn" @click="nextChart">
                        <ChevronRight class="h-4 w-4" />
                    </button>
                </div>

                <!-- Chart -->
                <div v-if="currentChart" class="chart-wrapper">
                    <h3 class="mb-2 text-center text-base font-bold text-slate-800 md:text-lg lg:text-xl xl:text-2xl">
                        {{ currentChart.nama }}
                    </h3>
                    <div class="chart-header-row">
                        <div class="flex gap-4 text-sm">
                            <span class="font-semibold text-emerald-400">
                                Debit:
                                {{
                                    formatRp(currentRingkasan?.total_debit ?? 0)
                                }}
                            </span>
                            <span class="font-semibold text-rose-400">
                                Kredit:
                                {{
                                    formatRp(
                                        currentRingkasan?.total_kredit ?? 0,
                                    )
                                }}
                            </span>
                        </div>
                        <span class="text-sm font-bold text-slate-800">
                            Saldo: {{ formatRp(currentRingkasan?.saldo ?? 0) }}
                        </span>
                    </div>
                    <SaldoKasChart :labels="currentChart.labels" :debit="currentChart.debit"
                        :kredit="currentChart.kredit" />
                </div>
                <div v-else class="py-8 text-center text-slate-400">
                    Belum ada data keuangan.
                </div>
            </div>

            <!-- SLIDE 4: GAMBAR MUTIARA -->
            <div v-else-if="currentSlide === 'mutiara'" class="slide-area slide-mutiara">
                <div v-if="!props.mutiaraImages || props.mutiaraImages.length === 0" class="empty-state">
                    <ImageIcon class="h-12 w-12 text-white/40" />
                    <p class="text-slate-400">Belum ada gambar mutiara.</p>
                </div>
                <template v-else>
                    <!-- Navigator (seperti chart keuangan) -->
                    <div v-if="props.mutiaraImages.length > 1" class="chart-nav">
                        <button class="chart-nav-btn" @click="prevMutiara">
                            <ChevronLeft class="h-4 w-4" />
                        </button>
                        <span class="text-sm font-medium text-white/80">
                            {{ mutiaraIndex + 1 }} / {{ props.mutiaraImages.length }}
                        </span>
                        <button class="chart-nav-btn" @click="nextMutiara">
                            <ChevronRight class="h-4 w-4" />
                        </button>
                    </div>

                    <!-- Image Display -->
                    <div class="mutiara-image-wrapper">
                        <Transition name="mutiara-fade" mode="out-in">
                            <img :key="mutiaraIndex" :src="props.mutiaraImages[mutiaraIndex].image"
                                :alt="props.mutiaraImages[mutiaraIndex].caption ?? 'Gambar Mutiara'"
                                class="mutiara-image" />
                        </Transition>
                    </div>

                    <!-- Caption -->
                    <p v-if="props.mutiaraImages[mutiaraIndex].caption" class="mutiara-caption">
                        {{ props.mutiaraImages[mutiaraIndex].caption }}
                    </p>
                </template>
            </div>

            <!-- Manual Navigation Arrows -->
            <button v-if="!isSholatMode && !isStreamingActive" class="slide-arrow slide-arrow-left" @click="prevSlide">
                <ChevronLeft class="h-6 w-6" />
            </button>
            <button v-if="!isSholatMode && !isStreamingActive" class="slide-arrow slide-arrow-right" @click="nextSlide">
                <ChevronRight class="h-6 w-6" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.monitor-container {
    position: fixed;
    inset: 0;
    display: flex;
    height: 100dvh;
    width: 100vw;
    flex-direction: column;
    overflow: hidden;
    background-color: #e2e8f0;
    z-index: 50;
}

/* === Background === */
.bg-overlay {
    position: fixed;
    inset: 0;
    z-index: 0;
}

.bg-mask {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.22) 100%);
}

/* === Content === */
.content-wrapper {
    position: relative;
    z-index: 10;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 1.5rem 1rem;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.header-left {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
}

.control-btn {
    display: flex;
    height: 2.25rem;
    width: 2.25rem;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: 1px solid rgba(148, 163, 184, 0.5);
    background: rgba(255, 255, 255, 0.85);
    color: #475569;
    backdrop-filter: blur(4px);
    transition: all 0.15s ease;
    cursor: pointer;
}

.control-btn:hover {
    background: rgba(255, 255, 255, 0.98);
    border-color: #94a3b8;
}

/* === Streaming Banner === */
.streaming-banner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    background: linear-gradient(135deg, #dc2626, #b91c1c);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    margin-bottom: 1rem;
    font-weight: 600;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.streaming-time {
    font-size: 0.75rem;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
}

/* === Slide Nav === */
.slide-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.slide-dot {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border-radius: 9999px;
    border: 1px solid rgba(148, 163, 184, 0.5);
    padding: 0.375rem 0.75rem;
    color: #64748b;
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.6);
}

.slide-dot:hover {
    border-color: #94a3b8;
    color: #1e293b;
    background: rgba(255, 255, 255, 0.88);
}

.slide-dot.active {
    border-color: #64748b;
    background: #fff;
    color: #1e293b;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* === Slide Area === */
.slide-area {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
}

/* === STREAMING === */
.slide-streaming {
    justify-content: center;
    padding: 1rem;
}

.streaming-container {
    width: 100%;
    max-width: 80rem;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 1.5rem;
    padding: 1.5rem;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.streaming-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    color: white;
}

.streaming-title {
    font-size: 1.5rem;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.video-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    /* 16:9 aspect ratio */
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.video-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

.streaming-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.75rem;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.streaming-schedule {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #cbd5e1;
    font-size: 0.875rem;
}

.streaming-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    background: rgba(0, 0, 0, 0.5);
    color: #94a3b8;
}

.streaming-status.active {
    background: rgba(220, 38, 38, 0.2);
    color: #ef4444;
}

.status-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #64748b;
}

.streaming-status.active .status-dot {
    background-color: #ef4444;
    animation: pulse 1s infinite;
}

.streaming-waiting {
    text-align: center;
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 0.75rem;
    color: #94a3b8;
    font-size: 0.875rem;
}

/* === SHOLAT === */
.slide-sholat {
    gap: 1.5rem;
}

.countdown-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    border: 1px solid rgba(148, 163, 184, 0.18);
    background: rgba(255, 255, 255, 0.9);
    padding: 1.5rem 2rem;
    backdrop-filter: blur(12px);
    text-align: center;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.prayer-grid {
    display: grid;
    width: 100%;
    max-width: 48rem;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 0.5rem;
}

.prayer-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(148, 163, 184, 0.18);
    background: rgba(255, 255, 255, 0.82);
    padding: 0.75rem 0.5rem;
    color: #475569;
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;
}

.prayer-slot.is-next {
    transform: scale(1.05);
    border-color: rgba(245, 158, 11, 0.5);
    background: rgba(255, 248, 237, 0.96);
    color: #92400e;
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.22);
}

.prayer-slot.is-iqomah {
    transform: scale(1.05);
    border-color: rgba(16, 185, 129, 0.5);
    background: rgba(236, 253, 245, 0.96);
    color: #065f46;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.22);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* === KAJIAN === */
.slide-kajian {
    justify-content: flex-start;
    padding-top: 0.5rem;
}

.kajian-list-wrapper {
    width: 100%;
    max-width: 56rem;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
}

.kajian-grid {
    display: grid;
    gap: 0.75rem;
}

@media (min-width: 640px) {
    .kajian-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

.kajian-card {
    border-radius: 0.75rem;
    border: 1px solid rgba(148, 163, 184, 0.18);
    background: rgba(255, 255, 255, 0.9);
    padding: 1rem;
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.kajian-card:hover {
    border-color: #94a3b8;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.kajian-date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: #b45309;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
}

.kajian-time {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #64748b;
    margin-left: auto;
}

.kajian-title {
    font-size: 1rem;
    font-weight: 700;
    color: #1e293b;
    line-height: 1.375;
}

.kajian-meta {
    margin-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.75rem;
    color: #64748b;
}

.kajian-pemateri {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.kajian-tempat {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

/* === KEUANGAN === */
.slide-keuangan {
    gap: 1rem;
}

.total-saldo-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    border: 1px solid rgba(148, 163, 184, 0.18);
    background: rgba(255, 255, 255, 0.9);
    padding: 1rem 2rem;
    backdrop-filter: blur(12px);
    text-align: center;
}

.chart-nav {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.chart-nav-btn {
    display: flex;
    height: 2rem;
    width: 2rem;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: 1px solid rgba(148, 163, 184, 0.4);
    background: rgba(255, 255, 255, 0.85);
    color: #475569;
    transition: all 0.15s ease;
    cursor: pointer;
}

.chart-nav-btn:hover {
    background: #fff;
    color: #1e293b;
    border-color: #94a3b8;
}

.chart-wrapper {
    width: 100%;
    max-width: 56rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(148, 163, 184, 0.18);
    background: rgba(255, 255, 255, 0.9);
    padding: 1rem;
    backdrop-filter: blur(4px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.chart-header-row {
    margin-bottom: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
}

/* === Slide Arrows === */
.slide-arrow {
    position: fixed;
    top: 50%;
    z-index: 20;
    display: flex;
    height: 3rem;
    width: 3rem;
    transform: translateY(-50%);
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: 1px solid rgba(148, 163, 184, 0.35);
    background: rgba(255, 255, 255, 0.9);
    color: #475569;
    backdrop-filter: blur(12px);
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.slide-arrow:hover {
    border-color: #94a3b8;
    background: #fff;
    color: #1e293b;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.slide-arrow-left {
    left: 0.75rem;
}

@media (min-width: 640px) {
    .slide-arrow-left {
        left: 1.5rem;
    }
}

.slide-arrow-right {
    right: 0.75rem;
}

@media (min-width: 640px) {
    .slide-arrow-right {
        right: 1.5rem;
    }
}


/* === MUTIARA === */
.mutiara-swiper {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
}

.mutiara-image-wrapper {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-height: calc(100dvh - 12rem);
    overflow: hidden;
}

.mutiara-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.mutiara-caption {
    font-size: 1.125rem;
    font-weight: 500;
    color: #334155;
    text-align: center;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 0.75rem;
    backdrop-filter: blur(4px);
}

.mutiara-dots {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 1rem;
}

.mutiara-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 9999px;
    border: 1px solid rgba(148, 163, 184, 0.5);
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;
}

.mutiara-dot.active {
    background: #334155;
    border-color: #334155;
}

/* === Animations === */
@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

/* ══════════════════════════════════════════════════════════════════
   RESPONSIVE — HP → Tablet → Laptop → TV 32" → 4K
   ══════════════════════════════════════════════════════════════════ */

/* ── Content wrapper padding ── */
/* default (phone <640px) already set */

@media (min-width: 640px) {
    .content-wrapper {
        padding: 1.25rem 1.5rem;
    }
}

@media (min-width: 768px) {
    .content-wrapper {
        padding: 1.5rem 2rem;
    }
}

@media (min-width: 1024px) {
    .content-wrapper {
        padding: 1.5rem 3rem;
    }
}

@media (min-width: 1280px) {
    .content-wrapper {
        padding: 2rem 4rem;
    }
}

@media (min-width: 1536px) {
    .content-wrapper {
        padding: 2.5rem 5rem;
    }
}

@media (min-width: 1920px) {
    .content-wrapper {
        padding: 3rem 7rem;
    }
}

@media (min-width: 2560px) {
    .content-wrapper {
        padding: 4rem 10rem;
    }
}

/* ── Header ── */
@media (min-width: 768px) {
    .header {
        margin-bottom: 1.5rem;
    }
}

@media (min-width: 1920px) {
    .header {
        margin-bottom: 2.5rem;
    }
    .header-left {
        gap: 0.5rem;
    }
}

/* ── Control button ── */
@media (min-width: 1920px) {
    .control-btn {
        height: 3rem;
        width: 3rem;
    }
    .control-btn svg {
        width: 1.25rem;
        height: 1.25rem;
    }
}

/* ── Slide navigation ── */
@media (min-width: 768px) {
    .slide-nav {
        gap: 0.75rem;
        margin-bottom: 2rem;
    }
    .slide-dot {
        padding: 0.5rem 1rem;
    }
}

@media (min-width: 1280px) {
    .slide-dot {
        padding: 0.625rem 1.25rem;
    }
}

@media (min-width: 1920px) {
    .slide-nav {
        gap: 1rem;
        margin-bottom: 3rem;
    }
    .slide-dot {
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
    }
    .slide-dot svg {
        width: 1.25rem;
        height: 1.25rem;
    }
}

/* ── Countdown box ── */
@media (min-width: 768px) {
    .countdown-box {
        padding: 2rem 3rem;
    }
}

@media (min-width: 1280px) {
    .countdown-box {
        padding: 2.5rem 4rem;
    }
}

@media (min-width: 1920px) {
    .countdown-box {
        padding: 3.5rem 6rem;
        border-radius: 1.5rem;
    }
}

/* ── Prayer grid ── */
/* default: 4 columns (wraps smaller) */
@media (max-width: 400px) {
    .prayer-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 0.375rem;
    }
}

@media (max-width: 360px) {
    .prayer-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (min-width: 401px) and (max-width: 639px) {
    .prayer-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 0.375rem;
    }
}

@media (min-width: 640px) {
    .prayer-grid {
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 0.5rem;
        max-width: 42rem;
    }
}

@media (min-width: 768px) {
    .prayer-grid {
        max-width: 52rem;
        gap: 0.75rem;
    }
}

@media (min-width: 1024px) {
    .prayer-grid {
        max-width: 60rem;
    }
}

@media (min-width: 1280px) {
    .prayer-grid {
        max-width: 72rem;
        gap: 1rem;
    }
}

@media (min-width: 1920px) {
    .prayer-grid {
        max-width: 90rem;
        gap: 1.25rem;
    }
}

@media (min-width: 2560px) {
    .prayer-grid {
        max-width: 110rem;
        gap: 1.5rem;
    }
}

/* ── Prayer slot ── */
@media (max-width: 640px) {
    .prayer-slot {
        padding: 0.5rem 0.25rem;
    }
}

@media (min-width: 768px) {
    .prayer-slot {
        padding: 1rem 0.75rem;
    }
    .prayer-slot .text-lg {
        font-size: 1.5rem;
    }
    .prayer-slot .text-xs {
        font-size: 0.875rem;
    }
    .prayer-slot .text-sm {
        font-size: 1rem;
    }
}

@media (min-width: 1280px) {
    .prayer-slot {
        padding: 1.25rem 1rem;
        gap: 0.375rem;
    }
    .prayer-slot .text-lg {
        font-size: 1.75rem;
    }
    .prayer-slot .text-xs {
        font-size: 1rem;
    }
    .prayer-slot .text-sm {
        font-size: 1.125rem;
    }
}

@media (min-width: 1920px) {
    .prayer-slot {
        padding: 1.75rem 1.5rem;
        gap: 0.5rem;
        border-radius: 1rem;
    }
    .prayer-slot .text-lg {
        font-size: 2.25rem;
    }
    .prayer-slot .text-xs {
        font-size: 1.25rem;
    }
    .prayer-slot .text-sm {
        font-size: 1.5rem;
    }
}

/* ── Kajian grid ── */
@media (min-width: 640px) {
    .kajian-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (min-width: 1024px) {
    .kajian-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
    }
    .kajian-list-wrapper {
        max-width: 64rem;
    }
}

@media (min-width: 1280px) {
    .kajian-list-wrapper {
        max-width: 72rem;
    }
}

@media (min-width: 1920px) {
    .kajian-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1.25rem;
    }
    .kajian-list-wrapper {
        max-width: 96rem;
    }
}

@media (min-width: 2560px) {
    .kajian-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}

/* ── Kajian card ── */
@media (min-width: 768px) {
    .kajian-card {
        padding: 1.25rem;
    }
    .kajian-title {
        font-size: 1.125rem;
    }
}

@media (min-width: 1280px) {
    .kajian-card {
        padding: 1.5rem;
    }
    .kajian-title {
        font-size: 1.25rem;
    }
    .kajian-date,
    .kajian-meta {
        font-size: 0.875rem;
    }
}

@media (min-width: 1920px) {
    .kajian-card {
        padding: 2rem;
        border-radius: 1rem;
    }
    .kajian-title {
        font-size: 1.5rem;
    }
    .kajian-date,
    .kajian-meta {
        font-size: 1rem;
    }
    .kajian-date svg,
    .kajian-meta svg {
        width: 1.125rem;
        height: 1.125rem;
    }
}

/* ── Total saldo box ── */
@media (min-width: 768px) {
    .total-saldo-box {
        padding: 1.25rem 2.5rem;
    }
}

@media (min-width: 1920px) {
    .total-saldo-box {
        padding: 2rem 4rem;
        border-radius: 1.25rem;
    }
}

/* ── Chart wrapper ── */
@media (min-width: 768px) {
    .chart-wrapper {
        max-width: 64rem;
        padding: 1.25rem;
    }
}

@media (min-width: 1280px) {
    .chart-wrapper {
        max-width: 72rem;
        padding: 1.5rem;
    }
}

@media (min-width: 1920px) {
    .chart-wrapper {
        max-width: 96rem;
        padding: 2rem;
    }
}

@media (min-width: 2560px) {
    .chart-wrapper {
        max-width: 120rem;
    }
}

/* ── Chart nav ── */
@media (min-width: 1920px) {
    .chart-nav-btn {
        height: 2.75rem;
        width: 2.75rem;
    }
    .chart-nav-btn svg {
        width: 1.25rem;
        height: 1.25rem;
    }
    .chart-nav {
        gap: 1rem;
    }
}

/* ── Streaming ── */
@media (min-width: 768px) {
    .streaming-container {
        max-width: 64rem;
        padding: 2rem;
    }
    .streaming-title {
        font-size: 1.75rem;
    }
}

@media (min-width: 1024px) {
    .streaming-container {
        max-width: 80rem;
    }
}

@media (min-width: 1280px) {
    .streaming-container {
        padding: 2.5rem;
    }
    .streaming-title {
        font-size: 2rem;
    }
}

@media (min-width: 1920px) {
    .streaming-container {
        max-width: 100rem;
        padding: 3rem;
        border-radius: 2rem;
    }
    .streaming-title {
        font-size: 2.5rem;
    }
    .streaming-header {
        gap: 1rem;
        margin-bottom: 2rem;
    }
    .streaming-header svg {
        width: 2rem;
        height: 2rem;
    }
    .video-wrapper {
        border-radius: 1rem;
    }
    .streaming-info {
        margin-top: 1.5rem;
        padding: 1rem 1.5rem;
        font-size: 1rem;
    }
    .streaming-schedule {
        font-size: 1rem;
    }
    .streaming-status {
        font-size: 1rem;
    }
}

@media (min-width: 2560px) {
    .streaming-container {
        max-width: 130rem;
        padding: 4rem;
    }
    .streaming-title {
        font-size: 3rem;
    }
}

/* ── Streaming waiting / offline ── */
@media (min-width: 1920px) {
    .streaming-waiting {
        margin-top: 1.5rem;
        padding: 1.5rem;
        font-size: 1rem;
    }
}

/* ── Mutiara image ── */
@media (min-width: 768px) {
    .mutiara-image-wrapper {
        max-height: calc(100dvh - 14rem);
    }
}

@media (min-width: 1920px) {
    .mutiara-image-wrapper {
        max-height: calc(100dvh - 18rem);
    }
    .mutiara-image {
        border-radius: 1.5rem;
    }
}

/* ── Slide arrows ── */
@media (max-width: 640px) {
    .slide-arrow {
        height: 2rem;
        width: 2rem;
    }
}

@media (min-width: 640px) {
    .slide-arrow-left {
        left: 1.25rem;
    }
    .slide-arrow-right {
        right: 1.25rem;
    }
}

@media (min-width: 768px) {
    .slide-arrow-left {
        left: 2rem;
    }
    .slide-arrow-right {
        right: 2rem;
    }
}

@media (min-width: 1920px) {
    .slide-arrow {
        height: 4rem;
        width: 4rem;
    }
    .slide-arrow svg {
        width: 1.75rem;
        height: 1.75rem;
    }
    .slide-arrow-left {
        left: 3rem;
    }
    .slide-arrow-right {
        right: 3rem;
    }
}

/* ── Empty state ── */
@media (min-width: 1920px) {
    .empty-state svg {
        width: 4rem;
        height: 4rem;
    }
    .empty-state p {
        font-size: 1.25rem;
    }
}

/* ── Slide keuangan gap ── */
@media (min-width: 768px) {
    .slide-keuangan {
        gap: 1.5rem;
    }
}

@media (min-width: 1920px) {
    .slide-keuangan {
        gap: 2rem;
    }
    .slide-sholat {
        gap: 2.5rem;
    }
    .slide-mutiara {
        gap: 1.5rem;
    }
}

/* ── Chart header row ── */
@media (min-width: 1920px) {
    .chart-header-row {
        margin-bottom: 1.25rem;
        font-size: 1.125rem;
    }
    .chart-header-row .text-sm {
        font-size: 1.125rem;
    }
}

/* ── Mutiara caption ── */
@media (min-width: 1280px) {
    .mutiara-caption {
        font-size: 1.25rem;
        padding: 0.75rem 1.5rem;
    }
}

@media (min-width: 1920px) {
    .mutiara-caption {
        font-size: 1.5rem;
        padding: 1rem 2rem;
    }
}

/* ── Iqomah / Sholat overlay ── */
@media (min-width: 1920px) {
    .fixed.inset-0.z-\\[100\\] .rounded-\\[3rem\\] {
        border-radius: 4rem;
    }
}

/* ── Streaming banner ── */
@media (min-width: 1920px) {
    .streaming-banner {
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
        gap: 1rem;
    }
    .streaming-banner svg {
        width: 1.5rem;
        height: 1.5rem;
    }
    .streaming-time {
        font-size: 0.875rem;
        padding: 0.375rem 0.75rem;
    }
}

/* ── Background mask for ultra-wide ── */
/* ensure bg covers entire viewport even on ultrawide/TV */
@media (min-width: 1920px) {
    .bg-overlay {
        background-size: cover, cover;
    }
}

/* === MUTIARA ISLAM === */
.slide-mutiara {
    gap: 1rem;
}

.mutiara-swiper {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
}

.mutiara-nav {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.mutiara-image-wrapper {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-height: calc(100dvh - 12rem);
    overflow: hidden;
}

.mutiara-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

/* Mutiara fade transition */
.mutiara-fade-enter-active,
.mutiara-fade-leave-active {
    transition: opacity 0.5s ease;
}

.mutiara-fade-enter-from,
.mutiara-fade-leave-to {
    opacity: 0;
}
</style>
