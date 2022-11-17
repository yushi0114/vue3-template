<template>
    <div class="user-manage-container">
        <el-tree
            ref="menuTree"
            :data="financeInstitutionMenuTree"
            show-checkbox
            node-key="id"
            :default-expand-all="true"
            :default-checked-keys="institutionItemData.menuIdArr"
        >
        </el-tree>
        <div class="footer">
            <template >
                <el-button size="small" >重 置</el-button>
                <el-button size="small" type="primary" >确 定</el-button>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {financeInstitutionMenuTree} from './institution-menu';
import {institutionItemData} from '../finance-institution';
</script>

<style scoped lang="scss">
.user-manage-container {
    padding: 24px;
    width: 30%;
    max-width: 40%;
}

.footer {
    text-align: left;
    margin: 40px 0;
}
</style>
