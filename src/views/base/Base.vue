<script setup lang="ts">
import { Layout, Nav, Sidebar } from '@/components';
import { useUserStore } from '@/stores';
import { computed, onBeforeMount } from 'vue';

const { state, getUserInfo } = useUserStore();

const sidebarOptions = computed(() => [...state.prevNavTree, ...state.navTree]);
onBeforeMount(() => {
    getUserInfo();
});

// watch(sidebarOptions, () => {
//     console.log(sidebarOptions.value);
// });

</script>

<template>
    <Layout>
        <Nav />
        <Layout type="horizontal" class="main-container">
            <Sidebar :options="sidebarOptions" />
            <Layout class="page-container">
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
    @apply bg-gray-200 p-5 box-border;
}
</style>
