<script lang="ts" setup>
// 包含业务代码的组件
import { OrgProgressStatusType, orgProgressStatusTypeMap } from '@/enums';
import type { OrgAcceptProgress } from '@/types';

const stepNames = ['银行受理', '尽职调查', '授信审批', '放款办结'];
withDefaults(
    defineProps<{
        steps?: OrgAcceptProgress[]
    }>(),
    {
        steps: () => ([])
    }
);
</script>

<template>
    <div class="content-accept-steps">
        <Text color="primary" size="sm" v-if="steps[0]?.orgProgress === OrgProgressStatusType.failOver48h">
            {{ orgProgressStatusTypeMap[OrgProgressStatusType.failOver48h] }}
        </Text>
        <template v-else>
            <Step
                direction="vertical"
                :type="
                    !steps[i]
                        ? 'default'
                        : steps[i]?.orgProgressStatus < 0
                            ? 'danger'
                            : 'success'
                        "
                :key="i" v-for="(stepName, i) in stepNames">
                <div class="cas-title">
                    <Text size="sm">{{ stepName }}</Text>
                </div>
                <div class="cas-row">
                    <Text size="xs" color="regular">银行意见: {{ steps[i]?.orgProgressOpinion }}</Text>
                </div>
                <div class="cas-row">
                    <Text size="xs" color="secondary">办理人: {{ steps[i]?.orgUpdateBy }}</Text>
                </div>
                <div class="cas-row">
                    <Text size="xs" color="secondary">处理时间: {{ steps[i]?.orgUpdateTime }}</Text>
                </div>
            </Step>
        </template>
        <!-- -->
    </div>
</template>

<style lang="scss">
.content-accept-steps {
    width: 100%;
}

.cas-title {
    padding: calc($gap-xs/2) 0;
}

.cas-row {
    padding: $gap-line 0;

    &:last-of-type {
        padding-bottom: $gap-sm;
    }

    & .i-text {
        word-break: break-all;
    }
}
</style>
