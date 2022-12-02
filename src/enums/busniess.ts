import type { PlainOption } from '@/types';

// #region 平台类型
export enum PlatformType {
    LiaoXinTong = 0,
    ShiZongFu = 1,
}

export const platformTypeMap: Readonly<Record<PlatformType, string>> = Object.freeze({
    [PlatformType.LiaoXinTong]: '辽信通',
    [PlatformType.ShiZongFu]: '市综服',
});

export const platformTypeOptions: PlainOption<PlatformType>[] = [
    { name: platformTypeMap[PlatformType.LiaoXinTong], value: PlatformType.LiaoXinTong },
    { name: platformTypeMap[PlatformType.ShiZongFu], value: PlatformType.ShiZongFu },
];

// #endregion

// #region 开关量
export enum SwitchType {
    on = 1,
    off = 0
}

export const switchTypeMap: Record<SwitchType, string> = Object.freeze({
    [SwitchType.on]: '是',
    [SwitchType.off]: '否'
});

export const onlineTypeMap: Record<SwitchType, string> = Object.freeze({
    [SwitchType.on]: '上架',
    [SwitchType.off]: '下架'
});

export function genSwitchTypeOptions(map: Record<SwitchType, string>): PlainOption<SwitchType>[] {
    return [
        { name: map[SwitchType.on], value: SwitchType.on },
        { name: map[SwitchType.off], value: SwitchType.off }
    ];
}

export const switchTypeOptions = genSwitchTypeOptions(switchTypeMap);
export const onlineTypeOptions = genSwitchTypeOptions(onlineTypeMap);
// #endregion

// #region 需求状态
export enum AcceptProgressType {
    all = '',
    undo = 0,
    doing = 1,
    done = 2,
    refuse = 3,
    undoIn48 = 4
}

export const acceptProgressTypeMap: Record<AcceptProgressType, string> = Object.freeze({
    [AcceptProgressType.all]: '全部',
    [AcceptProgressType.undo]: '未受理',
    [AcceptProgressType.doing]: '办理中',
    [AcceptProgressType.done]: '已办结',
    [AcceptProgressType.refuse]: '已拒绝',
    [AcceptProgressType.undoIn48]: '意向银行48小时内未受理'
});

export const requirmentProgressTypeMap: Record<AcceptProgressType, string> = Object.assign({}, acceptProgressTypeMap, {
    [AcceptProgressType.undoIn48]: '意向银行都没有受理'
});

export const acceptProgressTypeOptions: PlainOption<AcceptProgressType>[] = [
    { name: acceptProgressTypeMap[AcceptProgressType.undo], value: AcceptProgressType.undo },
    { name: acceptProgressTypeMap[AcceptProgressType.doing], value: AcceptProgressType.doing },
    { name: acceptProgressTypeMap[AcceptProgressType.done], value: AcceptProgressType.done },
    { name: acceptProgressTypeMap[AcceptProgressType.refuse], value: AcceptProgressType.refuse },
    { name: acceptProgressTypeMap[AcceptProgressType.undoIn48], value: AcceptProgressType.undoIn48 },
];

export const acceptProgressTypeWithAllOptions: PlainOption<AcceptProgressType>[] = [
    { name: acceptProgressTypeMap[AcceptProgressType.all], value: AcceptProgressType.all },
    ...acceptProgressTypeOptions,
];

// #endregion

// #region 科技型企业
export enum SteType {
    stSmall = 0,
    highTech = 1,
    eagle = 2,
    gazelle = 3,
    unicorn = 4,
    zjtxNormal = 5,
    zjtxGiant = 6,
    other = 7
}

export const steTypeMap: Record<SteType, string> = Object.freeze({
    [SteType.stSmall]: '科技型中小企业',
    [SteType.highTech]: '高新技术企业',
    [SteType.eagle]: '雏鹰企业',
    [SteType.gazelle]: '瞪羚企业',
    [SteType.unicorn]: '独角兽企业',
    [SteType.zjtxNormal]: '专精特新企业',
    [SteType.zjtxGiant]: '专精特新小巨人企业',
    [SteType.other]: '其他'
});

export const steTypeOptions: PlainOption<SteType>[] = [
    { name: steTypeMap[SteType.stSmall], value: SteType.stSmall },
    { name: steTypeMap[SteType.highTech], value: SteType.highTech },
    { name: steTypeMap[SteType.eagle], value: SteType.eagle },
    { name: steTypeMap[SteType.gazelle], value: SteType.gazelle },
    { name: steTypeMap[SteType.unicorn], value: SteType.unicorn },
    { name: steTypeMap[SteType.zjtxNormal], value: SteType.zjtxNormal },
    { name: steTypeMap[SteType.zjtxGiant], value: SteType.zjtxGiant },
    { name: steTypeMap[SteType.other], value: SteType.other }
];

