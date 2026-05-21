<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Image as ImageIcon, Save, X } from 'lucide-vue-next';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface MutiaraImageItem {
    id: number;
    masjid_id: string;
    image: string;
    caption: string | null;
    is_active: boolean;
    order: number;
}

const props = defineProps<{
    mutiaraImage: MutiaraImageItem;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Gambar Mutiara', href: '/mutiara-images' },
            { title: 'Edit', href: '#' },
        ],
    },
});

const imagePreview = ref<string | null>(
    props.mutiaraImage.image ? `/storage/${props.mutiaraImage.image}` : null,
);
const imageFile = ref<File | null>(null);

const form = useForm({
    _method: 'put',
    image: null as File | null,
    caption: props.mutiaraImage.caption ?? '',
    is_active: props.mutiaraImage.is_active,
    order: props.mutiaraImage.order,
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
    form.image = file;
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    imagePreview.value = null;
    imageFile.value = null;
    form.image = null;
    const input = document.getElementById('image') as HTMLInputElement;
    if (input) input.value = '';
}

function submit() {
    form.post(`/mutiara-images/${props.mutiaraImage.id}`);
}
</script>

<template>
    <Head title="Edit Gambar Mutiara" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle>Edit Gambar Mutiara</CardTitle>
                        <CardDescription>
                            Ubah data gambar untuk tampilan monitor masjid.
                        </CardDescription>
                    </div>
                    <Button variant="outline" as-child class="gap-2">
                        <Link href="/mutiara-images">
                            <ArrowLeft class="h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <form class="space-y-6" @submit.prevent="submit">
                    <div class="grid gap-4 md:grid-cols-2">
                        <!-- Image Upload -->
                        <div class="grid gap-2 md:col-span-2">
                            <Label for="image">Gambar</Label>
                            <div class="flex items-start gap-4">
                                <div class="flex-1">
                                    <div class="relative">
                                        <input
                                            id="image"
                                            type="file"
                                            accept="image/jpeg,image/png,image/jpg"
                                            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                                            @change="handleImageUpload"
                                        />
                                        <p
                                            v-if="form.errors.image"
                                            class="mt-1 text-sm text-destructive"
                                        >
                                            {{ form.errors.image }}
                                        </p>
                                    </div>
                                    <p
                                        class="mt-1 text-xs text-muted-foreground"
                                    >
                                        Format: JPEG, PNG, JPG. Maksimal: 2MB.
                                        Biarkan kosong jika tidak ingin
                                        mengganti gambar.
                                    </p>
                                </div>
                                <div
                                    v-if="imagePreview"
                                    class="relative h-24 w-24 overflow-hidden rounded-lg border"
                                >
                                    <img
                                        :src="imagePreview"
                                        alt="Preview"
                                        class="h-full w-full object-cover"
                                    />
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="destructive"
                                        class="absolute top-1 right-1 h-6 w-6"
                                        @click="removeImage"
                                    >
                                        <X class="h-3 w-3" />
                                    </Button>
                                </div>
                                <div
                                    v-else
                                    class="flex h-24 w-24 items-center justify-center rounded-lg border border-dashed"
                                >
                                    <ImageIcon
                                        class="h-8 w-8 text-muted-foreground"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Caption -->
                        <div class="grid gap-2 md:col-span-2">
                            <Label for="caption">Caption</Label>
                            <Input
                                id="caption"
                                v-model="form.caption"
                                placeholder="Masukkan caption gambar..."
                                maxlength="255"
                            />
                            <p
                                v-if="form.errors.caption"
                                class="text-sm text-destructive"
                            >
                                {{ form.errors.caption }}
                            </p>
                        </div>

                        <!-- Order -->
                        <div class="grid gap-2">
                            <Label for="order">Urutan</Label>
                            <Input
                                id="order"
                                v-model="form.order"
                                type="number"
                                min="0"
                                placeholder="0"
                            />
                            <p
                                v-if="form.errors.order"
                                class="text-sm text-destructive"
                            >
                                {{ form.errors.order }}
                            </p>
                        </div>

                        <!-- Active Checkbox -->
                        <div class="grid gap-2">
                            <Label for="is_active">Status Aktif</Label>
                            <div class="flex items-center gap-2">
                                <Checkbox
                                    id="is_active"
                                    v-model:checked="form.is_active"
                                />
                                <label
                                    for="is_active"
                                    class="cursor-pointer text-sm text-muted-foreground"
                                >
                                    {{ form.is_active ? 'Aktif' : 'Nonaktif' }}
                                </label>
                            </div>
                            <p
                                v-if="form.errors.is_active"
                                class="text-sm text-destructive"
                            >
                                {{ form.errors.is_active }}
                            </p>
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-2">
                        <Button variant="outline" as-child>
                            <Link href="/mutiara-images">Batal</Link>
                        </Button>
                        <Button
                            type="submit"
                            class="gap-2"
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
