<template>
    <div class="banner">
        <img src="@/assets/images/avatar.png" width="80" height="80">
        <div class="welcome-cantainer">
            <div class="welcome">欢迎登录</div>
            <div>一站式数据管理、探索、分析平台</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.banner {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 31px;
    height: 142px;
    background: url(@/assets/images/home-banner.png) no-repeat top -44px right -40px, linear-gradient(rgb(58, 149, 255) 0%, rgb(27, 92, 255) 100%);
    background-size: 631px 451px;
    border-radius: 8px;
    box-shadow: 0 4px 4px rgb(0, 0, 0, .25);

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
