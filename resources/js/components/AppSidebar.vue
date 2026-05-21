<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import {
    BookMarked,
    BookText,
    Calendar,
    FileSpreadsheet,
    FileBarChart2,
    FileCheck2,
    KeyRound,
    Landmark,
    LayoutGrid,
    Megaphone,
    Image,
    Mic2,
    Monitor,
    Moon,
    Receipt,
    Settings,
    Shield,
    Sun,
    Users,
} from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue'; // --- UBAH: Tambah onMounted & ref ---
import AppLogo from '@/components/AppLogo.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { Auth, NavItem } from '@/types';

const page = usePage();
const auth = computed(() => page.props.auth as Auth);

const isAdmin = computed(() => auth.value.roles.includes('Admin'));

function can(permission: string): boolean {
    return isAdmin.value || auth.value.permissions.includes(permission);
}

// --- BAGIAN BARU: Logika Dark Mode ---
const theme = ref('light');

onMounted(() => {
    // Cek tema di awal saat halaman dimuat
    if (
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        theme.value = 'dark';
        document.documentElement.classList.add('dark');
    } else {
        theme.value = 'light';
        document.documentElement.classList.remove('dark');
    }
});

const toggleTheme = () => {
    if (theme.value === 'light') {
        theme.value = 'dark';
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
    } else {
        theme.value = 'light';
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
    }
};
// ------------------------------------

const allNavItems: (NavItem & { permission?: string })[] = [
    // {
    //     title: 'Beranda',
    //     href: '/beranda',
    //     icon: Home,
    // },
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Monitor',
        href: '/monitor',
        icon: Monitor,
    },
    {
        group: 'Konten',
        title: 'Config Monitor',
        href: '/monitor-config',
        icon: Settings,
    },
    {
        title: 'Users',
        href: '/users',
        icon: Users,
        permission: 'manage-users',
    },
    {
        group: 'Referensi',
        title: 'Masjid',
        href: '/masjids',
        icon: Landmark,
        permission: 'manage-masjids',
    },
    {
        group: 'Referensi',
        title: 'Rekening',
        href: '/reks',
        icon: BookText,
        permission: 'manage-reks',
    },
    {
        group: 'Referensi',
        title: 'Program',
        href: '/programs',
        icon: BookMarked,
        permission: 'manage-programs',
    },
    {
        group: 'Manajemen Akses',
        title: 'Roles',
        href: '/roles',
        icon: Shield,
        permission: 'manage-roles',
    },
    {
        group: 'Manajemen Akses',
        title: 'Permissions',
        href: '/permissions',
        icon: KeyRound,
        permission: 'manage-permissions',
    },
    {
        group: 'Keuangan',
        title: 'Transaksi',
        href: '/transaksis',
        icon: Receipt,
        permission: 'manage-transaksis',
    },
    {
        group: 'Keuangan',
        title: 'Laporan Buku Besar',
        href: '/laporan-buku-besar',
        icon: FileSpreadsheet,
        permission: 'manage-laporan-buku-besar',
    },
    {
        group: 'Keuangan',
        title: 'Laporan Neraca',
        href: '/laporan-neraca',
        icon: FileBarChart2,
        permission: 'manage-laporan-neraca',
    },
    {
        group: 'Keuangan',
        title: 'Validasi Buku Besar',
        href: '/validasi-buku-besar',
        icon: FileCheck2,
        permission: 'manage-validasi-buku-besar',
    },
    {
        group: 'Konten',
        title: 'Running Text',
        href: '/running-texts',
        icon: Megaphone,
        permission: 'manage-running-texts',
    },
    {
        group: 'Konten',
        title: 'Kajian',
        href: '/kajians',
        icon: Mic2,
        permission: 'manage-kajians',
    },
    {
        group: 'Konten',
        title: 'Gambar Mutiara',
        href: '/mutiara-images',
        icon: Image,
        permission: 'Admin',
    },
    {
        group: 'Konten',
        title: 'Pekurban',
        href: '/pekurbans',
        icon: Calendar,
        permission: 'manage-pekurbans',
    },
    {
        group: 'Konten',
        title: 'Jadwal Imam',
        href: '/jadwal-imams',
        icon: BookText,
        permission: 'manage-jadwal-imams',
    },
    {
        group: 'Konten',
        title: 'Khotib',
        href: '/khotib-jumat',
        icon: BookText,
        permission: 'manage-jadwal-khotibs',
    },
    {
        group: 'Konten',
        title: 'Hari Besar Islam',
        href: '/hijri-holidays',
        icon: Calendar,
        permission: 'manage-hijri-holidays',
    },
];

const mainNavItems = computed<NavItem[]>(() =>
    allNavItems.filter((item) => !item.permission || can(item.permission)),
);
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="dashboard()">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <div class="flex flex-col gap-2">
                <NavUser />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Ganti Tema"
                            @click="toggleTheme"
                        >
                            <Sun
                                v-if="theme === 'dark'"
                                class="h-4 w-4 text-yellow-500"
                            />
                            <Moon v-else class="h-4 w-4" />
                            <span>{{
                                theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'
                            }}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </div>
        </SidebarFooter>
    </Sidebar>

    <slot />
</template>
