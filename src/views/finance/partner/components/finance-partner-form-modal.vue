<template>
    <el-dialog
        :model-value="dialogVisible"
        :title="type === 'create' ? '新建合作伙伴' : '编辑合作伙伴'"
        width="650px"
        :close-on-click-modal="false"
        :modal-append-to-body="true"
        append-to-body
        destroy-on-close
        @close="handleClose">
        <el-form class="custom-form" :model="form" :rules="rules" label-width="120px" ref="ruleFormRef">
            <el-form-item label="合作伙伴名称" required prop="name">
                <el-input
                    v-model="form.name"
                    placeholder="请输入合作伙伴名称"
                    :disabled="formType === 'edit'"
                    :maxlength="255"
                    show-word-limit
                />
            </el-form-item>
            <el-form-item label="合作伙伴LOGO" required prop="imgUrl">
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
                    <span class="el-upload__tip" style="margin-left: 16px">
                        只能上传jpg/jpeg/png文件，且不超过2MB
                    </span>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item label="状态" required prop="status">
                <el-switch v-model="form.status"/>
            </el-form-item>
            <FlexRow horizontal="center">
                <el-button @click="goBack()">取消</el-button>
                <el-button :loading="isLoading" type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
            </FlexRow>
        </el-form>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage, type FormInstance, type FormRules, type UploadFile, type UploadRequestOptions } from 'element-plus';
import { add, fileList, form, formType, update } from '@/views/finance/partner/components/finance-partner';
import { blobToDataURL, validateIllegalSymbol } from '@/utils';
import type { PropType } from 'vue';

const isLoading = ref<boolean>(false);
defineProps({
    dialogVisible: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    type: {
        type: String as PropType<'create' | 'edit'>
    }
});

const emits = defineEmits(['close']);

function handleClose() {
    emits('close');
}


const dialogImageUrl = ref();
const previewImageDialogVisible = ref(false);

// 文件预览
function handlePictureCardPreview(file: UploadFile) {
    dialogImageUrl.value = file.url;
    previewImageDialogVisible.value = true;
}

// 文件上传
async function handleUpload(options: UploadRequestOptions) {
    const content = await blobToDataURL(options.file, () => {
    });
    form.value.imgUrl = content as string;
    ruleFormRef.value?.validateField('imgUrl');
}

function handleRemove() {
    form.value.imgUrl = '';
    ruleFormRef.value?.validateField('imgUrl');
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

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '合作伙伴名称不能为空', trigger: 'blur' },
        { max: 255, message: '合作伙伴名称不能超过255个字符', trigger: 'blur' },
        validateIllegalSymbol
    ],
    imgUrl: [
        { required: true, message: '合作伙伴LOGO不能为空', trigger: 'change' }
    ]
});

async function submitForm(formElement: FormInstance | undefined) {
    if (!formElement) return;
    await formElement.validate(async (valid) => {
        if (valid) {
            isLoading.value = true;
            let status = false;
            if (formType.value === 'create') {
                status = await add();
            } else {
                status = await update();
            }
            isLoading.value = false;
            if (status) {
                emits('close');
            }
        }
    });
}

async function goBack() {
    emits('close');
}

</script>

<style scoped lang="scss">
.form-header {
    margin: 20px auto 30px;
    width: 700px;
}

//.custom-form {
//    margin: 0 auto;
//    width: 700px;
//}

.form-footer {
    margin: 50px 0;
    text-align: center;
}
</style>
