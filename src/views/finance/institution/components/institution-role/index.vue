<template>
    <div class="pane-container">
        <div class="list-content" v-if="mode === 'list'">
            <role-list-content></role-list-content>
        </div>
        <div class="form-content" v-if="mode === 'form'">
            <role-form></role-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import RoleForm from './institution-role-form.vue';
import RoleListContent from './institution-role-list.vue';
import { mode } from './institution-role';
</script>

<style scoped lang="scss">
.pane-container {
    width: 100%;
    height: 100%;
    padding: 24px;
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
