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
        <div class="card-header">
            <Text color="paragraph" bold size="md">今日核心指标</Text>
        </div>
        <div class="indicator">
            <div class="item-label">企业新用户</div>
            <div class="item-value">{{ data.countTodayElibUser }} <span>/</span> {{ data.countTodayEzjfwUser }}</div>
            <div class="item-desc">辽信通 <span>/</span> 市综服</div>
        </div>
        <div class="indicator">
            <div class="item-label">辽信通需求</div>
            <div class="item-value">{{ data.countTodayExactReq }}</div>
        </div>
        <div class="indicator">
            <div class="item-label">辽信通产品需求</div>
            <div class="item-value">{{ data.countTodayProductReq }}</div>
        </div>
        <div class="indicator">
            <div class="item-label">市综服需求</div>
            <div class="item-value">{{ data.countTodayEzjfwExactReq }}</div>
        </div>
        <div class="indicator">
            <div class="item-label">市综服产品需求</div>
            <div class="item-value">{{ data.countTodayEzjfwProductReq }}</div>
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
        @include font(14px);
        margin-bottom: 2px;
        color: #5e5e5e;
    }

    .item-value {
        line-height: 38px;
        color: #1e1e1e;
        font-size: 30px;
    }

    .item-desc {
        @include font(12px);
        margin-top: 11px;
        color: #5e5e5e;
    }
}
</style>
