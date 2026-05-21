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

interface ProgramItem {
    id: number;
    program: string;
    nama: string;
    created_at: string;
    updated_at: string;
}

interface KegiatanItem {
    id: number;
    program_id: number;
    kegiatan: string;
    nama: string;
    created_at: string;
    updated_at: string;
}

const props = defineProps<{
    program: ProgramItem;
    kegiatan: KegiatanItem;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Program',
                href: '/programs',
            },
            {
                title: 'Kegiatan',
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
    kegiatan: props.kegiatan.kegiatan,
    nama: props.kegiatan.nama,
});

function submit() {
    form.put(`/programs/${props.program.id}/kegiatans/${props.kegiatan.id}`);
}
</script>

<template>
    <Head :title="`Edit Kegiatan - ${kegiatan.nama}`" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle>Edit Kegiatan</CardTitle>
                        <CardDescription>
                            Perbarui kegiatan pada program
                            <strong
                                >{{ program.program }} -
                                {{ program.nama }}</strong
                            >.
                        </CardDescription>
                    </div>

                    <Button variant="outline" as-child class="gap-2">
                        <Link :href="`/programs/${program.id}/kegiatans`">
                            <ArrowLeft class="h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="grid gap-2">
                        <Label for="kegiatan">Kode Kegiatan</Label>

                        <Input
                            id="kegiatan"
                            v-model="form.kegiatan"
                            type="text"
                            autocomplete="off"
                        />

                        <p
                            v-if="form.errors.kegiatan"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.kegiatan }}
                        </p>
                    </div>

                    <div class="grid gap-2">
                        <Label for="nama">Nama Kegiatan</Label>

                        <Input
                            id="nama"
                            v-model="form.nama"
                            type="text"
                            autocomplete="off"
                        />

                        <p
                            v-if="form.errors.nama"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.nama }}
                        </p>
                    </div>

                    <div class="flex items-center justify-end gap-2">
                        <Button variant="outline" as-child>
                            <Link :href="`/programs/${program.id}/kegiatans`">
                                Batal
                            </Link>
                        </Button>

                        <Button
                            type="submit"
                            class="gap-2"
                            :disabled="form.processing"
                        >
                            <Save class="h-4 w-4" />
                            Update
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
