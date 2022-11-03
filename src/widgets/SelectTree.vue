<script lang="ts" setup>
import type { NavEntity } from '@/types';
import { ref, watch } from 'vue';
import SelectTree from './SelectTree.vue';
import { Checkbox } from '@/components';

const props = withDefaults(
    defineProps<{
        options?: NavEntity[],
        selectedIds?: string[],
        deep?: number,
    }>(),
    {
        options: () => [],
        selectedIds: () => [],
        deep: 0,
    }
);

const selfSltIds = ref<string[]>([]);

const emits = defineEmits<{
    (e: 'change', selectIds: string[]): void
}>();

function handleChildrenChange(sltIds: string[]) {
    console.log(sltIds);
    // emits('change', updateSltId(selfSltIds.value, sltIds));
}

watch(() => props.selectedIds, () => {
    const ids = props.options
        .filter(opt => {
            return props.selectedIds.includes(opt.id);
        })
        .map(opt => {
            return opt.id;
        });

    console.log('@@@', props.deep);
    selfSltIds.value = ids;
}, { immediate: true });

watch(selfSltIds, () => {
    emits('change', selfSltIds.value.slice());
});
</script>

<template>
  <div class="select-tree">
    <!-- -->
    <ul>
        <li v-for="opt in options" :key="opt.id">
            <div>
              <Checkbox v-model="selfSltIds" :value="opt.id">
                {{ opt.label }} | {{ opt.id }}
              </Checkbox>
            </div>
            <SelectTree
                v-if="opt.children"
                :options="opt.children"
                :selected-ids="selectedIds"
                @change="handleChildrenChange"
                :deep="deep + 1">
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
