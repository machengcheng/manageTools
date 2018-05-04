<template>
    <section class="network-detail-section">
        <div class="result-list">
            <el-tabs v-model="tabType" type="border-card" :tab-position="tabPosition" @tab-click="tabClick">
                <el-tab-pane label="详情" :key="1" name="network-detail">
                    <network-detail-tab :networkDetailVisible="networkDetailVisible"></network-detail-tab>
                </el-tab-pane>
                <el-tab-pane label="网关" :key="2" name="gateway-detail">
                    <gateway-detail-tab :gatewayDetailVisible="gatewayDetailVisible"></gateway-detail-tab>
                </el-tab-pane>
            </el-tabs>
        </div>
    </section>
</template>

<script>
    import NetworkDetailTab from './NetworkDetailTab';
    import GatewayDetailTab from './GatewayDetailTab';
	export default {
		name: "network-detail",
		components: {
            NetworkDetailTab,
            GatewayDetailTab
        },
		data() {
			return {
                tabType: 'network-detail',
                tabPosition: 'top',
                networkDetailVisible: '',
                gatewayDetailVisible: ''
            }
		},
		methods: {
            tabClick: function (tab) {
                switch(tab.name) {
                    case 'network-detail':
                        let tempDate1 = new Date();
                        this.networkDetailVisible = tempDate1.toTimeString();
                        break;
                    case 'gateway-detail':
                        let tempDate2 = new Date();
                        this.gatewayDetailVisible = tempDate2.toTimeString();
                        break;
                    default:
                        break;
                }
            }
        },
        mounted: function () {
            this.tabType = this.$route.query.tabType ? this.$route.query.tabType : 'network-detail';
        }
	}
</script>

<style lang="scss">
    .network-detail-section {
        padding: 18px 15px;
        margin: 15px 0;
        background-color: #FCF9FB;
        .result-list {
            padding: 0;
            margin: 0 auto;
            .result-item {
                width: 220px;
                height: 260px;
                margin: 10px auto 40px auto!important;
                color: #fff;
                font-size: 16px;
                background: #EFEFEF!important;
                -webkit-border-radius: 0;
                -moz-border-radius: 0;
                border-radius: 0;
                position: relative;
                overflow: hidden;
                img {
                    width: 100%;
                    vertical-align: baseline;
                }
            }
            .thumbnail-block {

            }
            .el-tabs--border-card {
                -webkit-box-shadow: none;
                -webkit-box-shadow: none;
                -moz-box-shadow: none;
                box-shadow: none;
                border-bottom: 0;
                border-right: 0;
                border-left: 0;
            }
            .el-tabs__nav {
                float: left;
            }
            .el-tabs--border-card > .el-tabs__header {
                border-right: 1px solid #e4e7ed;
                border-left: 1px solid #e4e7ed;
            }
            .el-tabs--border-card>.el-tabs__content {
                padding: 0!important;
            }
        }
    }
</style>
