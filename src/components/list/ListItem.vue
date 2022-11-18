<script lang="ts" setup>
import type { ListOperatorOption } from './types';

const props = withDefaults(
    defineProps<{
        operators?: ListOperatorOption[],
        maxOutCount?: number,
        disabled?: boolean,
        variables?: any
    }>(),
    {
        maxOutCount: 1,
        operators: () => [],
        disabled: false,
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
    <div class="i-list-item" :class="{ disabled }">
        <!-- -->
        <slot v-bind="variables" />
        <div class="ili-operator-container">
            <div
                class="ili-operator"
                v-for="(outer, i) in outerOperators"
                :key="i"
                @click="handleClick(outer)">
                <TextHoverable size="sm" color="regular">
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
    </div>
</template>

<style lang="scss">
.i-list-item {
    position: relative;
    border-bottom: var(--el-border);
    padding: $gap-md;
    &:hover {
        background-color: var(--el-color-info-light-9);
    }

    &.disabled {
        opacity: 0.6;
    }
}

.ili-operator-container {
    position: absolute;
    bottom: $gap-xs;
    right: $gap-lg;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: $gap-xs;
}
</style>
