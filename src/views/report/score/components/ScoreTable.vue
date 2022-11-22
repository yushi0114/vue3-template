<script lang="ts" setup>
import { Search, View } from '@element-plus/icons-vue';
import { getAllCorpList } from '@/api/score';
import type { IScoreTable } from '@/types/score';

const dataSource = ref<IScoreTable[]>([]);

const searchInput = ref('');

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
    const params = {
        corpName: searchInput.value,
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

// 搜索企业
const handleSearch = (isClear: boolean) => {
    if (isClear) {
        page.currentPage = 1;
        dataSource.value = [];
    } else {
        if (searchInput.value.length >= 2) {
            page.currentPage = 1;
            dataSource.value = [];
            getCorpList();
        } else {
            ElMessage({
                type: 'error',
                message: '输入内容不能少于2个字符',
            });
        }
    }
};

const router = useRouter();
const handleView = (row: IScoreTable) => {
    const routerUrl = router.resolve({
        path: '/score/detail',
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

</script>

<template>
    <div class="corp-table">
        <div class="table-header">
            <el-input
                class="searchInput"
                placeholder="请输入关键字进行查询"
                v-model.trim="searchInput"
                clearable
                @clear="handleSearch(true)"
                @keyup.enter="handleSearch(false)"
            >
                <template #append>
                    <el-button :icon="Search" @click="handleSearch(false)" />
                </template>
            </el-input>
        </div>
        <div class="table-content">
            <el-table
                v-loading="allToogle.loading"
                :data="dataSource"
                style="width: 100%; height: 650px;"
                :header-cell-style="{
                    color: '#595959',
                    'background-color': '#f3f4f8'
                }"
                ref="TableRef"
            >
                <el-table-column fixed prop="corpName" label="企业名称" />
                <el-table-column prop="corpCode" label="统一社会信用代码" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button
                            type="primary"
                            size="small"
                            :icon="View"
                            circle
                            @click="handleView(scope.row)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.corp-table {
    .table-header {
        min-height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .searchInput {
            width: 350px;
            height: 40px;
        }
    }

    .table-content {
        :deep(.el-table__cell) {
            padding: 12px;
        }

        :deep(.el-scrollbar__wrap--hidden-default .el-table__empty-block) {
            height: 450px !important;
            line-height: 550px;
        }
        .table-pagination {
            margin-top: 20px;
            justify-content: end;
        }
    }
}
</style>
