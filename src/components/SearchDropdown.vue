<script lang="ts" setup>
import type { PlainOption } from '@/types';
import { Search } from '@element-plus/icons-vue';
import { isNumber } from 'lodash';


const props = withDefaults(
    defineProps<{
        searchPlaceholder?: string,
        searchable?: boolean,
        options?: PlainOption[],
        maxHeight?: string | number
    }>(),
    {
        searchPlaceholder: '',
        searchable: false,
        options: () => ([]),
        maxHeight: 300
    },
);


const dropdown = ref();
const searchRef = ref<HTMLInputElement>();
const search = ref('');
const width = ref(0);
const calcMaxHeight = computed(() => isNumber(props.maxHeight) ? props.maxHeight + 'px' : props.maxHeight);

const emits = defineEmits<{
    (e: 'change', opt: PlainOption): void
    (e: 'visible-change', visible: boolean): void
}>();

defineExpose({
    handleClose: clear
});

const filterOptions = computed<PlainOption[]>(() => props.options.filter(opt => opt.name.indexOf(search.value) >= 0));

function handleCommand(opt: PlainOption) {
    emits('change', opt);
    clear();
    dropdown.value?.handleClose();
}

function visibleAutoFocus(visible: boolean) {
    emits('visible-change', visible);
    if (!props.searchable || !searchRef.value || !visible) return;
    searchRef.value.focus();

    nextTick(() => {
        if (width.value === 0) {
            const maxWidth = dropdown.value.$el.querySelector('.el-scrollbar__wrap')?.offsetWidth ?? 0;
            if (maxWidth > width.value) width.value = maxWidth;
            // dropdown.value.$el.width = width.value + 'px';
            dropdown.value.$el.querySelector('.el-popper')!.style.width = width.value + 'px';
        }
    });
}

function clear() {
    nextTick(() => {
        search.value = '';
    });
}

</script>

<template>
  <el-dropdown
    ref="dropdown"
    class="i-search-dropdown"
    :class="{ searchable }"
    :max-height="calcMaxHeight"
    trigger="click"
    v-bind="$attrs"
    :teleported="false"
    @command="handleCommand"
    @visible-change="visibleAutoFocus"
    >
    <!-- -->
    <slot></slot>
    <template #dropdown>
        <!-- 放在 dropdown menu 里会导致输入框无法输入 -->
        <div
            class="isd-search"
            v-if="searchable">
            <el-input
                v-model="search"
                :prefix-icon="Search"
                ref="searchRef"
                clearable
                :placeholder="searchPlaceholder" />
        </div>
        <div v-if="filterOptions.length > 0" class="isd-list">
            <div
                v-for="(opt, i) in filterOptions"
                @click="() => handleCommand(opt)"
                :key="i"
                class="isd-list-item">
                <Text color="current" size="sm">{{ opt.name }}</Text>
            </div>
        </div>
        <FlexRow
            v-else
            horizontal="center"
            class="isd-empty">
            <el-empty description="无数据" />
        </FlexRow>
    </template>
  </el-dropdown>
</template>

<style lang="scss">
$searchHeight: 50px;
.i-search-dropdown {

    & .el-dropdown__popper {
        position: relative;
    }

    &.searchable {

        & .el-scrollbar__view.el-dropdown__list {
            height: v-bind(calcMaxHeight);
        }

        & .el-scrollbar__thumb {
            display: none;
        }
    }
}

.isd-search {
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    left: 0;
    padding: $gap-xs $gap-xs 0;
    background: $bg-color;
}

.isd-empty {
    min-width: 200px;
    box-sizing: border-box;
    padding-top: $searchHeight;
    height: v-bind(calcMaxHeight);

    & .el-empty {
        padding: 0;
    }
}

.isd-list {
    overflow-y: auto;
    .searchable & {
        margin-top: $searchHeight;
        height: calc(v-bind(calcMaxHeight) - $searchHeight);
    }
}

.isd-list-item {
    padding: $gap-xs $gap-md;
    cursor: pointer;
    transition: .2s ease all;
    white-space: nowrap;

    &:hover {
        background-color: $color-primary-light-9;
        color: $color-primary;
    }
}
</style>
