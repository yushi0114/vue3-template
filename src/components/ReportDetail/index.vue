<script lang="ts" setup>
import { Top } from '@element-plus/icons-vue';
import { getReport } from '@/api/report';

import basicIdentity from './components/basic/identity/index.vue';
import basicStock from './components/basic/stockholder/index.vue';
import basicLeaders from './components/basic/leaders/index.vue';
import secPerson from './components/socSec/person/index.vue';
import socSec from './components/socSec/socSec/index.vue';
import socSecLateFee from './components/socSec/lateFee/index.vue';
import accFund from './components/socSec/accFund/index.vue';
import assLia from './components/businessInfo/assLia/index.vue';
import proFit from './components/businessInfo/proFit/index.vue';
import finance from './components/businessInfo/finance/index.vue';
import tax from './components/businessInfo/tax/index.vue';
import water from './components/businessInfo/water/index.vue';
import electric from './components/businessInfo/electric/index.vue';
import gasInfo from './components/businessInfo/gasInfo/index.vue';
import realestate from './components/guaranty/realestate/index.vue';
import chattel from './components/guaranty/chattel/index.vue';
import close from './components/guaranty/close/index.vue';
import punish from './components/punish/index.vue';
import abnormal from './components/abnormal/index.vue';

const route = useRoute();
const allToogle = reactive({
    loading: false,
    showAuthority: false,
    showCorpNotExist: false,
    showCorpStatusExist: false,
});
const reportList = reactive({
    identity: {
        name: ''
    },
    stockholder: [],
    leaders: [],
    secPerson: [],
    socSec: [],
    socSecLateFee: [],
    accFund: [],
    assLia: {},
    profit: {},
    finance: {},
    tax: {},
    water: {},
    electricInfo: {},
    gas: {},
    realestate: [],
    chattel: [],
    close: [],
    punish: [],
    abnormal: [],
});

onMounted(() => {
    getReportDetail();
});

const reportInfo = computed(() => {
    return {
        createTime: new Date().toLocaleString()
    };
});

const getReportDetail = () => {
    allToogle.loading = true;
    if (!route.query.corpName) {
        allToogle.showAuthority = true;
        allToogle.loading = false;
    } else {
        allToogle.showAuthority = false;

        const params = {
            corpName: route.query.corpName as string,
            corpCode: route.query.corpCode as string,
            menuName: 'requirement'
        };

        allToogle.loading = true;
        return getReport(params)
            .then((res) => {
                if (res.code && res.code === 'CORP_NOT_EXIST') {
                    allToogle.showAuthority = true;
                    allToogle.showCorpNotExist = true;
                } else if (res.code && res.code === 'CORP_STATUS_EXIST') {
                    allToogle.showAuthority = true;
                    allToogle.showCorpStatusExist = true;
                } else {
                    reportList.identity = res.identity;
                    reportList.stockholder = res.stockholder;
                    reportList.leaders = res.leaders;
                    reportList.secPerson = res.person;
                    reportList.socSec = res.socsec;
                    reportList.socSecLateFee = res.fee;
                    reportList.accFund = res.fund;
                    reportList.assLia = res.lia;
                    reportList.profit = res.profit;
                    reportList.finance = res.finance;
                    reportList.tax = res.tax;
                    reportList.water = res.water;
                    reportList.electricInfo = res.electric;
                    reportList.gas = res.gas;
                    reportList.realestate = res.realestate;
                    reportList.chattel = res.chattel;
                    reportList.close = res.close;
                    reportList.punish = res.punish;
                    reportList.abnormal = res.abnormal;
                }
            })
            .finally(() => {
                allToogle.loading = false;
            });
    }
};

const print = () => {
    document.title = reportList.identity.name + '(征信报告)';
    window.print();
    document.title = '金融栈数据管理平台';
};
</script>

