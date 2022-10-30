<script lang="ts" setup>
import { useApi, useQueryParams } from '@/composables';
import type { PlainOption } from '@/types';
import { onBeforeMount, ref, watch } from 'vue';
import { PagePanel } from '@/widgets';

// 这里是示例, 类型应该放到types文件夹中
// #region
interface Entity {
    id: string,
    name: string,
    type: EntityType,
    count: number,
    state: EntityState,
}

enum EntityState {
    off = 0,
    soldout = 1,
    on = 2,
}

const entityStateMap = Object.freeze({
    [EntityState.off]: '下架中',
    [EntityState.soldout]: '售罄',
    [EntityState.on]: '上架中',
});

enum EntityType {
    S = '1', M = '2', L = '3', XL = '4'
}

// in @/common/const.ts file
const entityTypeMap = Object.freeze({
    [EntityType.S]: 'S',
    [EntityType.M]: 'M',
    [EntityType.L]: 'L',
    [EntityType.XL]: 'XL',
});

// 尽量避免使用关键字 e.g. readonly PlainOption
const entityTypeOptions: Readonly<PlainOption[]> = Object.freeze([
    { value: EntityType.S, name: entityTypeMap[EntityType.S] },
    { value: EntityType.M, name: entityTypeMap[EntityType.M] },
    { value: EntityType.L, name: entityTypeMap[EntityType.L] },
    { value: EntityType.XL, name: entityTypeMap[EntityType.XL] },
]);

// in @/api; fold
type EntitiesPayload = {
    page: number,
    search: string
    type: string
}

type EntitiesResponse = Entity[];

function fetchEntities(payload: EntitiesPayload) {
    return new Promise<EntitiesResponse>((resolve) => {
        setTimeout(() => {
            console.log(payload);
            resolve([
                { id: '1', name: 'T-shirt', state: EntityState.on, count: 123, type: EntityType.S },
                { id: '2', name: 'skirt', state: EntityState.soldout, count: 0, type: EntityType.L },
                { id: '3', name: 'skirt', state: EntityState.off, count: 500, type: EntityType.XL },
            ].filter(item => item.type === payload.type));
        }, 1000);
    });
}


// #endregion


interface EntityParams extends Omit<EntitiesPayload, 'page'> {
    page: string,
}

const search = ref('');
const { queryParams, goQuery } = useQueryParams<EntityParams>({
    page: '1',
    search: '',
    type: EntityType.XL,
});
const list = ref<Entity[]>([]);

const { loading, load } = useApi(fetchEntities);

function getList(queryParams: EntityParams) {
    const payload: EntitiesPayload = {
        ...queryParams,
        page: Number(queryParams.page),
    };

    return load(payload)
        .then((res) => {
            list.value = res;
        });
}

// 1.
watch(queryParams.value, () => {
    getList(queryParams.value);
});

onBeforeMount(() => {
    getList(queryParams.value);
});

// 2.
// watch(queryParams.value, () => {
//     getList(queryParams.value);
// }, { immediate: true });

</script>

<template>
    <PagePanel class="demo-table">
        <!-- -->

        {{ loading ? 'loading' : 'loaded' }}

        <div>
            <input v-model="search" @blur="goQuery({ search })" />
        </div>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>State</th>
                    <th>Opt</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ entityTypeMap[item.type] }}</td>
                    <td>{{ entityStateMap[item.state] }}</td>
                    <td><button>OFF</button><button>ON</button></td>
                </tr>
            </tbody>
        </table>

        <div class="demo-table-pagination">
            <span
                @click="goQuery({ type: opt.value })"
                :class="{ active: queryParams.type === opt.value }"
                v-for="opt in entityTypeOptions"
                :key="opt.value"
            >{{ opt.name }}</span>
        </div>
        <div class="demo-table-pagination">
            <span
                @click="goQuery({ page: `${n}` })"
                :class="{ active: queryParams.page === `${n}` }"
                v-for="n in 8"
                :key="n"
            >{{ n }}</span>
        </div>
    </PagePanel>
</template>

<style lang="postcss">
.demo-table {
    @apply;
}

.demo-table-pagination {
    @apply flex gap-2 py-4;
    & span {
        @apply px-1 bg-gray-300 text-dark-300 cursor-pointer;

        &.active {
            @apply bg-indigo-600 text-light-700;
        }
    }
}
</style>
