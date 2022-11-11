export interface TodayIndicatorEntity {
    countTodayElibUser: number,
    countTodayEzjfwUser: number,
    countTodayExactReq: number,
    countTodayProductReq: number,
    countTodayEzjfwExactReq: number,
    countTodayEzjfwProductReq: number
}

export interface TotalIndicatorEntity {
    countUser: number,
    countSimpleReq: number,
    perSimpleReq: string,
    countExactReq: number,
    perExactReq: string,
    countProductReq: number,
    perProductReq: string
}

export interface SuccessRateEntity {
    month: string,
    per: number
}

export interface ApplyCountEntity {
    name: string,
    count: number
}
