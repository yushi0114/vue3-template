<script lang="ts" setup>
// import { useQueryParams } from '@/composables';
import type { PlainOption } from '@/types';
import { SortType } from '@/enums';
import { Search } from '@element-plus/icons-vue';
import { getNextMonth } from '@/utils';
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
        modelValue?: any,
        searchConfig?: ControlConfig,
        typeOptionsConfigs?: ControlOptionConfig[]
        filterOptionsConfigs?: ControlOptionConfig[]
        sortConfigs?: ControlConfig[],
        dateRangeConfig?: ControlOptionConfig,
    }>(),
    {
    }
);

const emits = defineEmits<{
    (e: 'update', model: any): void;
    (e: 'update:modelValue', modelValue: any): void
}>();

type ModelType = any
const model = reactive<ModelType>({});

watch(() => props.searchConfig, () => {
    if (props.searchConfig) {
        if (model[props.searchConfig.field] === undefined) {
            model[props.searchConfig.field] = props.searchConfig.defaultValue;
        }
    }
}, { immediate: true });

watch(() => props.typeOptionsConfigs, () => {
    if (Array.isArray(props.typeOptionsConfigs)) {
        props.typeOptionsConfigs.forEach((tConf) => {
            if (model[tConf.field] === undefined) {
                model[tConf.field] = tConf.defaultValue;
            }
        });
    }
}, { immediate: true });

watch(() => props.filterOptionsConfigs, () => {
    if (Array.isArray(props.filterOptionsConfigs)) {
        props.filterOptionsConfigs.forEach((fConf) => {
            if (model[fConf.field] === undefined) {
                model[fConf.field] = fConf.defaultValue;
            }
        });
    }
}, { immediate: true });

watch(() => props.dateRangeConfig, () => {
    if (props.dateRangeConfig) {
        if (model.DATE === undefined) {
            model.DATE = props.dateRangeConfig.defaultValue;
        }
    }
}, { immediate: true });

watch(() => props.sortConfigs, () => {
    if (Array.isArray(props.sortConfigs)) {
        props.sortConfigs.forEach((sConf) => {
            if (model[sConf.field] === undefined) {
                model[sConf.field] = sConf.defaultValue || SortType.none;
            }
        });
    }
}, { immediate: true });

watch(props.modelValue, (newModel) => {
    Object.keys(newModel).forEach((key) => {
        if (newModel[key] !== model[key]) {
            model[key] = newModel[key];
        }
    });

    if (props.dateRangeConfig) {
        const start = newModel[props.dateRangeConfig.options[0].value];
        const until = newModel[props.dateRangeConfig.options[1].value];
        if (start || until) {
            model.DATE = [start, until];
        }
        else {
            model.DATE = null;
        }
    }

}, { immediate: true });

function loopSort(s: SortType) {
    return s === SortType.asc || s === SortType.none
        ? SortType.desc
        : SortType.asc;
}

function wrapGo() {
    // goQuery(param);

    let params: any = {};

    if (props.searchConfig) {
        params[props.searchConfig.field] = model[props.searchConfig.field];
    }

    if (Array.isArray(props.typeOptionsConfigs)) {
        props.typeOptionsConfigs.forEach((tConf) => {
            params[tConf.field] = model[tConf.field];
        });
    }

    if (Array.isArray(props.filterOptionsConfigs)) {
        props.filterOptionsConfigs.forEach((fConf) => {
            params[fConf.field] = model[fConf.field];
        });
    }

    if (props.dateRangeConfig) {
        const modelDate = model.DATE;
        params[props.dateRangeConfig.options[0].value] = modelDate ? modelDate[0] : '';
        params[props.dateRangeConfig.options[1].value] = modelDate ? modelDate[1] : '';
    }


    if (Array.isArray(props.sortConfigs)) {
        props.sortConfigs.some((sConf) => {
            const sortValue = model[sConf.field];
            if (sortValue !== SortType.none) {
                params['sortField'] = sConf.field;
                params['sortType'] = sortValue;

                return true;
            }
        });
    }

    emits('update:modelValue', Object.assign(props.modelValue, params));
}

