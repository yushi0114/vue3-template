
<script lang="ts" setup>
const props = defineProps<{ activeCondition?: boolean }>();

const expanded = ref(props.activeCondition);

const handleClick = () => {
    expanded.value = !expanded.value;
};
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
