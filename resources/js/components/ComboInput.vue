<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    modelValue: string;
    suggestions: string[];
    placeholder?: string;
    listId?: string;
}>();

defineEmits<{
    'update:modelValue': [value: string];
}>();

const datalistId = computed(() => props.listId ?? `dl-${Math.random().toString(36).slice(2, 9)}`);
</script>

<template>
    <div>
        <input :value="modelValue" :placeholder="placeholder" :list="datalistId"
            class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
        <datalist :id="datalistId">
            <option v-for="item in suggestions" :key="item" :value="item" />
        </datalist>
    </div>
</template>
