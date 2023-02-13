<template>
    <partner-list-content v-if="mode === 'list'"></partner-list-content>
    <partner-form v-else-if="mode === 'form'"></partner-form>
</template>

<script lang="ts" setup>

import PartnerForm from './partner-form-modal.vue';
import PartnerListContent from './partner-list-content.vue';

import { mode } from './partner';
</script>

<style scoped lang="scss">
</style>
