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
import RoleForm from './role-form.vue';
import RoleListContent from '@/views/system/role/components/role-list-content.vue';

import { mode } from './role-list';
import type { PropType } from 'vue';
import type { MenuTabType } from '@/views/system/type/menu-list.type';


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
