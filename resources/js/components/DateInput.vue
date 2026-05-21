<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import type { HTMLAttributes } from 'vue';
import { ref } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
    defaultValue?: string;
    modelValue?: string;
    class?: HTMLAttributes['class'];
    disabled?: boolean;
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', payload: string): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
});

const inputRef = ref<HTMLInputElement | null>(null);

function openPicker() {
    if (props.disabled) {
        return;
    }

    try {
        inputRef.value?.showPicker();
    } catch {
        // showPicker() may be blocked in certain browser contexts; silently ignore
    }
}
</script>

<template>
    <input
        ref="inputRef"
        v-model="modelValue"
        type="date"
        data-slot="input"
        :disabled="disabled"
        :class="
            cn(
                'h-9 w-full min-w-0 cursor-pointer rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground dark:bg-input/30',
                'placeholder:text-muted-foreground',
                'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                'md:text-sm',
                props.class,
            )
        "
        @click="openPicker"
    />
</template>
