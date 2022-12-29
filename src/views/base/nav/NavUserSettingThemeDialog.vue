<script lang="ts" setup>
import { useDark } from '@vueuse/core';
import { Moon, Sunny } from '@element-plus/icons-vue';

const isDark = useDark();
const dialogRef = ref();

</script>

<template>
<MessageDialog
    ref="dialogRef"
    title="修改主题"
    width="480px"
    class="nav-user-setting-theme">
    <!-- -->
    <el-switch
        v-model="isDark"
        :active-icon="Moon"
        :inactive-icon="Sunny"
        inline-prompt
        style="--el-switch-on-color: var(--el-fill-color-dark); --el-switch-off-color: var(--el-color-info-light-3)"
    />
    <template #footer>
        <el-button type="primary" @click="dialogRef?.cancel()">关闭</el-button>
    </template>
</MessageDialog>
</template>

<style lang="scss">
.nav-user-setting-theme {
}
</style>
