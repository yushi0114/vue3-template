<script lang="ts" setup>
import { useSidebar } from '@/composables';
import type { DynamicNavEntity } from '@/types';
import SidebarLinkGroup, { type LinkGroupSlotProperty } from './SidebarLinkGroup.vue';

/**
 * expand: 用来控制sidebar 在 pc 上的伸缩隐藏
 * open: 用于控制菜单在移动端的显隐，当菜单隐藏是需要行为外部打开
 */

withDefaults(
    defineProps<{
        options?: DynamicNavEntity[],
        open?: boolean,
    }>(),
    {
        options: () => [],
        open: true,
    }
);

// const emits = defineEmits<{
//     (e: 'expand', expand: boolean): void
//     (e: 'close'): void,
//     (e: 'change', opt: DynamicNavEntity, parent: DynamicNavEntity): void,
// }>();

const { expand, toggleExpand } = useSidebar();
const sidebar = ref<HTMLDivElement>();
const router = useRouter();
const currentRoute = router.currentRoute;

function handleParentBlockClick(parentBlock: LinkGroupSlotProperty) {
    if (!expand.value) {
        toggleExpand(true);

    }
    parentBlock.handleClick();
}
// function handleChange(opt: DynamicNavEntity, parent: DynamicNavEntity) {
//     emits('change', opt, parent);
// }
</script>

<template>
    <!-- Sidebar backdrop (mobile only) -->
    <div class="sidebar-mobile-shadow" :class="{ expand }" aria-hidden="true"></div>
    <div
        class="sidebar"
        ref="sidebar"
        :class="{ expand }"
    >
        <div class="sidebar-content no-scrollbar">
            <!-- <button ref="trigger" class="lg:hidden text-gray-500 hover:text-gray-400" @click.stop="emits('close')"
                aria-controls="sidebar" :aria-expanded="expand">
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                </svg>
            </button> -->
            <template v-for="(opt, i) in options">
                <!-- 有子菜单 -->
                <SidebarLinkGroup
                    v-if="opt.children"
                    :key="i"
                    v-slot="parentLink"
                    :parent-expanded="expand"
                    :activeCondition="currentRoute.fullPath.startsWith(opt.path)">
                    <!-- 子菜单Header -->
                    <FlexRow
                        class="sidebar-root-block" :class="{ active: parentLink.active }"
                        @click.prevent="handleParentBlockClick(parentLink)">
                        <div>
                            <component class="el-icon sidebar-root-icon" :is="opt.icon || 'Folder'" />
                        </div>
                        <a class="sidebar-root-link"
                            :class="{ active: parentLink.active }"
                            href="#0"
                            >
                            <FlexRow horizontal="between"
                                class="sidebar-root-label">
                                    <Text size="sm" color="current">{{ opt.title }}</Text>
                                    <i-ep-arrow-down class="sidebar-drop-arrow" :class="{ expanded: parentLink.expanded }"/>
                            </FlexRow>
                        </a>
                    </FlexRow>
                    <div class="sidebar-sub-list" v-show="parentLink.expanded">
                        <RouterLink
                            v-for="optChild in opt.children"
                            :key="optChild.id"
                            :to="optChild.defaultPath!"
                            custom
                            v-slot="{ href, navigate, isExactActive }">
                            <FlexRow class="sidebar-sub-block">
                                <a
                                    class="sidebar-sub-link"
                                    :class="{ active: isExactActive }"
                                    :href="href"
                                    @click="navigate">
                                    <div>
                                        <component class="el-icon sidebar-sub-icon" :is="optChild.icon || 'Files'" />
                                    </div>
                                    <Text size="sm">{{ optChild.title }}</Text>
                                </a>
                            </FlexRow>
                        </RouterLink>
                    </div>
                </SidebarLinkGroup>

                <!-- 没有子菜单 -->
                <div
                    v-else
                    :key="String(i)"
                >
                    <RouterLink
                        custom
                        v-slot="{ href, navigate, isExactActive }"
                        :to="opt.path || '/'"
                    >
                        <a
                            class="sidebar-root-block"
                            :class="{ active: isExactActive }"
                            :href="href" @click="navigate"
                        >
                            <div>
                                <component class="el-icon sidebar-root-icon" :is="opt.icon || 'Folder'" />
                            </div>
                            <div class="sidebar-root-link" :class="{ active: isExactActive }" >
                                <Text class="sidebar-root-label" size="sm">{{ opt.title }}</Text>
                            </div>
                        </a>
                    </RouterLink>
                </div>
            </template>
        </div>
        <FlexRow
            :horizontal="expand ? 'end' : 'center'"
            class="sidebar-footer">
            <i-ep-fold v-if="expand" @click="toggleExpand(false)" />
            <i-ep-expand v-else @click="toggleExpand(true)" />
        </FlexRow>
    </div>
</template>

<style lang="postcss">

.sidebar {
    @apply
        flex flex-col shrink-0 border-box select-none
        transform transition-all duration-200 ease-in-out // -translate-x-64 lg: translate-x-0
        w-20
        overflow-y-hidden
        ;

        background-color: var(--deep-bg-color);
    &.expand {
        @apply w-64;
        /* @apply translate-x-0; */
    }

    & li {
        @apply pl-2;
    }
}

.sidebar-content {
    @apply flex-1 flex flex-col flex-nowrap overflow-y-auto px-4 pt-2;
}

.sidebar-root-block {
    @apply flex items-center px-3 h-10 rounded-sm mb-0.5;
    color: #5E5E5E;
    &.active {
        color: var(--el-color-primary);
        background: var(--el-color-primary-light-9);
    }
    &:hover {
        color: var(--el-color-primary);
    }
}


.el-icon.sidebar-root-icon {
    @apply h-6 w-6 mt-0.5;
}

.el-icon.sidebar-sub-icon {
    @apply h-4 w-4 mt-1;
}

.sidebar-root-link {
    @apply flex flex-1 truncate;
}

.sidebar-root-label {
    @apply
        flex-1
        text-sm font-medium ml-3
        truncate
        lg:sidebar-expanded:opacity-100
        2xl:opacity-100 duration-200
    ;
}

.sidebar-drop-arrow {
    @apply text-md transform transition-all duration-200 ease-in-out;

    &.expanded {
        @apply rotate-180;
    }
}

.sidebar-sub-list {
    @apply pb-2;
}


.sidebar-sub-block {
    @apply h-8 text-sm pl-12;
}

.sidebar-sub-link {
    @apply flex transition duration-150 truncate items-center gap-1;

    color: var(--el-text-color-regular);

    &:hover, &.active {
        color: var(--el-color-primary);
    }
}

.sidebar-mobile-shadow {
    @apply fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 opacity-0 pointer-events-none;

    &.open {
        @apply opacity-100;
    }
}

.sidebar-footer {
    @apply py-2 text-2xl px-4;
    color: var(--el-text-color-secondary);
}


</style>
