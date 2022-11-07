<script lang="ts" setup>
import { useApi } from '@/composables';
import { PagePanel, SelectTree } from '@/components';
import { allNavs } from '@/api';
import { onBeforeMount, ref } from 'vue';
import type { NavEntity } from '@/types';
const { request } = useApi(allNavs);

const navs = ref<NavEntity[]>([]);

const permission = ref<string[]>([]);

onBeforeMount(() => {
    request().then((navsRes) => {
        navs.value = navsRes;
        permission.value = ['74318957089311eda4fbf68f808f7977', '74701ef0089311eda4fbf68f808f7977'];
    });
});
</script>
<template>
    <PagePanel class="demo-permission">
        <!-- -->
        permission: {{ permission }}

        <SelectTree
            :options="navs"
            :selected-ids="permission"
        />
    </PagePanel>
</template>

<style lang="postcss">
.demo-permission {
    @apply;
}
</style>
