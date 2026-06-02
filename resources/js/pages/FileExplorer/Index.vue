<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import {
    File,
    FileArchive,
    FileImage,
    FileText,
    FileSpreadsheet,
    FileVideo,
    Folder,
    FolderOpen,
    FolderPlus,
    Download,
    Pencil,
    Trash2,
    Upload,
    ChevronRight,
    Plus,
    Code,
    Save,
    X,
} from 'lucide-vue-next';
import { ref, onMounted, computed } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
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

interface FileItem {
    name: string;
    path: string;
    type: 'file' | 'directory';
    size?: number;
    size_formatted?: string;
    extension?: string;
    modified?: string;
}

interface BreadcrumbItem {
    name: string;
    path: string;
}

const props = defineProps<{
    rootPath: string;
    baseName: string;
}>();

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'File Manager', href: '/file-explorer' }],
    },
});

// State
const items = ref<FileItem[]>([]);
const breadcrumbs = ref<BreadcrumbItem[]>([]);
const currentPath = ref('');
const loading = ref(false);
const selectedItem = ref<FileItem | null>(null);

// Rename dialog
const showRenameDialog = ref(false);
const renameValue = ref('');
const renamingItem = ref<FileItem | null>(null);

// Delete dialog
const showDeleteDialog = ref(false);
const deletingItem = ref<FileItem | null>(null);

// New folder dialog
const showNewFolderDialog = ref(false);
const newFolderName = ref('');

// Upload
const fileInput = ref<HTMLInputElement | null>(null);
const uploading = ref(false);
const dropActive = ref(false);

// Editor
const showEditorDialog = ref(false);
const editingFile = ref<FileItem | null>(null);
const editorContent = ref('');
const editorLoading = ref(false);
const editorSaving = ref(false);

const editableExtensions = [
    'txt', 'md', 'php', 'blade.php', 'js', 'ts', 'vue', 'jsx', 'tsx',
    'css', 'scss', 'less', 'sass', 'html', 'htm',
    'json', 'xml', 'yml', 'yaml', 'env', 'gitignore', 'log', 'sql',
    'sh', 'bash', 'py', 'rb', 'go', 'java', 'c', 'cpp', 'h', 'rs',
    'toml', 'ini', 'cfg', 'conf', 'twig', 'ps1', 'bat', 'lock',
];

function isEditable(item: FileItem): boolean {
    if (item.type !== 'file') return false;
    const name = item.name.toLowerCase();
    if (name.endsWith('.blade.php')) return true;
    if (name.endsWith('.gitignore')) return true;
    const ext = item.extension?.toLowerCase() || '';
    return editableExtensions.includes(ext);
}

function getEditorIcon(item: FileItem) {
    if (!isEditable(item)) return File;
    const ext = item.extension?.toLowerCase() || '';
    const codeExts = ['php', 'js', 'ts', 'vue', 'jsx', 'tsx', 'py', 'rb', 'go', 'java', 'c', 'cpp', 'rs', 'sh', 'bash', 'sql'];
    const markupExts = ['html', 'htm', 'css', 'scss', 'less', 'sass'];
    if (codeExts.includes(ext) || item.name.endsWith('.blade.php')) return Code;
    if (markupExts.includes(ext)) return Code;
    return FileText;
}

async function openEditor(item: FileItem) {
    editingFile.value = item;
    editorContent.value = '';
    showEditorDialog.value = true;
    editorLoading.value = true;
    try {
        const res = await fetch(`/file-explorer/read?path=${encodeURIComponent(item.path)}`);
        const data = await res.json();
        if (data.success) {
            editorContent.value = data.content;
        } else {
            showToast('Error: ' + (data.error || 'Failed to read file'));
            showEditorDialog.value = false;
        }
    } catch {
        showToast('Failed to read file');
        showEditorDialog.value = false;
    } finally {
        editorLoading.value = false;
    }
}

function closeEditor() {
    showEditorDialog.value = false;
    editingFile.value = null;
    editorContent.value = '';
}

