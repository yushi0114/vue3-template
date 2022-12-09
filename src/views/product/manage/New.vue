<script lang="ts" setup>
import { ProductStepsForm } from '../components';
import type { PlatformType } from '@/enums';
import { useApi } from '@/composables';
import { addProduct } from '@/api';

const { loading, request } = useApi(addProduct, {
    onSuccess() {
        ElMessage({
            type: 'success',
            message: '操作成功',
        });
        productStepsFormRef.value?.goToNext();
    },
});
const productStepsFormRef = ref<InstanceType<typeof ProductStepsForm> | null>(null);
const { push } = useRouter();
const route = useRoute();
const platform = ref<PlatformType>(Number(route.params.type));

// function handleTabChange(plat: PlatformType) {
//     platform.value = plat;
// }

const handleClose = () => {
    push(route.path.replace(/\/new\/\d+$/, ''));
};

const handleSubmit = (params: any) => {
    request(params);
};
</script>

<template>
    <PagePanel class="product-manage-new">
        <Board full>
            <!-- <PlatformTab @tab-change="handleTabChange" /> -->
            <!--  -->
            <ProductStepsForm
                ref="productStepsFormRef"
                v-loading="loading"
                :platform="platform"
                @close="handleClose"
                @submit="handleSubmit"></ProductStepsForm>
        </Board>
    </PagePanel>
</template>

<style lang="postcss">
.product-manage-new {
    @apply;
}
</style>
