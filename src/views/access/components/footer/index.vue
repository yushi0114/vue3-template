<template>
    <div class="login-footer">
        <div class="copyRight">Copyright © 沈阳盛京征信有限公司</div>
        <div class="logo"></div>
    </div>
</template>
<script lang="ts">
export default defineComponent({
    name: 'LoginFooter',
});
</script>
<script lang="ts" setup></script>

<style scoped>
.login-footer {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row nowrap;
    pointer-events: none;
}

.copyRight {
    color: #333333;
    font-size: 14px;
    font-weight: 400;
    pointer-events: none;
    -moz-user-select: none;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    /*-khtml-user-select:none;!*早期浏览器*!*/
    user-select: none;
}

.logo {
    background: url('@/assets/images/login-logo.png') no-repeat center;
    background-size: 100% 100%;
    width: 134px;
    height: 100%;
    box-sizing: border-box;
    position: absolute;
    right: 40px;
}
</style>
