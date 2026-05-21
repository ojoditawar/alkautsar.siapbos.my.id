<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { CalendarDays, Mic2, TrendingDown, TrendingUp, Wallet } from 'lucide-vue-next';
import { computed } from 'vue';
import SaldoKasChart from '@/components/SaldoKasChart.vue';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

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

const props = defineProps<{
    saldoChart: SaldoChart;
    ringkasanKas: RingkasanKas;
    upcomingKajians: KajianItem[];
    tahun: number;
}>();

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Beranda', href: '/beranda' }],
    },
});

function formatRp(n: number): string {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n));
}

function formatTanggal(date: string): string {
    return new Date(date).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

const stats = computed(() => [
    {
        title: 'Saldo Tahun Berjalan',
        value: formatRp(props.ringkasanKas.saldo),
        icon: Wallet,
        tone: props.ringkasanKas.saldo >= 0 ? 'emerald' : 'rose',
    },
    {
        title: 'Total Debit',
        value: formatRp(props.ringkasanKas.total_debit),
        icon: TrendingUp,
        tone: 'emerald',
    },
    {
        title: 'Total Kredit',
        value: formatRp(props.ringkasanKas.total_kredit),
        icon: TrendingDown,
        tone: 'rose',
    },
    {
        title: 'Kajian Mendatang',
        value: String(props.upcomingKajians.length),
        icon: Mic2,
        tone: 'amber',
    },
]);

function toneClass(tone: string): string {
    const map: Record<string, string> = {
        emerald: 'bg-emerald-100 text-emerald-700',
        rose: 'bg-rose-100 text-rose-700',
        amber: 'bg-amber-100 text-amber-700',
    };
    return map[tone] ?? 'bg-slate-100 text-slate-700';
}
</script>

<template>
    <Head title="Beranda" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <!-- Stats cards -->
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card v-for="s in stats" :key="s.title" class="border-none shadow-sm">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium text-slate-500">{{ s.title }}</CardTitle>
                    <div :class="toneClass(s.tone)" class="flex h-9 w-9 items-center justify-center rounded-full">
                        <component :is="s.icon" class="h-4 w-4" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="text-xl font-bold text-slate-900">{{ s.value }}</div>
                </CardContent>
            </Card>
        </div>

        <div class="grid gap-4 lg:grid-cols-5">
            <!-- Chart -->
            <Card class="border-none shadow-sm lg:col-span-3">
                <CardHeader>
                    <CardTitle>Ringkasan Kas Tahun {{ tahun }}</CardTitle>
                    <CardDescription>
                        Total pemasukan (Debit) vs pengeluaran (Kredit) per bulan.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SaldoKasChart
                        :labels="saldoChart.labels"
                        :debit="saldoChart.debit"
                        :kredit="saldoChart.kredit"
                    />
                </CardContent>
            </Card>

            <!-- Upcoming Kajian -->
            <Card class="border-none shadow-sm lg:col-span-2">
                <CardHeader class="flex flex-row items-center justify-between space-y-0">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <CalendarDays class="h-5 w-5" />
                            Kajian Mendatang
                        </CardTitle>
                        <CardDescription>Jadwal kajian terdekat.</CardDescription>
                    </div>
                    <Button size="sm" variant="outline" as-child>
                        <Link href="/kajians">Kelola</Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div
                        v-if="upcomingKajians.length === 0"
                        class="rounded-lg bg-slate-50 p-6 text-center text-sm text-slate-500"
                    >
                        Belum ada jadwal kajian mendatang.
                    </div>
                    <ul v-else class="space-y-3">
                        <li
                            v-for="k in upcomingKajians"
                            :key="k.id"
                            class="rounded-lg border border-slate-100 p-3 transition hover:border-emerald-300 hover:bg-emerald-50/40"
                        >
                            <p class="font-semibold text-slate-900">{{ k.judul }}</p>
                            <p class="text-xs text-emerald-700">{{ k.pemateri }}</p>
                            <p class="mt-1 text-xs text-slate-500">
                                {{ formatTanggal(k.tanggal) }}
                                <span v-if="k.waktu"> · {{ k.waktu }}</span>
                            </p>
                            <p v-if="k.tempat" class="mt-0.5 text-xs text-slate-500">
                                {{ k.tempat }}
                            </p>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
