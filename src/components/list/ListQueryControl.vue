<script lang="ts" setup>
import ListMenu from './ListMenu.vue';
// import { useQueryParams } from '@/composables';
import { UseMouseInElement } from '@vueuse/components';
import { useTemplateRefsList, useVModel } from '@vueuse/core';
import type { PlainOption } from '@/types';
import { SortType } from '@/enums';
import { Search } from '@element-plus/icons-vue';
import type { ElDropdown } from 'element-plus';
import { getNextMonth, isString } from '@/utils';

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
        checkAll?: boolean,
        isIndeterminate?: boolean,
        showSelection?: boolean,
        searchConfig?: ControlConfig,
        typeOptionsConfigs?: ControlOptionConfig[]
        filterOptionsConfigs?: ControlOptionConfig[]
        sortConfigs?: ControlConfig[],
        dateRangeConfig?: ControlOptionConfig,
        filterRowVisible?: boolean
    }>(),
    {
        filterRowVisible: true,
    }
);

const emits = defineEmits<{
    (e: 'update', model: any): void;
    (e: 'update:modelValue', modelValue: any): void
    (e: 'update:checkAll', checkAll: boolean): void
    (e: 'change-check-all'): void
}>();

type ModelType = any
type DropdownLabelMapType = any
const model = reactive<ModelType>({});
const dropdownLabelMap = reactive<DropdownLabelMapType>({});
const modelCheckAll = useVModel(props, 'checkAll', emits);
const searchTipVisible = ref(false);

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
            dropdownLabelMap[key] = model[key];
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

function checkSearchInput(val: any) {
    const vaild = isString(val) && (val.length >= 2 || val.length === 0);
    searchTipVisible.value = !vaild;
    return vaild;
}

function handleSearch(val: any) {
    const valid = checkSearchInput(val);
    if (!valid) return;
    wrapGo();
}

// onMounted(() => {
//     wrapGo();
// });

function disableDate(d: Date) {
    return d >= getNextMonth();
}

const refs = useTemplateRefsList<typeof ElDropdown>();
const handleDropdownChange = ({ option, fConf }: { option: PlainOption<any>;fConf: ControlOptionConfig<any> }) => {
    model[fConf.field] = option.value;
    dropdownLabelMap[fConf.field] = option.name;
    wrapGo();
};

const handleDropdownClear = (fConf: ControlOptionConfig<any>, index: number) => {
    if (refs.value[index]) {
        nextTick(() => {
            refs.value[index].handleClose();
        });
    }
    model[fConf.field] = undefined;
    dropdownLabelMap[fConf.field] = undefined;
    wrapGo();
};

</script>

