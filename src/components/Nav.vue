<script lang="ts" setup>
import { useUserStore } from '@/stores';
import { useRoute, useRouter } from 'vue-router';
import { Button } from '@/components';
import { useDark } from '@vueuse/core';

const { state, signout } = useUserStore();
const router = useRouter();
const route = useRoute();

const isDark = useDark();

function handleSignout() {
    signout().then(() => {
        router.replace('/signin');
    });
}
</script>

<template>
    <div class="nav">
        <!-- -->
        <div class="nav-content">
            {{ route.meta.title }}
        <i-ep-add-location />
        <i-ep-aim />

        <el-switch
            v-model="isDark"
            class="ml-2"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />

        <el-button type="primary">Hi~</el-button>
        </div>
        <div>
            {{ state.user?.name }}
            <Button type="ghost" color="gray" @click="handleSignout">退出</Button>
        </div>
    </div>
</template>

<style lang="postcss">
.nav {
    @apply bg-indigo-500 py-4 px-6 flex items-center justify-between;
}

.nav-content {
    @apply flex-1;
}
</style>
