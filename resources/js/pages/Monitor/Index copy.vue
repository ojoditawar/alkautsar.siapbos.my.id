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
    TrendingUp,
    User,
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

const props = defineProps<{
    masjid?: MasjidInfo | null;
    saldoCharts?: SaldoChartItem[];
    ringkasanKas?: RingkasanKasItem[];
    upcomingKajians?: KajianItem[];
    tahun?: number;
}>();

// ============================================================
// Auto-rotate slides
// ============================================================
const SLIDE_INTERVAL = 15_000; // 15 detik per slide
const slides = ['sholat', 'kajian', 'keuangan'] as const;
type Slide = (typeof slides)[number];

const currentSlide = ref<Slide>('sholat');
const isPaused = ref(false);
let rotateTimer: ReturnType<typeof setInterval> | null = null;
let countdownTimer: ReturnType<typeof setInterval> | null = null;
let chartSlideTimer: ReturnType<typeof setInterval> | null = null;

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
    if (!isPaused.value && !isIqomahMode.value && !isSholatMode.value) {
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
    if (!isPaused.value) {
        startRotation();
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

const cityId = '1204'; // Kab. Bogor
const prayerTimes = ref<PrayerData | null>(null);
const loadingSholat = ref(true);
const countdown = ref('--:--:--');
const nextPrayer = ref<{ name: string; time: string | undefined } | null>(null);

// === KODE ASLI (DIKOMENTARI UNTUK TESTING) ===
// const iqomahDurations: Record<string, number> = {
//     SUBUH: 12,
//     DZUHUR: 10,
//     ASHAR: 10,
//     MAGHRIB: 10,
//     ISYA: 12,
// };
// const sholatDurations: Record<string, number> = {
//     SUBUH: 20,
//     DZUHUR: 25,
//     ASHAR: 25,
//     MAGHRIB: 20,
//     ISYA: 30,
// };

// === KODE TESTING ===
const iqomahDurations: Record<string, number> = {
    SUBUH: 1,
    DZUHUR: 1,
    ASHAR: 1,
    MAGHRIB: 1,
    ISYA: 1,
};
const sholatDurations: Record<string, number> = {
    SUBUH: 1,
    DZUHUR: 1,
    ASHAR: 1,
    MAGHRIB: 1,
    ISYA: 1,
};

const prayerSlots = computed(() => [
    {
        name: 'IMSAK',
        time: prayerTimes.value?.jadwal?.imsak ?? '--:--',
        icon: '🌙',
    },
    {
        name: 'SUBUH',
        time: prayerTimes.value?.jadwal?.subuh ?? '--:--',
        icon: '🌅',
    },
    {
        name: 'TERBIT',
        time: prayerTimes.value?.jadwal?.terbit ?? '--:--',
        icon: '☀️',
    },
    {
        name: 'DZUHUR',
        time: prayerTimes.value?.jadwal?.dzuhur ?? '--:--',
        icon: '🌤️',
    },
    {
        name: 'ASHAR',
        time: prayerTimes.value?.jadwal?.ashar ?? '--:--',
        icon: '🌇',
    },
    {
        name: 'MAGHRIB',
        time: prayerTimes.value?.jadwal?.maghrib ?? '--:--',
        icon: '🌆',
    },
    {
        name: 'ISYA',
        time: prayerTimes.value?.jadwal?.isya ?? '--:--',
        icon: '🌃',
    },
]);

const isIqomahMode = ref(false);
const iqomahEndTime = ref<Date | null>(null);
const iqomahCountdown = ref('00:00:00');

const isSholatMode = ref(false);
const sholatEndTime = ref<Date | null>(null);
const sholatCountdown = ref('00:00:00');

const activePrayerName = ref<string | null>(null); // Menyimpan nama sholat yang sedang berlangsung

async function fetchPrayerTimes() {
    try {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const response = await fetch(
            `https://api.myquran.com/v2/sholat/jadwal/${cityId}/${year}/${month}/${day}`,
        );
        const json = await response.json();

        // === KODE ASLI (DIKOMENTARI UNTUK TESTING) ===
        // prayerTimes.value = json.data as PrayerData;

        // === KODE TESTING ===
        const data = json.data as PrayerData;
        if (data?.jadwal) {
            const testDate = new Date();
            testDate.setMinutes(testDate.getMinutes() + 2); // 2 Menit ke depan

            const testH = String(testDate.getHours()).padStart(1, '0');
            const testM = String(testDate.getMinutes()).padStart(1, '0');

            // Atur waktu lainnya agar kadaluarsa (sudah lewat), sehingga fokus ke ISYA
            data.jadwal.imsak = '00:00';
            data.jadwal.subuh = '00:00';
            data.jadwal.terbit = '00:00';
            data.jadwal.dzuhur = '00:00';
            data.jadwal.ashar = '00:00';
            data.jadwal.maghrib = '00:00';

            // Timpa ISYA jadi 2 menit dari sekarang
            data.jadwal.isya = `${testH}:${testM}`;
        }
        prayerTimes.value = data;
        // === AKHIR KODE TESTING ===
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
            activePrayerName.value = null; // Reset setelah sholat selesai
            startRotation(); // Lanjut rotasi slide
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

            // Masuk mode sholat jika ada durasinya
            if (
                activePrayerName.value &&
                sholatDurations[activePrayerName.value]
            ) {
                isSholatMode.value = true;
                const duration = sholatDurations[activePrayerName.value];
                sholatEndTime.value = new Date(
                    now.getTime() + duration * 60 * 1000,
                );
                sholatCountdown.value = `00:${String(duration).padStart(2, '0')}:00`;

                // Pastikan berada di slide sholat dan hentikan rotasi
                currentSlide.value = 'sholat';
                stopRotation();
            } else {
                startRotation(); // Kalau tidak ada, langsung lanjut rotasi
            }
        }
    }

    const prayers = prayerSlots.value;
    let nextTime: { name: string; time: string } | null = null;
    let minDiff = Infinity;

    for (const prayer of prayers) {
        if (!prayer.time || prayer.time === '--:--') continue;

        const [hours, minutes] = prayer.time.split(':').map(Number);
        const prayerDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hours,
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
            !isSholatMode.value
        ) {
            isIqomahMode.value = true;
            activePrayerName.value = nextTime.name; // Simpan nama sholat

            const duration = iqomahDurations[nextTime.name] || 10;
            iqomahEndTime.value = new Date(
                now.getTime() + duration * 60 * 1000,
            );
            iqomahCountdown.value = `00:${String(duration).padStart(2, '0')}:00`;

            // Pastikan berada di slide sholat dan hentikan rotasi
            currentSlide.value = 'sholat';
            stopRotation();
        }
    }
}

