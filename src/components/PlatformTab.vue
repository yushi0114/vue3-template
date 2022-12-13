<script lang="ts" setup>
import { PlatformType, platformTypeOptions } from '@/enums';
import type { TabPaneName } from 'element-plus';

const props = withDefaults(
    defineProps<{
        filterTypes?: PlatformType[]
    }>(),
    {
        filterTypes: () => [PlatformType.LiaoXinTong, PlatformType.ShiZongFu]
    }
);

const emits = defineEmits<{
    (e: 'tab-change', v: PlatformType): void
}>();

const route = useRoute();
const router = useRouter();
const platform = computed(() => Number(route.params.type));
const options = computed(() => {
    return platformTypeOptions.filter(opt => props.filterTypes.includes(opt.value));
});

function handleTab(tabname: TabPaneName) {
    router.push(route.path.replace(/\d+$/, `${tabname}`));
    emits('tab-change', Number(tabname));
}
</script>

<template>
  <div class="platform-tab">
    <!-- -->
    <el-tabs
        v-if="options.length > 0"
        :model-value="platform"
        @tab-change="handleTab"
    >
        <el-tab-pane
            v-for="opt in options"
            :key="opt.value"
            :label="opt.name"
            :name="opt.value"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss">
.platform-tab {
}
</style>
