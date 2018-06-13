<template>
    <section class="left-menu-section">
        <div class="left-menu-logo">
            <img src="../../assets/imgs/left-menu-logo2.png" />
        </div>
        <el-menu
            class="el-menu-vertical-demo"
            text-color="#fff"
            active-text-color="#409EFF"
            background-color="#333743"
            @select="handleSelect"
            :unique-opened="isUnique"
            :router="true"
            :default-active="$route.matched[1].path"
            >
            <el-menu-item index="/home/pageHomeDefault" key="/home/pageHomeDefault">
                <i class="el-icon-document icon-panel"></i>
                <span slot="title">仪表盘</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-user-manage"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="/home/userList" key="/home/userList">
                    <i class="el-icon-document icon-user-list"></i>
                    <span slot="title">用户列表</span>
                </el-menu-item>
                <el-menu-item index="/home/userGroup" key="/home/userGroup">
                    <i class="el-icon-document icon-user-group"></i>
                    <span slot="title">用户组</span>
                </el-menu-item>
                <el-menu-item index="/home/loginLog" key="/home/loginLog">
                    <i class="el-icon-document icon-login-log"></i>
                    <span slot="title">登录日志</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-assets-manage"></i>
                    <span>资产管理</span>
                </template>
                <el-menu-item index="/home/assetsList" key="/home/assetsList">
                    <i class="el-icon-document icon-assets-list"></i>
                    <span slot="title">资产列表</span>
                </el-menu-item>
                <el-menu-item index="/home/networkList" key="/home/networkList">
                    <i class="el-icon-document icon-network-list"></i>
                    <span slot="title">网域列表</span>
                </el-menu-item>
                <el-menu-item index="/home/manageUserList" key="/home/manageUserList">
                    <i class="el-icon-document icon-manage-user"></i>
                    <span slot="title">管理用户</span>
                </el-menu-item>
                <el-menu-item index="/home/systemUserList" key="/home/systemUserList">
                    <i class="el-icon-document icon-system-user"></i>
                    <span slot="title">系统用户</span>
                </el-menu-item>
                <el-menu-item index="/home/labelManage" key="/home/labelManage">
                    <i class="el-icon-document icon-label-manage"></i>
                    <span slot="title">标签管理</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-permission-manage"></i>
                    <span>权限管理</span>
                </template>
                <el-menu-item index="/home/assetsAuthList" key="/home/assetsAuthList">
                    <i class="el-icon-document icon-assets-auth"></i>
                    <span slot="title">资产授权</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-session-manage"></i>
                    <span>会话管理</span>
                </template>
                <el-menu-item index="/home/onlineSession" key="/home/onlineSession">
                    <i class="el-icon-document icon-online-session"></i>
                    <span slot="title">在线会话</span>
                </el-menu-item>
                <el-menu-item index="/home/historySession" key="/home/historySession">
                    <i class="el-icon-document icon-history-session"></i>
                    <span slot="title">历史会话</span>
                </el-menu-item>
                <el-menu-item index="/home/commandRecord" key="/home/commandRecord">
                    <i class="el-icon-document icon-command-record"></i>
                    <span slot="title">命令记录</span>
                </el-menu-item>
                <el-menu-item index="4-4">
                    <i class="el-icon-document icon-web-terminal"></i>
                    <span slot="title">Web终端</span>
                </el-menu-item>
                <el-menu-item index="/home/terminalManage" key="/home/terminalManage">
                    <i class="el-icon-document icon-terminal-manage"></i>
                    <span slot="title">终端管理</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="/home/systemSettings" key="/home/systemSettings">
                <i class="el-icon-document icon-system-settings"></i>
                <span slot="title">系统设置</span>
            </el-menu-item>
        </el-menu>
    </section>
</template>

<script>
	export default {
		name: "left-menu",
		components: {

        },
		data() {
			return {
                isUnique: true
            }
		},
		methods: {
            handleSelect: function (index, indexPath) {

            }
        },
        mounted: function () {
            console.info("当前路由: ");
            console.info(this.$route);
        }
	}
</script>

