<script setup lang="ts">
import Sidebar from './sidebar/Sidebar.vue';
import Nav from './nav/Nav.vue';
import { Layout } from '@/components';
import { useUserStore } from '@/stores';
import { computed, onBeforeMount } from 'vue';
import { ROOT_PATH } from '@/router';

const { state, getUserInfo } = useUserStore();

const sidebarOptions = computed(() => [...state.navTree]);
onBeforeMount(() => {
    getUserInfo();
});

// watch(sidebarOptions, () => {
//     console.log(sidebarOptions.value);
// });

</script>

<template>
    <Layout class="app-container">
        <Nav>
            <RouterLink :to="ROOT_PATH">
                <Logo class="app-logo" />
            </RouterLink>
        </Nav>
        <Layout class="main-container" type="horizontal">
            <Sidebar :options="sidebarOptions">
            </Sidebar>
            <Layout class="page-container">
                <RouterView />
            </Layout>
        </Layout>
    </Layout>
</template>
<style lang="scss">
.app-container {
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

.app-logo {
    height: 32px;
    // & .st0 {
    //     fill: red;
    // }
}
</style>
