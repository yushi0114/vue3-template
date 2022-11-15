<script lang="ts" setup>
import { acceptProgressTypeOptions } from '@/enums';
import { useUrlSearchParams } from '@vueuse/core';

const route = useRoute();

// watchEffect(() => {
//     console.log(route.query);
// });

function handleCtrlChange(model: any) {
    console.log('onchange', model);
}
</script>

<template>
  <PagePanel>
    <Board class="req-agile">
        <PlatformTab />
        <ListQueryControl
            @update="handleCtrlChange"
            :searchConfig="{
                label: '请输入企业名称',
                field: 'search'
            }"
            :filterOptionsConfigs="[
                { label: '机构名称', field: 'org', options: [] },
                { label: '办理进度', field: 'progress', options: acceptProgressTypeOptions },
            ]"
            :sortConfigs="[
                { label: '发布时间', field: 'sort1', },
                { label: '期望融资金额', field: 'micro2', },
            ]"
            :dateRangeConfig="{
                label: '发布日期',
                field: '',
                options: [
                    {  name: '开始月份', value: 'start', },
                    {  name: '结束月份', value: 'until', },
                ]
            }"
        >
            <template v-slot:search-rest>
                <el-button type="primary">下载</el-button>
            </template>
        </ListQueryControl>
        <Text>
        </Text>
    </Board>
  </PagePanel>
</template>

<style lang="postcss">
.req-agile {
  @apply;
}
</style>
