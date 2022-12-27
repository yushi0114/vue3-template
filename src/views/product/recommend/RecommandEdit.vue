<script lang="ts" setup>
import { createProductRecommend, updateProductRecommend, getProductOptions, getProductRecommend } from '@/api';
import { useApi } from '@/composables';
import { PlatformType, productRecommandTypeMap, SwitchType, type ProductRecommandType } from '@/enums';
import { router } from '@/router';
import type { ProductEntity, ProductRecommandEntity } from '@/types';
import { blobToDataURL, noop } from '@/utils';
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

const submitLoading = ref(false);
const { request: requestProductRecommend, loading } = useApi(getProductOptions);

function getProducts() {
    requestProductRecommend({ platform: PlatformType.LiaoXinTong, menuName: 'recommend' })
        .then((res) => {
            products.value = res;
        });
}

function getDetail() {
    getProductRecommend({ id: route.query.id as string })
        .then(res => {
            pdt.value = res;
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
            submitLoading.value = true;
            return (isCreation.value ? createProductRecommend : updateProductRecommend)(pdt.value);
        })
        .then(() => {
            ElMessage({ message: `${editName.value}${kindName.value}成功`, type: 'success' });
            handleBack();
        })
        .catch(noop)
        .finally(() => {
            submitLoading.value = false;
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
        <Board full class="recommand-create" v-loading="loading">
            <div class="form-header">
                <Text size="xl" color="paragraph">{{ editName }}{{ kindName }}</Text>
            </div>
            <div class="recommand-edit-form">
                <el-form
                    class="custom-form"
                    :model="pdt"
                    :rules="rules"
                    label-width="120px"
                    ref="ruleFormRef">
                    <el-form-item :label="`${kindName}名称`" prop="orgProductId">
                        <el-select v-model="pdt.orgProductId" style="width: 100%">
                            <el-option v-for="pdt in products" :key="pdt.id" :value="pdt.id" :label="pdt.name" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="`${kindName}海报`" prop="productPoster">
                        <div class="re-imgdel" v-if="pdt.productPoster">
                            <div class="re-imgdel-shadow" @click="(pdt.productPoster = '')">
                                <Text color="paragraph" size="lg">
                                    <i-ep-delete />
                                </Text>
                            </div>
                            <img :src="pdt.productPoster" alt="">
                        </div>
                        <el-upload
                            v-else
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
                    <el-form-item label="海报状态" prop="status" required>
                        <el-switch
                            v-model="pdt.status"
                            :active-value="SwitchType.on"
                            :inactive-value="SwitchType.off"
                        />
                    </el-form-item>
                    <div class="form-footer">
                        <el-button @click="handleBack">取消</el-button>
                        <el-button type="primary" @click="submit" :loading="submitLoading">确定</el-button>
                    </div>
                </el-form>
            </div>
        </Board>
    </PagePanel>
</template>

<style lang="scss">
.recommand-create {
    .form-header {
        margin: 20px auto 30px;
        width: 500px;
    }
}

.recommand-edit-form {
    padding-top: $gap-xl;

    .custom-form {
        margin: 0 auto;
        width: 500px;
    }

    .form-footer {
        margin: 50px 0;
        text-align: center;
    }

    & .re-imgdel {
        width: 200px;
        position: relative;

        & .re-imgdel-shadow {
            opacity: 0;
            position: absolute;
            left: 0; top: 0; right: 0; bottom: 0;
            display: flex; justify-content: center; align-items: center;
            background-color: $overlay-color-lighter;
            &:hover {
                opacity: 1;
            }
        }

        & img {
            display: block;
            width: 100%;
        }
    }
}
</style>
