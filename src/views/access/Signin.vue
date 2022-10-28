<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores';

const { signin } = useUserStore();
const router = useRouter();
const state = reactive({
    username: '',
    password: '',
});


function handleSignin() {
    signin({ username: state.username, password: state.password })
        .then((res) => {
            console.log(res.username);
            router.replace('/');
        });

    console.log('sign in');

}
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
        <button @click="handleSignin">sign in</button>
    </div>
</template>

<style lang="postcss">
.sign-in {
    @apply;

    & button {
        @apply bg-red-500;
    }
}
</style>
