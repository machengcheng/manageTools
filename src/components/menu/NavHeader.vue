<template>
    <section>
        <el-row>
            <el-dropdown trigger="click" class="fr">
                <span class="el-dropdown-link">
                    Administrator<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        个人信息
                    </el-dropdown-item>
                    <el-dropdown-item>
                        用户页面
                    </el-dropdown-item>
                    <el-dropdown-item>
                        注销登录
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button type="text" size="small" class="fr" style="height: 60px;margin: 0 20px 0 20px;">文档</el-button>
            <el-button type="text" size="small" class="fr" style="height: 60px;margin: 0 0 0 20px;">商业支持</el-button>
        </el-row>
    </section>
</template>

<script>
	export default {
		name: "nav-header",
		components: {},
		data() {
			return {}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
    .el-dropdown-link {
        cursor: pointer;
    }
</style>
