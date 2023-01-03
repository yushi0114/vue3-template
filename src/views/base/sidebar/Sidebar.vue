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

</script>

<template>
    <div
        class="sidebar"
        ref="sidebar"
        :class="{ expand }"
    >
        <div class="sidebar-content no-scrollbar">
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
                            <!-- <component class="el-icon sidebar-root-icon" :is="opt.icon || 'Folder'" /> -->
                            <Icon class="sidebar-root-icon" :name="opt.icon || 'ep-folder'" />
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
                    <div class="sidebar-sub-list" v-show="parentLink.expanded && expand">
                        <RouterLink
                            v-for="optChild in opt.children"
                            :key="optChild.id"
                            :to="optChild.defaultPath!"
                            custom
                            v-slot="{ href, navigate, isExactActive }">
                            <FlexRow class="sidebar-sub-block" @click="navigate">
                                <a
                                    class="sidebar-sub-link"
                                    :class="{ active: isExactActive || currentRoute.fullPath.replace(/\d+$/, '').startsWith(href.replace(/\/\d+$/, '')) }"
                                    :href="href">
                                    <div>
                                        <Icon class="sidebar-sub-icon" :name="optChild.icon || 'ep-files'" />
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
                                <Icon class="sidebar-root-icon" :name="opt.icon || 'ep-folder'" />
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
            <Text color="regular">
                <i-ep-fold v-if="expand" @click="toggleExpand(false)" />
                <i-ep-expand v-else @click="toggleExpand(true)" />
            </Text>
        </FlexRow>
    </div>
</template>

<style lang="scss">

.sidebar {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    box-sizing: border-box;
    user-select: none;
    transition: .2s ease-in-out all;
    overflow-y: hidden;

    width: 4.5rem;
    background-color: var(--deep-bg-color);

    &.expand {
        width: 16rem;
    }

    & li {
        padding-left: 0.5rem;
    }
}

.sidebar-content {
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    overflow-y: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
}

.sidebar-root-block {
    display: flex;
    align-items: center;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    height: 2.5rem;
    border-radius: 0.125rem;
    margin-bottom: 0.125rem;

    color: var(--el-text-color-regular);
    &.active {
        color: var(--el-color-primary);
        background: var(--el-color-primary-light-9);
    }
    &:hover {
        color: var(--el-color-primary);
    }
}


.sidebar-root-icon {
    margin-top: 0.125rem;
    width: 1rem;
    height: 1rem;
    font-weight: bold;
    cursor: pointer;
}

.sidebar-sub-icon {
    width: 1rem;
    height: 1rem;
    margin-top: 0.125rem;
}

.sidebar-root-link {
    /* @apply flex flex-1 truncate; */
    display: flex;
    flex: 1;
    cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.sidebar-root-label {
    flex: 1 1 0%;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    margin-left: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.sidebar-drop-arrow {
    transition: .2s ease-in-out all;

    &.expanded {
        transform: rotateZ(180deg);
    }
}

.sidebar-sub-list {
    padding-bottom: 0.5rem;
}


.sidebar-sub-block {
    height: 2rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding-left: 2.25rem;
    cursor: pointer;
}

.sidebar-sub-link {
    display: flex;
    align-items: center;
    transition: .15s ease-in-out all;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    grid-gap: 0.25rem;
    gap: 0.25rem;

    color: var(--el-text-color-regular);

    &:hover, &.active {
        color: var(--el-color-primary);
    }
}

.sidebar-footer {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    line-height: 2rem;
    color: var(--el-text-color-secondary);

    & svg {
        cursor: pointer;
        width: 1.5rem;
        height: 1.5rem;
    }
}


</style>
