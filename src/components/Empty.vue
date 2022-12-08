<script lang="ts" setup>
import emptyImg from '@/assets/images/no-data.png';

const props = withDefaults(
    defineProps<{
        image?: string;
        content?: string;
        offsetHeight: number;
        offsetWidth: number;
        defaultStyle?: string;
    }>(),
    {
        defaultStyle: '',
        image: emptyImg,
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
        <div style="text-align: center">
            <img
                :src="image"
                height="430"
                width="483" />
            <div>
                <Text color="regular">{{ content || '暂无数据' }}</Text>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.empty {
    position: absolute;
    top: 0;
    left: 0;
    background: $bg-color;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
