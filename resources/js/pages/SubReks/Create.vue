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

const props = defineProps<{
    rek: RekData;
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
                title: 'Tambah',
                href: '#',
            },
        ],
    },
});

const form = useForm({
    kelompok: '',
    nama: '',
});

function submit() {
    form.post(`/reks/${props.rek.kode}/sub-reks`);
}
</script>

<template>

    <Head :title="`Tambah Sub Rekening - ${rek.nama}`" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card class="mx-auto w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Tambah Sub Rekening</CardTitle>
                <CardDescription>Tambah sub rekening baru di bawah rekening <strong>{{ rek.kode }} - {{ rek.nama
                        }}</strong>.</CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="space-y-2">
                        <Label for="kelompok">Kelompok</Label>
                        <div class="flex items-center gap-2">
                            <span class="text-muted-foreground font-mono text-sm">{{ rek.kode }}.</span>
                            <Input id="kelompok" v-model="form.kelompok" type="text"
                                placeholder="Kode kelompok (2 digit)" maxlength="2" class="max-w-32" />
                        </div>
                        <p v-if="form.errors.kelompok" class="text-destructive text-sm">{{ form.errors.kelompok }}</p>
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
