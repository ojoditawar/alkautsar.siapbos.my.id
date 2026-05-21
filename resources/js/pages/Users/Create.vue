<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Check, ChevronsUpDown, Save } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface MasjidData {
    id: string;
    nama: string;
}

interface RoleData {
    id: number;
    name: string;
}

const props = defineProps<{
    masjids: MasjidData[];
    roles: RoleData[];
}>();

const openMasjid = ref(false);
const selectedMasjidLabel = computed(() => {
    const found = props.masjids.find((m) => m.id === form.masjid_id);

    return found ? found.nama : 'Pilih Masjid...';
});

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Users',
                href: '/users',
            },
            {
                title: 'Tambah User',
                href: '/users/create',
            },
        ],
    },
});

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    masjid_id: '' as string | null,
    role_ids: [] as number[],
});

function toggleRole(id: number) {
    if (form.role_ids.includes(id)) {
        form.role_ids = form.role_ids.filter((r: number) => r !== id);
    } else {
        form.role_ids = [...form.role_ids, id];
    }
}

function submit() {
    form.post('/users');
}
</script>

<template>
    <Head title="Tambah User" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card class="mx-auto w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Tambah User Baru</CardTitle>
                <CardDescription
                    >Isi form berikut untuk menambahkan user baru ke
                    sistem.</CardDescription
                >
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="space-y-2">
                        <Label for="name">Nama</Label>
                        <Input
                            id="name"
                            v-model="form.name"
                            type="text"
                            placeholder="Nama lengkap"
                        />
                        <p
                            v-if="form.errors.name"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.name }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            v-model="form.email"
                            type="email"
                            placeholder="email@contoh.com"
                        />
                        <p
                            v-if="form.errors.email"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.email }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
                            v-model="form.password"
                            type="password"
                            placeholder="Minimal 8 karakter"
                        />
                        <p
                            v-if="form.errors.password"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.password }}
                        </p>
                    </div>

                    <div class="space-y-2">
                        <Label for="password_confirmation"
                            >Konfirmasi Password</Label
                        >
                        <Input
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            type="password"
                            placeholder="Ulangi password"
                        />
                    </div>

                    <div class="space-y-2">
                        <Label>Masjid</Label>
                        <Popover v-model:open="openMasjid">
                            <PopoverTrigger as-child>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    :aria-expanded="openMasjid"
                                    class="w-full justify-between font-normal"
                                >
                                    {{ selectedMasjidLabel }}
                                    <ChevronsUpDown
                                        class="ml-2 h-4 w-4 shrink-0 opacity-50"
                                    />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-full p-0" align="start">
                                <Command>
                                    <CommandInput
                                        placeholder="Cari Masjid..."
                                    />
                                    <CommandList>
                                        <CommandEmpty
                                            >Masjid tidak
                                            ditemukan.</CommandEmpty
                                        >
                                        <CommandGroup>
                                            <CommandItem
                                                v-for="masjid in masjids"
                                                :key="masjid.id"
                                                :value="masjid.nama"
                                                @select="
                                                    () => {
                                                        form.masjid_id =
                                                            masjid.id;
                                                        openMasjid = false;
                                                    }
                                                "
                                            >
                                                <Check
                                                    :class="
                                                        cn(
                                                            'mr-2 h-4 w-4',
                                                            form.masjid_id ===
                                                                masjid.id
                                                                ? 'opacity-100'
                                                                : 'opacity-0',
                                                        )
                                                    "
                                                />
                                                {{ masjid.nama }}
                                            </CommandItem>
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <p
                            v-if="form.errors.masjid_id"
                            class="text-sm text-destructive"
                        >
                            {{ form.errors.masjid_id }}
                        </p>
                    </div>

                    <div class="space-y-3">
                        <Label>Roles</Label>
                        <div
                            v-if="roles.length > 0"
                            class="grid grid-cols-2 gap-3 rounded-lg border p-4"
                        >
                            <div
                                v-for="role in roles"
                                :key="role.id"
                                class="flex items-center gap-2"
                            >
                                <Checkbox
                                    :id="`role-${role.id}`"
                                    :model-value="
                                        form.role_ids.includes(role.id)
                                    "
                                    @update:model-value="toggleRole(role.id)"
                                />
                                <Label
                                    :for="`role-${role.id}`"
                                    class="cursor-pointer text-sm font-normal"
                                    >{{ role.name }}</Label
                                >
                            </div>
                        </div>
                        <p v-else class="text-sm text-muted-foreground">
                            Belum ada role.
                        </p>
                    </div>

                    <div class="flex items-center gap-3">
                        <Button
                            type="submit"
                            :disabled="form.processing"
                            class="gap-2"
                        >
                            <Save class="h-4 w-4" />
                            Simpan
                        </Button>
                        <Button variant="outline" as-child class="gap-2">
                            <Link href="/users">
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
