<script lang="ts" setup>
import type { RequirementEntity } from '@/types';
import { loanTermTypeMap } from '@/enums';

withDefaults(
    defineProps<{
        content?: RequirementEntity | null
    }>(),
    {
        content: null
    }
);
</script>

<template>
    <el-drawer :size="850">
        <!-- -->
        <template #header>
            <Text>需求详情</Text>
        </template>
        <ContentBoard label="基本信息" :cols="2">
            <ContentBoardField label="企业名称">{{ content?.corpName }}</ContentBoardField>
            <ContentBoardField label="社会统一信用代码">{{ content?.corpCode }}</ContentBoardField>
            <ContentBoardField label="联系人">{{ content?.contactPerson }}</ContentBoardField>
            <ContentBoardField label="联系电话">{{ content?.contactMobile }}</ContentBoardField>
        </ContentBoard>

        <ContentBoard label="贷款需求" :cols="2">
            <ContentBoardField label="期望融资金额">{{ content?.corpName }}</ContentBoardField>
            <ContentBoardField label="期望放款时间">{{ content?.corpCode }}</ContentBoardField>
        </ContentBoard>

        <ContentBoard label="放款信息" :cols="4">
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
    </el-drawer>
</template>

<style lang="postcss">
.req-detail {
    @apply;
}
</style>
