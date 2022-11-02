<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores';
import { Button } from '@/components';
import { getCaptcha } from '@/api';
import { encrypt } from '@/utils';

const { signin } = useUserStore();
const router = useRouter();
const state = reactive({
    username: '17600119652',
    password: 'As41224122#',
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
        <Button @keypress.enter="handleSignin" @click="handleSignin">sign in</Button>
    </div>
</template>

<style lang="postcss">
.sign-in {
    @apply;
}
</style>
