<script lang="ts" setup>
import { View } from '@element-plus/icons-vue';
import { getAllCorpList } from '@/api/report';
import type { IReportTable } from '@/types/report';
import { useListControlModel } from '@/composables';

const dataSource = ref<IReportTable[]>([]);
const { model: listControlModel } = useListControlModel({
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

// 获取企业列表
const getCorpList = () => {
    if (!listControlModel.corpName) return;
    const params = {
        corpName: listControlModel.corpName,
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
        path: '/report/detail',
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
        const dom = TableRef.value.$refs.bodyWrapper.getElementsByClassName('el-scrollbar__wrap')[0];
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

// 防抖
const debounce = (fn: Function, time?: number) => {
    let timer: any;
    return function(e: any) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(e);
        }, time);
    };
};

onMounted(() => {
    // 挂载
    TableRef.value && TableRef.value.$refs.bodyWrapper.addEventListener('mousewheel', debounce(scrollBehavior, 1000));
});

onUnmounted(() => {
    // 卸载
    TableRef.value && TableRef.value.$refs.bodyWrapper.removeEventListener('mousewheel', scrollBehavior);
});

watch(listControlModel, () => {
    dataSource.value = [];
    page.currentPage = 1;
    getCorpList();
});
</script>

<template>
    <Layout class="corp-table">
        <ListQueryControl
            v-model="listControlModel"
            :filter-row-visible="false"
            :searchConfig="{
                label: '请输入关键字进行查询',
                field: 'corpName',
            }">
        </ListQueryControl>
        <Layout class="table-content">
            <el-table
                v-loading="allToogle.loading"
                :data="dataSource"
                style="width: 100%; height: 770px;"
                :header-cell-style="{
                    color: '#595959',
                    'background-color': '#f3f4f8'
                }"
                ref="TableRef"
            >
                <el-table-column fixed prop="corpName" label="企业名称" />
                <el-table-column prop="corpCode" label="统一社会信用代码" />
                <el-table-column>
                    <template #header>
                        <span class="header-options">操作</span>
                    </template>
                    <template #default="scope">
                        <el-button
                            :icon="View"
                            text
                            @click="handleView(scope.row)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
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
