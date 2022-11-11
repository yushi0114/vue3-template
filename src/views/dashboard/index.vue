<script lang="ts" setup>
import Welcome from './Welcome.vue';
import TodayIndicator from './TodayIndicator.vue';
import TotalIndicator from './TotalIndicator.vue';
import SuccessRate from './SuccessRate.vue';
import ProductSuccessRate from './ProductSuccessRate.vue';
import RankList from './RankList.vue';
import { type GetHomepageCountResponse, getHomepageCount } from '@/api/dashboard';
import { useSidebar } from '@/composables';

const count = ref<GetHomepageCountResponse>();
const { expand } = useSidebar();
const getHomepageData = () => {
    return getHomepageCount()
        .then(res => {
            count.value = res;
        })
        .catch(() => {});
};

onBeforeMount(() => {
    getHomepageData();
});
</script>

<template>
    <PagePanel class="dashboard">
        <el-space direction="vertical" :size="20" fill :style="{ width: '100%' }">
            <Welcome />
            {{ expand }}
            <TodayIndicator :data="count" />
            <TotalIndicator :data="count" />
            <div style="display: flex; width: 100%">
                <SuccessRate class="flex-card" :data="count" />
                <ProductSuccessRate class="flex-card" :data="count" />
                <RankList class="flex-card" :data="count" />
            </div>
        </el-space>
    </PagePanel>
</template>

<style lang="scss" scoped>
.flex-card {
    flex: 1 1 0;

    &:not(:first-child) {
        margin-left: 20px;
    }
}

:deep(.el-space__item:nth-child(4)) {
    width: 100%;
}
</style>
