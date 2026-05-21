<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { ChevronDown } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import type { NavItem } from '@/types';

const props = defineProps<{
    items: NavItem[];
}>();

const { isCurrentUrl } = useCurrentUrl();

const STORAGE_KEY = 'sidebar-collapsed-groups';

function loadCollapsedState(): Record<string, boolean> {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}

function saveCollapsedState(state: Record<string, boolean>) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // ignore
    }
}

const collapsedGroups = ref<Record<string, boolean>>(loadCollapsedState());

function toggleGroup(label: string) {
    collapsedGroups.value[label] = !collapsedGroups.value[label];
    saveCollapsedState(collapsedGroups.value);
}

function isCollapsed(label: string): boolean {
    return !!collapsedGroups.value[label];
}

function onEnter(el: Element) {
    const htmlEl = el as HTMLElement;
    htmlEl.style.height = '0';
    htmlEl.style.overflow = 'hidden';
    requestAnimationFrame(() => {
        htmlEl.style.height = htmlEl.scrollHeight + 'px';
    });
}

function onAfterEnter(el: Element) {
    const htmlEl = el as HTMLElement;
    htmlEl.style.height = '';
    htmlEl.style.overflow = '';
}

function onLeave(el: Element) {
    const htmlEl = el as HTMLElement;
    htmlEl.style.height = htmlEl.scrollHeight + 'px';
    htmlEl.style.overflow = 'hidden';
    requestAnimationFrame(() => {
        htmlEl.style.height = '0';
    });
}

const groupedItems = computed(() => {
    const groups: { label: string; items: NavItem[] }[] = [];
    const map = new Map<string, NavItem[]>();

    for (const item of props.items) {
        const key = item.group ?? 'Platform';

        if (!map.has(key)) {
            map.set(key, []);
            groups.push({ label: key, items: map.get(key)! });
        }

        map.get(key)!.push(item);
    }

    return groups;
});
</script>

<template>
    <SidebarGroup
        v-for="group in groupedItems"
        :key="group.label"
        class="px-2 py-0"
    >
        <SidebarGroupLabel
            as="button"
            class="w-full cursor-pointer select-none hover:text-sidebar-foreground"
            @click="toggleGroup(group.label)"
        >
            <span class="flex-1 text-left">{{ group.label }}</span>
            <ChevronDown
                class="ml-auto h-4 w-4 shrink-0 transition-transform duration-200"
                :class="{ '-rotate-90': isCollapsed(group.label) }"
            />
        </SidebarGroupLabel>

        <Transition
            name="collapsible"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @leave="onLeave"
        >
            <SidebarMenu v-show="!isCollapsed(group.label)">
                <SidebarMenuItem v-for="item in group.items" :key="item.title">
                    <SidebarMenuButton
                        as-child
                        :is-active="isCurrentUrl(item.href)"
                        :tooltip="item.title"
                    >
                        <Link :href="item.href">
                            <component :is="item.icon" />
                            <span>{{ item.title }}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </Transition>
    </SidebarGroup>
</template>

<style scoped>
.collapsible-enter-active,
.collapsible-leave-active {
    transition:
        height 0.2s ease,
        opacity 0.2s ease;
    overflow: hidden;
}

.collapsible-enter-from,
.collapsible-leave-to {
    height: 0 !important;
    opacity: 0;
}
</style>
