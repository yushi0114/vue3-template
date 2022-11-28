<script lang="ts" setup>
import Welcome from './Welcome.vue';
import TodayIndicator from './TodayIndicator.vue';
import TotalIndicator from './TotalIndicator.vue';
import SuccessRate from './SuccessRate.vue';
import ProductSuccessRate from './ProductSuccessRate.vue';
import RankList from './RankList.vue';
import { type GetHomepageCountResponse, getHomepageCount } from '@/api/dashboard';

const count = ref<GetHomepageCountResponse>();
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
            <TodayIndicator :data="count" />
            <TotalIndicator :data="count" />
            <div style="display: flex; width: 100%">
                <SuccessRate style="flex: 1 1 30%" :data="count" />
                <div style="flex: 1 1 30%; margin-left: 20px; display: flex; flex-direction: column;">
                    <ProductSuccessRate :data="count" />
                </div>
                <RankList style="flex: 1 1 40%; margin-left: 20px" :data="count" />
            </div>
        </el-space>
    </PagePanel>
</template>

<style lang="scss" scoped>
:deep(.el-space__item:nth-child(4)) {
    width: 100%;
}
</style>
