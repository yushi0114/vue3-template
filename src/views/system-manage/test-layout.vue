<template>
    <div>
      <div style="height: 65px; width: 100%; border-bottom: 1px solid #ccc;">

      </div>
      <div style="height: calc(100vh - 65px); display: flex;">
        <div style="width: 220px; border-right: 1px solid #ccc"></div>
        <div style="flex: 1; padding: 30px;">
          <div><h1>菜单管理</h1> </div>
          <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>

</script>

<style scoped>

</style>