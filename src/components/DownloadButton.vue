<script lang="ts" setup>
import { useApi } from '@/composables';
import { downloadByData } from '@/utils';
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
    onError(error) {
        console.log('error: ', error);
    },
});

const handleDownload = () => {
    download();
};
</script>

<template>
    <el-button
        :loading="loading"
        v-bind="$attrs"
        @click="handleDownload"
        ><i-ep-download />下载</el-button
    >
</template>