async function saveEditor() {
    if (!editingFile.value) return;
    editorSaving.value = true;
    try {
        const res = await fetch('/file-explorer/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': (window as any).csrfToken },
            body: JSON.stringify({ path: editingFile.value.path, content: editorContent.value }),
        });
        const data = await res.json();
        if (data.success) {
            showToast('File saved');
            closeEditor();
        } else {
            showToast('Error: ' + (data.error || 'Save failed'));
        }
    } catch {
        showToast('Save failed');
    } finally {
        editorSaving.value = false;
    }
}

// Toast
const toastMessage = ref('');
const toastVisible = ref(false);
let toastTimer: ReturnType<typeof setTimeout>;

function showToast(msg: string) {
    toastMessage.value = msg;
    toastVisible.value = true;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toastVisible.value = false;
    }, 3000);
}

function getFileIcon(item: FileItem) {
    if (item.type === 'directory') return Folder;
    const ext = item.extension?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico'].includes(ext)) return FileImage;
    if (['mp4', 'avi', 'mov', 'mkv'].includes(ext)) return FileVideo;
    if (['xls', 'xlsx', 'csv'].includes(ext)) return FileSpreadsheet;
    if (['zip', 'rar', 'tar', 'gz', '7z'].includes(ext)) return FileArchive;
    if (['txt', 'md', 'log', 'yml', 'yaml', 'xml', 'json'].includes(ext)) return FileText;
    return File;
}

function getFileColor(item: FileItem) {
    if (item.type === 'directory') return 'text-blue-500';
    const ext = item.extension?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico'].includes(ext)) return 'text-pink-500';
    if (['php', 'blade.php'].some(e => item.name.endsWith(e))) return 'text-purple-500';
    if (['js', 'ts', 'vue'].includes(ext)) return 'text-yellow-600';
    if (['css', 'scss', 'less'].includes(ext)) return 'text-blue-400';
    if (['json', 'xml', 'yml', 'yaml'].includes(ext)) return 'text-green-600';
    return 'text-muted-foreground';
}

async function loadDirectory(path: string = '') {
    loading.value = true;
    try {
        const res = await fetch(`/file-explorer/list?path=${encodeURIComponent(path)}`);
        const data = await res.json();
        if (data.error) {
            showToast('Error: ' + data.error);
            return;
        }
        items.value = data.items;
        breadcrumbs.value = data.breadcrumbs;
        currentPath.value = data.currentPath;
    } catch (e: any) {
        showToast('Failed to load directory');
    } finally {
        loading.value = false;
    }
}

function navigateTo(path: string) {
    loadDirectory(path);
}

function navigateBreadcrumb(path: string) {
    loadDirectory(path);
}

function openItem(item: FileItem) {
    if (item.type === 'directory') {
        loadDirectory(item.path);
    }
}

function selectItem(item: FileItem) {
    selectedItem.value = selectedItem.value?.path === item.path ? null : item;
}

// Rename
function startRename(item: FileItem) {
    renamingItem.value = item;
    renameValue.value = item.name;
    showRenameDialog.value = true;
}

async function confirmRename() {
    if (!renamingItem.value || !renameValue.value.trim()) return;
    try {
        const res = await fetch('/file-explorer/rename', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': (window as any).csrfToken },
            body: JSON.stringify({ path: renamingItem.value.path, newName: renameValue.value.trim() }),
        });
        const data = await res.json();
        if (data.success) {
            showToast('Renamed successfully');
            showRenameDialog.value = false;
            loadDirectory(currentPath.value);
        } else {
            showToast('Error: ' + (data.error || 'Rename failed'));
        }
    } catch {
        showToast('Rename failed');
    }
}

// Delete
function confirmDelete(item: FileItem) {
    deletingItem.value = item;
    showDeleteDialog.value = true;
}

