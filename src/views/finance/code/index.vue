<template>
    <PagePanel>
        <Board full>
            <template v-if="mode === 'list'">
                <code-list-content></code-list-content>
            </template>
            <div class="form-content" v-if="mode === 'form'">
                <code-form></code-form>
            </div>
        </Board>
    </PagePanel>
</template>

<script lang="ts" setup>
import CodeForm from './components/code-form.vue';
import CodeListContent from './components/code-list-content.vue';
import { currentCodeId, mode, resetFinanceCodeFilterObject } from './components/code-list';

onMounted(async() => {
    mode.value = 'list';
    currentCodeId.value = undefined;
});

onUnmounted(() => {
    resetFinanceCodeFilterObject();
});
</script>

<style scoped lang="scss">
.form-content {
    margin-left: 24px;
    padding: 48px 24px 24px;
    height: 100%;
    //border: 1px solid #ebeef5;
    //border-radius: 4px;
    flex: 1;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    overflow-y: auto;
}
</style>
