<template>
    <el-descriptions :column="2" border>
        <el-descriptions-item>
            <template #label>
                <i class="el-icon-school"></i>
                机构名称
            </template>
            {{ institutionItemData.orgName }}
        </el-descriptions-item>
        <el-descriptions-item :contentStyle="{ 'text-align': 'left' }">
            <template #label>
                <i class="el-icon-key"></i>
                机构密钥
            </template>
            <el-button disabled type="text" size="small" class="secret">
                {{ institutionItemData.secretKey }}
            </el-button>
            <el-button
                type="primary"
                plain
                size="small"
                :disabled="institutionItemData.status === 0"
                @click="copyHandle(institutionItemData.secretKey)">
                <template #icon>
                    <Icon :name="'ep:document-copy'"></Icon>
                </template>
                复制
            </el-button>
            <el-button
                type="success"
                plain
                size="small"
                :disabled="institutionItemData.status === 0"
                @click="refreshSecret">
                <template #icon>
                    <Icon :name="'ep:refresh'"></Icon>
                </template>

                刷新
            </el-button>
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <i class="el-icon-office-building"></i>
                机构描述
            </template>
            {{ institutionItemData.desc || '暂无' }}
        </el-descriptions-item>
    </el-descriptions>
</template>

<script lang="ts" setup>
import { currentInstitutionId, getInstitutionItem, institutionItemData, refreshSecretKey } from './finance-institution';
import { ElMessageBox } from 'element-plus';
import Icon from '@/components/Icon.vue';
import { LoadingService } from '@/views/system/loading-service';

function copyHandle(params: string) {
    let input = document.createElement('input');
    input.value = params;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
    ElMessage.success({
        message: '已复制',
        type: 'success'
    });
}

function refreshSecret() {
    ElMessageBox.confirm(
        `确定刷新“${institutionItemData.value?.orgName}”的机构密钥吗？刷新后金融栈应用服务平台将无法登录，请及时通知金融机构新的机构密钥！`,
        '提示',
        {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(async () => {
        await refreshSecretKey({
            id: currentInstitutionId.value
        });
        LoadingService.getInstance().loading();
        await getInstitutionItem(currentInstitutionId.value);
        LoadingService.getInstance().stop();
    }).catch(() => {
    });
}
</script>

<style scoped lang="scss">
.el-descriptions ::v-deep .el-descriptions-item__label {
    width: 100px;
    min-width: 100px;
}

.secret {
    width: 80px;
    min-width: 80px;
    box-sizing: border-box;
    font-size: 14px;
    color: #606266;
}

.secret:hover {
    color: #606266;
}
</style>