async function executeDelete() {
    if (!deletingItem.value) return;
    try {
        const res = await fetch('/file-explorer/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': (window as any).csrfToken },
            body: JSON.stringify({ path: deletingItem.value.path }),
        });
        const data = await res.json();
        if (data.success) {
            showToast('Deleted successfully');
            showDeleteDialog.value = false;
            deletingItem.value = null;
            loadDirectory(currentPath.value);
        } else {
            showToast('Error: ' + (data.error || 'Delete failed'));
        }
    } catch {
        showToast('Delete failed');
    }
}

// New Folder
async function createFolder() {
    if (!newFolderName.value.trim()) return;
    try {
        const res = await fetch('/file-explorer/create-folder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': (window as any).csrfToken },
            body: JSON.stringify({ path: currentPath.value, name: newFolderName.value.trim() }),
        });
        const data = await res.json();
        if (data.success) {
            showToast('Folder created');
            showNewFolderDialog.value = false;
            newFolderName.value = '';
            loadDirectory(currentPath.value);
        } else {
            showToast('Error: ' + (data.error || 'Failed'));
        }
    } catch {
        showToast('Failed to create folder');
    }
}

// Upload
function triggerUpload() {
    fileInput.value?.click();
}

async function handleUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    uploading.value = true;
    const formData = new FormData();
    formData.append('path', currentPath.value);
    for (const file of input.files) {
        formData.append('files[]', file);
    }

    try {
        const res = await fetch('/file-explorer/upload', {
            method: 'POST',
            headers: { 'X-CSRF-TOKEN': (window as any).csrfToken },
            body: formData,
        });
        const data = await res.json();
        if (data.success) {
            showToast(data.message);
            loadDirectory(currentPath.value);
        } else {
            showToast('Error: ' + (data.error || 'Upload failed'));
        }
    } catch {
        showToast('Upload failed');
    } finally {
        uploading.value = false;
        input.value = '';
    }
}

// Drag & drop upload
async function handleDrop(event: DragEvent) {
    dropActive.value = false;
    if (!event.dataTransfer?.files.length) return;

    uploading.value = true;
    const formData = new FormData();
    formData.append('path', currentPath.value);
    for (const file of event.dataTransfer.files) {
        formData.append('files[]', file);
    }

    try {
        const res = await fetch('/file-explorer/upload', {
            method: 'POST',
            headers: { 'X-CSRF-TOKEN': (window as any).csrfToken },
            body: formData,
        });
        const data = await res.json();
        if (data.success) {
            showToast(data.message);
            loadDirectory(currentPath.value);
        } else {
            showToast('Error: ' + (data.error || 'Upload failed'));
        }
    } catch {
        showToast('Upload failed');
    } finally {
        uploading.value = false;
    }
}

// Download
function downloadItem(item: FileItem) {
    if (item.type === 'file') {
        window.open(`/file-explorer/download?path=${encodeURIComponent(item.path)}`, '_blank');
    }
}

// Format modified
function formatDate(dateStr?: string) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

onMounted(() => {
    loadDirectory();
});

// Set CSRF token from meta tag
onMounted(() => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    if (meta) {
        (window as any).csrfToken = meta.getAttribute('content');
    }
});
</script>

