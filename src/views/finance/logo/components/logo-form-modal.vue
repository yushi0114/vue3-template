<template>
    <el-dialog
        :model-value="dialogVisible"
        :title="type === 'create' ? '新建机构LOGO' : '编辑机构LOGO'"
        width="30%"
        :close-on-click-modal="false"
        :modal-append-to-body="true"
        append-to-body
        destroy-on-close
        @close="handleClose">
        <el-form :model="formData" label-width="120px" :rules="rules" ref="ruleFormRef">
            <el-form-item label="机构名称" prop="orgId">
                <el-select v-model="formData.orgId" placeholder="请选择" :disabled="type === 'edit'">
                    <el-option
                        v-for="(item, index) in firstLevelOrgList"
                        :key="index"
                        :label="item.orgName"
                        :value="item.id"/>
                </el-select>
            </el-form-item>
            <el-form-item label="上传图片" prop="logoContent">
                <el-upload
                    :accept="'PNG,JPEG'"
                    :file-list="fileList"
                    class="upload-demo"
                    :limit="1"
                    :before-upload="beforeUpload"
                    :http-request="handleUpload"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    list-type="picture">
                    <el-button type="primary">点击上传</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            只能上传jpg/jpeg/png文件，且不超过2MB
                        </div>
                    </template>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleUploadToServer(ruleFormRef)">
              上传
            </el-button>
          </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { type FormInstance, type FormRules, type UploadFile, type UploadRequestOptions, type UploadUserFile, ElMessage } from 'element-plus';
import { addLogoApi, getFirstLevelOrgAll, updateLogoApi } from '@/api/finance/finance-logo';
import { blobToDataURL, dataURLToFile } from '@/utils';

const firstLevelOrgList = ref<{ id: string; orgName: string }[]>([]);
const dialogImageUrl = ref();
const previewImageDialogVisible = ref(false);
const isLoading = ref(false);
const props = defineProps({
    dialogVisible: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    currentLogo: {
        type: Object as PropType<{
            logoContent: string;
            orgId: string;
            orgName: string;
            orgLogoId: string;
            sort: number;
        }>
    },
    type: {
        type: String as PropType<'create' | 'edit'>
    }
});

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    orgId: [
        { required: true, message: '请选择机构', trigger: 'change' },
    ],
    logoContent: [
        { required: true, message: '请上传图标', trigger: ['change', 'blur'] },
    ],
});

const fileList = ref<UploadUserFile[]>([]);

const emits = defineEmits(['close']);

const formData = ref({
    orgId: props.currentLogo?.orgId ?? '',
    logoContent: props.currentLogo?.logoContent ?? ''
});

function handleClose() {
    emits('close');
}

// 文件预览
function handlePictureCardPreview(file: UploadFile) {
    dialogImageUrl.value = file.url;
    previewImageDialogVisible.value = true;
}

// 文件上传
async function handleUpload(options: UploadRequestOptions) {
    const content = await blobToDataURL(options.file, () => {
    });
    formData.value.logoContent = content as string;
    ruleFormRef.value?.validateField('logoContent');
}

function handleRemove() {
    formData.value.logoContent = '';
    ruleFormRef.value?.validateField('logoContent');
}

// 文件上传之前的钩子函数
function beforeUpload(file: File) {
    if (!/\.(png|jpg|jpeg)$/.test(file.name)) {
        ElMessage({
            message: '只支持png、jpeg或jpg格式的文件',
            type: 'error',
        });
        return false;
    }
    if (file.size > 2 * 1024 * 1024) {
        ElMessage({
            message: '文件大小不能超过2MB',
            type: 'error',
        });
        return false;
    }
    return true;
}

async function setOrgList(): Promise<void> {
    return new Promise((resolve) => {
        getFirstLevelOrgAll().then(data => {
            firstLevelOrgList.value = data;
        }).finally(() => {
            resolve();
        });
    });
}

async function addLogo(params: {
    logoContent: string;
    orgId: string;
    orgName: string;
}): Promise<void> {
    return new Promise((resolve) => {
        addLogoApi(params).finally(() => {
            resolve();
        });
    });
}

async function updateLogo(params: {
    id: string;
    logoContent: string;
    orgId: string;
    orgName: string;
}): Promise<void> {
    return new Promise((resolve) => {
        updateLogoApi(params).finally(() => {
            resolve();
        });
    });
}

async function handleUploadToServer(formElement: FormInstance | undefined) {
    if (!formElement) return;
    await formElement.validate(async(valid) => {
        if (valid) {
            isLoading.value = true;
            if (props.currentLogo) {
                await updateLogo({
                    id: props.currentLogo.orgLogoId,
                    logoContent: formData.value.logoContent,
                    orgId: formData.value.orgId,
                    orgName: firstLevelOrgList.value.find(item => item.id === formData.value.orgId)?.orgName!
                });
            } else {
                await addLogo({
                    logoContent: formData.value.logoContent,
                    orgId: formData.value.orgId,
                    orgName: firstLevelOrgList.value.find(item => item.id === formData.value.orgId)?.orgName!
                });
            }
            isLoading.value = false;
            emits('close');
        }
    });
}


onMounted(async() => {
    await setOrgList();
    if (props.currentLogo) {
        fileList.value = [{
            name: dataURLToFile(props.currentLogo.logoContent).name,
            url: props.currentLogo.logoContent
        }];
    }
});
</script>

<style scoped lang="scss">

</style>
