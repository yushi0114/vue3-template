<script lang="ts" setup>
import { Warning, Brush } from '@element-plus/icons-vue';
import { useVModel, onKeyStroke } from '@vueuse/core';
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
    // 多选筛选处理
    if (isCtrlKeep.value && props.multipleFields?.includes(field)) {
        // 点击添加筛选添加
        if (!model.value[field]?.toString().includes(item.value)) {
            model.value[field] = model.value[field] ? `${model.value[field]},${item.value}` : item.value;
            return;
        }
        // 再次点击删除筛选条件
        model.value[field] = model.value[field].replace(item.value + ',', '');
        return;
    }
    model.value[field] = model.value[field] === item.value ? '' : item.value;
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
        <FlexRow horizontal="between">
            <Text
                size="md"
                color="regular">
                <FlexRow class="gap-1">
                    <span>过滤器</span>
                    <el-tooltip
                        content="按住Ctrl+Click可多选"
                        placement="top">
                        <el-icon
                            class="cursor-pointer"
                            color="var(--i-text-color-regular)">
                            <Warning />
                        </el-icon>
                    </el-tooltip>
                </FlexRow>
            </Text>
            <FlexRow
                class="cursor-pointer mr-4"
                @click.stop="clearFilterOptions">
                <TextHoverable
                    color="regular"
                    size="xs"
                    ><FlexRow class="gap-1">
                        <el-icon>
                            <Brush /> </el-icon
                        >清空过滤项</FlexRow
                    ></TextHoverable
                >
            </FlexRow>
        </FlexRow>
        <el-collapse
            class="flex-1 pl-2 overflow-y-auto !border-r-none"
            v-model="activeNames">
            <el-collapse-item
                :name="subMenu.field"
                v-for="subMenu in menu"
                :key="subMenu.field">
                <template #title>
                    <Text
                        color="paragraph"
                        size="sm"
                        >{{ subMenu.label }}</Text
                    >
                </template>
                <el-button
                    class="w-full justify-start"
                    v-for="menuItem in subMenu.options"
                    :key="menuItem.value"
                    text
                    :type="getActiveOption(subMenu.field, menuItem)"
                    @click="handleMenuItemClick(menuItem, subMenu.field)"
                    ><Text
                        color="current"
                        size="xs"
                        >{{ menuItem.name }}</Text
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
    border-right: $border;
    &-title {
        gap: $gap-line;
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
        }
        .el-collapse-item__wrap {
            border-bottom: none;
        }

        .el-collapse-item__content {
            padding-bottom: 0;
            padding-right: 32px;
        }
    }
}
</style>
