<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Copy, Plus, Save, Trash2 } from 'lucide-vue-next';
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

interface JadwalRow {
    tanggal: string;
    hari: string;
    muadzin: string;
    imam_subuh: string;
    imam_magrib: string;
    imam_isya: string;
}

const props = defineProps<{
    masjids: MasjidOption[];
    existingNames: string[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Jadwal Imam', href: '/jadwal-imams' },
            { title: 'Tambah', href: '#' },
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

function emptyRow(): JadwalRow {
    return { tanggal: '', hari: '', muadzin: '', imam_subuh: '', imam_magrib: '', imam_isya: '' };
}

const form = useForm({
    masjid_id: props.masjids.length === 1 ? props.masjids[0].id : '',
    rows: [emptyRow()] as JadwalRow[],
});

function addRow() {
    form.rows.push(emptyRow());
}

function copyRow(index: number) {
    form.rows.splice(index + 1, 0, { ...form.rows[index] });
}

function removeRow(index: number) {
    if (form.rows.length > 1) {
        form.rows.splice(index, 1);
    }
}

function onTanggalChange(index: number) {
    const val = form.rows[index].tanggal;

    if (val) {
        const d = new Date(val);
        form.rows[index].hari = hariMap[d.getDay()] ?? '';
    }
}

function submit() {
    form.post('/jadwal-imams');
}
</script>

<template>

    <Head title="Tambah Jadwal Imam" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle>Tambah Jadwal Imam</CardTitle>
                        <CardDescription>Isi data jadwal imam dan muadzin.</CardDescription>
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
                        <div class="mb-2 flex items-center justify-between">
                            <Label>Jadwal</Label>
                            <Button type="button" variant="outline" size="sm" class="gap-1" @click="addRow">
                                <Plus class="h-3.5 w-3.5" />
                                Tambah Baris
                            </Button>
                        </div>

                        <div class="overflow-x-auto rounded-lg border">
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b bg-muted/50">
                                        <th rowspan="2" class="border-r px-3 py-2 text-center font-semibold">TANGGAL
                                        </th>
                                        <th rowspan="2" class="border-r px-3 py-2 text-center font-semibold">MUADZIN
                                        </th>
                                        <th colspan="3" class="border-b px-3 py-1 text-center font-semibold">IMAM</th>
                                        <th rowspan="2" class="px-3 py-2 text-center font-semibold">AKSI</th>
                                    </tr>
                                    <tr class="border-b bg-muted/50">
                                        <th class="border-r px-3 py-1 text-center text-xs font-semibold">SUBUH</th>
                                        <th class="border-r px-3 py-1 text-center text-xs font-semibold">MAGRIB</th>
                                        <th class="px-3 py-1 text-center text-xs font-semibold">ISYA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, i) in form.rows" :key="i" class="border-b last:border-b-0">
                                        <td class="border-r px-2 py-1.5">
                                            <div class="flex items-center gap-1">
                                                <Input v-model="row.tanggal" type="date" class="min-w-[130px]"
                                                    @click="($event.target as HTMLInputElement).showPicker()"
                                                    @change="onTanggalChange(i)" />
                                                <span class="whitespace-nowrap text-xs text-muted-foreground">{{
                                                    row.hari }}</span>
                                            </div>
                                            <p v-if="(form.errors as any)[`rows.${i}.tanggal`]"
                                                class="mt-1 text-xs text-destructive">
                                                {{ (form.errors as any)[`rows.${i}.tanggal`] }}
                                            </p>
                                        </td>
                                        <td class="border-r px-2 py-1.5">
                                            <ComboInput v-model="row.muadzin" :suggestions="existingNames"
                                                placeholder="Muadzin" />
                                            <p v-if="(form.errors as any)[`rows.${i}.muadzin`]"
                                                class="mt-1 text-xs text-destructive">
                                                {{ (form.errors as any)[`rows.${i}.muadzin`] }}
                                            </p>
                                        </td>
                                        <td class="border-r px-2 py-1.5">
                                            <ComboInput v-model="row.imam_subuh" :suggestions="existingNames"
                                                placeholder="Imam Subuh" />
                                            <p v-if="(form.errors as any)[`rows.${i}.imam_subuh`]"
                                                class="mt-1 text-xs text-destructive">
                                                {{ (form.errors as any)[`rows.${i}.imam_subuh`] }}
                                            </p>
                                        </td>
                                        <td class="border-r px-2 py-1.5">
                                            <ComboInput v-model="row.imam_magrib" :suggestions="existingNames"
                                                placeholder="Imam Magrib" />
                                            <p v-if="(form.errors as any)[`rows.${i}.imam_magrib`]"
                                                class="mt-1 text-xs text-destructive">
                                                {{ (form.errors as any)[`rows.${i}.imam_magrib`] }}
                                            </p>
                                        </td>
                                        <td class="px-2 py-1.5">
                                            <ComboInput v-model="row.imam_isya" :suggestions="existingNames"
                                                placeholder="Imam Isya" />
                                            <p v-if="(form.errors as any)[`rows.${i}.imam_isya`]"
                                                class="mt-1 text-xs text-destructive">
                                                {{ (form.errors as any)[`rows.${i}.imam_isya`] }}
                                            </p>
                                        </td>
                                        <td class="px-2 py-1.5">
                                            <div class="flex items-center justify-center gap-1">
                                                <Button type="button" variant="ghost" size="icon"
                                                    class="h-7 w-7 text-blue-600 hover:text-blue-700"
                                                    @click="copyRow(i)">
                                                    <Copy class="h-3.5 w-3.5" />
                                                </Button>
                                                <Button type="button" variant="ghost" size="icon"
                                                    class="h-7 w-7 text-red-600 hover:text-red-700"
                                                    :disabled="form.rows.length <= 1" @click="removeRow(i)">
                                                    <Trash2 class="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
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
