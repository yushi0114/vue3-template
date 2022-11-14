<script lang="ts" setup>

</script>

<template>
    <PagePanel class="error-page">
        <Board class="error-page-board">
            <FlexColumn class="error-page-container">
                <slot></slot>
            </FlexColumn>
        </Board>
    </PagePanel>
</template>

<style lang="scss">
.error-page {
    flex: 1;
}

.error-page-board {
    height: calc(100% - $gap-xs * 2);
}

.error-page-container {
    box-sizing: border-box;
    height: 100%;
    padding-top: 100px;
    gap: $gap-md;
}
</style>
