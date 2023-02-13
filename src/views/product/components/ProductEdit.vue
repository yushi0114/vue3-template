<script lang="ts" setup>
import { ProductForm } from '../components';
import { toRefs } from '@vueuse/core';
import type { PlatformType } from '@/enums';
import { useApi, useModal } from '@/composables';
import { updateProduct } from '@/api';

const props = defineProps<{
    platform?: PlatformType;
}>();
const emits = defineEmits<{
    // eslint-disable-next-line no-undef
    (e: 'success'): void;
}>();

const { visible, open, close } = useModal(openCallback);
const { loading, request } = useApi(updateProduct, {
    onSuccess() {
        ElMessage({
            type: 'success',
            message: '修改成功',
        });
        handleClose();
        emits('success');
    },
});
const productId = ref('');
const propsRefs = toRefs(props);
const handleClose = () => {
    close();
    productId.value = '';
};

function openCallback({ id }: { id: string }) {
    productId.value = id;
}

const handleSubmit = (params: any) => {
    request(params);
};
defineExpose({
    open,
});
</script>

<template>
    <el-drawer
        :size="850"
        v-model="visible"
        @closed="handleClose">
        <!-- -->
        <template #header>
            <Text>编辑产品</Text>
        </template>
        <ProductForm
            v-loading="loading"
            :id="productId"
            :platform="propsRefs.platform?.value"
            @close="handleClose"
            @submit="handleSubmit"></ProductForm>
    </el-drawer>
</template>

<style lang="scss">
.pdt-detail-row {
    gap: $gap-sm;
    margin-bottom: $gap-md;
    > * {
        flex: 1;
    }

    .i-content-board {
        margin-top: 0;
    }
}

.pdt-detail-logo {
    max-height: 100px;
    max-width: 200px;
}

.pdt-detail-orgname {
    height: 100%;
    display: flex;
    align-items: center;
}
</style>
