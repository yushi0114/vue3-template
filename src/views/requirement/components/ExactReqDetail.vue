<script lang="ts" setup>
import { getExactReq } from '@/api';
import type { RequirementEntity } from '@/types';
import ReqDetail from './ReqDetail.vue';
import { useApi } from '@/composables';

const props = withDefaults(
    defineProps<{
        content?: RequirementEntity | null
    }>(),
    {
        content: null
    }
);

const emits = defineEmits<{
    (e: 'open'): void
    (e: 'closed'): void
}>();

const detail = ref<RequirementEntity | null>(null);
const { request } = useApi(getExactReq);

function handleOpen() {
    if (!props.content) return;
    request({ id: props.content.id })
        .then(res => {
            console.log('ffffff', res);
            detail.value = res;
        });
    emits('open');
}

function handleClosed() {
    detail.value = null;
    emits('closed');

}

</script>

<template>
    <ReqDetail @open="handleOpen" :content="detail" @closed="handleClosed">
        <!-- -->
        <ContentBoard label="企业评分信息">
        </ContentBoard>
    </ReqDetail>
</template>

<style lang="postcss">
.agile-req-detail {
    @apply;
}
</style>
