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

interface ProgramData {
    id: number;
    program: string;
    nama: string;
}

const props = defineProps<{
    program: ProgramData;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Program',
                href: '/programs',
            },
            {
                title: 'Edit Program',
                href: '#',
            },
        ],
    },
});

const form = useForm({
    program: props.program.program,
    nama: props.program.nama,
});

function submit() {
    form.transform((data) => ({
        ...data,
        _method: 'put',
    })).post(`/programs/${props.program.id}`, {
        forceFormData: true,
    });
}
</script>

<template>
    <Head :title="`Edit Program - ${program.nama}`" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle>Edit Program</CardTitle>
                        <CardDescription>
                            Perbarui data program
                            <strong
                                >{{ program.program }} -
                                {{ program.nama }}</strong
                            >.
                        </CardDescription>
                    </div>

                    <Button variant="outline" as-child class="gap-2">
                        <Link href="/programs">
                            <ArrowLeft class="h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="grid gap-2">
                        <Label for="program">Kode Program</Label>

                        <Input
                            id="program"
                            v-model="form.program"
                            type="text"
                            placeholder="Contoh: 01"
                            autocomplete="off"
                        />

                        <p
                            v-if="form.errors.program"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.program }}
                        </p>
                    </div>

                    <div class="grid gap-2">
                        <Label for="nama">Nama Program</Label>

                        <Input
                            id="nama"
                            v-model="form.nama"
                            type="text"
                            placeholder="Masukkan nama program"
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
                            <Link href="/programs">Batal</Link>
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
