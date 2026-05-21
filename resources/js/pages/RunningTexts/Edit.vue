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

interface RunningTextData {
    id: number;
    text: string;
    is_active: boolean;
    urutan: number;
}

const props = defineProps<{
    runningText: RunningTextData;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Running Text', href: '/running-texts' },
            { title: 'Edit', href: '#' },
        ],
    },
});

const form = useForm({
    text: props.runningText.text,
    is_active: props.runningText.is_active,
    urutan: props.runningText.urutan,
});

function submit() {
    form.transform((data) => ({ ...data, _method: 'put' }))
        .post(`/running-texts/${props.runningText.id}`, { forceFormData: true });
}
</script>

<template>
    <Head title="Edit Running Text" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle>Edit Running Text</CardTitle>
                        <CardDescription>Perbarui teks berjalan.</CardDescription>
                    </div>
                    <Button variant="outline" as-child class="gap-2">
                        <Link href="/running-texts">
                            <ArrowLeft class="h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <form class="space-y-6" @submit.prevent="submit">
                    <div class="grid gap-2">
                        <Label for="text">Teks</Label>
                        <textarea
                            id="text"
                            v-model="form.text"
                            rows="4"
                            class="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <p v-if="form.errors.text" class="text-sm text-destructive">{{ form.errors.text }}</p>
                    </div>

                    <div class="grid gap-2 md:grid-cols-2">
                        <div class="grid gap-2">
                            <Label for="urutan">Urutan</Label>
                            <Input
                                id="urutan"
                                v-model.number="form.urutan"
                                type="number"
                                min="0"
                            />
                            <p v-if="form.errors.urutan" class="text-sm text-destructive">{{ form.errors.urutan }}</p>
                        </div>

                        <div class="grid gap-2">
                            <Label>Status</Label>
                            <label class="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    v-model="form.is_active"
                                    class="h-4 w-4 rounded border-input"
                                />
                                <span class="text-sm">Aktifkan running text ini</span>
                            </label>
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-2">
                        <Button variant="outline" as-child>
                            <Link href="/running-texts">Batal</Link>
                        </Button>
                        <Button type="submit" class="gap-2" :disabled="form.processing">
                            <Save class="h-4 w-4" />
                            Update
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
