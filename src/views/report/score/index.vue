<script lang="ts" setup>
import ScoreTableTable from './components/ScoreTable.vue';
</script>

<template>
    <PagePanel full>
        <Board class="score">
            <ScoreTableTable></ScoreTableTable>
        </Board>
    </PagePanel>
</template>

<style lang="postcss" scoped>
.score {
    @apply  h-full;
}
</style>
