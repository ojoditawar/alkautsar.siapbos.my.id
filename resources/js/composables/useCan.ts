import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import type { Auth } from '@/types';

export function useCan() {
    const page = usePage();
    const auth = computed(() => page.props.auth as Auth);
    const isAdmin = computed(() => auth.value.roles.includes('Admin'));

    function can(permission: string): boolean {
        return isAdmin.value || auth.value.permissions.includes(permission);
    }

    function canAny(permissions: string[]): boolean {
        return permissions.some((p) => can(p));
    }

    function canAll(permissions: string[]): boolean {
        return permissions.every((p) => can(p));
    }

    return { can, canAny, canAll, isAdmin };
}
