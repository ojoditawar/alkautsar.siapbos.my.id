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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

interface MasjidData {
    id: string;
    nama: string;
}

interface RoleData {
    id: number;
    name: string;
}

interface UserData {
    id: number;
    name: string;
    email: string;
    masjid_id: string | null;
    role_ids: number[];
}

const props = defineProps<{
    user: UserData;
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
                title: 'Edit User',
                href: '#',
            },
        ],
    },
});

const selectedRoleIds = ref<number[]>([...props.user.role_ids]);

const form = useForm({
    name: props.user.name,
    email: props.user.email,
    password: '',
    password_confirmation: '',
    masjid_id: props.user.masjid_id ?? '' as string | null,
});

function toggleRole(id: number) {
    if (selectedRoleIds.value.includes(id)) {
        selectedRoleIds.value = selectedRoleIds.value.filter((r) => r !== id);
    } else {
        selectedRoleIds.value = [...selectedRoleIds.value, id];
    }
}

function submit() {
    form.transform((data) => ({
        ...data,
        password: data.password || undefined,
        password_confirmation: data.password_confirmation || undefined,
        role_ids: selectedRoleIds.value,
    })).put(`/users/${props.user.id}`);
}
</script>

<template>

    <Head :title="`Edit User - ${user.name}`" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card class="mx-auto w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Edit User</CardTitle>
                <CardDescription>Perbarui data user <strong>{{ user.name }}</strong>.</CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="space-y-2">
                        <Label for="name">Nama</Label>
                        <Input id="name" v-model="form.name" type="text" placeholder="Nama lengkap" />
                        <p v-if="form.errors.name" class="text-destructive text-sm">{{ form.errors.name }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label for="email">Email</Label>
                        <Input id="email" v-model="form.email" type="email" placeholder="email@contoh.com" />
                        <p v-if="form.errors.email" class="text-destructive text-sm">{{ form.errors.email }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label for="password">Password Baru</Label>
                        <Input id="password" v-model="form.password" type="password" autocomplete="new-password"
                            placeholder="Kosongkan jika tidak ingin mengubah" />
                        <p v-if="form.errors.password" class="text-destructive text-sm">{{ form.errors.password }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label for="password_confirmation">Konfirmasi Password Baru</Label>
                        <Input id="password_confirmation" v-model="form.password_confirmation" type="password"
                            autocomplete="new-password" placeholder="Ulangi password baru" />
                    </div>

                    <div class="space-y-2">
                        <Label>Masjid</Label>
                        <Popover v-model:open="openMasjid">
                            <PopoverTrigger as-child>
                                <Button variant="outline" role="combobox" :aria-expanded="openMasjid"
                                    class="w-full justify-between font-normal">
                                    {{ selectedMasjidLabel }}
                                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-full p-0" align="start">
                                <Command>
                                    <CommandInput placeholder="Cari Masjid..." />
                                    <CommandList>
                                        <CommandEmpty>Masjid tidak ditemukan.</CommandEmpty>
                                        <CommandGroup>
                                            <CommandItem v-for="masjid in masjids" :key="masjid.id" :value="masjid.nama"
                                                @select="() => { form.masjid_id = masjid.id; openMasjid = false; }">
                                                <Check
                                                    :class="cn('mr-2 h-4 w-4', form.masjid_id === masjid.id ? 'opacity-100' : 'opacity-0')" />
                                                {{ masjid.nama }}
                                            </CommandItem>
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <p v-if="form.errors.masjid_id" class="text-destructive text-sm">{{ form.errors.masjid_id }}</p>
                    </div>

                    <div class="space-y-3">
                        <Label>Roles</Label>
                        <div v-if="roles.length > 0" class="grid grid-cols-2 gap-3 rounded-lg border p-4">
                            <div v-for="role in roles" :key="role.id" class="flex items-center gap-2">
                                <Checkbox :id="`role-${role.id}`" :model-value="selectedRoleIds.includes(role.id)"
                                    @update:model-value="toggleRole(role.id)" />
                                <Label :for="`role-${role.id}`" class="cursor-pointer text-sm font-normal">{{ role.name
                                }}</Label>
                            </div>
                        </div>
                        <p v-else class="text-muted-foreground text-sm">Belum ada role.</p>
                    </div>

                    <div class="flex items-center gap-3">
                        <Button type="submit" :disabled="form.processing" class="gap-2">
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
