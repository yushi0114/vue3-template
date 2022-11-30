<template>
    <el-form class="custom-form" :model="form" :rules="rules" label-width="120px" ref="ruleFormRef">
        <el-form-item label="姓名:" required prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="上传图片" prop="imageUrl">
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
        <el-form-item label="状态:" required prop="status">
            <el-switch v-model="form.status"/>
        </el-form-item>
        <el-form-item>
            <el-button @click="goBack()">
                <template #icon>
                    <Icon :name="'ep:back'"></Icon>
                </template>
            </el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                <template #icon>
                    <Icon :name="'ep:edit'"></Icon>
                </template>
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules, UploadFile, UploadRequestOptions } from 'element-plus';
import { ElMessage } from 'element-plus';
import Icon from '@/components/Icon.vue';
import { LoadingService } from '@/views/system/loading-service';
import {
    add,
    fileList,
    form,
    formType,
    handleGoBack,
    update
} from '@/views/finance/partner/components/finance-partner';
import { blobToDataURL } from '@/utils';


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
    ruleFormRef.value?.validateField('logoContent');
}

function handleRemove() {
    form.value.imgUrl = '';
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

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入用户姓名', trigger: 'blur' },
        { min: 3, max: 255, message: '用户姓名不能超过255个字符', trigger: 'blur' },
    ],
});

async function submitForm(formElement: FormInstance | undefined) {
    if (!formElement) return;
    await formElement.validate(async (valid, fields) => {
        if (valid) {
            LoadingService.getInstance().loading();
            if (formType.value === 'create') {
                await add();
            } else {
                await update();
            }
            await handleGoBack();
            LoadingService.getInstance().stop();
        } else {
            console.log('error submit!', fields);
        }
    });
}

async function goBack() {
    LoadingService.getInstance().loading();
    await handleGoBack();
    LoadingService.getInstance().stop();
}

</script>

<style scoped lang="scss">
.custom-form {
    width: 700px;
    padding: 40px 0;
}
</style>
