<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { ArrowLeft, ClipboardList, Edit, Plus, Trash2 } from 'lucide-vue-next';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

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
    kegiatans: KegiatanItem[];
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
        ],
    },
});

const showDeleteDialog = ref(false);
const itemToDelete = ref<KegiatanItem | null>(null);

function confirmDelete(item: KegiatanItem) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) {
        return;
    }

    router.delete(
        `/programs/${props.program.id}/kegiatans/${itemToDelete.value.id}`,
        {
            onFinish: () => {
                showDeleteDialog.value = false;
                itemToDelete.value = null;
            },
        },
    );
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
</script>

<template>
    <Head :title="`Kegiatan - ${program.nama}`" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <ClipboardList class="h-5 w-5" />
                            Kegiatan Program: {{ program.program }} -
                            {{ program.nama }}
                        </CardTitle>

                        <CardDescription>
                            Daftar kegiatan yang berada di bawah program
                            <strong
                                >{{ program.program }} -
                                {{ program.nama }}</strong
                            >.
                        </CardDescription>
                    </div>

                    <div class="flex items-center gap-2">
                        <Button variant="outline" as-child class="gap-2">
                            <Link href="/programs">
                                <ArrowLeft class="h-4 w-4" />
                                Kembali
                            </Link>
                        </Button>

                        <Button as-child class="gap-2">
                            <Link
                                :href="`/programs/${program.id}/kegiatans/create`"
                            >
                                <Plus class="h-4 w-4" />
                                Tambah Kegiatan
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div class="overflow-x-auto rounded-lg border">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b bg-muted/50">
                                <th class="px-4 py-3 text-left font-semibold">
                                    Kegiatan
                                </th>
                                <th class="px-4 py-3 text-left font-semibold">
                                    Nama
                                </th>
                                <th class="px-4 py-3 text-left font-semibold">
                                    Tgl Dibuat
                                </th>
                                <th class="px-4 py-3 text-center font-semibold">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="item in kegiatans"
                                :key="item.id"
                                class="border-b transition-colors last:border-0 hover:bg-muted/30"
                            >
                                <td class="px-4 py-3 font-mono font-medium">
                                    {{ item.kegiatan }}
                                </td>

                                <td class="px-4 py-3">
                                    {{ item.nama }}
                                </td>

                                <td class="px-4 py-3 text-muted-foreground">
                                    {{ formatDate(item.created_at) }}
                                </td>

                                <td class="px-4 py-3">
                                    <div
                                        class="flex items-center justify-center gap-2"
                                    >
                                        <Button
                                            size="icon"
                                            as-child
                                            class="h-9 w-9 bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                                        >
                                            <Link
                                                :href="`/programs/${program.id}/kegiatans/${item.id}/edit`"
                                            >
                                                <Edit class="h-4 w-4" />
                                            </Link>
                                        </Button>

                                        <Button
                                            type="button"
                                            size="icon"
                                            class="h-9 w-9 bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                                            @click="confirmDelete(item)"
                                        >
                                            <Trash2 class="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>

                            <tr v-if="kegiatans.length === 0">
                                <td
                                    colspan="4"
                                    class="px-4 py-8 text-center text-muted-foreground"
                                >
                                    Belum ada kegiatan untuk program ini.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        <Dialog v-model:open="showDeleteDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Kegiatan</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus kegiatan
                        <strong>
                            {{ itemToDelete?.kegiatan }} -
                            {{ itemToDelete?.nama }} </strong
                        >? Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">Batal</Button>
                    </DialogClose>

                    <Button variant="destructive" @click="deleteItem">
                        Hapus
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
