<script lang="ts" setup>
import { Brush, Warning } from '@element-plus/icons-vue';
import { onKeyStroke, useVModel } from '@vueuse/core';
import type { PlainOption } from '@/types';
import type { ControlOptionConfig } from './ListQueryControl.vue';

const props = withDefaults(
    defineProps<{
        menu?: ControlOptionConfig[];
        modelValue: any;
        multiple?: boolean;
        multipleFields?: string[];
    }>(),
    {
        modelValue: {},
        multiple: false,
        multipleFields: () => [],
    }
);

const emits = defineEmits<{
    (e: 'change'): void;
    (e: 'update:modelValue'): void;
}>();

const model = useVModel(props, 'modelValue', emits);

const isCtrlKeep = ref(false);
// 监听ctrl键按下！
onKeyStroke(
    'Control',
    (e) => {
        e.preventDefault();
        isCtrlKeep.value = true;
    },
    { eventName: 'keydown' }
);

// 监听Ctrl键松开！
onKeyStroke(
    'Control',
    (e) => {
        e.preventDefault();
        isCtrlKeep.value = false;
    },
    { eventName: 'keyup' }
);

const handleMenuItemClick = (item: PlainOption<any>, field: string) => {
    // fix by songxiwen 2022/12/14
    if (props.multipleFields?.includes(field)) {
        if (isCtrlKeep.value && Array.isArray(model.value[field])) {
            if (model.value[field].includes(item.value)) {
                model.value[field] = model.value[field].filter((innerItem: any) => innerItem !== item.value);
            } else {
                model.value[field].push(item.value);
            }
        } else {
            if (Array.isArray(model.value[field]) && model.value[field].length === 1 && model.value[field].includes(item.value)) {
                model.value[field] = '';
            } else {
                model.value[field] = [item.value];
            }
        }
    } else {
        model.value[field] = model.value[field] === item.value ? '' : item.value;
    }
    /**
     * // 多选筛选处理
     *     if (isCtrlKeep.value && props.multipleFields?.includes(field)) {
     *         // 点击添加筛选添加
     *         if (!model.value[field]?.toString().includes(item.value)) {
     *             model.value[field] = model.value[field] ? `${model.value[field]},${item.value}` : item.value;
     *             return;
     *         }
     *         // 再次点击删除筛选条件
     *         model.value[field] = model.value[field].replace(item.value + ',', '');
     *         return;
     *     }
     *     model.value[field] = model.value[field] === item.value ? '' : item.value;
     */
    emits('change');
};

const getActiveOption = computed(() => {
    return (field: string, menuItem: PlainOption<any>) => {
        return model.value?.[field]?.toString().includes(menuItem.value) ? 'primary' : '';
    };
});

const clearFilterOptions = () => {
    props.menu?.forEach((item) => {
        model.value[item.field] = '';
    });
    emits('change');
};
// 过滤器初始展开值
const initialActiveNames = Object.entries(model.value).map(([key]) => key) ?? [];
const activeNames = ref(initialActiveNames);
watch(isCtrlKeep, (newValue) => {
    if (!newValue) {
        emits('change');
    }
});
</script>

<template>
    <div class="list-menu">
        <FlexRow horizontal="between" class="lm-header">
            <Text
                size="sm"
                color="regular">
                <FlexRow gap="xs">
                    <span>过滤器</span>
                    <el-tooltip
                        content="按住Ctrl+Click可多选"
                        placement="top">
                        <el-icon
                            class="lm-tooltip">
                            <Warning/>
                        </el-icon>
                    </el-tooltip>
                </FlexRow>
            </Text>
            <FlexRow
                class="lm-clear"
                @click.stop="clearFilterOptions">
                <TextHoverable
                    color="regular"
                    size="xs"
                >
                    <FlexRow gap="line">
                        <el-icon>
                            <Brush/>
                        </el-icon
                        >
                        清空过滤项
                    </FlexRow
                    >
                </TextHoverable
                >
            </FlexRow>
        </FlexRow>
        <el-divider></el-divider>
        <el-collapse
            class="lm-content"
            v-model="activeNames">
            <el-collapse-item
                :name="subMenu.field"
                v-for="subMenu in menu"
                :key="subMenu.field">
                <template #title>
                    <Text
                        color="regular"
                        size="sm"
                    >{{ subMenu.label }}
                    </Text
                    >
                </template>
                <el-button
                    class="lm-button"
                    v-for="menuItem in subMenu.options"
                    :key="menuItem.value"
                    text
                    :type="getActiveOption(subMenu.field, menuItem)"
                    @click="handleMenuItemClick(menuItem, subMenu.field)"
                >
                    <Text
                        color="current"
                        size="xs"
                    >{{ menuItem.name }}
                    </Text
                    >
                </el-button>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<style lang="scss" scoped>
.list-menu {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &-title {
        gap: $gap-line;
    }

    & .lm-header {
        height: 40px;
        border-radius: 4px;
        padding: 0 $gap-xs;
        margin-left: -$gap-xs;
        margin-right: -$gap-xs;
        background-color: $color-info-light-9;
    }

    & .lm-clear {
        cursor: pointer;
    }

    & .lm-content {
        overflow-x: hidden;
        flex: 1;
        overflow-y: auto;
        border-right-style: none !important;
    }

    & .lm-button {
        width: 100%;
        justify-content: flex-start;
    }

    & .lm-tooltip {
        cursor: pointer;
        margin-top: $gap-line;
        color: var(--i-text-color-regular);
    }

    .el-divider {
        margin-top: $gap-md;
        margin-bottom: $gap-xs;
    }

    :deep(.el-button + .el-button) {
        margin-left: 0;
    }

    :deep(.el-button.el-button--primary) {
        background-color: $color-primary-light-9;
        color: $color-primary;

        &:focus {
            background-color: $color-primary-light-9;
            color: $color-primary;
        }
    }

    :deep(.el-collapse-item__arrow) {
        margin-right: 0;
        transform: rotateZ(90deg);
        color: $color-primary-light-5;

        &.is-active {
            transform: rotateZ(-90deg);
        }
    }

    :deep(.el-button) {
        &:hover {
            background-color: $color-primary-light-9;
            color: $color-primary;
        }

        &:focus {
            background-color: inherit;
        }
    }

    :deep(.el-collapse) {
        &::-webkit-scrollbar {
            width: 0;
        }

        border-top: none;
        border-bottom: none;

        .el-collapse-item__header {
            border-bottom: none;
            height: 30px;
        }

        .el-collapse-item__wrap {
            border-bottom: none;
        }

        .el-collapse-item__content {
            padding-bottom: 0;
        }
    }
}
</style>
