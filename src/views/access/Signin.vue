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
</template>

<style lang="postcss">
.sign-in {
    @apply;
}
</style>
