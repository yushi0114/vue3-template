<script lang="ts" setup>
import type { ListOperatorOption } from './types';

const props = withDefaults(
    defineProps<{
        operators?: ListOperatorOption[],
        maxOutCount?: number,
    }>(),
    {
        maxOutCount: 0,
        operators: () => [],
    }
);

const emits = defineEmits<{
    (e: 'operate', opt: ListOperatorOption): void
}>();

const outerOperators = computed(() => props.operators.slice(0, props.maxOutCount));
const innerOperators = computed(() => props.operators.slice(props.maxOutCount));

function handleClick(opt: ListOperatorOption) {
    if (opt.disabled) return;
    emits('operate', opt);
}
</script>

<template>
  <div class="i-list-operator">
    <!-- -->
    <div
        :class="['ili-operator', outer.disabled && 'cursor-not-allowed']"
        v-for="(outer, i) in outerOperators"
        :key="i">
        <TextHoverable size="sm" :color="outer.disabled ? 'disabled' : 'regular'" @click="handleClick(outer)">
            <Icon v-if="outer.icon" :name="outer.icon"/> {{ outer.name }}
        </TextHoverable>
    </div>
    <div class="ili-operator" v-if="innerOperators.length > 0">
        <el-dropdown>
            <TextHoverable size="sm" color="regular">
                更多
            </TextHoverable>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        v-for="(inner, i) in innerOperators"
                        :key="i"
                        @click="handleClick(inner)"
                        :disabled="inner.disabled"
                    >
                        <Icon v-if="inner.icon" :name="inner.icon"/> {{ inner.name }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss">
.i-list-operator {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: $gap-xs;
  position: absolute;
  bottom: $gap-xs;
  right: $gap-lg;
}
</style>
