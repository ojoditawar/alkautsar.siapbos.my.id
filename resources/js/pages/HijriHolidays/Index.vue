<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Copy, Edit, Loader2, Plus, RefreshCw, Trash2 } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

interface Holiday {
    id: number;
    name: string;
    hijri_date: string | null;
    gregorian_date: string;
    days_left: number;
}

const props = defineProps<{
    holidays: Holiday[];
}>();

const isSyncing = ref(false);
const isSaving = ref(false);
const currentTime = ref(new Date());

// Delete dialog state
const isDeleteOpen = ref(false);
const deletingHoliday = ref<Holiday | null>(null);

// Form dialog state
const isFormOpen = ref(false);
const editingHoliday = ref<Holiday | null>(null);
const formName = ref('');
const formHijriDate = ref('');
const formGregorianDate = ref('');

// Copy dialog state
const isCopyOpen = ref(false);
const copyingHoliday = ref<Holiday | null>(null);
const copyTargetYear = ref(String(new Date().getFullYear() + 1));

const syncHolidays = () => {
    isSyncing.value = true;
    router.post('/hijri-holidays/sync', { year: new Date().getFullYear() }, {
        onSuccess: () => {
            toast.success('Berhasil sinkronisasi data dari Kemenag');
            isSyncing.value = false;
        },
        onError: () => {
            toast.error('Gagal sinkronisasi data');
            isSyncing.value = false;
        }
    });
};

const openAddDialog = () => {
    editingHoliday.value = null;
    formName.value = '';
    formHijriDate.value = '';
    formGregorianDate.value = '';
    isFormOpen.value = true;
};

const openEditDialog = (holiday: Holiday) => {
    editingHoliday.value = holiday;
    formName.value = holiday.name;
    formHijriDate.value = holiday.hijri_date || '';
    // Normalize to YYYY-MM-DD for the date input
    formGregorianDate.value = holiday.gregorian_date.substring(0, 10);
    isFormOpen.value = true;
};

const openCopyDialog = (holiday: Holiday) => {
    copyingHoliday.value = holiday;
    copyTargetYear.value = String(new Date().getFullYear() + 1);
    isCopyOpen.value = true;
};

const saveHoliday = () => {
    if (!formName.value || !formGregorianDate.value) {
        toast.error('Nama dan tanggal masehi wajib diisi');
        return;
    }

    isSaving.value = true;
    const data = {
        name: formName.value,
        hijri_date: formHijriDate.value || null,
        gregorian_date: formGregorianDate.value,
    };

    if (editingHoliday.value) {
        router.put(`/hijri-holidays/${editingHoliday.value.id}`, data, {
            onSuccess: () => {
                toast.success('Hari besar berhasil diperbarui');
                isFormOpen.value = false;
                isSaving.value = false;
            },
            onError: () => {
                toast.error('Gagal memperbarui data');
                isSaving.value = false;
            },
        });
    } else {
        router.post('/hijri-holidays', data, {
            onSuccess: () => {
                toast.success('Hari besar berhasil ditambahkan');
                isFormOpen.value = false;
                isSaving.value = false;
            },
            onError: () => {
                toast.error('Gagal menambahkan data');
                isSaving.value = false;
            },
        });
    }
};

const duplicateHoliday = () => {
    if (!copyingHoliday.value || !copyTargetYear.value) return;

    router.post(`/hijri-holidays/${copyingHoliday.value.id}/duplicate`, {
        year: parseInt(copyTargetYear.value),
    }, {
        onSuccess: () => {
            toast.success(`Berhasil dicopy ke tahun ${copyTargetYear.value}`);
            isCopyOpen.value = false;
            copyingHoliday.value = null;
        },
        onError: () => {
            toast.error('Gagal mencopy data');
        },
    });
};

const openDeleteDialog = (holiday: Holiday) => {
    deletingHoliday.value = holiday;
    isDeleteOpen.value = true;
};

const confirmDelete = () => {
    if (!deletingHoliday.value) return;
    router.delete(`/hijri-holidays/${deletingHoliday.value.id}`, {
        onSuccess: () => {
            toast.success('Hari besar berhasil dihapus');
            isDeleteOpen.value = false;
            deletingHoliday.value = null;
        },
        onError: () => toast.error('Gagal menghapus data'),
    });
};

// Auto-refresh at midnight
let refreshInterval: ReturnType<typeof setInterval>;
onMounted(() => {
    refreshInterval = setInterval(() => {
        const now = new Date();
        if (now.getDate() !== currentTime.value.getDate()) {
            currentTime.value = now;
            router.reload({ only: ['holidays'] });
        }
    }, 60000);
});

onUnmounted(() => {
    if (refreshInterval) clearInterval(refreshInterval);
});

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Hari Besar Islam', href: '#' },
];
</script>