<template>
  <div class="list-query-control">
    <FlexRow
        class="lqc-type-row"
        vertical="start"
        v-if="typeOptionsConfigs">
        <ListMenu :menu="typeOptionsConfigs" multiple :multiple-fields="['taxGradeArr', 'steTypeArr', 'loanEndArr', 'longestOverdueArr']" v-model="model" @change="wrapGo"></ListMenu>
        <!-- <div class="lqc-type-item" v-for="tConf in typeOptionsConfigs" :key="tConf.field">
            <Text size="sm" color="regular">{{ tConf.label }}:</Text>
            <el-button-group size="small" >
                <el-button
                    v-for="opt in tConf.options || []"
                    :key="opt.value"
                    text
                    :type="model[tConf.field] === opt.value ? 'primary' : ''"
                    @click="handleRadioClick(tConf.field, opt.value)"
                >
                    {{ opt.name }}
                </el-button>
            </el-button-group>
        </div> -->
    </FlexRow>
    <!-- -->
    <div class="lqc-filter-wrapper">
        <FlexRow horizontal="between" class="lqc-search-row">
            <div v-if="searchConfig">
                <el-input
                    v-model.trim="model[searchConfig.field]"
                    size="large"
                    clearable
                    :placeholder="searchConfig.label"
                    @clear="handleSearch(model[searchConfig!.field] = '')"
                    class="lqc-search-input"
                    @input="checkSearchInput(model[searchConfig!.field])"
                    @keyup.enter="handleSearch(model[searchConfig!.field])"
                    >
                    <template #append>
                        <el-button
                            :icon="Search"
                            @click="handleSearch(model[searchConfig!.field])"
                        />
                    </template>
                </el-input>
            </div>
            <el-alert v-if="searchTipVisible" class="lqc-search-tip" :closable="false" show-icon title="输入内容不能少于2个字符" type="error" />
            <FlexRow horizontal="end" class="lqc-search-rest">
                <slot name="search-rest" />
            </FlexRow>
        </FlexRow>
        <FlexRow
            class="lqc-filter-row" v-if="filterRowVisible">
            <el-checkbox
                class="lqc-filter-checkbox"
                v-if="showSelection"
                v-model="modelCheckAll"
                :indeterminate="isIndeterminate"
                @change="emits('change-check-all')"
                ></el-checkbox
            >
            <div class="lqc-filter-item" v-for="(fConf, index) in filterOptionsConfigs" :key="fConf.field">
                <el-dropdown
                    :ref="refs.set"
                    trigger="click"
                    :max-height="300"
                    @command="handleDropdownChange">
                    <UseMouseInElement v-slot="{ isOutside }">
                        <FlexRow class="lqc-filter-dropname">
                            <Text color="regular" size="sm" bold>{{ dropdownLabelMap[fConf.field] || fConf.label }}</Text>
                            <Text color="regular" size="sm"><i-ep-arrow-down v-show="isOutside || !dropdownLabelMap[fConf.field]"/></Text>
                            <Text color="regular" size="sm"><i-ep-circle-close v-show="!isOutside && dropdownLabelMap[fConf.field]"  @click="handleDropdownClear(fConf, index)"/></Text>
                        </FlexRow>
                    </UseMouseInElement>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                v-for="option in fConf.options"
                                :key="option.name"
                                :command="{option, fConf}">
                                {{ option.name }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <!-- <el-select
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
                </el-select> -->
            </div>
            <FlexRow class="lqc-date-item" gap="xs" v-if="dateRangeConfig">
                <Text size="sm" bold color="regular">{{ dateRangeConfig.label }}：</Text>
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
            </FlexRow>
            <div class="lqc-filter-rest">
                <slot name="filter-rest" />
            </div>
            <div
                class="lqc-sort-item"
                @click="handleSort(sOpt.field, loopSort(model[sOpt.field]))"
                v-for="sOpt in sortConfigs" :key="sOpt.field">
                <Text size="sm" color="regular" bold>
                    {{ sOpt.label }}
                </Text>
                <SortArrow :sort="model[sOpt.field]" />
            </div>
        </FlexRow>
        <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.list-query-control {
    display: flex;
    gap: $gap-xs;
}

.lqc-filter-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
}

.lqc-search-row {
    padding-top: $gap-xs;
    margin-bottom: $gap-lg;
}

.lqc-search-input {
    width: 350px;
}

.lqc-search-tip {
    margin: 0 $gap-xs;
    width: 220px;
    & .el-alert__content {
        display: flex;
        align-items: center;
    }
}

.lqc-type-row {
    padding: $gap-xs;
    margin-right: $gap-xs;
    padding-right: $gap-lg;
    width: 220px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: $border;
}
.lqc-filter-row {
    border-radius: 4px;
    padding: $gap-xs $gap-md;
    background-color: $color-info-light-9;
    gap: $gap-lg;
    min-height: 2rem;
}

.lqc-filter-row .lqc-filter-checkbox {
    margin-left: 6px;
    margin-right: $gap-md;
}

.lqc-filter-item {
}

.lqc-filter-dropname {
    cursor: pointer;

    & svg {
        display: block;
        width: 1em;
        height: 1em;
        margin-top: $gap-line;
        margin-left: calc($gap-xs / 2);
    }
}

.lqc-search-rest {
    flex: 1;
}

.lqc-sort-item {
    cursor: pointer;
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
