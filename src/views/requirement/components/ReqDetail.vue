<script lang="ts" setup>
import type { ExactReqEntity } from '@/types';
import { AcceptProgressType, loanEndTypeMap, loanTermTypeMap, longestOverdueTypeMap, steTypeMap, switchTypeMap, taxGradeTypeMap, expectTimeTypeMap } from '@/enums';

withDefaults(
    defineProps<{
        content?: ExactReqEntity | null,
        exact?: boolean
    }>(),
    {
        content: null,
        exact: false,
    }
);
</script>

<template>
    <DetailDrawer>
        <!-- -->
        <template #header>
            <Text>需求详情</Text>
        </template>
        <ContentBoard background label="基本信息" :cols="2">
            <ContentBoardField label="企业名称">{{ content?.corpName }}</ContentBoardField>
            <ContentBoardField label="社会统一信用代码">{{ content?.corpCode }}</ContentBoardField>
            <ContentBoardField label="联系人">{{ content?.contactPerson }}</ContentBoardField>
            <ContentBoardField label="联系电话">{{ content?.contactMobile }}</ContentBoardField>
        </ContentBoard>

        <ContentBoard background label="详细信息" :cols="3" v-if="exact && content">
            <ContentBoardField label="是否为小微企业">{{ switchTypeMap[content.mseType] }}</ContentBoardField>
            <ContentBoardField label="是否有抵押物">{{ switchTypeMap[content.pawnType] }}</ContentBoardField>
            <ContentBoardField label="是否可提供担保">{{ switchTypeMap[content.guaranteeType] }}</ContentBoardField>

            <ContentBoardField label="企业纳税信用等级">{{ taxGradeTypeMap[content.taxGrade] }}</ContentBoardField>
            <ContentBoardField label="是否为科技型企业">{{ steTypeMap[content.steType] }}</ContentBoardField>
            <ContentBoardField label="是否有政府采购订单">{{ switchTypeMap[content.gpType] }}</ContentBoardField>

            <ContentBoardField label="在银行是否有过融资行为">{{ switchTypeMap[content.financingType] }}</ContentBoardField>
            <ContentBoardField label="目前尚未结清贷款金额">{{ loanEndTypeMap[content.loanEnd] }}</ContentBoardField>
            <ContentBoardField label="近24个月内最长逾期天数">{{ longestOverdueTypeMap[content.longestOverdue] }}</ContentBoardField>
        </ContentBoard>

        <ContentBoard background label="贷款需求" :cols="2">
            <ContentBoardField label="期望融资金额">{{ content?.expectFinancing }}万元</ContentBoardField>
            <ContentBoardField label="期望放款时间">{{ expectTimeTypeMap[content?.expectTime!] }}</ContentBoardField>
        </ContentBoard>

        <ContentBoard label="放款信息" :cols="4" v-if="content?.progress === AcceptProgressType.done">
            <ContentBoardField label="产品名称">{{ content?.productName }}</ContentBoardField>
            <ContentBoardField label="实际放款金额">{{ content?.loanAmount }}万元</ContentBoardField>
            <ContentBoardField label="实际贷款期限">{{ loanTermTypeMap[content?.loanTerm!] }}</ContentBoardField>
            <ContentBoardField label="实际贷款利率">{{ content?.loanRate }}</ContentBoardField>
        </ContentBoard>

        <slot></slot>

        <ContentBoard v-if="content" label="需求处理进度" :background="false">
            <ContentBoardField label="第一意向银行">{{ content?.dataFirst?.[0]?.orgName }}</ContentBoardField>
            <ContentAcceptSteps :steps="content.dataFirst" />
            <template v-if="content.dataSecond.length > 0">
                <ContentBoardField label="第二意向银行">{{ content.dataSecond[0].orgName }}</ContentBoardField>
                <ContentAcceptSteps :steps="content.dataSecond" />
            </template>
        </ContentBoard>
    </DetailDrawer>
</template>

<style lang="postcss">
.req-detail {
    @apply;
}
</style>
