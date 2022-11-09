<script lang="ts" setup>
import type { DynamicNavEntity } from '@/types';
import { useLocalStorage } from '@vueuse/core';
import SidebarLinkGroup from './SidebarLinkGroup.vue';

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
//     (e: 'close'): void,
//     (e: 'change', opt: DynamicNavEntity, parent: DynamicNavEntity): void,
// }>();

const expand = useLocalStorage('SJZX_DMS_SIDEBAR_EXPAND', false);
const sidebar = ref<HTMLDivElement>();
const router = useRouter();
const currentRoute = router.currentRoute;

// function handleChange(opt: DynamicNavEntity, parent: DynamicNavEntity) {
//     emits('change', opt, parent);
// }
</script>

<template>
    <!-- Sidebar backdrop (mobile only) -->
    <div class="sidebar-mobile-shadow" :class="{ expand }" aria-hidden="true"></div>
    <div
        class="sidebar no-scrollbar"
        ref="sidebar"
        :class="{ expand }"
    >
        <FlexRow horizontal="center" class="logo-container">
            <slot name="logo"></slot>
        </FlexRow>
        <div class="sidebar-content">
            <!-- <button ref="trigger" class="lg:hidden text-gray-500 hover:text-gray-400" @click.stop="emits('close')"
                aria-controls="sidebar" :aria-expanded="expand">
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                </svg>
            </button> -->
            <div>
                <template v-for="(opt, i) in options">
                    <!-- 有子菜单 -->
                    <SidebarLinkGroup
                        v-if="opt.children"
                        :key="i"
                        v-slot="parentLink"
                        :activeCondition="currentRoute.fullPath.includes('ecommerce')">
                        <!-- 子菜单Header -->
                        <FlexRow
                            class="sidebar-root-block"
                            @click.prevent="expand ? parentLink.handleClick() : expand = true">
                            <component class="el-icon sidebar-root-icon" :is="'ForkSpoon'" />
                            <a class="sidebar-root-link"
                                :class="currentRoute.fullPath.includes('ecommerce') && 'TODO'"
                                href="#0"
                                >
                                <FlexRow horizontal="between"
                                    class="sidebar-root-label">
                                        {{ opt.label }}
                                        <i-ep-arrow-down class="sidebar-drop-arrow" :class="{ expanded: parentLink.expanded }"/>
                                </FlexRow>
                            </a>
                        </FlexRow>
                        <div class="sidebar-sub-list" v-show="parentLink.expanded && expand">
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
                                        <span class="sidebar-sub-label">{{ optChild.label }}</span>
                                    </a>
                                </FlexRow>
                            </RouterLink>
                        </div>
                    </SidebarLinkGroup>

                    <!-- 没有子菜单 -->
                    <RouterLink v-else :key="String(i)" custom v-slot="{ href, navigate, isExactActive }"
                        :to="opt.defaultPath || '/'">
                        <a class="sidebar-root-block" :class="{ active: isExactActive }" :href="href" @click="navigate">
                            <component class="el-icon sidebar-root-icon" :is="'ForkSpoon'" />
                            <div class="sidebar-root-link" :class="{ active: isExactActive }" >
                                <span class="sidebar-root-label">{{ opt.label }}</span>
                            </div>
                        </a>
                    </RouterLink>
                </template>
            </div>
        </div>
        <FlexRow
            :horizontal="expand ? 'end' : 'center'"
            class="sidebar-footer">
            <i-ep-fold v-if="expand" @click="expand = false" />
            <i-ep-expand v-else @click="expand = true" />
        </FlexRow>
    </div>
</template>

<style lang="postcss">

.sidebar {
    @apply
        flex flex-col shrink-0 border-box select-none
        transform transition-all duration-200 ease-in-out // -translate-x-64 lg: translate-x-0
        absolute z-10 left-0 top-0 h-screen lg:static lg:left-auto lg:top-auto
        w-12
        overflow-y-scroll
        px-4
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

.logo-container {
    @apply h-20;
}

.sidebar-content {
    @apply flex-1;
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

.sidebar-root-icon {
    font-weight: bold;
    @apply font-medium text-2xl w-6 h-6;
}

.sidebar-root-link {
    @apply flex flex-1 truncate transition duration-150;
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
    @apply;
}


.sidebar-sub-block {
    @apply h-8 text-sm pl-11;
    &:hover {
        /* background-color: #E9F2FF; */
    }
}

.sidebar-sub-link {
    @apply block transition duration-150 truncate;

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
    @apply py-2 text-2xl;
    color: var(--el-text-color-secondary);
}


</style>
