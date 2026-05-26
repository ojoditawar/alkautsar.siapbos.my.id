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

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Data Jamaah', href: '/jamaahs' },
            { title: 'Tambah', href: '#' },
        ],
    },
});

const imagePreview = ref<string | null>(null);
const imageFile = ref<File | null>(null);

const form = useForm({
    nama: '',
    rt: '4',
    rw: '11',
    blok: 'D1',
    no_rumah: '',
    alamat: 'Griya Anggraini',
    telpon: '',
    art: 0,
    foto: null as File | null,
    status: 'warga',
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
    form.post('/jamaahs');
}
</script>

<template>
    <Head title="Tambah Data Jamaah" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle>Tambah Data Jamaah</CardTitle>
                        <CardDescription>
                            Tambahkan data jamaah/warga baru di lingkungan Griya Anggraini.
                        </CardDescription>
                    </div>
                    <Button variant="outline" as-child class="gap-2">
                        <Link href="/jamaahs">
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
                                placeholder="Masukkan nama lengkap jamaah..."
                                required
                            />
                            <p v-if="form.errors.nama" class="text-sm text-destructive">
                                {{ form.errors.nama }}
                            </p>
                        </div>

                        <!-- RT -->
                        <div class="grid gap-2">
                            <Label for="rt">Rukun Tetangga (RT)</Label>
                            <Input
                                id="rt"
                                v-model="form.rt"
                                placeholder="Contoh: 4"
                            />
                            <p v-if="form.errors.rt" class="text-sm text-destructive">
                                {{ form.errors.rt }}
                            </p>
                        </div>

                        <!-- RW -->
                        <div class="grid gap-2">
                            <Label for="rw">Rukun Warga (RW)</Label>
                            <Input
                                id="rw"
                                v-model="form.rw"
                                placeholder="Contoh: 11"
                            />
                            <p v-if="form.errors.rw" class="text-sm text-destructive">
                                {{ form.errors.rw }}
                            </p>
                        </div>

                        <!-- Blok -->
                        <div class="grid gap-2">
                            <Label for="blok">Blok Rumah</Label>
                            <Input
                                id="blok"
                                v-model="form.blok"
                                placeholder="Contoh: D1"
                            />
                            <p v-if="form.errors.blok" class="text-sm text-destructive">
                                {{ form.errors.blok }}
                            </p>
                        </div>

                        <!-- Nomor Rumah -->
                        <div class="grid gap-2">
                            <Label for="no_rumah">Nomor Rumah</Label>
                            <Input
                                id="no_rumah"
                                v-model="form.no_rumah"
                                placeholder="Contoh: 14"
                            />
                            <p v-if="form.errors.no_rumah" class="text-sm text-destructive">
                                {{ form.errors.no_rumah }}
                            </p>
                        </div>

                        <!-- Alamat -->
                        <div class="grid gap-2 md:col-span-2">
                            <Label for="alamat">Alamat / Perumahan</Label>
                            <Input
                                id="alamat"
                                v-model="form.alamat"
                                placeholder="Contoh: Griya Anggraini"
                            />
                            <p v-if="form.errors.alamat" class="text-sm text-destructive">
                                {{ form.errors.alamat }}
                            </p>
                        </div>

                        <!-- Telepon -->
                        <div class="grid gap-2">
                            <Label for="telpon">Nomor Telepon / HP</Label>
                            <Input
                                id="telpon"
                                v-model="form.telpon"
                                placeholder="Contoh: 08123456789"
                            />
                            <p v-if="form.errors.telpon" class="text-sm text-destructive">
                                {{ form.errors.telpon }}
                            </p>
                        </div>

                        <!-- Jumlah ART -->
                        <div class="grid gap-2">
                            <Label for="art">Jumlah ART (Asisten Rumah Tangga)</Label>
                            <Input
                                id="art"
                                v-model="form.art"
                                type="number"
                                min="0"
                                placeholder="0"
                                required
                            />
                            <p v-if="form.errors.art" class="text-sm text-destructive">
                                {{ form.errors.art }}
                            </p>
                        </div>

                        <!-- Status -->
                        <div class="grid gap-2">
                            <Label for="status">Status Tinggal</Label>
                            <select
                                id="status"
                                v-model="form.status"
                                class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="warga">Warga</option>
                                <option value="bukan warga">Bukan Warga</option>
                            </select>
                            <p v-if="form.errors.status" class="text-sm text-destructive">
                                {{ form.errors.status }}
                            </p>
                        </div>

                        <!-- Photo Upload -->
                        <div class="grid gap-2 md:col-span-2">
                            <Label for="foto">Foto Profil Jamaah</Label>
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
                                        Format: JPEG, PNG, JPG. Maksimal: 2MB.
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
                            <Link href="/jamaahs">Batal</Link>
                        </Button>
                        <Button
                            type="submit"
                            class="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                            :disabled="form.processing"
                        >
                            <Save class="h-4 w-4" />
                            Simpan
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
