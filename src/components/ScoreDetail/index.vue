<script lang="ts" setup>
import { getScore } from '@/api/score';
import { useUserStore } from '@/stores';

import scoreIdentity from './components/basic/identity/index.vue';
import scoreResult from './components/business/scoreResult/index.vue';
import basicIndicators from './components/indicatorsInfo/basicIndicators/index.vue';
import modifyIndicators from './components/indicatorsInfo/modifyIndicators/index.vue';
import financial from './components/indicatorsInfo/financial/index.vue';
import Dimension from './components/indicatorsInfo/dimension/index.vue';

const route = useRoute();
const allToogle = reactive({
    loading: false,
    showAuthority: false,
    showCorpNotExist: false,
    showCorpStatusExist: false,
});
const scoreList = reactive({
    identity: {
        name: ''
    },
    scoreResult: [],
    basicIndicators: [],
    modifyIndicators: [],
    financial: [],
    dimension: []
});

const scoreInfo = reactive({
    createTime: new Date().toLocaleString(),
    account: '',
    searchName: ''
});

const watermarkConfig = reactive({
    textName: '',
    textAccount: '',
    textTime: '',
    textColor: '#c7c7c7',
    width: 400,
    height: 200,
    textRotate: -20
});

onMounted(() => {
    getUserInfo();
    getReportDetail();
});

const getUserInfo = () => {
    const { getUserInfo } = useUserStore();
    getUserInfo().then((res: any) => {
        watermarkConfig.textAccount = scoreInfo.account = res.account;
        watermarkConfig.textName = scoreInfo.searchName = res.name;
        watermarkConfig.textTime = scoreInfo.createTime;
    });
};

const getReportDetail = () => {
    allToogle.loading = true;
    if (!route.query.corpName) {
        allToogle.showAuthority = true;
        allToogle.loading = false;
    } else {
        allToogle.showAuthority = false;

        const params = {
            corpName: route.query.corpName as string,
            corpCode: route.query.corpCode as string
        };

        allToogle.loading = true;
        return getScore(params)
            .then((res) => {
                if (res.code && res.code === 'CORP_NOT_EXIST') {
                    allToogle.showAuthority = true;
                    allToogle.showCorpNotExist = true;
                } else if (res.code && res.code === 'CORP_STATUS_EXIST') {
                    allToogle.showAuthority = true;
                    allToogle.showCorpStatusExist = true;
                } else {
                    [scoreList.identity] = res.identity;
                    scoreList.scoreResult = res.result;
                    scoreList.basicIndicators = res.basic;
                    scoreList.modifyIndicators = res.amend;
                    scoreList.financial = res.financial;
                    scoreList.dimension = res.dimension;
                }
            })
            .finally(() => {
                allToogle.loading = false;
            });
    }
};

const print = () => {
    document.title = scoreList.identity.name + '(信用评分)';
    window.print();
    document.title = '金融栈数据管理平台';
};
</script>

