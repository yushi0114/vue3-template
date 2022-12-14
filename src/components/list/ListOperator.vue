<script lang="ts" setup>
import type { ItemOperate, ListOperatorOption } from './types';

const props = withDefaults(
    defineProps<{
        operators?: ListOperatorOption[],
        maxOutCount?: number,
        fixed?: boolean,
    }>(),
    {
        maxOutCount: 99,
        operators: () => [],
        fixed: false,
    }
);

const emits = defineEmits<{
    (e: 'operate', opt: ListOperatorOption): void
    (e: keyof typeof ItemOperate, opt: ListOperatorOption): void

}>();

const outerOperators = computed(() => props.operators.slice(0, props.maxOutCount));
const innerOperators = computed(() => props.operators.slice(props.maxOutCount));

function handleClick(opt: ListOperatorOption) {
    if (opt.disabled) return;
    emits('operate', opt);
    emits(opt.value, opt);
}
</script>

<template>
    <FlexRow class="i-list-operator" horizontal="center" gap="md" :class="{ fixed }">
        <!-- -->
        <div :class="['ili-operator', outer.disabled && 'cursor-not-allowed']" v-for="(outer, i) in outerOperators"
            :key="i">
            <el-tooltip
                effect="dark"
                :content="outer.name"
                placement="top"
            >
                <CircleOptBtn size="lg" :disabled="outer.disabled"  @click="handleClick(outer)">
                    <Icon :name="(outer.icon || 'ep-search')" />
                </CircleOptBtn>
                <!-- <TextHoverable size="sm" :color="outer.disabled ? 'disabled' : 'regular'" @click="handleClick(outer)">
                </TextHoverable> -->
            </el-tooltip>
        </div>
        <div class="ili-operator" v-if="innerOperators.length > 0">
            <el-tooltip
                effect="dark"
                content="更多"
                placement="top"
            >
                <el-dropdown>
                    <CircleOptBtn size="lg">
                        <i-ep-more class="ili-more" />
                    </CircleOptBtn>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="(inner, i) in innerOperators" :key="i" @click="handleClick(inner)"
                                :disabled="inner.disabled">
                                <FlexRow gap="xs">
                                    <Icon :name="(inner.icon || 'ep-search')" /> {{ inner.name }}
                                </FlexRow>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-tooltip>
        </div>
    </FlexRow>
</template>

<style lang="scss">
.i-list-operator {

    &.fixed {
        position: absolute;
        bottom: $gap-xs;
        right: $gap-lg;
    }

    & .ili-icon {

    }
    & .ili-more {
        transform: rotateZ(90deg) scale(0.8);
    }
}
</style>
