<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        name?: string
        url?: string
    }>(),
    {}
);

const shortName = computed(() => {
    return props.name?.substring(0, 4) ?? '';
});
</script>

<template>
  <FlexRow class="rect-logo" horizontal="center">
    <!-- -->
        <Text v-if="name" color="regular">
            {{ shortName }}
        </Text>
  </FlexRow>
</template>

<style lang="scss">
.rect-logo {
  width: 60px;
  height: 60px;
  word-break: break-all;
  text-align: center;
  letter-spacing: 5px;
  border-radius: 2px;
  background-color: var(--el-color-info-light-8);
}
</style>