<template>
    <div class="report-page-content">
        <div class="credit-content" v-loading="allToogle.loading" element-loading-text="加载中">
            <div v-if="allToogle.showAuthority && !allToogle.loading">
                <el-container class="authority-content">
                    <div class="authority-main">
                        <img class="mb20" src="@/assets/images/authority.png">
                        <div v-if="allToogle.showCorpNotExist || allToogle.showCorpStatusExist">
                            <div v-if="allToogle.showCorpNotExist">当前企业不存在，请重新确认企业信息</div>
                            <div v-if="allToogle.showCorpStatusExist">当前企业登记状态为非存续状态，无法查看征信报告</div>
                        </div>
                        <div v-else>访问路径缺少企业名称</div>
                    </div>
                </el-container>
            </div>

            <div class="report-body" v-else>
                <div class="report-container" ref="printFrom" v-if="!allToogle.loading">
                    <div class="report-title">企业征信报告</div>
                    <div style="margin-top: 10px">
                        <div class="overview-line">
                            <span class="overview-right-title">报告日期：</span>
                            <span>{{ reportInfo && reportInfo.createTime }}</span>
                        </div>
                    </div>

                    <div class="title-content">
                        <div class="title-line"></div>
                        <span class="title">基本信息</span>
                    </div>
                    <basic-identity :identity="reportList.identity"></basic-identity>
                    <basic-stock :stockholder="reportList.stockholder"></basic-stock>
                    <basic-leaders :leaders="reportList.leaders"></basic-leaders>

                    <div class="title-content">
                        <div class="title-line"></div>
                        <span class="title">社保公积金缴存信息</span>
                    </div>
                    <sec-person :secPerson="reportList.secPerson"></sec-person>
                    <soc-sec :socSec="reportList.socSec"></soc-sec>
                    <soc-sec-late-fee :socSecLateFee="reportList.socSecLateFee"></soc-sec-late-fee>
                    <acc-fund :accFund="reportList.accFund"></acc-fund>

                    <div class="title-content">
                        <div class="title-line"></div>
                        <span class="title">经营信息</span>
                    </div>
                    <ass-lia :assLia="reportList.assLia"></ass-lia>
                    <pro-fit :profit="reportList.profit"></pro-fit>
                    <finance :finance="reportList.finance"></finance>
                    <tax :tax="reportList.tax"></tax>
                    <water :water="reportList.water"></water>
                    <electric :electricInfo="reportList.electricInfo"></electric>
                    <gas-info :gas="reportList.gas"></gas-info>

                    <div class="title-content">
                        <div class="title-line"></div>
                        <span class="title">抵押与查封信息</span>
                    </div>
                    <realestate :realestate="reportList.realestate"></realestate>
                    <chattel :chattel="reportList.chattel"></chattel>
                    <close :close="reportList.close"></close>

                    <div class="title-content">
                        <div class="title-line"></div>
                        <span class="title">负面信息</span>
                    </div>
                    <punish :punish="reportList.punish"></punish>
                    <abnormal :abnormal="reportList.abnormal"></abnormal>

                    <el-backtop :bottom="100">
                        <el-icon><Top /></el-icon>
                    </el-backtop>

                    <img class="report-print" src="@/assets/images/print.png" @click="print()">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.report-page-content {
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

        .report-body {
            background-color: #f3f3f3;

            .report-container {
                background-color: #fff;
                width: 720px;
                padding: 40px 60px;
                margin: 0 auto;
                min-height: calc(100vh - 80px);

                .report-title {
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
                }

                .overview-title {
                    font-weight: bold;
                    width: 19%;
                    display: inline-block;
                }

                .overview-right-title  {
                    font-weight: bold;
                    width: 12%;
                    display: inline-block;
                }

                .overview-line-content {
                    width: 31%;
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

                .report-print {
                    position: fixed;
                    right: 30px;
                    bottom: 30px;
                    width: 60px;
                    height: 60px;
                    cursor: pointer;
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

    .report-print {
        display: none;
    }

    .el-backtop {
        display: none !important;
    }

    .report-container {
        padding: 0 !important;
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
    }
}
</style>
