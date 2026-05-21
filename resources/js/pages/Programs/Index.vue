<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import {
    BookOpen,
    ChevronDown,
    ChevronRight,
    Edit,
    Plus,
    Trash2,
} from 'lucide-vue-next';
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
    kegiatans: KegiatanItem[];
}

interface KegiatanItem {
    id: number;
    program_id: number;
    kegiatan: string;
    nama: string;
    created_at: string;
    updated_at: string;
}

defineProps<{
    programs: ProgramItem[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Program',
                href: '/programs',
            },
        ],
    },
});

const showDeleteDialog = ref(false);
const itemToDelete = ref<ProgramItem | null>(null);

function confirmDelete(item: ProgramItem) {
    itemToDelete.value = item;
    showDeleteDialog.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) {
        return;
    }

    router.delete(`/programs/${itemToDelete.value.id}`, {
        onFinish: () => {
            showDeleteDialog.value = false;
            itemToDelete.value = null;
        },
    });
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

const expandedPrograms = ref<number[]>([]);

function toggleProgram(programId: number) {
    if (expandedPrograms.value.includes(programId)) {
        expandedPrograms.value = expandedPrograms.value.filter(
            (id) => id !== programId,
        );
    } else {
        expandedPrograms.value.push(programId);
    }
}

function isExpanded(programId: number): boolean {
    return expandedPrograms.value.includes(programId);
}
</script>

<template>
    <Head title="Program" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <Card>
            <CardHeader>
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="flex items-center gap-2">
                            <BookOpen class="h-5 w-5" />
                            Daftar Program
                        </CardTitle>
                        <CardDescription>
                            Kelola semua data program kegiatan masjid.
                        </CardDescription>
                    </div>
                    <Button as-child class="gap-2">
                        <Link href="/programs/create">
                            <Plus class="h-4 w-4" />
                            Tambah Program
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div class="overflow-x-auto rounded-lg border">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b bg-muted/50">
                                <th class="px-4 py-3 text-left font-semibold">
                                    No
                                </th>
                                <th class="px-4 py-3 text-left font-semibold">
                                    Kode Program
                                </th>
                                <th class="px-4 py-3 text-left font-semibold">
                                    Nama Program
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
                            <template
                                v-for="(item, index) in programs"
                                :key="item.id"
                            >
                                <tr
                                    class="border-b transition-colors hover:bg-muted/30"
                                >
                                    <td class="px-4 py-3">
                                        <div class="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                class="h-7 w-7"
                                                @click="toggleProgram(item.id)"
                                            >
                                                <ChevronDown
                                                    v-if="isExpanded(item.id)"
                                                    class="h-4 w-4"
                                                />
                                                <ChevronRight
                                                    v-else
                                                    class="h-4 w-4"
                                                />
                                            </Button>

                                            <span>{{ index + 1 }}</span>
                                        </div>
                                    </td>

                                    <td class="px-4 py-3 font-mono font-medium">
                                        {{ item.program }}
                                    </td>

                                    <td class="px-4 py-3">
                                        <Link
                                            :href="`/programs/${item.id}/kegiatans`"
                                            class="font-medium text-primary hover:underline"
                                        >
                                            {{ item.nama }}
                                        </Link>
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
                                                    :href="`/programs/${item.id}/edit`"
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

                                <tr v-if="isExpanded(item.id)">
                                    <td colspan="5" class="px-10 pt-1 pb-2">
                                        <div>
                                            <table class="text-md w-full">
                                                <tbody>
                                                    <tr
                                                        v-for="kegiatan in item.kegiatans"
                                                        :key="kegiatan.id"
                                                    >
                                                        <td
                                                            class="py-1 pr-4 pl-28 font-mono font-medium text-blue-700 dark:text-blue-300"
                                                        >
                                                            {{
                                                                kegiatan.kegiatan
                                                            }}
                                                            ->

                                                            <Link
                                                                :href="`/programs/${item.id}/kegiatans/${kegiatan.id}/edit`"
                                                            >
                                                                {{
                                                                    kegiatan.nama
                                                                }}
                                                            </Link>
                                                        </td>
                                                    </tr>

                                                    <tr
                                                        v-if="
                                                            item.kegiatans
                                                                .length === 0
                                                        "
                                                    >
                                                        <td
                                                            colspan="2"
                                                            class="px-4 py-4 text-center text-sm text-blue-700 dark:text-blue-300"
                                                        >
                                                            <div
                                                                class="flex flex-col items-center justify-center gap-3"
                                                            >
                                                                <div>
                                                                    Belum ada
                                                                    kegiatan
                                                                    untuk
                                                                    program ini.
                                                                </div>

                                                                <Button
                                                                    size="sm"
                                                                    as-child
                                                                    class="gap-2"
                                                                >
                                                                    <Link
                                                                        :href="`/programs/${item.id}/kegiatans/create`"
                                                                    >
                                                                        <Plus
                                                                            class="h-4 w-4"
                                                                        />
                                                                        Tambah
                                                                    </Link>
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </template>

                            <tr v-if="programs.length === 0">
                                <td
                                    colspan="5"
                                    class="px-4 py-8 text-center text-muted-foreground"
                                >
                                    Belum ada program terdaftar.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        <!-- Delete Confirmation Dialog -->
        <Dialog v-model:open="showDeleteDialog">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Program</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus program
                        <strong
                            >{{ itemToDelete?.program }} -
                            {{ itemToDelete?.nama }}</strong
                        >? Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">Batal</Button>
                    </DialogClose>
                    <Button variant="destructive" @click="deleteItem"
                        >Hapus</Button
                    >
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
