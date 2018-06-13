<template>
    <section>
        <el-row>
            <el-dropdown
                @command="handleCommand"
                trigger="click"
                :show-timeout="0"
                class="fr"
                >
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
                    <el-dropdown-item command="exitLogin">
                        注销登录
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button type="text" size="small" class="link-text fr" style="height: 60px;margin: 0 20px 0 20px;">文档</el-button>
            <el-button type="text" size="small" class="link-text fr" style="height: 60px;margin: 0 0 0 20px;">商业支持</el-button>
        </el-row>
    </section>
</template>

<script>
	export default {
		name: "nav-header",
		components: {

        },
		data() {
			return {

            }
		},
		methods: {
            handleCommand: function (command) {
                let that = this;
                switch(command) {
                    case 'exitLogin':
                        that.$confirm('确定要退出系统?', '信息提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            that.$router.push({ path: '/login' });
                        }).catch(() => {

                        });
                        break;
                    default:
                        break;
                }
            }
        }
	}
</script>

<style lang="scss" scoped>
    .el-dropdown-link {
        cursor: pointer;
    }
</style>
