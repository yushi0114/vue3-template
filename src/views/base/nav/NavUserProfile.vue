<script lang="ts" setup>
import { useUserStore } from '@/stores';
import { noop } from '@/utils';
import { Key, SwitchButton, User, UserFilled } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import NavUserUpdatePwdDialog from './NavUserUpdatePwdDialog.vue';
import NavUserUpdateNameDialog from './NavUserUpdateNameDialog.vue';

enum UserDropdownCommand {
    changePassword,
    changeUsername,
    Signout,
}

const { state, signout } = useUserStore();
const router = useRouter();
const updatingPwdVisible = ref(false);
const updatingNameVisible = ref(false);

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
    updatingNameVisible.value = true;
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
            router.replace('/login');
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
    <NavUserUpdateNameDialog v-model="updatingNameVisible" />
</template>

<style lang="scss">
.nav-user-profile {
    padding: $gap-xs;
    margin-right: -$gap-xs;
    cursor: pointer;
    border-radius: 4px;
    transition: .2s ease-in-out all;

    &:hover {
        background: $color-primary-light-9;
    }
}
</style>
