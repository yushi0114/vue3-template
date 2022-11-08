<script lang="ts" setup>
import { useUserStore } from '@/stores';
import { getCaptcha } from '@/api';
import { encrypt } from '@/utils';

const { signin } = useUserStore();
const router = useRouter();
const state = reactive({
    username: '',
    password: '',
    captcha: '',
});
const captchaSvgStr = ref('');

function handleCaptchaFetch() {
    getCaptcha()
        .then(res => {
            console.log('res', res);
            captchaSvgStr.value = res.captcha;
        });
}

function handleSignin() {
    const password = encrypt(state.password);
    signin({ account: state.username, password, captcha: state.captcha })
        .then(() => {
            router.replace('/home');
            ElNotification.success({
                title: '登录成功'
            });
        });
}

onBeforeMount(() => {
    handleCaptchaFetch();
});
</script>

<template>
    <div class="sign-in">
        <!-- -->
        signin
        <br>
        username: <input type="text" v-model="state.username">
        <br>
        password: <input type="text" v-model="state.password">
        <br>
        captcha: <input type="text" v-model="state.captcha">
        <br>
        <div v-html="captchaSvgStr"></div>
        <el-button type="primary" @keypress.enter="handleSignin" @click="handleSignin">sign in</el-button>
    </div>

  <div class="banner">

  </div>
</template>

<style lang="postcss">
.sign-in {
    @apply;
}
</style>


<style lang="scss">
.banner {
  /*大背景图区域*/
  height: 150px;
  width: 1600px;
  border-radius: 6px;
  background: url(/src/assets/images/banner.png) no-repeat top -37px right -51px, linear-gradient(rgba(58,149,255,1) 0%,rgba(27,92,255,1) 100%);
  background-size: 631px 451px;
}
</style>
