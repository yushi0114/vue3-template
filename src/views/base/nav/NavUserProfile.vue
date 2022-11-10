<script lang="ts" setup>
import { useUserStore } from '@/stores';
import { noop } from '@/utils';
import { Key, SwitchButton, User, UserFilled } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';

enum UserDropdownCommand {
    changePassword,
    changeUsername,
    Signout,
}

const { state, signout } = useUserStore();
const router = useRouter();

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

}

function displayChangeUserName() {

}

function handleSignout() {
    ElMessageBox.confirm(
        '您确定退出登录吗?',
        '退出登录',
        {
            confirmButtonText: '退出登录',
            cancelButtonText: '取消'
        }
    )
        .then(() => {
            signout().then(() => {
                router.replace('/signin');
            });
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
                <el-dropdown-item :command="UserDropdownCommand.changePassword" :icon="Key">修改密码</el-dropdown-item>
                <el-dropdown-item :command="UserDropdownCommand.changeUsername" :icon="User">修改用户名</el-dropdown-item>
                <el-dropdown-item :command="UserDropdownCommand.Signout" :icon="SwitchButton" divided>退出登录
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <el-dialog>
        123
    </el-dialog>
</template>

<style lang="scss">
.nav-user-profile {
    padding: $gap-xs;
    cursor: default;
    border-radius: 4px;
    transition: .2s ease-in-out all;
    &:hover {
        background: $color-primary-light-9;
    }
}
</style>
