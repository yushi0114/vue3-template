
<script lang="ts" setup>
export type LinkGroupSlotProperty = {
    handleClick: Function,
    expanded?: boolean,
    active?: boolean,
};

// ! check 合上之后收缩起来 再展开 就不合上了
const autoClosed = ref(false);

const props = defineProps<{
    activeCondition?: boolean
    parentExpanded?: boolean
}>();


const expanded = ref(props.activeCondition);

const handleClick = () => {
    expanded.value = !expanded.value;
    if (!expanded.value) {
        autoClosed.value = true;
    }
};

watchEffect(() => {
    if (props.parentExpanded) {
        if (props.activeCondition && !autoClosed.value) {
            expanded.value = true;
        }
    }
    else {
        expanded.value = false;
        autoClosed.value = false;
    }
});

watch(() => props.parentExpanded, () => {
    if (props.parentExpanded === false) expanded.value = false;
});
</script>
<template>
    <div class="sidebar-link-group" :class="{ active: activeCondition }">
        <slot :handleClick="handleClick" :expanded="expanded" :active="activeCondition" />
    </div>
</template>
<style lang="scss">
.sidebar-link-group {
    &.active {
        background: var(--el-color-primary-light-9);
    }
}
</style>
