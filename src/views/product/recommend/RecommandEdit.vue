<script lang="ts" setup>
import { createProductRecommend, updateProductRecommend, getProductOptions, getProductRecommend } from '@/api';
import { PlatformType, productRecommandTypeMap, SwitchType, type ProductRecommandType } from '@/enums';
import { router } from '@/router';
import type { ProductEntity, ProductRecommandEntity } from '@/types';
import { blobToDataURL } from '@/utils';
import type { FormInstance, FormRules, UploadRequestOptions, UploadUserFile } from 'element-plus';

const route = useRoute();

const kind = computed(() => route.params.kind as ProductRecommandType);
const isCreation = computed(() => route.query.id === '0');
const kindName = computed<string>(() => {
    return productRecommandTypeMap[kind.value];
});

const editName = computed(() => {
    return isCreation.value ? '新建' : '编辑';
});

const pdt = ref<ProductRecommandEntity>({
    productType: Number(kind.value),
    status: 1
} as any);

const products = ref<Pick<ProductEntity, 'id' | 'name'>[]>([]);
const fileList = ref<UploadUserFile[]>([]);

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    orgProductId: [
        { required: true, message: '请选择推荐产品', trigger: 'change' },
    ],
    productPoster: [
        { required: true, message: '请上传海报', trigger: ['change', 'blur'] },
    ],
});

function getProducts() {
    getProductOptions({ platform: PlatformType.LiaoXinTong, menuName: 'recommend' })
        .then(res => {
            products.value = res;
        });
}

function getDetail() {
    getProductRecommend({ id: route.query.id as string })
        .then(res => {
            pdt.value = res;
            console.log(res);
        });
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

// 文件上传
async function handleUpload(options: UploadRequestOptions) {
    const content = await blobToDataURL(options.file);
    pdt.value.productPoster = content as string;
    ruleFormRef.value?.validateField('productPoster');
}

function handleRemove() {
    pdt.value.productPoster = '';
    ruleFormRef.value?.validateField('productPoster');
}

function handleBack() {
    router.replace(route.path.replace(/\/edit\/\d+$/, `?kind=${kind.value}`));
}

function submit() {
    ruleFormRef.value?.validateField()
        .then(() => {
            return (isCreation.value ? createProductRecommend : updateProductRecommend)(pdt.value);
        })
        .then(() => {
            ElMessage({ message: `${editName.value}${kindName.value}成功`, type: 'success' });
            handleBack();
        })
        .catch(() => {

        });
}

onBeforeMount(() => {
    getProducts();
    if (!isCreation.value) {
        // query
        getDetail();
    }
});
</script>

<template>
    <PagePanel>
        <!-- -->
        <Board full class="recommand-create">
            <div>
                <Text size="xl">{{ editName }}{{ kindName }}</Text>
            </div>
            <div class="recommand-edit-form">
                <el-form
                    :model="pdt"
                    :rules="rules"
                    ref="ruleFormRef">
                    <el-form-item :label="`${kindName}名称`" prop="orgProductId">
                        <el-select v-model="pdt.orgProductId">
                            <el-option v-for="pdt in products" :key="pdt.id" :value="pdt.id" :label="pdt.name" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="`${kindName}海报`" prop="productPoster">
                        <el-upload
                        :accept="'PNG,JPEG'"
                        :file-list="fileList"
                        class="upload-demo"
                        :limit="1"
                        :before-upload="beforeUpload"
                        :http-request="handleUpload"
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
                    <el-form-item label="海报状态" prop="status">
                        <el-switch
                            v-model="pdt.status"
                            :active-value="SwitchType.on"
                            :inactive-value="SwitchType.off"
                        />
                    </el-form-item>
                </el-form>

                <FlexRow>
                    <el-button @click="handleBack">返回</el-button>
                    <el-button type="primary" @click="submit">提交</el-button>
                </FlexRow>
            </div>
        </Board>
    </PagePanel>
</template>

<style lang="scss">
.recommand-edit-form {
    padding-top: $gap-xl;
}
</style>
