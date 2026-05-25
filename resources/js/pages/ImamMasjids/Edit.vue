<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save, User, X } from 'lucide-vue-next';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface ImamMasjidItem {
    id: number;
    masjid_id: string;
    nama: string;
    foto: string | null;
    jabatan: string;
    tipe: 'utama' | 'cadangan';
    sholat: 'SUBUH' | 'DZUHUR' | 'ASHAR' | 'MAGHRIB' | 'ISYA';
}

const props = defineProps<{
    imamMasjid: ImamMasjidItem;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Imam & Badal', href: '/imam-masjids' },
            { title: 'Edit', href: '#' },
        ],
    },
});

const imagePreview = ref<string | null>(
    props.imamMasjid.foto ? props.imamMasjid.foto : null
);
const imageFile = ref<File | null>(null);

const form = useForm({
    _method: 'put',
    nama: props.imamMasjid.nama,
    foto: null as File | null,
    jabatan: props.imamMasjid.jabatan,
    tipe: props.imamMasjid.tipe,
    sholat: props.imamMasjid.sholat,
});

function handleImageUpload(event: Event) {
    const target = event.target as HTMLInputElement;

    if (!target || !target.files) {
        return;
    }

    const file = target.files[0];

    if (!file || !file.type.startsWith('image/')) {
        removeImage();
        return;
    }

    imageFile.value = file;
    form.foto = file;
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    imagePreview.value = null;
    imageFile.value = null;
    form.foto = null;
    const input = document.getElementById('foto') as HTMLInputElement;
    if (input) input.value = '';
}

function submit() {
    form.post(`/imam-masjids/${props.imamMasjid.id}`);
}
</script>

<template>
    <Head title="Edit Imam Masjid" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle>Edit Imam & Cadangan (Badal)</CardTitle>
                        <CardDescription>
                            Ubah data Imam Utama atau Cadangan untuk jadwal sholat tertentu.
                        </CardDescription>
                    </div>
                    <Button variant="outline" as-child class="gap-2">
                        <Link href="/imam-masjids">
                            <ArrowLeft class="h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <form class="space-y-6" @submit.prevent="submit">
                    <div class="grid gap-6 md:grid-cols-2">
                        
                        <!-- Nama -->
                        <div class="grid gap-2 md:col-span-2">
                            <Label for="nama">Nama Lengkap</Label>
                            <Input
                                id="nama"
                                v-model="form.nama"
                                placeholder="Masukkan nama lengkap beserta gelar..."
                                required
                            />
                            <p v-if="form.errors.nama" class="text-sm text-destructive">
                                {{ form.errors.nama }}
                            </p>
                        </div>

                        <!-- Jabatan -->
                        <div class="grid gap-2 md:col-span-2">
                            <Label for="jabatan">Jabatan / Keterangan</Label>
                            <Input
                                id="jabatan"
                                v-model="form.jabatan"
                                placeholder="Contoh: Imam Utama Masjid Al Kautsar, dll..."
                                required
                            />
                            <p v-if="form.errors.jabatan" class="text-sm text-destructive">
                                {{ form.errors.jabatan }}
                            </p>
                        </div>

                        <!-- Tipe -->
                        <div class="grid gap-2">
                            <Label for="tipe">Tipe Imam</Label>
                            <select
                                id="tipe"
                                v-model="form.tipe"
                                class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="utama">Imam Utama</option>
                                <option value="cadangan">Imam Cadangan (Badal)</option>
                            </select>
                            <p v-if="form.errors.tipe" class="text-sm text-destructive">
                                {{ form.errors.tipe }}
                            </p>
                        </div>

                        <!-- Sholat -->
                        <div class="grid gap-2">
                            <Label for="sholat">Untuk Waktu Sholat</Label>
                            <select
                                id="sholat"
                                v-model="form.sholat"
                                class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="SUBUH">SUBUH</option>
                                <option value="DZUHUR">DZUHUR</option>
                                <option value="ASHAR">ASHAR</option>
                                <option value="MAGHRIB">MAGHRIB</option>
                                <option value="ISYA">ISYA</option>
                            </select>
                            <p v-if="form.errors.sholat" class="text-sm text-destructive">
                                {{ form.errors.sholat }}
                            </p>
                        </div>

                        <!-- Photo Upload -->
                        <div class="grid gap-2 md:col-span-2">
                            <Label for="foto">Foto Profil</Label>
                            <div class="flex items-start gap-4">
                                <div class="flex-1">
                                    <div class="relative">
                                        <input
                                            id="foto"
                                            type="file"
                                            accept="image/jpeg,image/png,image/jpg"
                                            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                                            @change="handleImageUpload"
                                        />
                                        <p v-if="form.errors.foto" class="mt-1 text-sm text-destructive">
                                            {{ form.errors.foto }}
                                        </p>
                                    </div>
                                    <p class="mt-1 text-xs text-muted-foreground">
                                        Format: JPEG, PNG, JPG. Maksimal: 2MB. Biarkan kosong jika tidak ingin mengganti foto.
                                    </p>
                                </div>
                                <div v-if="imagePreview" class="relative h-24 w-24 overflow-hidden rounded-full border">
                                    <img
                                        :src="imagePreview"
                                        alt="Preview"
                                        class="h-full w-full object-cover"
                                    />
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="destructive"
                                        class="absolute top-0 right-0 h-6 w-6 rounded-full"
                                        @click="removeImage"
                                    >
                                        <X class="h-3 w-3" />
                                    </Button>
                                </div>
                                <div v-else class="flex h-24 w-24 items-center justify-center rounded-full border border-dashed bg-slate-50 text-slate-400">
                                    <User class="h-8 w-8" />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="flex items-center justify-end gap-2 border-t pt-4">
                        <Button variant="outline" as-child>
                            <Link href="/imam-masjids">Batal</Link>
                        </Button>
                        <Button
                            type="submit"
                            class="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                            :disabled="form.processing"
                        >
                            <Save class="h-4 w-4" />
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