// #endregion

// #region 期望放款时间
export enum ExpectTimeType {
    in2weeks = 0,
    in1Months = 1,
    in2Months = 2,
    in3Months = 3
}

export const expectTimeTypeMap: Record<ExpectTimeType, string> = Object.freeze({
    [ExpectTimeType.in2weeks]: '2周内',
    [ExpectTimeType.in1Months]: '1个月内',
    [ExpectTimeType.in2Months]: '2个月内',
    [ExpectTimeType.in3Months]: '3个月内'
});

export const expectTimeTypeOptions: PlainOption<ExpectTimeType>[] = [
    { name: expectTimeTypeMap[ExpectTimeType.in2weeks], value: ExpectTimeType.in2weeks },
    { name: expectTimeTypeMap[ExpectTimeType.in1Months], value: ExpectTimeType.in1Months },
    { name: expectTimeTypeMap[ExpectTimeType.in2Months], value: ExpectTimeType.in2Months },
    { name: expectTimeTypeMap[ExpectTimeType.in3Months], value: ExpectTimeType.in3Months }
];

// #endregion

// #region 期望放款利率
export enum ExpectRateType {
    leP4 = 0,
    leP5 = 1,
    leP6 = 2,
    leP7 = 3,
    leP8 = 4
}

export const expectRateTypeMap: Record<ExpectRateType, string> = Object.freeze({
    [ExpectRateType.leP4]: '小于等于4%',
    [ExpectRateType.leP5]: '小于等于5%',
    [ExpectRateType.leP6]: '小于等于6%',
    [ExpectRateType.leP7]: '小于等于7%',
    [ExpectRateType.leP8]: '小于等于8%'
});

export const expectRateTypeOptions: PlainOption<ExpectRateType>[] = [
    { name: expectRateTypeMap[ExpectRateType.leP4], value: ExpectRateType.leP4 },
    { name: expectRateTypeMap[ExpectRateType.leP5], value: ExpectRateType.leP5 },
    { name: expectRateTypeMap[ExpectRateType.leP6], value: ExpectRateType.leP6 },
    { name: expectRateTypeMap[ExpectRateType.leP7], value: ExpectRateType.leP7 },
    { name: expectRateTypeMap[ExpectRateType.leP8], value: ExpectRateType.leP8 },
];

// #endregion

// #region 企业纳税信用等级
export enum TaxGradeType {
    levelA = 'A',
    levelB = 'B',
    levelC = 'C',
    levelD = 'D',
    levelM = 'M'
}

export const taxGradeTypeMap: Record<TaxGradeType, string> = Object.freeze({
    [TaxGradeType.levelA]: 'A级',
    [TaxGradeType.levelB]: 'B级',
    [TaxGradeType.levelC]: 'C级',
    [TaxGradeType.levelD]: 'D级',
    [TaxGradeType.levelM]: 'M级'
});

export const taxGradeTypeOptions: PlainOption<TaxGradeType>[] = [
    { name: taxGradeTypeMap[TaxGradeType.levelA], value: TaxGradeType.levelA },
    { name: taxGradeTypeMap[TaxGradeType.levelB], value: TaxGradeType.levelB },
    { name: taxGradeTypeMap[TaxGradeType.levelM], value: TaxGradeType.levelM },
    { name: taxGradeTypeMap[TaxGradeType.levelC], value: TaxGradeType.levelC },
    { name: taxGradeTypeMap[TaxGradeType.levelD], value: TaxGradeType.levelD }
];

// #endregion

// #region 近24个月内最长逾期天数
export enum LongestOverdueType {
    day0 = 0,
    day1to30 = 1,
    day31to60 = 2,
    day61to90 = 3,
    day91to120 = 4
}

export const longestOverdueTypeMap: Record<LongestOverdueType, string> = Object.freeze({
    [LongestOverdueType.day0]: '0',
    [LongestOverdueType.day1to30]: '1-30天',
    [LongestOverdueType.day31to60]: '31-60天',
    [LongestOverdueType.day61to90]: '61-90天',
    [LongestOverdueType.day91to120]: '91-120天'
});

export const longestOverdueTypeOptions = [
    { name: longestOverdueTypeMap[LongestOverdueType.day0], value: LongestOverdueType.day0 },
    { name: longestOverdueTypeMap[LongestOverdueType.day1to30], value: LongestOverdueType.day1to30 },
    { name: longestOverdueTypeMap[LongestOverdueType.day31to60], value: LongestOverdueType.day31to60 },
    { name: longestOverdueTypeMap[LongestOverdueType.day61to90], value: LongestOverdueType.day61to90 },
    { name: longestOverdueTypeMap[LongestOverdueType.day91to120], value: LongestOverdueType.day91to120 }
];

// #endregion

