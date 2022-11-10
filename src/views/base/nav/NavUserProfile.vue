<script lang="ts" setup>
import { updateUsername } from '@/api';
import { MENU_TAB } from '@/enums';
import { useUserStore } from '@/stores';
import { noop } from '@/utils';
import { Key, SwitchButton, User, UserFilled } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import NavUserUpdatePwdDialog from './NavUserUpdatePwdDialog.vue';

enum UserDropdownCommand {
    changePassword,
    changeUsername,
    Signout,
}

const { state, signout, getUserInfo } = useUserStore();
const router = useRouter();
const updatingPwdVisible = ref(false);

function handleCommand(cmd: UserDropdownCommand) {
    switch (cmd) {
        case UserDropdownCommand.Signout:
            handleSignout();
            break;
        case UserDropdownCommand.changePassword:
            displayChangePassword();
            break;
        case UserDropdownCommand.changeUsername:
            displayChangeUserName();
            break;
        default:
    }
}

function displayChangePassword() {
    updatingPwdVisible.value = true;
}

function displayChangeUserName() {
    ElMessageBox.prompt('请输入新的用户名', '修改用户名', {
        showInput: true,
        inputValue: state.user?.name || '',
        inputValidator: (val) => {
            if (val.length === 0) return '用户名不能为空';
            return true;
        },
        confirmButtonText: '修改',
    })
        .then(({ value: newName }) => {
            return updateUsername({
                id: state.user?.id!,
                name: newName,
                tab: MENU_TAB.MENU_TAB_DMS
            });
        })
        .then(() => {
            ElMessage({
                message: '修改用戶名成功',
                type: 'success',
            });
            return getUserInfo();
        })
        .catch(noop);
}

function handleSignout() {
    ElMessageBox.confirm(
        '您确定退出登录吗?',
        '退出登录',
        {
            confirmButtonText: '退出登录',
        }
    )
        .then(signout)
        .then(() => {
            router.replace('/signin');
        })
        .catch(noop);
}
</script>

<template>
    <el-dropdown class="nav-user-profile" trigger="click" @command="handleCommand">
        <el-space size="small">
            <el-avatar shape="square" size="small" :icon="UserFilled" />
            {{ state.user?.name }}
        </el-space>
        <template v-slot:dropdown>
            <el-dropdown-menu>
                <el-dropdown-item
                    :command="UserDropdownCommand.changePassword"
                    :icon="Key">修改密码
                </el-dropdown-item>
                <el-dropdown-item
                    :command="UserDropdownCommand.changeUsername"
                    :icon="User">修改用户名
                </el-dropdown-item>
                <el-dropdown-item
                    :command="UserDropdownCommand.Signout"
                    :icon="SwitchButton" divided>退出登录
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <NavUserUpdatePwdDialog v-model="updatingPwdVisible" />
</template>

<style lang="scss">
.nav-user-profile {
    padding: $gap-xs;
    margin-right: -$gap-xs;
    cursor: default;
    border-radius: 4px;
    transition: .2s ease-in-out all;

    &:hover {
        background: $color-primary-light-9;
    }
}
</style>
