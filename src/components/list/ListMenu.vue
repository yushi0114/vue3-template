<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
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
// 过滤器初始展开值
const initialActiveNames =
    Object.entries(model.value)
        .filter(([key, value]) => value && props.menu?.map((item) => item.field).includes(key))
        .map(([key]) => key) ?? [];
const activeNames = ref(initialActiveNames);
watch(isCtrlKeep, (newValue) => {
    if (!newValue) {
        emits('change');
    }
});
</script>

<template>
    <div class="list-menu">
        <Text
            size="lg"
            color="paragraph"
            class="flex items-center space-x-2"
            ><span>过滤器</span>
            <el-tooltip
                content="按住Ctrl+Click可多选"
                placement="top">
                <Icon
                    class="cursor-pointer w-4 text-[var(--el-text-color-regular)]"
                    name="fluent-mdl2:info" />
            </el-tooltip>
        </Text>
        <el-collapse
            class="flex-1 overflow-y-auto !border-r-none"
            v-model="activeNames">
            <el-collapse-item
                :name="subMenu.field"
                v-for="subMenu in menu"
                :key="subMenu.field">
                <template #title>
                    <Text
                        color="regular"
                        size="sm"
                        >{{ subMenu.label }}</Text
                    >
                </template>
                <el-button
                    class="w-full"
                    v-for="menuItem in subMenu.options"
                    :key="menuItem.value"
                    text
                    :type="getActiveOption(subMenu.field, menuItem)"
                    @click="handleMenuItemClick(menuItem, subMenu.field)"
                    ><Text
                        :color="getActiveOption(subMenu.field, menuItem) || 'regular'"
                        size="xs"
                        >{{ menuItem.name }}</Text
                    >
                </el-button>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<style lang="postcss" scoped>
.list-menu {
    @apply w-full h-full flex flex-col space-y-2 border-r-1 border-r-$el-menu-border-color;
}
:deep(.el-button + .el-button) {
    @apply ml-0;
}
:deep(.el-button.el-button--primary) {
    @apply !bg-[var(--el-fill-color-light)];
}
:deep(.el-collapse) {
    @apply border-y-none;
}
</style>

<style lang="scss" scoped></style>
