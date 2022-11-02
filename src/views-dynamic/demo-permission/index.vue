<script lang="ts" setup>
import { useApi } from '@/composables';
import { PagePanel, SelectTree } from '@/widgets';
import { allNavs } from '@/api';
import { onBeforeMount, ref } from 'vue';
import type { NavEntity } from '@/types';
const { load } = useApi(allNavs);

const navs = ref<NavEntity[]>([]);

onBeforeMount(() => {
    load(undefined).then((navsRes) => {
        console.log('222', navsRes);
        navs.value = navsRes;
    });
});
</script>
<template>
    <PagePanel class="demo-permission">
        <!-- -->
        permission

        <SelectTree :options="navs" />
    </PagePanel>
</template>

<style lang="postcss">
.demo-permission {
    @apply;
}
</style>
