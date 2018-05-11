<template>
    <section>
        <div style="width: 210px;background-color: transparent;">
            <img src="../../assets/imgs/logo-text1.png" style="display: inline-block;width: 220px;height: 55px;border: 0;padding: 0;margin: 0;" />
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
                <i class="el-icon-document"></i>
                <span slot="title">仪表盘</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="/home/userList" key="/home/userList">
                    <i class="el-icon-document"></i>
                    <span slot="title">用户列表</span>
                </el-menu-item>
                <el-menu-item index="/home/userGroup" key="/home/userGroup">
                    <i class="el-icon-document"></i>
                    <span slot="title">用户组</span>
                </el-menu-item>
                <el-menu-item index="/home/loginLog" key="/home/loginLog">
                    <i class="el-icon-document"></i>
                    <span slot="title">登录日志</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>资产管理</span>
                </template>
                <el-menu-item index="/home/assetsList" key="/home/assetsList">
                    <i class="el-icon-document"></i>
                    <span slot="title">资产列表</span>
                </el-menu-item>
                <el-menu-item index="/home/networkList" key="/home/networkList">
                    <i class="el-icon-document"></i>
                    <span slot="title">网域列表</span>
                </el-menu-item>
                <el-menu-item index="/home/manageUserList" key="/home/manageUserList">
                    <i class="el-icon-document"></i>
                    <span slot="title">管理用户</span>
                </el-menu-item>
                <el-menu-item index="/home/systemUserList" key="/home/systemUserList">
                    <i class="el-icon-document"></i>
                    <span slot="title">系统用户</span>
                </el-menu-item>
                <el-menu-item index="/home/labelManage" key="/home/labelManage">
                    <i class="el-icon-document"></i>
                    <span slot="title">标签管理</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>权限管理</span>
                </template>
                <el-menu-item index="/home/assetsAuthList" key="/home/assetsAuthList">
                    <i class="el-icon-document"></i>
                    <span slot="title">资产授权</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>会话管理</span>
                </template>
                <el-menu-item index="/home/onlineSession" key="/home/onlineSession">
                    <i class="el-icon-document"></i>
                    <span slot="title">在线会话</span>
                </el-menu-item>
                <el-menu-item index="/home/historySession" key="/home/historySession">
                    <i class="el-icon-document"></i>
                    <span slot="title">历史会话</span>
                </el-menu-item>
                <el-menu-item index="/home/commandRecord" key="/home/commandRecord">
                    <i class="el-icon-document"></i>
                    <span slot="title">命令记录</span>
                </el-menu-item>
                <el-menu-item index="4-4">
                    <i class="el-icon-document"></i>
                    <span slot="title">Web终端</span>
                </el-menu-item>
                <el-menu-item index="/home/terminalManage" key="/home/terminalManage">
                    <i class="el-icon-document"></i>
                    <span slot="title">终端管理</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="/home/systemSettings" key="/home/systemSettings">
                <i class="el-icon-document"></i>
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
    .el-menu {
        border-right: 0;
    }
    .el-menu-item {
        span {
            position: relative;
            top: 2px!important;
        }
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
</style>
