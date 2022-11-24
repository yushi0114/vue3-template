<script lang="ts" setup>
import LxtUserTable from './components/LxtCorpUserTable.vue';
import ZjfwUserTable from './components/ZjfwCorpUserTable.vue';

const route = useRoute();
const isLxtstatistics = ref(true);

onMounted(() => {
    route.params.type === '0' ? isLxtstatistics.value = true : isLxtstatistics.value = false;
});

watch(route, (val) => {
    val.params.type === '0' ? isLxtstatistics.value = true : isLxtstatistics.value = false;
});

</script>

<template>
    <PagePanel>
        <Board class="user">
            <PlatformTab />
            <template v-if="isLxtstatistics">
                <LxtUserTable></LxtUserTable>
            </template>
            <template v-else>
                <ZjfwUserTable></ZjfwUserTable>
            </template>
        </Board>
    </PagePanel>
</template>

<style lang="postcss" scoped>
.user {
    @apply  h-full;
}
</style>
