<script lang="ts" setup>
import { productRecommandTypeMap, type ProductRecommandType } from '@/enums';

const route = useRoute();

const kind = computed(() => route.params.kind as ProductRecommandType);
const kindName = computed<string>(() => {
    return productRecommandTypeMap[kind.value];
});

</script>

<template>
    <PagePanel class="recommand-create">
        <!-- -->
        <Board full>
            <div>
                <Text size="xl">新建{{ kindName }}</Text>
            </div>

            <el-form>

                <el-form-item :label="`${kindName}名称`">
                    <el-select>

                    </el-select>
                </el-form-item>
                <el-form-item :label="`${kindName}海报`">
                    <el-button>
                        点击上传
                    </el-button>
                </el-form-item>
                <el-form-item label="海报状态">
                    <el-switch />
                </el-form-item>
            </el-form>

            <FlewRow>
                <RouterLink :to="route.path.replace(/\/create\/\d+$/, '')" replace>
                    <el-button>返回</el-button>
                </RouterLink>
                <el-button type="primary">提交</el-button>
            </FlewRow>
        </Board>
    </PagePanel>
</template>

<style lang="postcss">
.recommand-create {
    @apply;
}
</style>
