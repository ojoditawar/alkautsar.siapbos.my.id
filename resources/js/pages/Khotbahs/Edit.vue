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

interface KhotbahData {
    id: number;
    nama: string;
    alamat: string;
    tanggal: string;
    hp: string | null;
    honor: number;
}

const props = defineProps<{
    khotbah: KhotbahData;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Khotib Jumat', href: '/khotib-jumat' },
            { title: 'Edit', href: '/khotib-jumat' },
        ],
    },
});

const form = useForm({
    nama: props.khotbah.nama,
    alamat: props.khotbah.alamat,
    tanggal: props.khotbah.tanggal,
    hp: props.khotbah.hp ?? '',
    honor: props.khotbah.honor,
});

function submit() {
    form.put(`/khotib-jumat/${props.khotbah.id}`);
}

function formatDateForInput(dateString: string): string {
    if (!dateString) {
        return '';
    }

    const d = new Date(dateString);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
</script>

<template>

    <Head title="Edit Khotbah" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <div class="flex items-center gap-4">
            <Button as-child variant="ghost" size="icon">
                <Link href="/khotib-jumat">
                    <ArrowLeft class="h-5 w-5" />
                </Link>
            </Button>
            <div>
                <h1 class="text-2xl font-bold">Edit Khotbah</h1>
                <p class="text-sm text-muted-foreground">
                    Edit data khotib jumat
                </p>
            </div>
        </div>

        <Card class="max-w-2xl">
            <CardHeader>
                <CardTitle>Form Edit Khotbah</CardTitle>
                <CardDescription>
                    Update data khotib jumat di bawah ini.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submit" class="space-y-4">
                    <div class="space-y-2">
                        <Label for="nama">Nama <span class="text-destructive">*</span></Label>
                        <Input id="nama" v-model="form.nama" type="text" placeholder="Nama khotib" required
                            maxlength="100" />
                        <p v-if="form.errors.nama" class="text-sm text-destructive">
                            {{ form.errors.nama }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="alamat">Alamat <span class="text-destructive">*</span></Label>
                        <Input id="alamat" v-model="form.alamat" type="text" placeholder="Alamat khotib" required
                            maxlength="255" />
                        <p v-if="form.errors.alamat" class="text-sm text-destructive">
                            {{ form.errors.alamat }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="tanggal">Tanggal <span class="text-destructive">*</span></Label>
                        <Input id="tanggal" v-model="form.tanggal" type="date"
                            :max="formatDateForInput(new Date().toISOString())" required />
                        <p v-if="form.errors.tanggal" class="text-sm text-destructive">
                            {{ form.errors.tanggal }}
                        </p>
                        <p class="text-xs text-muted-foreground">
                            Tanggal harus hari Jumat.
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="hp">Nomor HP</Label>
                        <Input id="hp" v-model="form.hp" type="text" placeholder="08xxxxxxxxxx" maxlength="20" />
                        <p v-if="form.errors.hp" class="text-sm text-destructive">
                            {{ form.errors.hp }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="honor">Honor</Label>
                        <Input id="honor" v-model="form.honor" type="number" placeholder="0" min="0" />
                        <p v-if="form.errors.honor" class="text-sm text-destructive">
                            {{ form.errors.honor }}
                        </p>
                    </div>

                    <div class="flex justify-end gap-2 pt-4">
                        <Button as-child variant="outline" type="button">
                            <Link href="/khotib-jumat">Batal</Link>
                        </Button>
                        <Button type="submit" :disabled="form.processing" class="gap-2">
                            <Save class="h-4 w-4" />
                            {{ form.processing ? 'Menyimpan...' : 'Simpan' }}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
