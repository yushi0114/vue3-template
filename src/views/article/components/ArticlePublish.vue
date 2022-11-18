<script lang="ts" setup>
import { ARTICLE_MODULE, ARTICLE_TYPE_LABEL, ARTICLE_STATUS, ARTICLE_API, UPLOAD_FILE_TYPE } from '@/enums';
import { ARTICLE_FORM_MAP } from '../constants';
import { useApi } from '@/composables';
import type { CreateNewsParams, UpdateNewsParams, NewsItem } from '@/types';
import { useApiManage, useArticleModule } from '../hooks';
import type { UploadFile } from 'element-plus';
import { getFileIdByUrl, to } from '@/utils';

const { back } = useRouter();
const {
    query: { id = '' },
} = useRoute();

const props = defineProps<{
    module: ARTICLE_MODULE;
}>();

const ARTICLE_API_MAP = useApiManage(props.module);

const params = reactive({
    status: ARTICLE_STATUS.ALL,
});

const state = reactive({
    laseUpdateTime: '',
    thumbnailUrl: '',
});

const { loading: loadingCreate, request: createArticle } = useApi(ARTICLE_API_MAP[ARTICLE_API.ADD_ARTICLE], {
    onSuccess() {
        ElMessage({
            type: 'success',
            message: '操作成功',
        });
        back();
    },
    onError() {},
});

const { loading: loadingUpdate, request: updateArticle } = useApi(ARTICLE_API_MAP[ARTICLE_API.UPDATE_ARTICLE], {
    onSuccess(data) {
        ElMessage({
            type: 'success',
            message: '操作成功',
        });
        state.laseUpdateTime = data.updateTime;
    },
    onError() {},
});

const { loading: loadingDetail, request: getArticleDetail } = useApi(ARTICLE_API_MAP[ARTICLE_API.LOAD_ARTICLE_DETAIL], {
    onSuccess([data]) {
        state.laseUpdateTime = data.updateTime;
        if (getArticleTypeLabel.value === ARTICLE_TYPE_LABEL.NEWS) {
            state.thumbnailUrl = (data as NewsItem).thumbnail;
        }
        ARTICLE_FORM.value.forEach((item: any) => {
            if (item.keyName === 'thumbnail') {
                item.defaultValue = [{ url: data[item.keyName as keyof typeof data], name: '缩略图' }];
            } else {
                item.defaultValue = data[item.keyName as keyof typeof data];
            }
        });
    },
    onError() {},
});

const { request: deleteFile } = useApi(ARTICLE_API_MAP[ARTICLE_API.DELETE_FILE], {
    onSuccess() {},
    onError() {},
});

const { request: uploadFile } = useApi(ARTICLE_API_MAP[ARTICLE_API.UPLOAD_FILE], {});

const updateSubmit = ref(new Date().getTime());

const publish = (status: ARTICLE_STATUS) => {
    params.status = status;
    updateSubmit.value = new Date().getTime();
};

const { getArticleTypeLabel } = useArticleModule(props.module);

const ARTICLE_FORM = ref(cloneDeep(ARTICLE_FORM_MAP[getArticleTypeLabel.value]));

const handleSubmit = async(values: CreateNewsParams | UpdateNewsParams) => {
    const queryParams: CreateNewsParams | UpdateNewsParams = {
        ...values,
        status: params.status,
    };

    if (getArticleTypeLabel.value === ARTICLE_TYPE_LABEL.NEWS) {
        const thumbnail = values.thumbnail as unknown as UploadFile[];
        const fileUrl = await uploadOrDeleteThumbnail(thumbnail);
        if (!fileUrl) {
            ElMessage({
                type: 'warning',
                message: '新闻缩略图不能为空，请检查后再次提交',
            });
            return;
        }
        queryParams.thumbnail = fileUrl;
    }

    if (id) {
        (queryParams as UpdateNewsParams).id = id as string;
        updateArticle(queryParams as UpdateNewsParams);
    } else {
        createArticle(queryParams);
    }
};

const uploadOrDeleteThumbnail = async(thumbnail: UploadFile[] = []) => {
    if (!Array.isArray(thumbnail) || thumbnail.length === 0) {
        return false;
    }
    const [file] = thumbnail;
    const fileUrl = file.url!;
    if (!fileUrl.includes('blob')) {
        return state.thumbnailUrl;
    }
    if (state.thumbnailUrl) {
        deleteFile({ id: getFileIdByUrl(state.thumbnailUrl) as string });
    }
    const [error, data] = await to(uploadFile({ file: file.raw!, fileType: UPLOAD_FILE_TYPE.IMAGE }));
    if (error) {
        return false;
    }
    const url = data?.imgUrl;
    return url;
};

onMounted(() => {
    if (id && typeof id === 'string') {
        getArticleDetail({ id });
    }
});
</script>

<template>
    <div class="article-publish" v-loading="loadingDetail">
        <div class="flex justify-between">
            <div class="flex-center">
                <el-button class="mr-2" @click="back">返回</el-button>
                <div v-if="state.laseUpdateTime">最近一次编辑时间：{{ state.laseUpdateTime }}</div>
            </div>

            <div>
                <el-button v-loading="loadingCreate || loadingUpdate" @click="publish(ARTICLE_STATUS.DRAFT)"
                    >保存</el-button
                >
                <el-button
                    v-loading="loadingCreate || loadingUpdate"
                    type="primary"
                    @click="publish(ARTICLE_STATUS.PUBLISHED)"
                    >发布</el-button
                >
            </div>
        </div>
        <el-divider />
        <sjc-form :def="ARTICLE_FORM" :update-submit="updateSubmit" @search="handleSubmit"></sjc-form>
    </div>
</template>

<style lang="postcss">
.article-publish {
    @apply;
}
</style>
