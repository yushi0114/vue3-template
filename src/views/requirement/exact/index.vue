<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue';
import { acceptProgressTypeOptions, PlatformType, platformTypeMap, switchTypeOptions, taxGradeTypeOptions, steTypeOptions, loanEndTypeOptions, longestOverdueTypeOptions } from '@/enums';
import { getExactReqs, deleteExactReqs, downloadExactReqs } from '@/api';
import type { AgileReqEntity, RequirementEntity } from '@/types';
import { ExactReqDetail, ReqList } from '../components';
import { noop } from '@/utils';
import { useListControlModel, useApi } from '@/composables';

const route = useRoute();
const platform = ref<PlatformType>(Number(route.params.type));
const detail = ref<RequirementEntity | null>(null);

const { model: listControlModel, clear: clearModel } = useListControlModel({
    numberFields: ['progress']
});


const count = ref(0);
const loading = ref(false);
const list = ref<AgileReqEntity[]>([]);
const ids = ref<string[]>([]);
const downloadOptions = reactive({
    fileName: `精准需求列表（${platformTypeMap[platform.value]}）.xlsx`,
    params: Object.assign({ platform: platform.value }, listControlModel)
});
function getList() {
    loading.value = true;
    getExactReqs(Object.assign({ platform: platform.value }, listControlModel))
        .then(({ pageTotal, data }) => {
            count.value = pageTotal;
            list.value = data;
        })
        .catch(noop)
        .finally(() => {
            loading.value = false;
        });
}

const { request: deleteReps } = useApi((idArr: string) => deleteExactReqs({ platform: platform.value, idArr }), {
    onSuccess() {
        ElMessage({
            type: 'success',
            message: '操作成功',
        });
        getList();
    },
    onError(error) {
        console.log('error: ', error);
    },
});

watch(listControlModel, () => {
    downloadOptions.params = Object.assign({ platform: platform.value }, listControlModel);
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
    downloadOptions.params = Object.assign({ platform: platform.value }, listControlModel);
}

function goDetail(req: RequirementEntity) {
    detail.value = req;
}

const handleSelectionChange = (selection: any) => {
    ids.value = selection.map((item: any) => item.id);
};

const handleBatchDelete = async() => {
    const idArr = ids.value.map(item => `"${item}"`).join(',');
    try {
        await ElMessageBox.confirm('确认删除已选中的需求吗？', '删除', {
            type: 'warning',
        });
        deleteReps(idArr);
    } catch {
        noop;
    }
};

const handleDelete = async(req: RequirementEntity) => {
    const idArr = `"${req.id}"`;
    try {
        await ElMessageBox.confirm('确认删除此需求吗？', '删除', {
            type: 'warning',
        });
        deleteReps(idArr);
    } catch {
        noop;
    }
};

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
                <el-button type="danger" :icon="Delete" :disabled="!ids.length" @click="handleBatchDelete">批量删除</el-button>
                <DownloadButton type="primary" :api="downloadExactReqs" :download-options="downloadOptions"></DownloadButton>
            </template>
            <div class="flex-1 overflow-y-auto">
            <ReqList :loading="loading" :list="list" @item-detail="goDetail" @item-delete="handleDelete" @multi-selection="handleSelectionChange" />

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
