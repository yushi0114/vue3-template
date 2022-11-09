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
import { ROLE_FORM } from '../constants';
// import { addUser, updateUser } from '@/api/user';
// import { OPERATION_TYPES } from '@/constants/index';

const updateSubmit = ref(new Date().getTime());
const updateReset = ref(new Date().getTime());
const isEdit = ref('ADD');
const id = ref('');
const openCallback = (row) => {
    console.log('isEdit: ', row);
    if (row?.id) {
        isEdit.value = 'EDIT';
        id.value = row.id;
        ROLE_FORM.forEach((user) => {
            user.defaultValue = row[user.keyName];
        });
    } else {
        isEdit.value = 'ADD';
        id.value = '';
        ROLE_FORM.forEach((user) => {
            Reflect.deleteProperty(user, 'defaultValue');
        });
    }
};
const { visible, open, close } = useModal(openCallback);
const emit = defineEmits<{
    (e: 'success', value: boolean): void;
}>();

const onConfirm = () => {
    updateSubmit.value = new Date().getTime();
};
const onClose = () => {
    updateReset.value = new Date().getTime();
    close();
};

const handleSubmit = async(values) => {
    let request = null;
    let params = {};
    if (isEdit.value === 'EDIT') {
        params = { ...values, id: id.value };
        request = handleUpdateUser;
    } else {
        params = values;
        request = handleAddUser;
    }
    request(params);
};

defineExpose({ open });
</script>
