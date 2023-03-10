<script lang="ts" setup>
import { Back, Sell, Collection } from '@element-plus/icons-vue';
import { ARTICLE_MODULE, ARTICLE_TYPE_LABEL, ARTICLE_STATUS, ARTICLE_API, UPLOAD_FILE_TYPE } from '@/enums';
import { ARTICLE_FORM_MAP } from '../constants';
import { useApi } from '@/composables';
import { isArray, cloneDeep } from 'lodash';
import type { CreateNewsParams, UpdateNewsParams, NewsItem } from '@/types';
import { useApiManage, useArticleModule, useJumpLink } from '../hooks';
import type { UploadFile } from 'element-plus';
import { getFileIdByUrl, to } from '@/utils';

let {
    query: { id = '' },
} = useRoute();

const props = defineProps<{
    module: ARTICLE_MODULE;
}>();

const ARTICLE_API_MAP = useApiManage(props.module);

const { handleToList } = useJumpLink({ module: props.module });

const params = reactive({
    status: ARTICLE_STATUS.ALL,
});

const state = reactive({
    laseUpdateTime: '',
    thumbnailUrl: '',
});

const { loading: loadingCreate, request: createArticle } = useApi(ARTICLE_API_MAP[ARTICLE_API.ADD_ARTICLE], {
    onSuccess(data, params) {
        ElMessage({
            type: 'success',
            message: '发布成功',
        });
        state.laseUpdateTime = data.updateTime;
        id = data.id;
        params[0].status === ARTICLE_STATUS.PUBLISHED && handleToList();
    },
    onError() {},
});

const { loading: loadingUpdate, request: updateArticle } = useApi(ARTICLE_API_MAP[ARTICLE_API.UPDATE_ARTICLE], {
    onSuccess(data, params) {
        ElMessage({
            type: 'success',
            message: '操作成功',
        });
        state.laseUpdateTime = data.updateTime;
        params[0].status === ARTICLE_STATUS.PUBLISHED && handleToList();
    },
    onError() {},
});

const { loading: loadingDetail, request: getArticleDetail } = useApi(ARTICLE_API_MAP[ARTICLE_API.LOAD_ARTICLE_DETAIL], {
    onSuccess(data) {
        // eslint-disable-next-line no-undef
        let temp: typeof data | Recordable = {};
        if (isArray(data)) {
            temp = data[0];
        } else {
            temp = data;
        }
        state.laseUpdateTime = temp.updateTime;
        if (getArticleTypeLabel.value === ARTICLE_TYPE_LABEL.NEWS) {
            state.thumbnailUrl = (temp as NewsItem).thumbnail;
        }
        ARTICLE_FORM.value.forEach((item) => {
            if (item.keyName === 'thumbnail') {
                item.defaultValue = [{ url: temp[item.keyName as keyof typeof data], name: '缩略图' }];
            } else {
                item.defaultValue = temp[item.keyName as keyof typeof data];
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

const ARTICLE_FORM = ref(cloneDeep(ARTICLE_FORM_MAP[props.module]));

const handleSubmit = async (values: any) => {
    const queryParams: CreateNewsParams | UpdateNewsParams = {
        ...values,
        status: params.status,
        sort: 1,
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

const uploadOrDeleteThumbnail = async (thumbnail: UploadFile[] = []) => {
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
    <div
        class="article-publish"
        v-loading="loadingDetail">
        <FlexRow horizontal="between">
            <FlexRow
                horizontal="center"
                style="gap: 2rem">
                <el-button
                    :icon="Back"
                    @click="handleToList"
                    >返回</el-button
                >
                <Text
                    color="regular"
                    size="sm"
                    v-if="state.laseUpdateTime"
                    >最近一次编辑时间：{{ state.laseUpdateTime }}</Text
                >
            </FlexRow>

            <div>
                <el-button
                    :loading="loadingCreate || loadingUpdate"
                    :icon="Collection"
                    @click="publish(ARTICLE_STATUS.DRAFT)">
                    保存</el-button
                >
                <el-button
                    :loading="loadingCreate || loadingUpdate"
                    type="primary"
                    :icon="Sell"
                    @click="publish(ARTICLE_STATUS.PUBLISHED)">
                    发布</el-button
                >
            </div>
        </FlexRow>
        <el-divider />
        <sjc-form
            :def="ARTICLE_FORM"
            :update-submit="updateSubmit"
            @search="handleSubmit"></sjc-form>
    </div>
</template>

<style lang="scss">
.article-publish {
}
</style>
