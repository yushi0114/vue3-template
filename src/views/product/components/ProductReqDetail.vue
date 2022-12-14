<script lang="ts" setup>
import { getProductReq, getProductReqScore } from '@/api';
import type { RequirementEntity } from '@/types';
import { useApi } from '@/composables';
import { ScoreResult } from '@/components';
import { AcceptProgressType, expectRateTypeMap, expectTimeTypeMap, loanTermTypeMap, ReportType, ReportTypeUrlMap } from '@/enums';
import { ROOT_PATH } from '@/router';

const router = useRouter();
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
const { request } = useApi(getProductReq);
const score = reactive<any>({
    result: []
});

function handleOpen() {
    if (!props.content) return;
    getProductReqScore({
        corpCode: props.content.corpCode,
        corpName: props.content.corpName,
    })
        .then((res: any) => {
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

</script>

<template>
    <DetailDrawer  @open="handleOpen" @closed="handleClosed">
        <!-- -->
        <template #header>
            <Text>产品申请详情</Text>
        </template>
        <ContentBoard background label="基本信息" :cols="2">
            <ContentBoardField label="企业名称">{{ detail?.corpName }}</ContentBoardField>
            <ContentBoardField label="社会统一信用代码">{{ detail?.corpCode }}</ContentBoardField>
            <ContentBoardField label="联系人">{{ detail?.contactPerson }}</ContentBoardField>
            <ContentBoardField label="联系电话">{{ detail?.contactMobile }}</ContentBoardField>
        </ContentBoard>

        <ContentBoard background label="贷款需求" :cols="3" v-if="detail">
            <ContentBoardField label="期望融资金额">{{ detail.expectFinancing }}万元</ContentBoardField>
            <ContentBoardField label="期望放款时间">{{ expectTimeTypeMap[detail.expectTime] }}</ContentBoardField>
            <ContentBoardField label="期望贷款利率">{{ expectRateTypeMap[detail.expectRate] }}</ContentBoardField>
        </ContentBoard>

        <ContentBoard background label="放款信息" :cols="4" v-if="detail?.progress === AcceptProgressType.done">
            <ContentBoardField label="产品名称">{{ content?.productName }}</ContentBoardField>
            <ContentBoardField label="实际放款金额">{{ detail?.loanAmount }}万元</ContentBoardField>
            <ContentBoardField label="实际贷款期限">{{ loanTermTypeMap[detail?.loanTerm!] }}</ContentBoardField>
            <ContentBoardField label="实际贷款利率">{{ detail?.loanRate }}</ContentBoardField>
        </ContentBoard>

        <ContentBoard label="企业评分信息">
            <template #label-rest>
                <FlexRow>
                    <el-button size="small" @click="handleViewReport(ReportType.CREDIT)">征信报告</el-button>
                    <el-button size="small" @click="handleViewReport(ReportType.SCORE)">信用评分详情</el-button>
                </FlexRow>
            </template>
            <ScoreResult :score-result="score.result" />
        </ContentBoard>

        <ContentBoard v-if="content" label="产品办理进度" :background="false">
            <ContentBoardField label="所申请产品">{{ content?.productName }}</ContentBoardField>
            <ContentAcceptSteps :steps="detail?.dataFirst" />
        </ContentBoard>
    </DetailDrawer>
</template>

<style lang="postcss">
.agile-req-detail {
    @apply;
}
</style>
