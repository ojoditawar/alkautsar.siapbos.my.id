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

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Rekening',
                href: '/reks',
            },
            {
                title: 'Tambah Rekening',
                href: '/reks/create',
            },
        ],
    },
});

const form = useForm({
    kode: '',
    nama: '',
});

function submit() {
    form.post('/reks');
}
</script>

<template>

    <Head title="Tambah Rekening" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card class="mx-auto w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Tambah Rekening Baru</CardTitle>
                <CardDescription>Isi form berikut untuk menambahkan rekening baru ke sistem.</CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="space-y-2">
                        <Label for="kode">Kode</Label>
                        <Input id="kode" v-model="form.kode" type="text" placeholder="Kode rekening (1 karakter)" maxlength="1" />
                        <p v-if="form.errors.kode" class="text-destructive text-sm">{{ form.errors.kode }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label for="nama">Nama</Label>
                        <Input id="nama" v-model="form.nama" type="text" placeholder="Nama rekening" />
                        <p v-if="form.errors.nama" class="text-destructive text-sm">{{ form.errors.nama }}</p>
                    </div>

                    <div class="flex items-center gap-3">
                        <Button type="submit" :disabled="form.processing" class="gap-2">
                            <Save class="h-4 w-4" />
                            Simpan
                        </Button>
                        <Button variant="outline" as-child class="gap-2">
                            <Link href="/reks">
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
