export interface UserEntity {
    id: string,
    name: string,
    roleId: string,
    account: string,
    createBy: string,
    createTime: string,
    updateBy: string,
    updateTime: string,
    status: UserEntityStatus,
}

export enum UserEntityStatus {
    on = 1,
}
