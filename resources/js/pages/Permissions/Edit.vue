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

interface PermissionData {
    id: number;
    name: string;
}

const props = defineProps<{
    permission: PermissionData;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Permissions',
                href: '/permissions',
            },
            {
                title: 'Edit Permission',
                href: '#',
            },
        ],
    },
});

const form = useForm({
    name: props.permission.name,
});

function submit() {
    form.put(`/permissions/${props.permission.id}`);
}
</script>

<template>

    <Head :title="`Edit Permission - ${permission.name}`" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card class="mx-auto w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Edit Permission</CardTitle>
                <CardDescription>Perbarui data permission <strong>{{ permission.name }}</strong>.</CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="space-y-2">
                        <Label for="name">Nama Permission</Label>
                        <Input id="name" v-model="form.name" type="text" placeholder="Nama permission" />
                        <p v-if="form.errors.name" class="text-destructive text-sm">{{ form.errors.name }}</p>
                    </div>

                    <div class="flex items-center gap-3">
                        <Button type="submit" :disabled="form.processing" class="gap-2">
                            <Save class="h-4 w-4" />
                            Simpan
                        </Button>
                        <Button variant="outline" as-child class="gap-2">
                            <Link href="/permissions">
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
