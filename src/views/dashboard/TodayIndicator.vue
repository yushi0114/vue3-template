<script lang="ts" setup>
import type { TodayIndicatorEntity } from '@/types/dashboard';

withDefaults(
    defineProps<{
        data: TodayIndicatorEntity
    }>(),
    {
        data: () => ({
            countTodayElibUser: 0,
            countTodayEzjfwUser: 0,
            countTodayExactReq: 0,
            countTodayProductReq: 0,
            countTodayEzjfwExactReq: 0,
            countTodayEzjfwProductReq: 0
        })
    }
);
</script>

<template>
    <Board bordered :style="{ padding: '20px 24px 24px' }" shadow="never">
        <div>
            <div class="card-header">
                <Text color="paragraph" bold size="md">今日核心指标</Text>
            </div>
            <div class="indicator">
                <div class="item-label">
                    <Text color="secondary" size="sm">企业新用户</Text>
                </div>
                <div class="item-value">
                    <Text color="paragraph" size="current">{{ data.countTodayElibUser }} / {{ data.countTodayEzjfwUser }}</Text>
                </div>
                <div class="item-desc">
                    <Text color="secondary" size="xs">辽信通 / 市综服</Text>
                </div>
            </div>
            <div class="indicator">
                <div class="item-label">
                    <Text color="secondary" size="sm">辽信通需求</Text>
                </div>
                <div class="item-value">
                    <Text color="paragraph" size="current">{{ data.countTodayExactReq }}</Text>
                </div>
            </div>
            <div class="indicator">
                <div class="item-label">
                    <Text color="secondary" size="sm">辽信通产品需求</Text>
                </div>
                <div class="item-value">
                    <Text color="paragraph" size="current">{{ data.countTodayProductReq }}</Text>
                </div>
            </div>
            <div class="indicator">
                <div class="item-label">
                    <Text color="secondary" size="sm">市综服需求</Text>
                </div>
                <div class="item-value">
                    <Text color="paragraph" size="current">{{ data.countTodayEzjfwExactReq }}</Text>
                </div>
            </div>
            <div class="indicator">
                <div class="item-label">
                    <Text color="secondary" size="sm">市综服产品需求</Text>
                </div>
                <div class="item-value">
                    <Text color="paragraph" size="current">{{ data.countTodayEzjfwProductReq }}</Text>
                </div>
            </div>
        </div>
    </Board>
</template>

<style lang="scss" scoped>
.card-header {
    margin-bottom: 16px;
}

.indicator {
    display: inline-block;
    vertical-align: top;
    box-sizing: border-box;
    width: 20%;
    height: 93px;

    &:not(:nth-child(2)) {
        padding-left: 24px;
    }

    &:not(:last-child) {
        border-right: 1px solid #dcdfe6;
    }

    .item-label {
        margin-bottom: 2px;
    }

    .item-value {
        line-height: 38px;
        font-size: 30px;
    }

    .item-desc {
        margin-top: 11px;
    }
}
</style>