<template>
    <div class="score-page-content">
        <div class="credit-content" v-loading="allToogle.loading" element-loading-text="加载中">
            <div v-if="allToogle.showAuthority && !allToogle.loading">
                <el-container class="authority-content">
                    <div class="authority-main">
                        <img class="mb20" src="@/assets/images/authority.png">
                        <div v-if="allToogle.showCorpNotExist || allToogle.showCorpStatusExist">
                            <div v-if="allToogle.showCorpNotExist">当前企业不存在，请重新确认企业信息</div>
                            <div v-if="allToogle.showCorpStatusExist">当前企业登记状态为非存续状态，无法查看信用评分</div>
                        </div>
                        <div v-else>访问路径缺少企业名称</div>
                    </div>
                </el-container>
            </div>

            <div class="score-body" v-else>
                <div class="score-container" ref="printFrom" v-if="!allToogle.loading" v-watermark="watermarkConfig">
                    <div class="score-title">企业信用评分</div>
                    <div style="margin-top: 10px">
                        <div class="overview-line">
                            <span class="overview-title">查询账号：</span>
                            <span class="overview-line-content">{{ scoreInfo && scoreInfo.account }}</span>
                            <span class="overview-right-title">报告日期：</span>
                            <span class="overview-line-content">{{ scoreInfo && scoreInfo.createTime }}</span>
                            <span class="overview-title">查询人：</span>
                            <span class="overview-line-content">{{ scoreInfo && scoreInfo.searchName }}</span>
                        </div>
                    </div>

                    <div class="title-content">
                        <div class="title-line"></div>
                        <span class="title">基本信息</span>
                    </div>
                    <score-identity :identity="scoreList.identity"></score-identity>

                    <div class="title-content">
                        <div class="title-line"></div>
                        <span class="title">企业评分信息</span>
                    </div>
                    <span>企业评分信息</span>
                    <score-result :scoreResult="scoreList.scoreResult"></score-result>
                    <span>各维度指标情况解析</span>
                    <!-- 基本指标 -->
                    <basic-indicators :basicIndicators="scoreList.basicIndicators"></basic-indicators>
                    <!-- 修正指标 -->
                    <modify-indicators :modifyIndicators="scoreList.modifyIndicators"></modify-indicators>

                    <!-- 主要财务指标雷达图  各维度变动情况 -->
                    <div class="radar-change-content">
                        <div class="child-content">
                            <financial :financial="scoreList.financial"></financial>
                        </div>
                        <div class="child-content pl10">
                            <dimension :dimension="scoreList.dimension"></dimension>
                        </div>
                    </div>

                    <el-backtop :bottom="120"></el-backtop>

                    <img class="score-print" src="@/assets/images/print.png" @click="print()">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.score-page-content {
    .credit-content {
        width: 100%;
        height: 100%;
        min-height: 100vh;
        overflow-y: auto;

        .header {
            height: 45px !important;
            border-bottom: 1px solid #d7dee4;
            background-color: #28313d;
            color: #fff;
        }

        .authority-content {
            display: flex;
            align-items: center;
            justify-content: center;
            height: calc(100vh - 45px);
            overflow-y: auto;

            div {
                font-size: 24px;
            }
        }

        .authority-main {
            text-align: center;
        }

        .score-body {
            background-color: #f3f3f3;

            .score-container {
                background-color: #fff;
                width: 720px;
                padding: 40px 60px;
                margin: 0 auto;
                min-height: calc(100vh - 80px);

                .score-title {
                    padding: 20px 0 30px;
                    width: 100%;
                    text-align: center;
                    margin-bottom: 20px;
                    border-bottom: 1px solid #bbb;
                    font-size: 30px;
                }

                .overview-line {
                    padding: 3px 5px;
                    font-size: 14px;
                    line-height: 1.5;
                }

                .overview-title {
                    font-weight: bold;
                    width: 12%;
                    display: inline-block;
                }

                .overview-right-title  {
                    font-weight: bold;
                    width: 12%;
                    display: inline-block;
                }

                .overview-line-content {
                    width: 38%;
                    display: inline-block;
                }

                .title-content {
                    font-size: 22px;
                    text-align: center;
                    margin: 90px 0 5px;
                    padding: 8px 0;
                }

                .title {
                    background-color: #fff;
                    padding: 0 40px;
                    position: relative;
                    top: -15px;
                }

                .title-line {
                    width: 70%;
                    border-bottom: 1px solid #d8d5d5;
                    margin: 0 auto;
                }

                .score-print {
                    position: fixed;
                    right: 30px;
                    bottom: 30px;
                    width: 60px;
                    height: 60px;
                    cursor: pointer;
                }

                .radar-change-content {
                    width: 100%;
                    display: flex;
                }

                .child-content {
                    flex: 1;
                }

                .pl10 {
                    padding-left: 10px;
                }
            }
        }
    }
}
</style>

<style type="text/css" media="print">
@media print {
    @page {
        margin: auto 0mm;
    }

    .score-print {
        display: none;
    }

    .el-backtop {
        display: none !important;
    }

    .score-container {
        padding: 0 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
}
</style>