// #region 目前尚未结清贷款金额
export enum LoanEndType {
    zero = 0,
    under50 = 1,
    f50t100 = 2,
    f100t300 = 3,
    f300t500 = 4,
    f500t1000 = 5,
    over1000 = 6
}

export const loanEndTypeMap: Record<LoanEndType, string> = Object.freeze({
    [LoanEndType.zero]: '0',
    [LoanEndType.under50]: '50万以内',
    [LoanEndType.f50t100]: '50-100万',
    [LoanEndType.f100t300]: '100-300万',
    [LoanEndType.f300t500]: '300-500万',
    [LoanEndType.f500t1000]: '500-1000万',
    [LoanEndType.over1000]: '1000万以上'
});

export const loanEndTypeOptions: PlainOption<LoanEndType>[] = [
    { name: loanEndTypeMap[LoanEndType.zero], value: LoanEndType.zero },
    { name: loanEndTypeMap[LoanEndType.under50], value: LoanEndType.under50 },
    { name: loanEndTypeMap[LoanEndType.f50t100], value: LoanEndType.f50t100 },
    { name: loanEndTypeMap[LoanEndType.f100t300], value: LoanEndType.f100t300 },
    { name: loanEndTypeMap[LoanEndType.f300t500], value: LoanEndType.f300t500 },
    { name: loanEndTypeMap[LoanEndType.f500t1000], value: LoanEndType.f500t1000 },
    { name: loanEndTypeMap[LoanEndType.over1000], value: LoanEndType.over1000 }
];

// #endregion

// #region 机构业务办理进度

export enum OrgProgressStatusType {
    successLoan = 5, // 5 放款办结成功
    successVerify = 4, // 4 授信审批成功
    successInvest = 3, // 3 尽职调查成功
    successAccept = 2, // 2 银行受理成功
    undo = 1, // 1 银行48小时内未受理
    failOver48h = -1, // -1 银行超过48小时内未受理
    failAccept = -2, // -2 受理对接失败
    failInvest = -3, // -3 尽职调查失败
    failVerify = -3, // -4 授信审批失败
    failLoan = -5, // -5 放款办结失败
}

export const orgProgressStatusTypeMap: Record<OrgProgressStatusType, string> = Object.freeze({
    [OrgProgressStatusType.successLoan]: '放款办结成功',
    [OrgProgressStatusType.successVerify]: '授信审批成功',
    [OrgProgressStatusType.successInvest]: '尽职调查成功',
    [OrgProgressStatusType.successAccept]: '银行受理成功',
    [OrgProgressStatusType.undo]: '银行48小时内未受理',
    [OrgProgressStatusType.failOver48h]: '银行超过48小时内未受理',
    [OrgProgressStatusType.failAccept]: '受理对接失败',
    [OrgProgressStatusType.failInvest]: '尽职调查失败',
    [OrgProgressStatusType.failVerify]: '授信审批失败',
    [OrgProgressStatusType.failLoan]: '放款办结失败',
});

// #endregion

// #region 推荐产品类型
export enum ProductRecommandType {
    primary = '1',
    secondary = '2'
}


export const productRecommandTypeMap: Record<ProductRecommandType, string> = {
    [ProductRecommandType.primary]: '主推产品',
    [ProductRecommandType.secondary]: '辅推产品',
};

export const productRecommandTypeOptions: PlainOption<ProductRecommandType>[] = [
    { name: productRecommandTypeMap[ProductRecommandType.primary], value: ProductRecommandType.primary },
    { name: productRecommandTypeMap[ProductRecommandType.secondary], value: ProductRecommandType.secondary },
];
// #endregion


// #region 贷款期限
export enum LoanTermType {
    f1t6 = 0,
    f6t12 = 1,
    f12t24 = 2,
    over24 = 3,
}


export const loanTermTypeMap: Record<LoanTermType, string> = Object.freeze({
    [LoanTermType.f1t6]: '1-6个月',
    [LoanTermType.f6t12]: '6-12个月',
    [LoanTermType.f12t24]: '12-24个月',
    [LoanTermType.over24]: '24个月以上',
});
// #endregion

// #region 报告类型（征信报告，信用评分）
export enum ReportType {
    CREDIT = '1',
    SCORE = '2'
}


export const ReportTypeMap: Record<ReportType, string> = {
    [ReportType.CREDIT]: '征信报告',
    [ReportType.SCORE]: '信用评分',
};

export const ReportTypeOptions: PlainOption<ReportType>[] = [
    { name: ReportTypeMap[ReportType.CREDIT], value: ReportType.CREDIT },
    { name: ReportTypeMap[ReportType.SCORE], value: ReportType.SCORE },
];

export const ReportTypeUrlMap: Record<ReportType, string> = {
    [ReportType.CREDIT]: '/report/detail',
    [ReportType.SCORE]: '/score/detail',
};
// #endregion
