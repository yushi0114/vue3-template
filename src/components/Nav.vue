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
    <FlexRow class="nav">
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
