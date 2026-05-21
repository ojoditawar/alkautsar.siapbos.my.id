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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PermissionData {
    id: number;
    name: string;
}

interface RoleData {
    id: number;
    name: string;
    permissions: number[];
}

const props = defineProps<{
    role: RoleData;
    permissions: PermissionData[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Roles',
                href: '/roles',
            },
            {
                title: 'Edit Role',
                href: '#',
            },
        ],
    },
});

const form = useForm({
    name: props.role.name,
    permissions: [...props.role.permissions],
});

function togglePermission(id: number) {
    const index = form.permissions.indexOf(id);

    if (index > -1) {
        form.permissions.splice(index, 1);
    } else {
        form.permissions.push(id);
    }
}

function submit() {
    form.put(`/roles/${props.role.id}`);
}
</script>

<template>

    <Head :title="`Edit Role - ${role.name}`" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card class="mx-auto w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Edit Role</CardTitle>
                <CardDescription>Perbarui data role <strong>{{ role.name }}</strong>.</CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="space-y-2">
                        <Label for="name">Nama Role</Label>
                        <Input id="name" v-model="form.name" type="text" placeholder="Nama role" />
                        <p v-if="form.errors.name" class="text-destructive text-sm">{{ form.errors.name }}</p>
                    </div>

                    <div class="space-y-3">
                        <Label>Permissions</Label>
                        <div v-if="permissions.length > 0" class="grid grid-cols-2 gap-3 rounded-lg border p-4">
                            <div v-for="perm in permissions" :key="perm.id" class="flex items-center gap-2">
                                <Checkbox :id="`perm-${perm.id}`" :model-value="form.permissions.includes(perm.id)"
                                    @update:model-value="togglePermission(perm.id)" />
                                <Label :for="`perm-${perm.id}`" class="cursor-pointer text-sm font-normal">{{ perm.name
                                    }}</Label>
                            </div>
                        </div>
                        <p v-else class="text-muted-foreground text-sm">Belum ada permission.</p>
                    </div>

                    <div class="flex items-center gap-3">
                        <Button type="submit" :disabled="form.processing" class="gap-2">
                            <Save class="h-4 w-4" />
                            Simpan
                        </Button>
                        <Button variant="outline" as-child class="gap-2">
                            <Link href="/roles">
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
