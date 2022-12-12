<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
const instance = getCurrentInstance();

const table = ref();

onMounted(() => {
    console.log(222, instance?.refs);
});
</script>

<template>
    <el-table
        ref="table"
        class="common-table"
        v-bind="$attrs"
        :header-cell-style="{
            color: '#595959',
            'background-color': '#f3f4f8'
        }">
        <template
            v-for="(_, key, index) in $slots"
            :key="index"
            v-slot:[key]="props">
            <slot :name="key" v-bind="props"></slot>
        </template>
    </el-table>
</template>

<style lang="postcss">
.common-table {
    @apply;
}
</style>
