<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import {
    BookMarked,
    BookOpen,
    BookText,
    ChevronLeft,
    ChevronRight,
    FileSpreadsheet,
    FileBarChart2,
    FolderGit2,
    KeyRound,
    Landmark,
    LayoutGrid,
    Receipt,
    Shield,
    Users,
} from 'lucide-vue-next';
import { computed } from 'vue';
import AppLogo from '@/components/AppLogo.vue';
import NavFooter from '@/components/NavFooter.vue';
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
    useSidebar,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { Auth, NavItem } from '@/types';

const page = usePage();
const auth = computed(() => page.props.auth as Auth);

const { state, toggleSidebar, isMobile } = useSidebar();

const isAdmin = computed(() => auth.value.roles.includes('Admin'));

function can(permission: string): boolean {
    return isAdmin.value || auth.value.permissions.includes(permission);
}

const allNavItems: (NavItem & { permission?: string })[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
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
];

const mainNavItems = computed<NavItem[]>(() =>
    allNavItems.filter((item) => !item.permission || can(item.permission)),
);
</script>

<template>
    <Sidebar collapsible="offcanvas" variant="inset">
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
            <NavFooter :items="footerNavItems" />
            <NavUser />
        </SidebarFooter>
    </Sidebar>

    <!-- Floating arrow toggle button (desktop only) -->
    <button
        v-if="!isMobile"
        class="fixed top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-md transition-[left,background-color,color,border-color,box-shadow] duration-200 ease-linear hover:border-green-500 hover:bg-green-600 hover:text-white hover:shadow-green-500/40 focus:border-green-500 focus:bg-green-600 focus:text-white focus:shadow-green-500/40 focus:outline-none"
        :style="{
            left:
                state === 'expanded'
                    ? 'calc(var(--sidebar-width) - 12px)'
                    : '4px',
        }"
        @click="toggleSidebar"
    >
        <ChevronLeft v-if="state === 'expanded'" class="h-4 w-4" />
        <ChevronRight v-else class="h-4 w-4" />
    </button>

    <slot />
</template>
