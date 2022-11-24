<script lang="ts" setup>
import AccountPasswordLogin from './components/account-password/index.vue';
import LoginFooter from './components/footer/index.vue';
</script>

<template>
    <div class="login">
        <Logo class="app-logo login-logo" />
        <div class="form">
            <div class="form-title">金融栈数据管理平台</div>
            <div class="form-title-line"></div>
            <account-password-login></account-password-login>
        </div>
        <div class="footer">
            <login-footer />
        </div>
    </div>
</template>

<style lang="css">
.login {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1280px;
    box-sizing: border-box;
    background: url('@/assets/images/login.png') no-repeat left;
    background-size: 70% 80%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
}

.login-logo {
    position: fixed;
    top: 58px;
    left: 81px;
    height: 32px;
}

.form-title {
    width: 335px;
    font-size: 36px;
    font-weight: 400;
    color: var(--el-color-primary);
    line-height: 67px;
    white-space: nowrap;
}

.form-title-line {
    margin-top: 20px;
    margin-bottom: 70px;
    width: 95px;
    height: 3px;
    background: var(--el-color-primary);
}

.form {
    position: absolute;
    right: 120px;
    width: 340px;
    height: auto;
    min-width: 340px;
}

.footer {
    position: absolute;
    bottom: 30px;
    width: 100%;
    height: 37px;
}
</style>

