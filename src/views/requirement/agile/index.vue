<script lang="ts" setup>
import { acceptProgressTypeOptions, PlatformType } from '@/enums';
import { getAligeReqs } from '@/api';
import type { AgileReqEntity } from '@/types';
import { useUrlSearchParams } from '@vueuse/core';


const route = useRoute();
const platform = ref(Number(route.params.type));

const listControlModel = reactive<any>({
    pageIndex: 1,
    pageSize: 20,
});

const params = useUrlSearchParams('history', {
    initialValue: listControlModel,
});

const count = ref(0);
const list = ref<AgileReqEntity[]>([]);
function getList() {
    getAligeReqs(Object.assign({ menuName: 'requirement' }, listControlModel))
        .then(({ total, data }) => {
            count.value = total;
            list.value = data;
        });
}

watch(listControlModel, (model) => {
    Object.assign(params, model);
    getList();
});

function clear() {
    count.value = 0;
    list.value = [];
    Object.keys(listControlModel).forEach(key => delete listControlModel[key]);
    listControlModel.pageIndex = 1;
    listControlModel.pageSize = 20;
}

function handleTabChange(plat: PlatformType) {
    clear();
    platform.value = plat;
}

onMounted(() => {
    const numberFields = ['progress', 'pageIndex', 'pageSize'];
    Object.keys(params).forEach((key) => {
        if (listControlModel[key] === params[key]) return;
        listControlModel[key] = numberFields.includes(key) ? Number(params[key]) : params[key];
    });
    getList();
});

</script>

<template>
  <PagePanel>
    <Board class="req-agile">
        <PlatformTab @tab-change="handleTabChange" />
        <ListQueryControl
            v-model="listControlModel"
            :searchConfig="{
                label: '请输入企业名称',
                field: 'searchInput'
            }"
            :filterOptionsConfigs="[
                // { label: '机构名称', field: 'org', options: [] },
                { label: '办理进度', field: 'progress', options: acceptProgressTypeOptions },
            ]"
            :sortConfigs="[
                { label: '发布时间', field: 'updateTime', },
                { label: '期望融资金额', field: 'expectFinancing', },
            ]"
            :dateRangeConfig="{
                label: '发布日期',
                field: '',
                options: [
                    {  name: '开始月份', value: 'startTime', },
                    {  name: '结束月份', value: 'endTime', },
                ]
            }"
        >
            <template v-slot:search-rest>
                <el-button type="primary">下载</el-button>
            </template>
        </ListQueryControl>
        <Text>
        </Text>

        modelValue: {{ listControlModel }}

        <ul>
            <li v-for="item in list" :key="item.id">
                {{ item.corpName }}
            </li>
        </ul>

        <el-pagination
            v-model:current-page="listControlModel.pageIndex"
            v-model:page-size="listControlModel.pageSize"
            :page-sizes="[20, 30, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count"
        />
    </Board>
  </PagePanel>
</template>
<style lang="postcss">
.req-agile {
  @apply;
}
</style>
