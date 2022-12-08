<script lang="ts" setup>
import emptyImg from '@/assets/images/no-data.png';

withDefaults(
    defineProps<{
        loading: boolean;
        empty: boolean;
        description?: string;
        imageSize?: number;
        image?: string;
    }>(),
    {
        loading: false,
        empty: false,
        description: '暂无数据',
        imageSize: 432,
        image: emptyImg
    }
);

</script>

<template>
    <Layout class="loading-board">
        <!-- -->
        <Layout v-if="loading" v-loading="loading" element-loading-text="加载中"></Layout>
        <div v-else-if="empty">
            <el-empty
                :image="image"
                :image-size="imageSize"
                :description="description" />
        </div>
        <Layout v-else>
            <slot></slot>
        </Layout>
    </Layout>
</template>

<style lang="scss">
.loading-board {
}
</style>
