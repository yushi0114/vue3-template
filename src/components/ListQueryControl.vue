<script lang="ts" setup>
import { useQueryParams } from '@/composables';
import type { PlainOption } from '@/types';
import { SortType } from '@/enums';
import { Search } from '@element-plus/icons-vue';
// TODO
export type ControlConfig = {
    label: string,
    field: string,
    defaultValue?: string,
    searchable?: boolean
    [key: string]: any
}

export type ControlOptionConfig<T = any> = ControlConfig & {
    options: PlainOption<T>[]
}


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

const emits = defineEmits<{
    (e: 'update', model: any): void;
}>();

type ModelType = any
const model = ref<ModelType>({});
const dateModel = ref<string[]>([]);


watchEffect(() => {
    if (props.searchConfig) {
        model.value[props.searchConfig.field] = props.searchConfig.defaultValue;
    }
});

watchEffect(() => {
    if (Array.isArray(props.typeOptionsConfigs)) {
        // TODO
    }
});

watchEffect(() => {
    if (Array.isArray(props.filterOptionsConfigs)) {
        props.filterOptionsConfigs.forEach((fConf) => {
            model.value[fConf.field] = fConf.defaultValue;
        });
    }
});

watchEffect(() => {
    if (props.dateRangeConfig) {
        model.value[props.dateRangeConfig.options[0].value] = props.dateRangeConfig.defaultValue;
        model.value[props.dateRangeConfig.options[1].value] = props.dateRangeConfig.defaultValue;
    }
});

watchEffect(() => {
    if (Array.isArray(props.sortConfigs)) {
        // TODO
        props.sortConfigs.forEach((sConf) => {
            model.value[sConf.field] = sConf.defaultValue || SortType.none;
        });
    }
});

// 这个传值顺序必须在 model 配置之后
const { queryParams, goQuery } = useQueryParams<ModelType>(model.value);

// 因为url参数与 date组件的 v-model 格式不同需要格式化
watch(queryParams, () => {
    console.log('emits');
    if (props.dateRangeConfig) {
        dateModel.value = [model.value[props.dateRangeConfig.options[0].value], model.value[props.dateRangeConfig.options[1].value]];
    }

    emits('update', model.value);
}, { immediate: true });

function loopSort(s: SortType) {
    return s === SortType.none
        ? SortType.asc
        : s === SortType.asc
            ? SortType.desc
            : SortType.none;
}

function handleDateChange(v: [string, string]) {
    if (!props.dateRangeConfig) return;
    wrapGo({
        [props.dateRangeConfig.options[0].value]: v[0],
        [props.dateRangeConfig.options[1].value]: v[1],
    });
}

function wrapGo(param: Partial<ModelType>) {
    goQuery(param);
    emits('update', model.value);
}

onMounted(() => {
    // console.log(props);
});

</script>

<template>
  <div class="list-query-control">
    <!-- -->
    <FlexRow horizontal="between" class="lqc-search-row">
        <div>
            <el-input
                v-model="model[searchConfig.field]"
                :placeholder="searchConfig.label"
                class="input-with-select"
                >
                <template #append>
                    <el-button
                        :icon="Search"
                        @click="wrapGo({ [searchConfig.field]: model[searchConfig.field] })"
                    />
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
        <div v-for="fConf in filterOptionsConfigs" :key="fConf.field">
            <el-select
                clearable
                :placeholder="fConf.label"
                v-model="model[fConf.field]"
                @change="wrapGo({ [fConf.field]: model[fConf.field] })"
                >
                <el-option
                    v-for="opt in fConf.options"
                    :key="opt.value"
                    :label="opt.name"
                    :value="String(opt.value)"
                />
            </el-select>
        </div>
        <div v-if="dateRangeConfig">
            <el-date-picker
                type="monthrange"
                unlink-panels
                v-model="dateModel"
                range-separator="~"
                value-format="YYYY-MM-DD"
                @change="handleDateChange"
                :start-placeholder="dateRangeConfig.options[0].name"
                :end-placeholder="dateRangeConfig.options[1].name"
            />
        </div>
        <div>
            <slot name="filter-rest" />
        </div>
        <div
            @click="wrapGo({ [sOpt.field]: loopSort(model[sOpt.field]) })"
            v-for="sOpt in sortConfigs" :key="sOpt.field">
            <Text
                :color="model[sOpt.field] === SortType.none ? 'regular' : 'primary'">
                {{ sOpt.label }}
                <i-ep-sort-up v-if="model[sOpt.field] === SortType.asc" />
                <i-ep-sort-down v-if="model[sOpt.field] === SortType.desc"/>
            </Text>
        </div>
    </FlexRow>
    {{ queryParams }}
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
