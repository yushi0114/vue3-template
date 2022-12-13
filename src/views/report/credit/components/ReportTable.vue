<script lang="ts" setup>
import { getAllCorpList } from '@/api/report';
import type { IReportTable } from '@/types/report';
import { useListControlModel } from '@/composables';
import { useThrottleFn } from '@vueuse/core';
import { ItemOperate } from '@/components';

const dataSource = ref<IReportTable[]>([]);
const { model } = useListControlModel({
    initialModel: { corpName: '' }
});

const allToogle = reactive({
    loading: false,
});

// 分页配置项
const page = reactive({
    currentPage: 1,
    pageSize: 15
});

const tableBodyRef = computed<HTMLElement | null>(() => TableRef.value?.$refs?.table.$refs.bodyWrapper);

// 获取企业列表
const getCorpList = () => {
    if (!model.corpName) return;
    const params = {
        corpName: model.corpName,
        pageNo: page.currentPage,
        pageSize: page.pageSize
    };

    allToogle.loading = true;
    return getAllCorpList(params)
        .then((data) => {
            dataSource.value.push(...data);
        })
        .catch(() => {})
        .finally(() => {
            allToogle.loading = false;
        });
};

const router = useRouter();
const handleView = (row: IReportTable) => {
    const routerUrl = router.resolve({
        path: '/report-credit/detail',
        query: {
            corpName: row.corpName,
            corpCode: row.corpCode
        }
    });
    window.open(routerUrl.href, '_blank');
};

const TableRef = ref();
// 滚动行为
function scrollBehavior(e: any) {
    // 滚动方向判定
    const scrollDirection = e.deltaY > 0 ? 'down' : 'up';
    if (scrollDirection === 'down') {
        // 获取提供实际滚动的容器
        const dom = tableBodyRef.value!.getElementsByClassName('el-scrollbar__wrap')[0];
        const { clientHeight, scrollTop, scrollHeight } = dom;
        if (clientHeight === scrollHeight) {
            return;
        } else {
            if (clientHeight + scrollTop >= scrollHeight - 1) {
                page.currentPage += 1;
                getCorpList();
            }
        }
    }
}

const throttledFn = useThrottleFn((e) => {
    scrollBehavior(e);
}, 400);

onMounted(() => {
    // 挂载
    tableBodyRef.value?.addEventListener('mousewheel', throttledFn);
});

onUnmounted(() => {
    // 卸载
    tableBodyRef.value?.removeEventListener('mousewheel', throttledFn);
});

watch(model, () => {
    dataSource.value = [];
    page.currentPage = 1;
    getCorpList();
});
</script>

<template>
    <Layout class="corp-table">
        <ListQueryControl
            v-model="model"
            :filter-row-visible="false"
            :searchConfig="{
                label: '请输入关键字进行查询',
                field: 'corpName',
            }">
        </ListQueryControl>
        <Layout class="table-content">
            <LoadingBoard :loading="allToogle.loading" :empty="!dataSource.length">
            <CommonTable
                :data="dataSource"
                ref="TableRef"
            >
                <el-table-column fixed prop="corpName" label="企业名称" />
                <el-table-column prop="corpCode" label="统一社会信用代码" />
                <TableOperatorColumn
                    width="120"
                    @[ItemOperate.detail]="(scope: any) => handleView(scope.row)"
                    :operators="[
                        { name: '查看', value: ItemOperate.detail, icon: 'ep-view' },
                    ]">
                </TableOperatorColumn>
            </CommonTable>
            </LoadingBoard>
        </Layout>
    </Layout>

</template>

<style lang="scss" scoped>
.corp-table {
    .table-header {
        min-height: 40px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .searchInput {
            width: 350px;
        }

        .search-tip {
            display: flex;
            align-items: center;
            margin-left: 16px;
            color: #f56c6c;
            font-size: 14px;
        }
    }

    .table-content {
        :deep(.el-table__cell) {
            padding: 12px;
        }

        .header-options {
            padding-left: 7px;
        }

        :deep(.el-scrollbar__wrap--hidden-default .el-table__empty-block) {
            height: 450px !important;
            line-height: 550px;
        }
        .table-pagination {
            margin-top: 20px;
            justify-content: flex-end;
        }
    }
}
</style>
