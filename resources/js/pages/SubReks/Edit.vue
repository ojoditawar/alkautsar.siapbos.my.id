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

interface RekData {
    kode: string;
    nama: string;
}

interface SubRekData {
    id: number;
    rek_id: string;
    kode: string;
    kelompok: string;
    nama: string;
}

const props = defineProps<{
    rek: RekData;
    subRek: SubRekData;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Rekening',
                href: '/reks',
            },
            {
                title: 'Sub Rekening',
                href: '#',
            },
            {
                title: 'Edit',
                href: '#',
            },
        ],
    },
});

const form = useForm({
    nama: props.subRek.nama,
});

function submit() {
    form.put(`/reks/${props.rek.kode}/sub-reks/${props.subRek.id}`);
}
</script>

<template>

    <Head :title="`Edit Sub Rekening - ${subRek.kelompok}`" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card class="mx-auto w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Edit Sub Rekening</CardTitle>
                <CardDescription>Perbarui data sub rekening <strong>{{ subRek.kelompok }} - {{ subRek.nama }}</strong>.</CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="space-y-2">
                        <Label for="kelompok">Kelompok</Label>
                        <Input id="kelompok" :model-value="subRek.kelompok" type="text" disabled class="opacity-60" />
                    </div>

                    <div class="space-y-2">
                        <Label for="nama">Nama</Label>
                        <Input id="nama" v-model="form.nama" type="text" placeholder="Nama sub rekening" />
                        <p v-if="form.errors.nama" class="text-destructive text-sm">{{ form.errors.nama }}</p>
                    </div>

                    <div class="flex items-center gap-3">
                        <Button type="submit" :disabled="form.processing" class="gap-2">
                            <Save class="h-4 w-4" />
                            Simpan
                        </Button>
                        <Button variant="outline" as-child class="gap-2">
                            <Link :href="`/reks/${rek.kode}/sub-reks`">
                                <ArrowLeft class="h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
