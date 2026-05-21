<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save } from 'lucide-vue-next';
import { watch } from 'vue';
import ComboInput from '@/components/ComboInput.vue';
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

interface MasjidOption {
    id: string;
    nama: string;
}

interface JadwalImamData {
    id: number;
    masjid_id: string;
    tanggal: string;
    hari: string;
    muadzin: string;
    imam_subuh: string;
    imam_magrib: string;
    imam_isya: string;
}

const props = defineProps<{
    jadwalImam: JadwalImamData;
    masjids: MasjidOption[];
    existingNames: string[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Jadwal Imam', href: '/jadwal-imams' },
            { title: 'Edit', href: '#' },
        ],
    },
});

const hariMap: Record<number, string> = {
    0: 'Ahad',
    1: 'Senin',
    2: 'Selasa',
    3: 'Rabu',
    4: 'Kamis',
    5: "Jum'at",
    6: 'Sabtu',
};

const form = useForm({
    _method: 'put' as const,
    masjid_id: props.jadwalImam.masjid_id ?? '',
    tanggal: props.jadwalImam.tanggal ? props.jadwalImam.tanggal.substring(0, 10) : '',
    hari: props.jadwalImam.hari ?? '',
    muadzin: props.jadwalImam.muadzin ?? '',
    imam_subuh: props.jadwalImam.imam_subuh ?? '',
    imam_magrib: props.jadwalImam.imam_magrib ?? '',
    imam_isya: props.jadwalImam.imam_isya ?? '',
});

watch(() => form.tanggal, (val) => {
    if (val) {
        const d = new Date(val);
        form.hari = hariMap[d.getDay()] ?? '';
    }
});

function submit() {
    form.post(`/jadwal-imams/${props.jadwalImam.id}`);
}
</script>

<template>

    <Head title="Edit Jadwal Imam" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle>Edit Jadwal Imam</CardTitle>
                        <CardDescription>Edit data jadwal imam dan muadzin.</CardDescription>
                    </div>
                    <Button variant="outline" as-child class="gap-2">
                        <Link href="/jadwal-imams">
                            <ArrowLeft class="h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <form class="space-y-6" @submit.prevent="submit">
                    <div class="grid gap-2">
                        <Label for="masjid_id">Masjid *</Label>
                        <select id="masjid_id" v-model="form.masjid_id"
                            class="w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option value="" disabled>Pilih Masjid</option>
                            <option v-for="m in masjids" :key="m.id" :value="m.id">{{ m.nama }}</option>
                        </select>
                        <p v-if="form.errors.masjid_id" class="text-sm text-destructive">{{ form.errors.masjid_id }}</p>
                    </div>

                    <div>
                        <Label class="mb-2 block">Jadwal</Label>
                        <div class="overflow-x-auto rounded-lg border">
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b bg-muted/50">
                                        <th rowspan="2" class="border-r px-3 py-2 text-center font-semibold">TANGGAL
                                        </th>
                                        <th rowspan="2" class="border-r px-3 py-2 text-center font-semibold">MUADZIN
                                        </th>
                                        <th colspan="3" class="border-b px-3 py-1 text-center font-semibold">IMAM</th>
                                    </tr>
                                    <tr class="border-b bg-muted/50">
                                        <th class="border-r px-3 py-1 text-center text-xs font-semibold">SUBUH</th>
                                        <th class="border-r px-3 py-1 text-center text-xs font-semibold">MAGRIB</th>
                                        <th class="px-3 py-1 text-center text-xs font-semibold">ISYA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="border-r px-2 py-1.5">
                                            <div class="flex items-center gap-1">
                                                <Input id="tanggal" v-model="form.tanggal" type="date"
                                                    class="min-w-[130px]"
                                                    @click="($event.target as HTMLInputElement).showPicker()" />
                                                <span class="whitespace-nowrap text-xs text-muted-foreground">{{
                                                    form.hari }}</span>
                                            </div>
                                            <p v-if="form.errors.tanggal" class="mt-1 text-xs text-destructive">{{
                                                form.errors.tanggal }}</p>
                                        </td>
                                        <td class="border-r px-2 py-1.5">
                                            <ComboInput v-model="form.muadzin" :suggestions="existingNames"
                                                placeholder="Nama muadzin" />
                                            <p v-if="form.errors.muadzin" class="mt-1 text-xs text-destructive">{{
                                                form.errors.muadzin }}</p>
                                        </td>
                                        <td class="border-r px-2 py-1.5">
                                            <ComboInput v-model="form.imam_subuh" :suggestions="existingNames"
                                                placeholder="Nama imam subuh" />
                                            <p v-if="form.errors.imam_subuh" class="mt-1 text-xs text-destructive">{{
                                                form.errors.imam_subuh }}</p>
                                        </td>
                                        <td class="border-r px-2 py-1.5">
                                            <ComboInput v-model="form.imam_magrib" :suggestions="existingNames"
                                                placeholder="Nama imam magrib" />
                                            <p v-if="form.errors.imam_magrib" class="mt-1 text-xs text-destructive">{{
                                                form.errors.imam_magrib }}</p>
                                        </td>
                                        <td class="px-2 py-1.5">
                                            <ComboInput v-model="form.imam_isya" :suggestions="existingNames"
                                                placeholder="Nama imam isya" />
                                            <p v-if="form.errors.imam_isya" class="mt-1 text-xs text-destructive">{{
                                                form.errors.imam_isya }}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="flex justify-end gap-3">
                        <Button variant="outline" as-child>
                            <Link href="/jadwal-imams">Batal</Link>
                        </Button>
                        <Button type="submit" :disabled="form.processing" class="gap-2">
                            <Save class="h-4 w-4" />
                            Simpan
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
