<script lang="ts" setup>
import TodayIndicator from './TodayIndicator.vue';
import TotalIndicator from './TotalIndicator.vue';
import SuccessRate from './SuccessRate.vue';
import RankList from './RankList.vue';
</script>

<template>
    <el-space direction="vertical" :size="20" fill>
        <div class="banner">
            <div class="avatar"></div>
            <div class="welcome-cantainer">
                <div class="welcome">欢迎登录</div>
                <div>一站式数据管理、探索、分析平台</div>
            </div>
        </div>
        <TodayIndicator />
        <TotalIndicator />
        <div style="display: flex">
            <SuccessRate  style="flex: 1 1 0" />
            <RankList style="flex: 1 1 0; margin-left: 20px" />
        </div>
    </el-space>
</template>

<style lang="scss" scoped>
.banner {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 35px;
    height: 150px;
    background: url(@/assets/images/home-banner.png) no-repeat top -44px right -40px, linear-gradient(rgb(58, 149, 255) 0%, rgb(27, 92, 255) 100%);
    background-size: 631px 451px;
    border-radius: 8px;

    .avatar {
        width: 80px;
        height: 80px;
        background-color: aliceblue;
        border-radius: 50%;
    }

    .welcome-cantainer {
        margin-left: 25px;
        color: #fff;

        .welcome {
            @include font(24px);
            margin-bottom: 12px;
        }
    }
}
</style>
