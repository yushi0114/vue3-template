<template>
    <finance-partner-list-content v-if="mode === 'list'"></finance-partner-list-content>
    <finance-partner-form v-else-if="mode === 'form'"></finance-partner-form>
</template>

<script lang="ts" setup>

import FinancePartnerForm from './finance-partner-form-modal.vue';
import FinancePartnerListContent from './finance-partner-list-content.vue';

import { mode } from './finance-partner';
</script>

<style scoped lang="scss">
</style>
