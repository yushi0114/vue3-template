<script lang="ts" setup>
import { useDark } from '@vueuse/core';
import { Moon, Sunny } from '@element-plus/icons-vue';
import NavUserProfile from './NavUserProfile.vue';


const isDark = useDark();
</script>

<template>
    <FlexRow class="nav">
        <!-- -->
        <!-- :active-icon="Check" :inactive-icon="Close" -->
        <div class="nav-content">
            <slot></slot>
        </div>
        <el-space size="small">
            <el-switch
                v-model="isDark"
                class="ml-2"
                :active-icon="Moon"
                :inactive-icon="Sunny"
                inline-prompt
                style="--el-switch-on-color: var(--el-fill-color-dark); --el-switch-off-color: var(--el-color-info-light-3)"
            />
            <NavUserProfile />
        </el-space>
    </FlexRow>
</template>

<style lang="scss">
.nav {
    height: $nav-height;
    padding: 0 $gap-lg;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 10;
    background-color: var(--deep-bg-color);
    transition: .2s ease-in-out all;
}

.nav-content {
    flex: 1;
}
</style>
