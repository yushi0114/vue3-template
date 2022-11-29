<script lang="ts" setup>
import { acceptProgressTypeOptions, PlatformType, switchTypeOptions, taxGradeTypeOptions, steTypeOptions, loanEndTypeOptions, longestOverdueTypeOptions } from '@/enums';
import { getExactReqs } from '@/api';
import type { AgileReqEntity, RequirementEntity } from '@/types';
import { ExactReqDetail, ReqList } from '../components';
import { noop } from '@/utils';
import { useListControlModel } from '@/composables';

const route = useRoute();
const platform = ref(Number(route.params.type));
const detail = ref<RequirementEntity | null>(null);

const { model: listControlModel, clear: clearModel } = useListControlModel({
    numberFields: ['progress']
});


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
    detail.value = req;
}

onMounted(() => {
    getList();
});

</script>

<template>
  <PagePanel full>
    <Board class="req-agile">
        <PlatformTab @tab-change="handleTabChange" />
        <ListQueryControl
            class="flex-1 overflow-hidden"
            v-model="listControlModel"
            :searchConfig="{
                label: '请输入企业名称',
                field: 'searchInput'
            }"
            :filterOptionsConfigs="[
                // { label: '机构名称', field: 'org', options: [] },
                { label: '办理进度', field: 'progress', options: acceptProgressTypeOptions },
            ]"
            :typeOptionsConfigs="[
                { label: '小微企业', field: 'mseType', options: switchTypeOptions },
                { label: '有抵押物', field: 'pawnType', options: switchTypeOptions },
                { label: '可提供担保', field: 'guaranteeType', options: switchTypeOptions },
                { label: '在银行有过融资行为', field: 'financingType', options: switchTypeOptions },
                { label: '有政府采购订单', field: 'gpType', options: switchTypeOptions },
                { label: '企业纳税信用等级', field: 'taxGradeArr', options: taxGradeTypeOptions },
                { label: '科技型企业', field: 'steTypeArr', options: steTypeOptions },
                { label: '目前尚未结清贷款金额', field: 'loanEndArr', options: loanEndTypeOptions },
                { label: '近24个月内最长逾期天数', field: 'longestOverdueArr', options: longestOverdueTypeOptions },
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
            <div class="flex-1 overflow-y-auto">
            <ReqList :list="list" @item-detail="goDetail" />

            <FlexRow horizontal="end">
                <el-pagination
                    v-model:current-page="listControlModel.pageIndex"
                    v-model:page-size="listControlModel.pageSize"
                    :page-sizes="[10, 20, 50]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count"
                />
            </FlexRow>
            </div>
        </ListQueryControl>
        <Text>
        </Text>

        <ExactReqDetail
            :modelValue="!!detail"
            @closed="detail = null"
            :content="detail" />
    </Board>
  </PagePanel>
</template>
<style lang="postcss">
.req-agile {
  @apply h-full flex;
}
</style>
