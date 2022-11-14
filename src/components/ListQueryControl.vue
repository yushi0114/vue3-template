<script lang="ts" setup>
import type { PlainOption } from '@/types';
import { Search } from '@element-plus/icons-vue';
// TODO
export type ControlConfig = {
    label: string, field: string,
}

export type ControlOptionConfig<T = any> = ControlConfig & {
    options: PlainOption<T>[]
}

const model = ref<any>({});

const props = withDefaults(
    defineProps<{
        searchConfig?: ControlConfig,
        typeOptionsConfigs?: ControlOptionConfig[]
        filterOptionsConfigs?: ControlOptionConfig[]
        sortConfigs?: ControlConfig[],
        dateRangeConfig?: ControlOptionConfig,
    }>(),
    {
        searchConfig: () => ({ label: '输入名称', field: 'search' }),
        typeOptionsConfigs: () => [],
        filterOptionsConfigs: () => [],
    }
);

onMounted(() => {
    console.log(props);
});

</script>

<template>
  <div class="list-query-control">
    <!-- -->
    <FlexRow horizontal="between" class="lqc-search-row">
        <div>
            <el-input
                v-model="model.search"
                :placeholder="searchConfig.label"
                class="input-with-select"
                >
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </div>

        <FlexRow horizontal="end" class="lqc-search-rest">
            <slot name="search-rest" />
        </FlexRow>
    </FlexRow>
    <FlexRow
        class="lqc-type-row"
        v-if="typeOptionsConfigs"
        >
    </FlexRow>
    <FlexRow
        class="lqc-filter-row">

    </FlexRow>
  </div>
</template>

<style lang="scss">
.list-query-control {
}

.lqc-search-row {

}

.lqc-search-rest {
    flex: 1;
}
</style>
