<script lang="ts" setup>
import { getExactReq, getExactReqScore } from '@/api';
import type { RequirementEntity } from '@/types';
import ReqDetail from './ReqDetail.vue';
import { useApi } from '@/composables';
import { ScoreResult } from '@/components';

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
const score = reactive<any>({
    result: []
});

function handleOpen() {
    if (!props.content) return;
    getExactReqScore({
        corpCode: props.content.corpCode,
        corpName: props.content.corpName,
    })
        .then((res: any) => {
            console.log(res);
            score.result = res.result;
        });
    request({ id: props.content.id })
        .then(res => {
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
    <ReqDetail @open="handleOpen" :content="detail" @closed="handleClosed" exact>
        <!-- -->
        <ContentBoard label="企业评分信息">
            <template #label-rest>
                <FlexRow>
                    <el-button size="small">征信报告</el-button>
                    <el-button size="small">信用评分详情</el-button>
                </FlexRow>
            </template>

            <ScoreResult :score-result="score.result" />
        </ContentBoard>
    </ReqDetail>
</template>

<style lang="postcss">
.agile-req-detail {
    @apply;
}
</style>
