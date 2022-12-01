<template>
  <div class="page-content" v-loading="isLoading">
    <div class="title-container">
      <div class="title">
        {{title}}
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        default: ''
    },
    isLoading: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped lang="scss">
.page-content {
  display: block;
  padding: 32px 24px 0 24px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .title-container {
    height: 32px;
    width: 100%;
    display: flex;
    flex-flow: column;
    margin-bottom: 24px;
    justify-content: space-between;
    .title{
      font-size: 24px;
    }
  }
  .content {
    box-sizing: border-box;
    height: calc(100vh - 144px);
    background: #FFF;
    border-radius: 6PX;
    padding: 15px 19px;
  }
}
</style>
