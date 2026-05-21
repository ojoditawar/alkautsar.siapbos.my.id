<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    labels: string[];
    debit: number[];
    kredit: number[];
    height?: number;
}

const props = withDefaults(defineProps<Props>(), {
    height: 240,
});

const width = 720;
const padding = { top: 20, right: 20, bottom: 30, left: 60 };

const maxValue = computed(() => {
    const all = [...props.debit, ...props.kredit, 1];
    return Math.max(...all);
});

const innerW = computed(() => width - padding.left - padding.right);
const innerH = computed(() => props.height - padding.top - padding.bottom);

const barGap = 4;
const groupGap = 14;
const groupWidth = computed(
    () => (innerW.value - groupGap * (props.labels.length - 1)) / props.labels.length,
);
const barWidth = computed(() => (groupWidth.value - barGap) / 2);

function y(value: number): number {
    return padding.top + innerH.value - (value / maxValue.value) * innerH.value;
}

function groupX(i: number): number {
    return padding.left + i * (groupWidth.value + groupGap);
}

const gridLines = computed(() => {
    const steps = 4;
    return Array.from({ length: steps + 1 }, (_, i) => {
        const v = (maxValue.value / steps) * i;
        return { value: v, y: y(v) };
    });
});

function formatShort(n: number): string {
    if (n >= 1_000_000_000) {
        return (n / 1_000_000_000).toFixed(1) + 'M';
    }

    if (n >= 1_000_000) {
        return (n / 1_000_000).toFixed(1) + 'jt';
    }

    if (n >= 1_000) {
        return (n / 1_000).toFixed(0) + 'rb';
    }

    return n.toString();
}

function formatRp(n: number): string {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n));
}
</script>

<template>
    <div class="w-full">
        <div class="mb-3 flex items-center gap-4 text-xs">
            <div class="flex items-center gap-2">
                <span class="h-3 w-3 rounded-sm bg-emerald-500"></span>
                <span class="text-slate-600">Debit (Pemasukan)</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="h-3 w-3 rounded-sm bg-rose-500"></span>
                <span class="text-slate-600">Kredit (Pengeluaran)</span>
            </div>
        </div>

        <svg :viewBox="`0 0 ${width} ${height}`" preserveAspectRatio="xMidYMid meet" class="w-full">
            <!-- Grid -->
            <g>
                <line v-for="(g, i) in gridLines" :key="'g' + i" :x1="padding.left" :x2="width - padding.right"
                    :y1="g.y" :y2="g.y" stroke="#e2e8f0" stroke-dasharray="3 3" />
                <text v-for="(g, i) in gridLines" :key="'t' + i" :x="padding.left - 8" :y="g.y + 4" text-anchor="end"
                    font-size="10" fill="#94a3b8">
                    {{ formatShort(g.value) }}
                </text>
            </g>

            <!-- Bars -->
            <g v-for="(label, i) in labels" :key="label">
                <rect :x="groupX(i)" :y="y(debit[i] || 0)" :width="barWidth"
                    :height="padding.top + innerH - y(debit[i] || 0)" fill="#10b981" rx="3">
                    <title>{{ label }} - Debit: {{ formatRp(debit[i] || 0) }}</title>
                </rect>
                <rect :x="groupX(i) + barWidth + barGap" :y="y(kredit[i] || 0)" :width="barWidth"
                    :height="padding.top + innerH - y(kredit[i] || 0)" fill="#f43f5e" rx="3">
                    <title>{{ label }} - Kredit: {{ formatRp(kredit[i] || 0) }}</title>
                </rect>
                <text :x="groupX(i) + groupWidth / 2" :y="height - padding.bottom + 16" text-anchor="middle"
                    font-size="11" fill="#64748b">
                    {{ label }}
                </text>
            </g>

            <!-- Axis -->
            <line :x1="padding.left" :x2="width - padding.right" :y1="padding.top + innerH" :y2="padding.top + innerH"
                stroke="#cbd5e1" />
        </svg>
    </div>
</template>