function handleSort(sField: string, sValue: SortType) {
    props.sortConfigs?.forEach((sConf) => {
        model[sConf.field] = sConf.field === sField ? sValue : SortType.none;
    });
    wrapGo();
}

// onMounted(() => {
//     wrapGo();
// });

function disableDate(d: Date) {
    return d >= getNextMonth();
}

function handleRadioClick(tField: string, tValue: any) {
    model[tField] = model[tField] === tValue ? '' : tValue;
    wrapGo();
}
</script>

<template>
  <div class="list-query-control">
    <!-- -->
    <FlexRow horizontal="between" class="lqc-search-row">
        <div v-if="searchConfig">
            <el-input
                v-model="model[searchConfig.field]"
                :placeholder="searchConfig.label"
                class="input-with-select"
                >
                <template #append>
                    <el-button
                        :icon="Search"
                        @click="wrapGo"
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
        v-if="typeOptionsConfigs">
        <div class="lqc-type-item" v-for="tConf in typeOptionsConfigs" :key="tConf.field">
            <Text size="sm" color="regular">{{ tConf.label }}:</Text>
            <el-button-group size="small" >
                <el-button
                    v-for="opt in tConf.options || []"
                    :key="opt.value"
                    text
                    :type="model[tConf.field] === opt.value ? 'primary' : 'plain'"
                    @click="handleRadioClick(tConf.field, opt.value)"
                >
                    {{ opt.name }}
                </el-button>
            </el-button-group>
        </div>
    </FlexRow>
    <FlexRow
        class="lqc-filter-row">
        <div class="lqc-filter-item" v-for="fConf in filterOptionsConfigs" :key="fConf.field">
            <el-select
                clearable
                :placeholder="fConf.label"
                v-model="model[fConf.field]"
                @change="wrapGo"
                >
                <el-option
                    v-for="opt in fConf.options"
                    :key="opt.value"
                    :label="opt.name"
                    :value="opt.value"
                />
            </el-select>
        </div>
        <div class="lqc-date-item" v-if="dateRangeConfig">
            <el-date-picker
                type="monthrange"
                unlink-panels
                v-model="model.DATE"
                range-separator="~"
                value-format="YYYYMM"
                @change="wrapGo"
                :disabled-date="disableDate"
                :start-placeholder="dateRangeConfig.options[0].name"
                :end-placeholder="dateRangeConfig.options[1].name"
            />
        </div>
        <div class="lqc-filter-rest">
            <slot name="filter-rest" />
        </div>
        <div
            class="lqc-sort-item"
            @click="handleSort(sOpt.field, loopSort(model[sOpt.field]))"
            v-for="sOpt in sortConfigs" :key="sOpt.field">
            <Text
                size="sm"
                :color="model[sOpt.field] === SortType.none ? 'regular' : 'primary'">
                {{ sOpt.label }}
                <i-ep-sort-up v-if="model[sOpt.field] === SortType.asc" />
                <i-ep-sort-down v-else />
            </Text>
        </div>
    </FlexRow>
  </div>
</template>
<style lang="postcss">
.lqc-type-row {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
}
</style>
<style lang="scss">
.list-query-control {
}

.lqc-search-row {

}

.lqc-search-row {
    margin-bottom: $gap-md;
}

.lqc-type-row,
.lqc-filter-row {
    border-radius: 4px;
    padding: $gap-xs $gap-md;
    margin-bottom: $gap-xs;
    background-color: var(--el-color-info-light-9);
    gap: $gap-xs;
}


.lqc-filter-item {
    margin-right: $gap-xs;
}

.lqc-search-rest {
    flex: 1;
}

.lqc-sort-item {
    cursor: pointer;
    margin-left: $gap-xs;

    & svg {
        transform: translateY(2px);
        width: 15px;
        height: 15px;
    }
}

.lqc-type-item {
    display: inline-flex;
    align-items: center;
    & .i-text {
        margin-right: $gap-xs;
    }
}

.lqc-filter-rest {
    flex: 1;
}
</style>
