<template>
    <div class="root-container">
        <el-container class="outer-container">
            <el-aside class="nav-aside">
                <div class="nav-aside-inner">
                    <left-menu></left-menu>
                </div>
            </el-aside>
            <el-container class="inner-container">
                <el-header class="nav-header">
                    <nav-header></nav-header>
                </el-header>
                <el-main class="main-content">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/home/pageHomeDefault' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="$route.matched.length >= 2" :to="{ path: $route.matched[1].path }">{{$route.matched[1].name}}</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="$route.matched.length >= 3" :to="{ path: $route.matched[2].path }">{{$route.matched[2].name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <router-view></router-view>
                </el-main>
                <el-footer class="footer-copyright">
                    <strong>Copyright</strong> 上海逸迅信息科技有限公司 &copy; 2014-2018
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import LeftMenu from '../../components/menu/LeftMenu';
    import NavHeader from '../../components/menu/NavHeader';
	export default {
		name: "page-home",
		components: {
            LeftMenu,
            NavHeader
		},
		computed: {

		},
		data() {
        return {

        }
		},
		methods: {

		},
		mounted: function () {

		}
	}
</script>

<style lang="scss" scoped>
    .root-container {
        width: 100%;
        /*min-width: 1440px;*/
        height: 100%;
        .outer-container {
            height: 100%;
            .nav-aside {
                width: 200px!important;
                min-width: 200px!important;
                background: #333743;
                position: relative;
                text-align: left;
                .nav-aside-inner {
                    position: relative;
                    height: 100%;
                    .el-menu {
                        height: 100%;
                    }
                }
            }
            .inner-container {
                .nav-header {
                    width: 100%;
                    /*min-width: 1220px;*/
                    background-color: #fff;
                }
                .main-content {
                    width: 100%;
                    /*min-width: 1220px;*/
                    background-color: #F9F9FA;
                }
                .footer-copyright {

                }
            }
        }
    }
    .el-header {
        background-color: #fff;
        color: #333;
        line-height: 60px;
        border-bottom: 1px solid #e7eaec !important;
    }
    .el-footer {
        background-color: #fff;
        color: #333;
        text-align: center;
        height: 40px!important;
        line-height: 40px;
        font-size: 13px;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }
    body > .el-container {
        margin-bottom: 40px;
    }
</style>
