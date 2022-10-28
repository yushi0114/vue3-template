<script lang="ts" setup>
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';

const { state, signout } = useUserStore();
const router = useRouter();

function handleSignout() {
    signout().then(() => {
        router.replace('/signin');
    });
}
</script>

<template>
    <div class="nav">
        <!-- -->
        im nav
        <div>
            {{ state.user?.username }}
            <button @click="handleSignout">sign out</button>
        </div>
    </div>
</template>

<style lang="postcss">
.nav {
    @apply bg-indigo-500 py-4 px-6 flex items-center justify-between;
}
</style>
