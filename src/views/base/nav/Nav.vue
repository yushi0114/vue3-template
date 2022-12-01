<script lang="ts" setup>
import { useTheme } from '@/composables';
import { Moon, Sunny } from '@element-plus/icons-vue';
import NavUserProfile from './NavUserProfile.vue';

const { isDark } = useTheme();
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
    position: relative;
    z-index: 10;
    background-color: var(--deep-bg-color);
    transition: .2s ease-in-out all;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
}

.dark .nav {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.35);
}

.nav-content {
    flex: 1;
}
</style>
