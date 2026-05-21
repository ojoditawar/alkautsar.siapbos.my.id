<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save } from 'lucide-vue-next';
import { ref, computed } from 'vue';
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

interface MasjidData {
    id: string;
    nama: string;
    alamat: string | null;
    image: string | null;
}

const props = defineProps<{
    masjid: MasjidData;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Masjid',
                href: '/masjids',
            },
            {
                title: 'Edit Masjid',
                href: '#',
            },
        ],
    },
});

const form = useForm({
    nama: props.masjid.nama,
    alamat: props.masjid.alamat ?? '',
    image: null as File | null,
});

const imagePreview = ref<string | null>(null);
const existingImage = computed(() => props.masjid.image ? `/${props.masjid.image}` : null);

function onImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0] ?? null;
    form.image = file;

    if (file) {
        imagePreview.value = URL.createObjectURL(file);
    } else {
        imagePreview.value = null;
    }
}

function submit() {
    form
        .transform((data) => ({
            ...data,
            _method: 'put',
        }))
        .post(`/masjids/${props.masjid.id}`, {
            forceFormData: true,
        });
}
</script>

<template>

    <Head :title="`Edit Masjid - ${masjid.nama}`" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card class="mx-auto w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Edit Masjid</CardTitle>
                <CardDescription>Perbarui data masjid <strong>{{ masjid.nama }}</strong>.</CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="space-y-2">
                        <Label for="nama">Nama Masjid</Label>
                        <Input id="nama" v-model="form.nama" type="text" placeholder="Nama masjid" />
                        <p v-if="form.errors.nama" class="text-destructive text-sm">{{ form.errors.nama }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label for="alamat">Alamat</Label>
                        <Input id="alamat" v-model="form.alamat" type="text" placeholder="Alamat masjid" />
                        <p v-if="form.errors.alamat" class="text-destructive text-sm">{{ form.errors.alamat }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label for="image">Gambar</Label>
                        <input id="image" type="file" accept="image/jpg,image/jpeg,image/png,image/webp"
                            class="border-input bg-background ring-offset-background file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 flex h-10 w-full rounded-md border px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:px-3 file:py-1 file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            @change="onImageChange" />
                        <p v-if="form.errors.image" class="text-destructive text-sm">{{ form.errors.image }}</p>
                        <img v-if="imagePreview" :src="imagePreview" alt="Preview baru"
                            class="mt-2 h-40 w-auto rounded-md border object-cover" />
                        <div v-else-if="existingImage" class="mt-2">
                            <p class="text-muted-foreground mb-1 text-xs">Gambar saat ini:</p>
                            <img :src="existingImage" alt="Gambar masjid"
                                class="h-40 w-auto rounded-md border object-cover" />
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <Button type="submit" :disabled="form.processing" class="gap-2">
                            <Save class="h-4 w-4" />
                            Simpan
                        </Button>
                        <Button variant="outline" as-child class="gap-2">
                            <Link href="/masjids">
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
