<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save } from 'lucide-vue-next';
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

interface KajianData {
    id: number;
    judul: string;
    pemateri: string;
    tanggal: string;
    waktu: string | null;
    tempat: string | null;
    deskripsi: string | null;
    is_active: boolean;
}

const props = defineProps<{
    kajian: KajianData;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Kajian', href: '/kajians' },
            { title: 'Edit', href: '#' },
        ],
    },
});

const form = useForm({
    judul: props.kajian.judul,
    pemateri: props.kajian.pemateri,
    tanggal: props.kajian.tanggal,
    waktu: props.kajian.waktu ?? '',
    tempat: props.kajian.tempat ?? '',
    deskripsi: props.kajian.deskripsi ?? '',
    is_active: props.kajian.is_active,
});

function submit() {
    form.transform((data) => ({ ...data, _method: 'put' }))
        .post(`/kajians/${props.kajian.id}`, { forceFormData: true });
}
</script>

<template>
    <Head title="Edit Kajian" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle>Edit Kajian</CardTitle>
                        <CardDescription>Perbarui data kajian.</CardDescription>
                    </div>
                    <Button variant="outline" as-child class="gap-2">
                        <Link href="/kajians">
                            <ArrowLeft class="h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <form class="space-y-6" @submit.prevent="submit">
                    <div class="grid gap-4 md:grid-cols-2">
                        <div class="grid gap-2">
                            <Label for="judul">Judul</Label>
                            <Input id="judul" v-model="form.judul" />
                            <p v-if="form.errors.judul" class="text-sm text-destructive">{{ form.errors.judul }}</p>
                        </div>
                        <div class="grid gap-2">
                            <Label for="pemateri">Pemateri</Label>
                            <Input id="pemateri" v-model="form.pemateri" />
                            <p v-if="form.errors.pemateri" class="text-sm text-destructive">{{ form.errors.pemateri }}</p>
                        </div>
                        <div class="grid gap-2">
                            <Label for="tanggal">Tanggal</Label>
                            <Input id="tanggal" v-model="form.tanggal" type="date" />
                            <p v-if="form.errors.tanggal" class="text-sm text-destructive">{{ form.errors.tanggal }}</p>
                        </div>
                        <div class="grid gap-2">
                            <Label for="waktu">Waktu</Label>
                            <Input id="waktu" v-model="form.waktu" type="time" />
                            <p v-if="form.errors.waktu" class="text-sm text-destructive">{{ form.errors.waktu }}</p>
                        </div>
                        <div class="grid gap-2 md:col-span-2">
                            <Label for="tempat">Tempat</Label>
                            <Input id="tempat" v-model="form.tempat" />
                            <p v-if="form.errors.tempat" class="text-sm text-destructive">{{ form.errors.tempat }}</p>
                        </div>
                        <div class="grid gap-2 md:col-span-2">
                            <Label for="deskripsi">Deskripsi</Label>
                            <textarea
                                id="deskripsi"
                                v-model="form.deskripsi"
                                rows="4"
                                class="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <p v-if="form.errors.deskripsi" class="text-sm text-destructive">{{ form.errors.deskripsi }}</p>
                        </div>
                        <div class="grid gap-2 md:col-span-2">
                            <Label>Status</Label>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" v-model="form.is_active" class="h-4 w-4 rounded border-input" />
                                <span class="text-sm">Aktifkan kajian ini</span>
                            </label>
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-2">
                        <Button variant="outline" as-child>
                            <Link href="/kajians">Batal</Link>
                        </Button>
                        <Button type="submit" class="gap-2" :disabled="form.processing">
                            <Save class="h-4 w-4" />
                            Update
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
