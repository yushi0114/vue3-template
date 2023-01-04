<script lang="ts" setup>
import emptyImg from '@/assets/images/no-data.png';

withDefaults(
    defineProps<{
        loading: boolean;
        empty?: boolean;
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
        <Layout v-show="loading" v-loading="loading" element-loading-text="加载中"></Layout>
        <Layout v-show="!loading && empty">
          <FlexRow horizontal="center" full>
            <el-empty
            :image="image"
            :image-size="imageSize"
            :description="description" />
          </FlexRow>
        </Layout>
        <transition name="loading">
            <Layout v-show="(!loading && !empty)">
                <slot></slot>
            </Layout>
        </transition>
    </Layout>
</template>

<style lang="scss">
.loading-board {
}

.loading-enter-active {
  animation: loading-visible 0.5s;
}
.loading-leave-active {
  opacity: 0;
}
@keyframes loading-visible {
  0% {
    opacity: 0;
    transform: translate(-10px);
  }
  50% {
  }
  100% {
    opacity: 1;
    transform: translate(0px);
  }
}
</style>
