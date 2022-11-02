<script lang="ts" setup>
import type { NavEntity } from '@/types';
import { ref, watch } from 'vue';
import SelectTree from './SelectTree.vue';
import { arrayAdd, curry } from '@/utils';

const props = withDefaults(
    defineProps<{
        options?: NavEntity[],
        selectedIds?: string[],
    }>(),
    {
        options: () => [],
        selectedIds: () => [],
    }
);

const selfSltIds = ref<string[]>([]);

const emits = defineEmits<{
    (e: 'change', selectIds: string[]): void
}>();

const updateSltId = curry(arrayAdd, undefined);

function handleChange(sltIds: string[]) {
    emits('change', updateSltId(selfSltIds.value, sltIds));
}

watch(props.options, () => {

});
</script>

<template>
  <div class="select-tree">
    <!-- -->
    <ul>
        <li v-for="opt in options" :key="opt.id">
            <div>{{ opt.label }}</div>
            <SelectTree
                v-if="opt.children"
                :options="opt.children"
                @change="handleChange"
                :selected-ids="selectedIds">
            </SelectTree>
        </li>
    </ul>
  </div>
</template>

<style lang="postcss">
.select-tree {

  & & {
    @apply pl-6;
  }
}
</style>
