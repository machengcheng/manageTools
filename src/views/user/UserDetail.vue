<template>
    <section class="user-detail-section">
        <div class="result-list">
            <el-tabs v-model="tabType" type="border-card" :tab-position="tabPosition" @tab-click="tabClick">
                <el-tab-pane label="用户详情" :key="1" name="user-detail">
                    <UserDetailTab :userDetailVisible="userDetailVisible"></UserDetailTab>
                </el-tab-pane>
                <el-tab-pane label="授权的资产" :key="2" name="auth-assets">
                    <AuthAssetsTab :authAssetsVisible="authAssetsVisible"></AuthAssetsTab>
                </el-tab-pane>
            </el-tabs>
        </div>
    </section>
</template>

<script>
    import UserDetailTab from "./UserDetailTab";
    import AuthAssetsTab from "./AuthAssetsTab";
	export default {
		name: "user-detail",
		components: {
            UserDetailTab,
            AuthAssetsTab
        },
		data() {
			return {
                tabType: 'user-detail',
                tabPosition: 'top',
                userDetailVisible: '',
                authAssetsVisible: ''
            }
		},
		methods: {
            tabClick: function (tab) {
                switch(tab.name) {
                    case 'user-detail':
                        let tempDate1 = new Date();
                        this.userDetailVisible = tempDate1.toTimeString();
                        break;
                    case 'auth-assets':
                        let tempDate2 = new Date();
                        this.authAssetsVisible = tempDate2.toTimeString();
                        break;
                    default:
                        break;
                }
            }
        },
        mounted: function () {
            console.info("user-detail当前路由: ");
            console.info(this.$route);
        }
	}
</script>

<style lang="scss">
    .user-detail-section {
        padding: 18px 15px;
        margin: 15px 0;
        background-color: #FCF9FB;
        .box-title {
            height: 48px;
            line-height: 48px;
            padding-left: 15px;
            color: #606266;
            border: 1px solid #e4e7ed;
            background-color: #f5f7fa;
        }
        .box-operate {
            padding: 10px 0 10px 15px;
        }
        .box-content {
            padding: 0 0 20px 15px;
        }
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
