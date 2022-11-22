<script lang="ts" setup>
import cityTable from './components/CityTable.vue';
</script>

<template>
    <PagePanel>
        <Board class="board">
            <cityTable></cityTable>
        </Board>
    </PagePanel>
</template>

<style lang="postcss" scoped>
.board {
    @apply  h-full;
}
</style>
