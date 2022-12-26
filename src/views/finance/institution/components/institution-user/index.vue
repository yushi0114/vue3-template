<template>
    <div class="pane-container">
        <div class="list-content" v-if="mode === 'list'">
            <user-list-content></user-list-content>
        </div>
        <div class="form-content" v-if="mode === 'form'">
            <user-form></user-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import UserForm from './institution-user-form.vue';
import UserListContent from './institution-user-list.vue';
import { mode } from './institution-user';
</script>

<style scoped lang="scss">
.pane-container {
    padding: 24px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .list-content {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }
    .form-content {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
}
</style>