// ============================================================
// Slide 3: Keuangan - auto-rotate chart
// ============================================================
const currentChartIndex = ref(0);
const CHART_INTERVAL = 8_000; // 8 detik per chart

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
    // Siapkan URL gambar user dan gambar default
    const defaultImage = '/gambar/1777954256_Alkautsar3.png';
    const userImage =
        props.masjid?.image && props.masjid.image.trim() !== ''
            ? props.masjid.image
            : null;

    // Jika userImage ada, kita pasang dua lapis background (CSS Multiple Backgrounds).
    // Jika gambar user gagal dimuat (404), ia akan tembus pandang dan gambar default di lapis kedua akan terlihat.
    const bgImageStyle = userImage
        ? `url("${userImage}"), url("${defaultImage}")`
        : `url("${defaultImage}")`;

    return {
        backgroundImage: bgImageStyle,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        backgroundRepeat: 'no-repeat, no-repeat',
        opacity: 0.4, // Ditingkatkan agar lebih terlihat transparan
    };
});

// ============================================================
// Lifecycle
// ============================================================
onMounted(() => {
    fetchPrayerTimes();
    countdownTimer = setInterval(updateCountdown, 1000);
    chartSlideTimer = setInterval(nextChart, CHART_INTERVAL);
    startRotation();
});

