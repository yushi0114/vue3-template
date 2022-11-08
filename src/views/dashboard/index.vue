<script lang="ts" setup>

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
        <el-card :body-style="{ padding: '20px 24px 24px' }" shadow="never">
            <div class="card-header">今日核心指标</div>
            <div class="indicator">
                <div class="item-label">企业新用户</div>
                <div class="item-value">67 <span>/</span> 104</div>
                <div class="item-desc">辽信通 <span>/</span> 市综服</div>
            </div>
            <div class="indicator">
                <div class="item-label">辽信通需求</div>
                <div class="item-value">569</div>
            </div>
            <div class="indicator">
                <div class="item-label">辽信通产品需求</div>
                <div class="item-value">45</div>
            </div>
            <div class="indicator">
                <div class="item-label">市综服需求</div>
                <div class="item-value">366</div>
            </div>
            <div class="indicator">
                <div class="item-label">市综服产品需求</div>
                <div class="item-value">5639</div>
            </div>
        </el-card>
        <el-card :body-style="{ padding: '24px 32px 28px' }" shadow="never">
            <div class="corp-total">
                <div>企业总人数</div>
                <div>601,986,875</div>
            </div>
        </el-card>
        <div style="display: flex;">
            <el-card shadow="never" style="flex: auto"></el-card>
            <el-card shadow="never" style="flex: auto; margin-left: 20px;"></el-card>
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
            margin-bottom: 12px;
            line-height: 32px;
            font-size: 24px;
        }
    }
}

.card-header {
    margin-bottom: 20px;
    line-height: 24px;
    color: #1e1e1e;
    font-size: 16px;
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
        line-height: 22px;
        color: #5e5e5e;
        font-size: 14px;
    }

    .item-value {
        line-height: 38px;
        color: #1e1e1e;
        font-size: 30px;
    }

    .item-desc {
        margin-top: 11px;
        line-height: 18px;
        color: #5e5e5e;
        font-size: 12px;
    }
}

.corp-total {
    box-sizing: border-box;
    width: 25%;
    height: 78px;
    border-right: 1px solid #dcdfe6;
}
</style>
