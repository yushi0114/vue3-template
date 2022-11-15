<script lang="ts" setup>
</script>

<template>
  <PagePanel>
    <Board class="req-agile">
        <PlatformTab />
        <ListQueryControl
            :searchConfig="{
                label: '请输入企业名称',
                field: 'search'
            }"
            :filterOptionsConfigs="[
                { label: '是否为小微企业', field: 'micro', options: [] },
                { label: '是否为小微企业2', field: 'micro2', options: [] },
                { label: '是否为小微企业2', field: 'micro2', options: [] },
            ]"
            :sortConfigs="[
                { label: '是否为小微企业', field: 'micro', },
                { label: '是否为小微企业2', field: 'micro2', },
                { label: '是否为小微企业2', field: 'micro2', },
            ]"
            :dateRangeConfig="{
                label: '发布日期',
                field: 'x',
                options: [
                    {  name: '开始时间', value: 'start', },
                    {  name: '结束时间', value: 'until', },
                ]
            }"
        >
            <template v-slot:search-rest>
                <el-button type="primary">下载</el-button>
            </template>
        </ListQueryControl>
    </Board>
  </PagePanel>
</template>

<style lang="postcss">
.req-agile {
  @apply;
}
</style>
