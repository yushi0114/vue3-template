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
import UserForm from './user-form.vue';
import UserListContent from '@/views/system/user/components/user-list-content.vue';
import { mode } from './user-list';
</script>

<style scoped lang="scss">
.pane-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .list-content {
        width: 100%;
        height: 100%;
        overflow-y: auto;
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
