<template>
    <section class="user-group-detail-section">
        <div class="result-list">
            <el-tabs v-model="tabType" type="border-card" :tab-position="tabPosition" @tab-click="tabClick">
                <el-tab-pane label="用户组详情" :key="1" name="user-group-detail">
                    <UserGroupDetailTab :userGroupDetailVisible="userGroupDetailVisible"></UserGroupDetailTab>
                </el-tab-pane>
                <el-tab-pane label="授权的资产" :key="2" name="auth-assets">
                    <AuthAssetsTab :authAssetsVisible="authAssetsVisible"></AuthAssetsTab>
                </el-tab-pane>
            </el-tabs>
        </div>
    </section>
</template>

<script>
    import UserGroupDetailTab from './UserGroupDetailTab';
    import AuthAssetsTab from './AuthAssetsTab';
	export default {
		name: "user-group-detail",
		components: {
            UserGroupDetailTab,
            AuthAssetsTab
        },
		data() {
			return {
                tabType: 'user-group-detail',
                tabPosition: 'top',
                userGroupDetailVisible: '',
                authAssetsVisible: ''
            }
		},
		methods: {
            tabClick: function (tab) {
                switch(tab.name) {
                    case 'user-group-detail':
                        let tempDate1 = new Date();
                        this.userGroupDetailVisible = tempDate1.toTimeString();
                        break;
                    case 'auth-assets':
                        let tempDate2 = new Date();
                        this.authAssetsVisible = tempDate2.toTimeString();
                        break;
                    default:
                        break;
                }
            }
        }
	}
</script>

<style lang="scss">
    .user-group-detail-section {
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
