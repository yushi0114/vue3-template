
<script lang="ts" setup>
export type LinkGroupSlotProperty = {
    handleClick: Function,
    expanded?: boolean,
    active?: boolean,
};

const props = defineProps<{
    activeCondition?: boolean
    parentExpanded?: boolean
}>();

const expanded = ref(props.activeCondition);

const handleClick = () => {
    expanded.value = !expanded.value;
};

watch(() => props.parentExpanded, () => {
    if (props.parentExpanded === false) expanded.value = false;
});
</script>
<template>
    <div class="sidebar-link-group" :class="{ active: activeCondition }">
        <slot :handleClick="handleClick" :expanded="expanded" :active="activeCondition" />
    </div>
</template>
<style lang="postcss">
.sidebar-link-group {
    &.active {
        background: var(--el-color-primary-light-9);
    }
}
</style>
