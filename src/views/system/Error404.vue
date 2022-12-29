<script lang="ts" setup>
import ErrorPage from './ErrorPage.vue';
import { DEFAULT_REDIRECT_PATH } from '@/router';

</script>

<template>
    <ErrorPage class="error-404">
        <img class="error-404-pic" src="@/assets/images/404.png" />
        <Text color="regular" class="">实在抱歉！页面一不小心跑丢了</Text>
        <RouterLink :to="DEFAULT_REDIRECT_PATH" replace>
            <el-button type="primary">返回首页</el-button>
        </RouterLink>
    </ErrorPage>
</template>

<style lang="scss">
.error-404-pic {
    height: 400px;
}
</style>
