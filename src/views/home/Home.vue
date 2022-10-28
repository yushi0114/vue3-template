<script setup lang="ts">
import { Layout } from '@/components';
import { useUserStore } from '@/stores';
import { Nav, Sidebar } from '@/widgets';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const { state } = useUserStore();
const router = useRouter();
onMounted(() => {
    console.log('FFF', state.navTree);
});

</script>

<template>
    <Layout>
        <Nav />
        <Layout type="horizontal" class="main-container">
            <Sidebar />
            <Layout class="page-container">
                <button @click="router.push('/dashboard')">aaa</button>
                <RouterView />
            </Layout>
        </Layout>
    </Layout>
</template>
<style lang="postcss">
.main-container {
    @apply;
}

.page-container {
    @apply bg-gray-200 p-2 border-box;
}
</style>
