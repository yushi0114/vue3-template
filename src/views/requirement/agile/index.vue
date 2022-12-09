<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue';
import { acceptProgressTypeOptions, PlatformType, platformTypeMap } from '@/enums';
import { getAligeReqs, deleteAgileReqs, downloadAgileReqs } from '@/api';
import type { AgileReqEntity, RequirementEntity } from '@/types';
import { AgileReqDetail, ReqList } from '../components';
import { noop } from '@/utils';
import { useListControlModel, useApi, useTableCheckbox } from '@/composables';

const route = useRoute();
const platform = ref<PlatformType>(Number(route.params.type));
const detailContent = ref<RequirementEntity | null>(null);

const { model: listControlModel, clear: clearModel } = useListControlModel({
    numberFields: ['progress']
});

const count = ref(0);
const loading = ref(false);
const list = ref<AgileReqEntity[]>([]);

const { isSelectAll, tableSelectAll, isIndeterminate, ids, handleSelectionChange, handleChangeCheckAll } = useTableCheckbox(list);

const downloadOptions = reactive({
    fileName: `敏捷需求列表（${platformTypeMap[platform.value]}）.xlsx`,
    params: Object.assign({ platform: platform.value }, listControlModel)
});
function getList() {
    loading.value = true;
    getAligeReqs(Object.assign({ platform: platform.value }, listControlModel))
        .then(({ total, data }) => {
            count.value = total;
            list.value = data;
        })
        .catch(noop)
        .finally(() => {
            loading.value = false;
        });
}

const { loading: loadingBatchDelete, request: deleteReps } = useApi((idArr: string) => deleteAgileReqs({ platform: platform.value, idArr }), {
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
    detailContent.value = req;
}

const handleBatchDelete = async() => {
    const idArr = ids.value.map(item => `"${item}"`).join(',');
    try {
        await ElMessageBox.confirm(`确认删除已选中的${ids.value.length}条需求吗？`, '删除', {
            type: 'warning',
        });
        deleteReps(idArr);
    } catch {
        noop;
    }
};

const handleDelete = async(req: RequirementEntity) => {
    req.id = '03eab107b8e54bffb0c877df6a558320';
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
    <PagePanel>
        <Board class="req-agile" focus-full>
            <PlatformTab @tab-change="handleTabChange" :filter-types="[PlatformType.LiaoXinTong]"/>
            <ListQueryControl
                v-model="listControlModel"
                v-model:check-all="isSelectAll"
                :is-indeterminate="isIndeterminate"
                :showSelection="!!list.length"
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
                @change-check-all="handleChangeCheckAll"
            >
                <template v-slot:search-rest>
                    <el-button type="danger" :loading="loadingBatchDelete" :icon="Delete" :disabled="!ids.length" @click="handleBatchDelete">批量删除</el-button>
                    <DownloadButton type="primary" :api="downloadAgileReqs" :download-options="downloadOptions"></DownloadButton>
                </template>
            </ListQueryControl>
            <LoadingBoard :loading="loading" :empty="!list.length">
            <ReqList :is-select-all="tableSelectAll" :list="list" @item-detail="goDetail" @item-delete="handleDelete" @multi-selection="handleSelectionChange" />

            <CommonPagination
                v-model:current-page="listControlModel.pageIndex"
                v-model:page-size="listControlModel.pageSize"
                :total="count"
            />
            </LoadingBoard>
        </Board>
        <AgileReqDetail :modelValue="!!detailContent" @closed="detailContent = null" :content="detailContent" />
    </PagePanel>
</template>
<style lang="scss">
.req-agile {
}
</style>
