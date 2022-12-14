<script lang="ts" setup>
import type { PlainOption } from '@/types';
import { Search } from '@element-plus/icons-vue';

const dropdown = ref();
const searchRef = ref<HTMLInputElement>();
const menuRef = ref<HTMLDivElement>();
const search = ref('');
const width = ref(0);
const props = withDefaults(
    defineProps<{
        searchPlaceholder?: string,
        searchable?: boolean,
        options?: PlainOption[]
    }>(),
    {
        searchPlaceholder: '',
        searchable: false,
        options: () => ([])
    },
);

const emits = defineEmits<{
    (e: 'change', opt: PlainOption): void
    (e: 'visible-change', visible: boolean): void
}>();

defineExpose({
    handleClose: clear
});

const filterOptions = computed<PlainOption[]>(() => props.options.filter(opt => opt.name.indexOf(search.value) >= 0));

function handleCommand({ opt }: { opt: PlainOption }) {
    emits('change', opt);
    clear();
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
    :max-height="300"
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
        <el-dropdown-menu ref="menuRef" v-if="filterOptions.length > 0" class="isd-drop-container" :class="{ searchable }">
            <el-dropdown-item
                v-for="(opt, i) in filterOptions"
                :key="i"
                :command="{ opt }"
            >{{ opt.name }}</el-dropdown-item>
        </el-dropdown-menu>
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
.i-search-dropdown {

    & .el-dropdown__popper {
        position: relative;
    }
}

.isd-search {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    padding: $gap-xs $gap-xs 0;
    background: $bg-color;
}

.isd-drop-container {
    position: static;
    height: 100%;
    overflow-y: auto;

    &.searchable {
        padding-top: calc($gap-xs * 2 + 30px);
    }
}

.isd-empty {
    min-width: 200px;
    min-height: 300px;
}
</style>
