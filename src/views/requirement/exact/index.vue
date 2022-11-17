<script lang="ts" setup>
import { acceptProgressTypeOptions, PlatformType } from '@/enums';
import { getExactReqs } from '@/api';
import type { AgileReqEntity, RequirementEntity } from '@/types';
import { ReqList } from '../components';
import { noop } from '@/utils';
import { useListControlModel } from '@/composables';

const route = useRoute();
const platform = ref(Number(route.params.type));

const { model: listControlModel, clear: clearModel } = useListControlModel();


const count = ref(0);
const list = ref<AgileReqEntity[]>([]);
function getList() {
    getExactReqs(Object.assign({ platform: platform.value }, listControlModel))
        .then(({ pageTotal, data }) => {
            count.value = pageTotal;
            list.value = data;
        })
        .catch(noop);
}

watch(listControlModel, () => {
    nextTick(getList);
});

function clear() {
    count.value = 0;
    list.value = [];
    clearModel();
}

function handleTabChange(plat: PlatformType) {
    clear();
    platform.value = plat;
}

function goDetail(req: RequirementEntity) {
    console.log(req);
}

onMounted(() => {
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

        <ReqList :list="list" @click-detail="goDetail" />

        <FlexRow horizontal="end">
            <el-pagination
                v-model:current-page="listControlModel.pageIndex"
                v-model:page-size="listControlModel.pageSize"
                :page-sizes="[10, 20, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="count"
            />
        </FlexRow>
    </Board>
  </PagePanel>
</template>
<style lang="postcss">
.req-agile {
  @apply;
}
</style>