<template>
    <Head title="File Manager" />

    <div class="flex h-full flex-1 flex-col gap-4 p-4">
        <!-- Toolbar -->
        <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-1 text-sm text-muted-foreground">
                <FolderOpen class="h-4 w-4" />
                <template v-for="(crumb, i) in breadcrumbs" :key="i">
                    <button
                        v-if="i > 0"
                        class="mx-1 text-muted-foreground/50"
                        disabled
                    >
                        <ChevronRight class="h-3 w-3" />
                    </button>
                    <button
                        :class="[
                            'rounded px-1.5 py-0.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                            i === breadcrumbs.length - 1 ? 'font-medium text-foreground' : ''
                        ]"
                        @click="navigateBreadcrumb(crumb.path)"
                    >
                        {{ crumb.name }}
                    </button>
                </template>
            </div>

            <div class="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" class="gap-1.5" @click="showNewFolderDialog = true">
                    <FolderPlus class="h-4 w-4" />
                    <span class="hidden sm:inline">Folder Baru</span>
                </Button>
                <Button variant="outline" size="sm" class="gap-1.5" @click="triggerUpload" :disabled="uploading">
                    <Upload class="h-4 w-4" />
                    <span class="hidden sm:inline">{{ uploading ? 'Uploading...' : 'Upload' }}</span>
                </Button>
                <input
                    ref="fileInput"
                    type="file"
                    multiple
                    class="hidden"
                    @change="handleUpload"
                />
            </div>
        </div>

        <!-- Drop zone indicator -->
        <div
            v-if="dropActive"
            class="pointer-events-none absolute inset-0 z-50 flex items-center justify-center rounded-lg border-2 border-dashed border-primary bg-primary/5"
        >
            <div class="text-center">
                <Upload class="mx-auto h-10 w-10 text-primary" />
                <p class="mt-2 text-sm font-medium text-primary">Drop files here</p>
            </div>
        </div>

        <!-- File List -->
        <Card
            class="flex-1"
            @dragover.prevent="dropActive = true"
            @dragleave="dropActive = false"
            @drop.prevent="handleDrop"
        >
            <CardHeader class="border-b px-4 py-3">
                <div class="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground">
                    <span class="col-span-6 sm:col-span-5">Name</span>
                    <span class="col-span-3 hidden sm:block">Size</span>
                    <span class="col-span-3 hidden sm:block">Modified</span>
                    <span class="col-span-1"></span>
                </div>
            </CardHeader>
            <CardContent class="p-0">
                <!-- Loading -->
                <div v-if="loading" class="flex items-center justify-center py-16">
                    <div class="flex items-center gap-2 text-sm text-muted-foreground">
                        <div class="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                        Loading...
                    </div>
                </div>

                <!-- Empty -->
                <div v-else-if="items.length === 0" class="py-16 text-center text-sm text-muted-foreground">
                    <FolderOpen class="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
                    Folder ini kosong
                </div>

                <!-- Items -->
                <div v-else class="divide-y">
                    <div
                        v-for="item in items"
                        :key="item.path"
                        :class="[
                            'grid cursor-pointer grid-cols-12 gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-accent/50',
                            selectedItem?.path === item.path ? 'bg-accent' : ''
                        ]"
                        @click="selectItem(item)"
                        @dblclick="openItem(item)"
                    >
                        <!-- Name -->
                        <div class="col-span-6 flex items-center gap-2 truncate sm:col-span-5">
                            <component
                                :is="getFileIcon(item)"
                                :class="['h-4 w-4 shrink-0', getFileColor(item)]"
                            />
                            <span
                                :class="[
                                    'truncate',
                                    item.type === 'directory' ? 'font-medium' : ''
                                ]"
                                :title="item.name"
                            >
                                {{ item.name }}
                            </span>
                        </div>

                        <!-- Size -->
                        <div class="col-span-3 hidden items-center text-muted-foreground sm:flex">
                            {{ item.type === 'directory' ? '—' : item.size_formatted }}
                        </div>

                        <!-- Modified -->
                        <div class="col-span-3 hidden items-center text-muted-foreground sm:flex">
                            {{ formatDate(item.modified) }}
                        </div>

                        <!-- Actions -->
                        <div class="col-span-1 flex items-center justify-end gap-0.5">
                            <button
                                v-if="item.type === 'file' && isEditable(item)"
                                class="rounded p-1 text-blue-500/70 transition-colors hover:bg-blue-500/10 hover:text-blue-600"
                                title="Open"
                                @click.stop="openEditor(item)"
                            >
                                <component :is="getEditorIcon(item)" class="h-3.5 w-3.5" />
                            </button>
                            <button
                                v-if="item.type === 'file'"
                                class="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                title="Download"
                                @click.stop="downloadItem(item)"
                            >
                                <Download class="h-3.5 w-3.5" />
                            </button>
                            <button
                                class="rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                title="Rename"
                                @click.stop="startRename(item)"
                            >
                                <Pencil class="h-3.5 w-3.5" />
                            </button>
                            <button
                                class="rounded p-1 text-destructive/70 transition-colors hover:bg-destructive/10 hover:text-destructive"
                                title="Delete"
                                @click.stop="confirmDelete(item)"
                            >
                                <Trash2 class="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>

    <!-- Rename Dialog -->
    <Dialog v-model:open="showRenameDialog">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Rename</DialogTitle>
                <DialogDescription>
                    {{ renamingItem?.type === 'directory' ? 'Folder' : 'File' }}: {{ renamingItem?.name }}
                </DialogDescription>
            </DialogHeader>
            <Input v-model="renameValue" @keyup.enter="confirmRename" />
            <DialogFooter>
                <DialogClose as-child>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button @click="confirmRename">Rename</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

    <!-- Delete Dialog -->
    <Dialog v-model:open="showDeleteDialog">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Hapus</DialogTitle>
                <DialogDescription>
                    Apakah Anda yakin ingin menghapus
                    <strong>{{ deletingItem?.type === 'directory' ? 'folder' : 'file' }}</strong>
                    <strong class="text-destructive">"{{ deletingItem?.name }}"</strong>?
                    Tindakan ini tidak dapat dibatalkan.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose as-child>
                    <Button variant="outline">Batal</Button>
                </DialogClose>
                <Button variant="destructive" @click="executeDelete">Hapus</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

    <!-- New Folder Dialog -->
    <Dialog v-model:open="showNewFolderDialog">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Folder Baru</DialogTitle>
                <DialogDescription>
                    Masukkan nama folder baru di: <strong>{{ currentPath || props.baseName }}</strong>
                </DialogDescription>
            </DialogHeader>
            <Input v-model="newFolderName" placeholder="nama folder" @keyup.enter="createFolder" />
            <DialogFooter>
                <DialogClose as-child>
                    <Button variant="outline">Batal</Button>
                </DialogClose>
                <Button @click="createFolder" :disabled="!newFolderName.trim()">
                    <Plus class="mr-1 h-4 w-4" />
                    Buat
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

    <!-- Editor Dialog -->
    <Dialog v-model:open="showEditorDialog" :dismissable="false">
        <DialogContent class="max-w-[95vw] sm:max-w-[90vw] lg:max-w-[85vw]">
            <DialogHeader>
                <DialogTitle class="flex items-center gap-2">
                    <component
                        :is="editingFile ? getEditorIcon(editingFile) : File"
                        class="h-4 w-4"
                    />
                    <span class="truncate font-mono text-sm">{{ editingFile?.name }}</span>
                    <span class="truncate text-xs text-muted-foreground font-mono" v-if="editingFile">
                        {{ editingFile.path }}
                    </span>
                </DialogTitle>
                <DialogDescription>
                    Edit file — perubahan langsung tersimpan ke server
                </DialogDescription>
            </DialogHeader>

            <!-- Loading -->
            <div v-if="editorLoading" class="flex items-center justify-center py-16">
                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                    <div class="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                    Loading file content...
                </div>
            </div>

            <!-- Editor -->
            <textarea
                v-else
                v-model="editorContent"
                class="flex min-h-[400px] w-full resize-y rounded-lg border bg-background p-3 font-mono text-sm leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring"
                spellcheck="false"
            ></textarea>

            <DialogFooter>
                <Button variant="outline" @click="closeEditor" :disabled="editorSaving">
                    <X class="mr-1 h-4 w-4" />
                    Cancel
                </Button>
                <Button @click="saveEditor" :disabled="editorLoading || editorSaving">
                    <Save class="mr-1 h-4 w-4" />
                    {{ editorSaving ? 'Saving...' : 'Save' }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

    <!-- Toast -->
    <Teleport to="body">
        <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="translate-y-2 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-2 opacity-0"
        >
            <div
                v-if="toastVisible"
                class="fixed bottom-6 right-6 z-[100] rounded-lg border bg-card px-4 py-3 shadow-lg"
            >
                <p class="text-sm font-medium">{{ toastMessage }}</p>
            </div>
        </Transition>
    </Teleport>
</template>
