<template>
    <div class="pane-container">
        <div class="list-content" v-if="mode === 'list'">
            <finance-partner-list-content></finance-partner-list-content>
        </div>
        <div class="form-content" v-if="mode === 'form'">
            <finance-partner-form></finance-partner-form>
        </div>
    </div>
</template>

<script lang="ts" setup>

import FinancePartnerForm from './finance-partner-form.vue';
import FinancePartnerListContent from './finance-partner-list-content.vue';

import { mode } from './finance-partner';
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