onUnmounted(() => {
    stopRotation();
    if (countdownTimer) clearInterval(countdownTimer);
    if (chartSlideTimer) clearInterval(chartSlideTimer);
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
            <div class="header" v-if="!isSholatMode">
                <div class="header-left">
                    <h1
                        class="text-2xl font-bold text-slate-800 drop-shadow-md"
                    >
                        {{ props.masjid?.nama ?? 'Monitor Masjid' }}
                    </h1>
                    <p class="text-sm text-slate-700">{{ todayLabel }}</p>
                </div>
                <div class="header-right">
                    <button
                        class="control-btn"
                        :title="isPaused ? 'Lanjutkan rotasi' : 'Jeda rotasi'"
                        @click="togglePause"
                    >
                        <Play v-if="isPaused" class="h-4 w-4" />
                        <Pause v-else class="h-4 w-4" />
                    </button>
                </div>
            </div>

            <!-- Slide Navigation Dots -->
            <div class="slide-nav" v-if="!isSholatMode">
                <button
                    v-for="slide in slides"
                    :key="slide"
                    class="slide-dot"
                    :class="{ active: currentSlide === slide }"
                    :title="
                        slide === 'sholat'
                            ? 'Jadwal Sholat'
                            : slide === 'kajian'
                              ? 'Jadwal Kajian'
                              : 'Laporan Keuangan'
                    "
                    @click="goToSlide(slide)"
                >
                    <Clock v-if="slide === 'sholat'" class="h-4 w-4" />
                    <Mic v-else-if="slide === 'kajian'" class="h-4 w-4" />
                    <TrendingUp v-else class="h-4 w-4" />
                    <span class="ml-1.5 hidden text-xs font-medium sm:inline">
                        {{
                            slide === 'sholat'
                                ? 'Sholat'
                                : slide === 'kajian'
                                  ? 'Kajian'
                                  : 'Keuangan'
                        }}
                    </span>
                </button>
            </div>

            <!-- SLIDE JEDA SHOLAT (Prioritas Utama) -->
            <div
                v-if="isSholatMode"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-md"
            >
                <div
                    class="flex w-full max-w-6xl flex-col items-center justify-center rounded-[3rem] border border-slate-700/50 bg-slate-900/90 p-16 shadow-[0_0_80px_rgba(0,0,0,0.5)]"
                >
                    <p
                        class="mb-6 text-center text-4xl font-extrabold tracking-wide text-rose-500 uppercase drop-shadow-lg sm:text-6xl"
                    >
                        Kegiatan Sholat {{ activePrayerName }} Sedang
                        Berlangsung...
                    </p>
                    <p
                        class="mb-12 text-center text-2xl font-semibold tracking-wider text-slate-300 sm:text-4xl"
                    >
                        Harap Tenang
                    </p>
                    <p
                        class="text-center font-mono text-8xl leading-none font-black tracking-widest text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] sm:text-[12rem]"
                    >
                        {{ sholatCountdown }}
                    </p>
                </div>
            </div>

            <!-- SLIDE 1: JADWAL SHOLAT -->
            <div
                v-else-if="currentSlide === 'sholat'"
                class="slide-area slide-sholat"
            >
                <!-- Countdown Box -->
                <div class="countdown-box">
                    <template v-if="isIqomahMode">
                        <p class="text-lg font-semibold text-amber-600">
                            IQOMAH
                        </p>
                        <p
                            class="countdown-text text-7xl font-black tracking-widest text-amber-800 drop-shadow-md"
                        >
                            {{ iqomahCountdown }}
                        </p>
                    </template>
                    <template v-else-if="nextPrayer">
                        <p class="text-base font-medium text-slate-600">
                            Menuju {{ nextPrayer.name }}
                        </p>
                        <p
                            class="countdown-text text-7xl font-black tracking-widest text-slate-800 drop-shadow-lg"
                        >
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
                    <div
                        v-for="slot in prayerSlots"
                        :key="slot.name"
                        class="prayer-slot"
                        :class="{
                            'is-next':
                                nextPrayer?.name === slot.name &&
                                !isIqomahMode &&
                                !isSholatMode,
                            'is-iqomah':
                                nextPrayer?.name === slot.name &&
                                (isIqomahMode || isSholatMode),
                        }"
                    >
                        <span class="text-lg">{{ slot.icon }}</span>
                        <span
                            class="text-xs font-semibold tracking-wide uppercase"
                            >{{ slot.name }}</span
                        >
                        <span class="text-sm font-bold">{{ slot.time }}</span>
                    </div>
                </div>

                <p class="mt-2 text-xs text-slate-400">
                    {{ prayerTimes?.lokasi ?? ''
                    }}{{ prayerTimes?.daerah ? ', ' + prayerTimes.daerah : '' }}
                </p>
            </div>

            <!-- SLIDE 2: JADWAL KAJIAN -->
            <div
                v-else-if="currentSlide === 'kajian'"
                class="slide-area slide-kajian"
            >
                <div class="kajian-list-wrapper">
                    <div
                        v-if="
                            !props.upcomingKajians ||
                            props.upcomingKajians.length === 0
                        "
                        class="empty-state"
                    >
                        <Mic class="h-12 w-12 text-white/40" />
                        <p class="text-slate-400">
                            Belum ada jadwal kajian mendatang.
                        </p>
                    </div>
                    <div v-else class="kajian-grid">
                        <div
                            v-for="kajian in props.upcomingKajians"
                            :key="kajian.id"
                            class="kajian-card"
                        >
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
                                <span
                                    v-if="kajian.pemateri"
                                    class="kajian-pemateri"
                                >
                                    <User class="h-3.5 w-3.5" />
                                    {{ kajian.pemateri }}
                                </span>
                                <span
                                    v-if="kajian.tempat"
                                    class="kajian-tempat"
                                >
                                    <MapPin class="h-3.5 w-3.5" />
                                    {{ kajian.tempat }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SLIDE 3: LAPORAN KEUANGAN -->
            <div
                v-else-if="currentSlide === 'keuangan'"
                class="slide-area slide-keuangan"
            >
                <!-- Total Saldo -->
                <div class="total-saldo-box">
                    <p class="text-sm font-medium text-slate-600">
                        Total Saldo Kas {{ props.tahun }}
                    </p>
                    <p
                        class="text-4xl font-black text-slate-800 drop-shadow-lg"
                    >
                        {{ formatRp(totalSaldo) }}
                    </p>
                </div>

                <!-- Chart Navigator -->
                <div
                    v-if="(props.saldoCharts ?? []).length > 1"
                    class="chart-nav"
                >
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
                    <SaldoKasChart
                        :labels="currentChart.labels"
                        :debit="currentChart.debit"
                        :kredit="currentChart.kredit"
                    />
                </div>
                <div v-else class="py-8 text-center text-slate-400">
                    Belum ada data keuangan.
                </div>
            </div>

            <!-- Manual Navigation Arrows -->
            <button
                v-if="!isSholatMode"
                class="slide-arrow slide-arrow-left"
                @click="prevSlide"
            >
                <ChevronLeft class="h-6 w-6" />
            </button>
            <button
                v-if="!isSholatMode"
                class="slide-arrow slide-arrow-right"
                @click="nextSlide"
            >
                <ChevronRight class="h-6 w-6" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.monitor-container {
    position: relative;
    display: flex;
    height: 100%;
    min-height: 100vh;
    width: 100%;
    flex-direction: column;
    overflow: hidden;
    background-color: #e2e8f0;
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
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.4) 50%,
        rgba(255, 255, 255, 0.22) 100%
    );
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

@media (min-width: 640px) {
    .content-wrapper {
        padding: 1.5rem 2rem;
    }
}

@media (min-width: 1024px) {
    .content-wrapper {
        padding: 1.5rem 3rem;
    }
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

/* === Responsive === */
@media (max-width: 640px) {
    .prayer-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 0.375rem;
    }

    .prayer-slot {
        padding: 0.5rem 0.25rem;
    }

    .countdown-box .countdown-text {
        font-size: 2.5rem;
    }

    .kajian-grid {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .slide-arrow {
        height: 2rem;
        width: 2rem;
    }
}

@media (max-width: 400px) {
    .prayer-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
</style>
