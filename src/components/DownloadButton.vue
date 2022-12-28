<script lang="ts" setup>
import { Download } from '@element-plus/icons-vue';
import { useApi } from '@/composables';
import { downloadByData, noop } from '@/utils';
import { omit } from 'lodash';
// TODO
// 1.loading(prevent click)
// 2.reverse http response to file
// 3.recive api func
type DownloadOptions = {
    fileName: string;
    // eslint-disable-next-line no-undef
    params?: Recordable;
};
const props = withDefaults(
    defineProps<{
        api: (params?: any) => Promise<any>;
        downloadOptions: DownloadOptions;
    }>(),
    {}
);

const { request: download, loading } = useApi(() => props.api(omit(props.downloadOptions.params, ['pageIndex', 'pageSize'])), {
    onSuccess(data) {
        downloadByData(data, props.downloadOptions.fileName);
        ElMessage({
            type: 'success',
            message: '下载成功',
        });
    },
    onError: noop,
});

const handleDownload = () => {
    download();
};
</script>

<template>
    <el-button
        :loading="loading"
        :icon="Download"
        v-bind="$attrs"
        @click="handleDownload"
        >下载</el-button
    >
</template>
