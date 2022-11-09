<script lang="ts" setup>
import AccountPasswordLogin from './components/account-password/index.vue';
import LoginFooter from './components/footer/index.vue';
</script>

<template>
    <div class="login">
        <div class="form">
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

