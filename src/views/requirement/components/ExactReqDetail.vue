<script lang="ts" setup>
import { ReportType, ReportTypeUrlMap } from '@/enums';
import { getExactReq, getExactReqScore } from '@/api';
import type { RequirementEntity } from '@/types';
import ReqDetail from './ReqDetail.vue';
import { useApi } from '@/composables';
import { ScoreResult } from '@/components';
import { ROOT_PATH } from '@/router';

const route = useRoute();
const router = useRouter();
const platform = ref(Number(route.params.type));

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
        platform: platform.value
    })
        .then((res: any) => {
            score.result = res.result;
        });
    request({ id: props.content.id, platform: platform.value })
        .then(res => {
            detail.value = res;
        });
    emits('open');
}

function handleClosed() {
    detail.value = null;
    emits('closed');

}

const handleViewReport = (type: ReportType) => {
    const routerUrl = router.resolve({
        path: ROOT_PATH + ReportTypeUrlMap[type],
        query: {
            corpCode: props.content?.corpCode,
            corpName: props.content?.corpName,
        }
    });
    window.open(routerUrl.href, '_blank');
};

watch(() => route.params, () => {
    platform.value = Number(route.params.type);
});

</script>

<template>
    <ReqDetail @open="handleOpen" :content="detail" @closed="handleClosed" exact>
        <!-- -->
        <ContentBoard label="企业评分信息">
            <template #label-rest>
                <FlexRow>
                    <el-button size="small" @click="handleViewReport(ReportType.CREDIT)">征信报告</el-button>
                    <el-button size="small" @click="handleViewReport(ReportType.SCORE)">信用评分详情</el-button>
                </FlexRow>
            </template>

            <ScoreResult :score-result="score.result" />
        </ContentBoard>
    </ReqDetail>
</template>

<style lang="scss">
.agile-req-detail {
}
</style>
