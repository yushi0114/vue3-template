<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
    drawerFlag: {
        type: Boolean,
        default: false,
    },
    dataDetail: {
        type: Object,
        default: () => ({})
    }
});

const emit = defineEmits<{
  (e: 'close'): void
}>();

function handleClose() {
    console.log(props.dataDetail);
    emit('close');
}

</script>
<template>
    <el-drawer
        v-model="props.drawerFlag"
        title="城市详情"
        size="50%"
        :before-close="handleClose"
    >
        <span>{{123}}</span>
    </el-drawer>
</template>
