<script lang="ts" setup>
import emptyImg from '@/assets/images/no-data.png';

const props = withDefaults(
    defineProps<{
        image?: string;
        content?: string;
        offsetHeight: number;
        offsetWidth: number;
        defaultStyle?: string;
        imageSize?: number;
    }>(),
    {
        defaultStyle: '',
        image: emptyImg,
        imageSize: 483
    }
);

const getStyle = computed(() => {
    return `height: ${props.offsetHeight}px;width: ${props.offsetWidth}px;${props.defaultStyle}`;
});
</script>

<template>
    <div
        class="empty"
        :style="getStyle">
        <el-empty v-bind="$attrs" :image="image" :image-size="imageSize" :description="content || '暂无数据'" />
    </div>
</template>

<style lang="scss">
.empty {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
