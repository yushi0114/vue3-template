<template>
  <div class="page-content">
    <div class="title-container">
      <div class="title">
        {{title}}
      </div>
      <div class="desc">{{desc}}</div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    desc: {
        type: String
    }
});
</script>

<style scoped lang="scss">
.page-content {
  padding: 32px 24px 24px 24px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  .title-container {
    height: 62px;
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
    flex: 1;
    background: #FFF;
    border-radius: 6PX;
    padding: 15px 19px;
  }
}
</style>