<style lang="scss" scoped>
    .left-menu-section {
        .left-menu-logo {
            width: 200px;
            height: 60px;
            text-align: center;
            background: transparent;
            //background: linear-gradient(-90deg,rgba(252,103,97,1),rgba(246,86,84,1),rgba(219,3,23,1),rgba(189,0,28,1));
            opacity: 0.9;
            filter: alpha(opacify=90);
            position: relative;
            img {
                display: inline-block;
                width: 100%;
                height: 100%;
                /*width: 150px;*/
                /*height: 33px;*/
                border: 0;
                padding: 0;
                margin: 0;
                /*position: absolute;*/
                /*left: 25px;*/
                /*top: 13.5px;*/
            }
        }
        .el-menu {
            border-right: 0;
            li.is-active {
                background: #3E4456 !important;
            }
        }
        .el-menu-item {
            span {
                position: relative;
                top: 2px !important;
            }
        }
        //css代码
        .el-menu-item {
            border: 0;
            /*自定义，必要时用!important*/
            .el-icon-document:before {
                display: inline-block;
                width: 18px;
                height: 14px;
                content: '';
            }
            .icon-panel:before {
                background: url("../../assets/imgs/icon-panel-normal.png") no-repeat;
                content: '';
            }
            .icon-system-settings {
                margin-right: 0 !important;
                text-align: left !important;
            }
            .icon-system-settings:before {
                height: 18px !important;
                background: url("../../assets/imgs/icon-system-settings-normal.png") no-repeat;
                content: '';
            }
            .icon-user-list {
                margin-right: 0 !important;
                text-align: left !important;
            }
            .icon-user-list:before {
                height: 15px !important;
                background: url("../../assets/imgs/icon-user-list.png") no-repeat;
                content: '';
            }
            .icon-login-log {
                margin-right: 0 !important;
                text-align: left !important;
            }
            .icon-login-log:before {
                width: 16px !important;
                height: 16px !important;
                background: url("../../assets/imgs/icon-login-log.png") no-repeat;
                content: '';
            }
            .icon-assets-list {
                margin-right: 0 !important;
                text-align: left !important;
            }
            .icon-assets-list:before {
                height: 18px !important;
                background: url("../../assets/imgs/icon-assets-list.png") no-repeat;
                content: '';
            }
            .icon-user-group {
                margin-right: 0 !important;
                text-align: left !important;
            }
            .icon-user-group:before {
                height: 15px !important;
                background: url("../../assets/imgs/icon-user-group.png") no-repeat;
                content: '';
            }
            .icon-assets-auth {
                margin-right: 0 !important;
                text-align: left !important;
            }
            .icon-assets-auth:before {
                width: 19px !important;
                height: 18px !important;
                background: url("../../assets/imgs/icon-assets-auth.png") no-repeat;
                content: '';
            }
            .icon-network-list {
                margin-right: 0 !important;
                text-align: left !important;
            }
            .icon-network-list:before {
                height: 18px !important;
                background: url("../../assets/imgs/icon-network-list.png") no-repeat;
                content: '';
            }
            .icon-manage-user {
                margin-right: 0 !important;
                text-align: left !important;
            }
            .icon-manage-user:before {
                height: 15px !important;
                background: url("../../assets/imgs/icon-manage-user.png") no-repeat;
                content: '';
            }
            .icon-system-user {
                margin-right: 0 !important;
                text-align: left !important;
            }
            .icon-system-user:before {
                height: 15px !important;
                background: url("../../assets/imgs/icon-system-user.png") no-repeat;
                content: '';
            }
            .icon-online-session {
                margin-right: 0 !important;
                text-align: left !important;
            }
            .icon-online-session:before {
                height: 16px !important;
                background: url("../../assets/imgs/icon-online-session.png") no-repeat;
                content: '';
            }
            .icon-history-session {
                margin-right: 0 !important;
                text-align: left !important;
            }
            .icon-history-session:before {
                height: 16px !important;
                background: url("../../assets/imgs/icon-history-session.png") no-repeat;
                content: '';
            }
            .icon-command-record {
                margin-right: 0 !important;
                text-align: left !important;
            }
            .icon-command-record:before {
                width: 16px !important;
                height: 15px !important;
                background: url("../../assets/imgs/icon-command-record.png") no-repeat;
                content: '';
            }
            .icon-web-terminal {
                margin-right: 0 !important;
                text-align: left !important;
            }
            .icon-web-terminal:before {
                width: 16px !important;
                height: 14px !important;
                background: url("../../assets/imgs/icon-web-terminal.png") no-repeat;
                content: '';
            }
            .icon-terminal-manage {
                margin-right: 0 !important;
                text-align: left !important;
            }
            .icon-terminal-manage:before {
                width: 16px !important;
                height: 14px !important;
                background: url("../../assets/imgs/icon-terminal-manage.png") no-repeat;
                content: '';
            }
            .icon-label-manage {
                margin-right: 0 !important;
                text-align: left !important;
            }
            .icon-label-manage:before {
                width: 16px !important;
                height: 17px !important;
                background: url("../../assets/imgs/icon-label-manage.png") no-repeat;
                content: '';
            }
            span {
                color: #E1E5EC;
            }
        }
        .el-menu-item.is-active {
            /*自定义，必要时用!important*/
            .el-icon-document:before {
                display: inline-block;
                width: 18px;
                height: 14px;
            }
            .icon-panel:before {
                background: url("../../assets/imgs/icon-panel-active.png") no-repeat;
                content: '';
            }
            .icon-system-settings:before {
                height: 18px !important;
                background: url("../../assets/imgs/icon-system-settings-active.png") no-repeat;
                content: '';
            }
            .icon-user-list:before {
                height: 15px !important;
                background: url("../../assets/imgs/icon-user-list.png") no-repeat;
                content: '';
            }
            .icon-login-log:before {
                width: 16px !important;
                height: 16px !important;
                background: url("../../assets/imgs/icon-login-log.png") no-repeat;
                content: '';
            }
            .icon-assets-list:before {
                height: 18px !important;
                background: url("../../assets/imgs/icon-assets-list.png") no-repeat;
                content: '';
            }
            .icon-user-group:before {
                height: 15px !important;
                background: url("../../assets/imgs/icon-user-group.png") no-repeat;
                content: '';
            }
            .icon-assets-auth:before {
                width: 19px !important;
                height: 18px !important;
                background: url("../../assets/imgs/icon-assets-auth.png") no-repeat;
                content: '';
            }
            .icon-network-list:before {
                height: 18px !important;
                background: url("../../assets/imgs/icon-network-list.png") no-repeat;
                content: '';
            }
            .icon-manage-user:before {
                height: 15px !important;
                background: url("../../assets/imgs/icon-manage-user.png") no-repeat;
                content: '';
            }
            .icon-system-user:before {
                height: 15px !important;
                background: url("../../assets/imgs/icon-system-user.png") no-repeat;
                content: '';
            }
            .icon-online-session:before {
                height: 16px !important;
                background: url("../../assets/imgs/icon-online-session.png") no-repeat;
                content: '';
            }
            .icon-history-session:before {
                height: 16px !important;
                background: url("../../assets/imgs/icon-history-session.png") no-repeat;
                content: '';
            }
            .icon-command-record:before {
                width: 16px !important;
                height: 15px !important;
                background: url("../../assets/imgs/icon-command-record.png") no-repeat;
                content: '';
            }
            .icon-web-terminal:before {
                width: 16px !important;
                height: 14px !important;
                background: url("../../assets/imgs/icon-web-terminal.png") no-repeat;
                content: '';
            }
            .icon-terminal-manage:before {
                width: 16px !important;
                height: 14px !important;
                background: url("../../assets/imgs/icon-terminal-manage.png") no-repeat;
                content: '';
            }
            .icon-label-manage:before {
                width: 16px !important;
                height: 17px !important;
                background: url("../../assets/imgs/icon-label-manage.png") no-repeat;
                content: '';
            }
            span {
                color: #fff;
            }
        }
        .el-icon-user-manage {
            display: inline-block;
            width: 18px;
            height: 16px;
            background: url("../../assets/imgs/icon-user-manage-normal.png") no-repeat;
        }
        .el-icon-assets-manage {
            display: inline-block;
            width: 17px;
            height: 17px;
            background: url("../../assets/imgs/icon-assets-manage-normal.png") no-repeat;
        }
        .el-icon-permission-manage {
            display: inline-block;
            width: 16px;
            height: 15px;
            background: url("../../assets/imgs/icon-permission-manage-normal.png") no-repeat;
        }
        .el-icon-session-manage {
            display: inline-block;
            width: 18px;
            height: 16px;
            background: url("../../assets/imgs/icon-session-manage-normal.png") no-repeat;
        }
        .second-list {
            display: inline-block;
            width: 200px;
            li {
                width: 50%;
                line-height: 2.0em;
                text-align: center;
                float: left;
            }
        }
    }
</style>
