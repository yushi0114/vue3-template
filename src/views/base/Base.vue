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
    <main class="app-container">
        <Sidebar :options="sidebarOptions">
            <template v-slot:logo>
                <RouterLink to="/home">DMS</RouterLink>
            </template>
        </Sidebar>
        <Layout class="main-container">
            <Nav />
            <Layout class="page-container">
                <RouterView />
            </Layout>
        </Layout>
    </main>
</template>
<style lang="scss">
.app-container {
    display: flex;
    height: 100vh;
    overflow: hidden;
    position: relative;

}
.main-container {
    overflow-y: auto;
    overflow-x: hidden;
}

.page-container {
    background: $fill-color-light;
    // overflow-y: auto;
    /* @apply bg-gray-200 p-5 box-border; */
}
</style>
