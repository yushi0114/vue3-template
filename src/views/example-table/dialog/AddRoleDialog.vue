<template>
    <el-dialog v-model="visible" width="80%" :title="`角色管理-${isEdit}`" :close="onClose">
        <sjc-form
            ref="sjcForm"
            :def="ROLE_FORM"
            :update-submit="updateSubmit"
            :update-reset="updateReset"
            :show-btn="false"
            @search="handleSubmit"></sjc-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="onClose">取消</el-button>
                <el-button type="primary" @click="onConfirm"> 确认 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { useModal } from '@/composables';
import type { IColumnTypes, IColumnKeys } from '../types';
import { INIT_ROLE_FORM } from '../constants';
import type { IFormValues } from '@/components/SjcForm/types';
import { cloneDeep } from '@/utils';
// import { addUser, updateUser } from '@/api/user';
// import { OPERATION_TYPES } from '@/constants/index';

const updateSubmit = ref(new Date().getTime());
const updateReset = ref(new Date().getTime());
const isEdit = ref('ADD');
const id = ref('');
const ROLE_FORM = ref(cloneDeep<typeof INIT_ROLE_FORM>(INIT_ROLE_FORM));
const openCallback = (row: IColumnTypes) => {
    console.log('isEdit: ', row);
    if (row?.id) {
        isEdit.value = 'EDIT';
        id.value = row.id;
        ROLE_FORM.value.forEach((user) => {
            user.defaultValue = row[user.keyName as IColumnKeys];
        });
    } else {
        isEdit.value = 'ADD';
        id.value = '';
        ROLE_FORM.value = cloneDeep(INIT_ROLE_FORM);
    }
};
const { visible, open, close } = useModal(openCallback);
defineEmits<{
    (e: 'success', value: boolean): void;
}>();

const onConfirm = () => {
    updateSubmit.value = new Date().getTime();
};
const onClose = () => {
    updateReset.value = new Date().getTime();
    close();
};

const handleSubmit = async (values: IFormValues) => {
    let request = null;
    let params = {};
    if (isEdit.value === 'EDIT') {
        params = { ...values, id: id.value };
        // TODO: 编辑请求
        request = handleUpdateUser;
    } else {
        params = values;
        // TODO: 新建请求
        request = handleAddUser;
    }
    request(params);
};

defineExpose({ open });
</script>
