/*
 * @Description:
 * @FilePath: \dms-web\src\components\SjcForm\hooks\useUpload.ts
 * @Author: zys
 * @Date: 2022-11-10 10:34:30
 * @LastEditTime: 2022-11-18 17:07:20
 * @LastEditors: zys
 * @Reference:
 */
// eslint-disable-next-line no-duplicate-imports
import type { Ref } from 'vue';
import type { ElUpload, FormInstance, UploadRawFile, UploadFiles } from 'element-plus';
// eslint-disable-next-line no-duplicate-imports
import { genFileId } from 'element-plus';
import { checkFileType, FILE_TYPE_ERROR_MAP, FILE_TYPE_LIMIT_MAP, FILE_SIZE_ERROR_MAP } from '@/utils';
import type { UploadObj, DefItem } from '../types';

type IUploadProps = {
    fileList?: UploadFiles;
    item: DefItem;
    index: number;
};
export const useUpload = (form: Ref<FormInstance>) => {
    const uploadListMap = ref(new Map());
    const bindUploadRef = (el: InstanceType<typeof ElUpload>, key: string) => {
        if (el && !uploadListMap.value.get(key)) {
            uploadListMap.value.set(key, el);
        }
    };

    const isHiddenUploadBtn = computed(() => {
        return (item: DefItem) => {
            return item.uploadObj!.hideUpload || (item.value as any[])!.length === item.uploadObj!.limit;
        };
    });

    const dialogVisible = ref(false);
    const dialogImageUrl = ref('');

    // 文件预览
    const handlePictureCardPreview = (file: any) => {
        console.log('file: ', file);
        dialogImageUrl.value = file.url ?? '';
        dialogVisible.value = true;
    };
    // 文件上传之前的钩子函数
    const beforeUpload = (file: UploadRawFile, uploadObj: UploadObj) => {
        const fileNameSuffix = checkFileType(file.name);
        if (fileNameSuffix !== uploadObj.fileType) {
            ElMessage.error(FILE_TYPE_ERROR_MAP[uploadObj.fileType]);
            return false;
        }

        if (!file.size || file.size > FILE_TYPE_LIMIT_MAP[fileNameSuffix]) {
            ElMessage.error(FILE_SIZE_ERROR_MAP[fileNameSuffix]);
            return false;
        }
        return true;
    };

    // 文件上传
    const handleUpload = ({ index }: IUploadProps) => {
        pushUpload({ index });
        return Promise.resolve('上传成功');
    };

    const handleRemove = ({ fileList, item, index }: IUploadProps) => {
        item.uploadObj && (item.uploadObj.hideUpload = fileList!.length === item.uploadObj?.limit); // 文件删除后判断当前文件列表长度是否等于限制长度。目的，当长度相等时隐藏文件上传按钮
        pushUpload({ index });
    };

    const uploadSuccess = ({ index }: IUploadProps) => {
        pushUpload({ index });
    };

    // 对文件上传，删除进行赋值，调用form验证
    const pushUpload = ({ index }: { index: number }) => {
        form.value.validateField(`form[${index}].value`); // 调用验证form表单的文件上传
    };

    const handleExceed = ({ fileList, item }: Omit<IUploadProps, 'index' | 'fileList'> & { fileList: File[] }) => {
        uploadListMap.value.get(item.keyName)!.clearFiles();
        const file: any = fileList![0];
        file.uid = genFileId();
        uploadListMap.value.get(item.keyName)!.handleStart(file);
    };
    return {
        isHiddenUploadBtn,
        dialogVisible,
        bindUploadRef,
        dialogImageUrl,
        beforeUpload,
        handlePictureCardPreview,
        handleUpload,
        handleRemove,
        uploadSuccess,
        handleExceed,
    };
};