<template>

    <Head title="Hari Besar Islam" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-col gap-6 p-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold tracking-tight">Hari Besar Islam</h1>
                    <p class="text-muted-foreground">Kelola dan pantau hari-hari penting dalam kalender Hijriah.</p>
                </div>
                <div class="flex gap-2">
                    <Button variant="outline" @click="syncHolidays" :disabled="isSyncing">
                        <Loader2 v-if="isSyncing" class="mr-2 h-4 w-4 animate-spin" />
                        <RefreshCw v-else class="mr-2 h-4 w-4" />
                        Sync Kemenag
                    </Button>
                    <Button @click="openAddDialog">
                        <Plus class="mr-2 h-4 w-4" />
                        Tambah Manual
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Hari Besar</CardTitle>
                    <CardDescription>Daftar hari besar Islam yang dikelola.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Hari Besar</TableHead>
                                <TableHead>Hijriah</TableHead>
                                <TableHead>Masehi</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead class="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="holiday in holidays" :key="holiday.id">
                                <TableCell class="font-medium">{{ holiday.name }}</TableCell>
                                <TableCell>{{ holiday.hijri_date || '-' }}</TableCell>
                                <TableCell>
                                    {{ new Date(holiday.gregorian_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
                                </TableCell>
                                <TableCell>
                                    <span v-if="holiday.days_left === 0"
                                        class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                        Hari Ini
                                    </span>
                                    <span v-else-if="holiday.days_left > 0" class="text-sm font-medium text-blue-600">
                                        {{ holiday.days_left }} hari lagi
                                    </span>
                                    <span v-else class="text-sm font-medium text-red-500">
                                        {{ Math.abs(holiday.days_left) }} hari yang lalu
                                    </span>
                                </TableCell>
                                <TableCell class="text-right">
                                    <div class="flex justify-end gap-1">
                                        <Button variant="ghost" size="icon" title="Edit"
                                            @click="openEditDialog(holiday)">
                                            <Edit class="h-4 w-4 text-blue-600" />
                                        </Button>
                                        <Button variant="ghost" size="icon" title="Copy ke tahun lain"
                                            @click="openCopyDialog(holiday)">
                                            <Copy class="h-4 w-4 text-green-600" />
                                        </Button>
                                        <Button variant="ghost" size="icon" title="Hapus"
                                            @click="openDeleteDialog(holiday)">
                                            <Trash2 class="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow v-if="holidays.length === 0">
                                <TableCell colspan="5" class="h-24 text-center text-muted-foreground">
                                    Belum ada data. Klik tombol Sync untuk mengambil data dari Kemenag.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

        <!-- Form Dialog (Add / Edit) -->
        <Dialog v-model:open="isFormOpen">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{{ editingHoliday ? 'Edit Hari Besar' : 'Tambah Hari Besar' }}</DialogTitle>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                    <div class="grid gap-2">
                        <Label for="name">Nama Hari Besar</Label>
                        <Input id="name" v-model="formName" placeholder="Contoh: Idul Fitri" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="hijri">Tanggal Hijriah (Opsional)</Label>
                        <Input id="hijri" v-model="formHijriDate" placeholder="Contoh: 1 Syawal" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="date">Tanggal Masehi</Label>
                        <Input id="date" type="date" v-model="formGregorianDate" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" @click="isFormOpen = false">Batal</Button>
                    <Button @click="saveHoliday" :disabled="isSaving">
                        {{ editingHoliday ? 'Update' : 'Simpan' }}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <!-- Copy Dialog -->
        <Dialog v-model:open="isCopyOpen">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Copy ke Tahun Lain</DialogTitle>
                </DialogHeader>
                <div class="py-4">
                    <p class="mb-4 text-sm text-muted-foreground">
                        Copy "<strong>{{ copyingHoliday?.name }}</strong>" ke tahun:
                    </p>
                    <div class="grid gap-2">
                        <Label for="copyYear">Tahun Tujuan</Label>
                        <Input id="copyYear" type="number" v-model="copyTargetYear"
                            :min="new Date().getFullYear()" :max="2100" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" @click="isCopyOpen = false">Batal</Button>
                    <Button @click="duplicateHoliday">Copy</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <!-- Delete Confirmation Dialog -->
        <Dialog v-model:open="isDeleteOpen">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Hari Besar</DialogTitle>
                </DialogHeader>
                <div class="py-4">
                    <p class="text-sm text-muted-foreground">
                        Yakin ingin menghapus
                        <strong class="text-foreground">"{{ deletingHoliday?.name }}"</strong>?
                        Tindakan ini tidak dapat dibatalkan.
                    </p>
                </div>
                <DialogFooter>
                    <Button variant="outline" @click="isDeleteOpen = false">Batal</Button>
                    <Button variant="destructive" @click="confirmDelete">Hapus</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </AppLayout>
</template>
