<template>
    <section class="login-log-section">
        <div class="box-title">登录日志</div>
        <div class="box-operate">
            <el-button  type="primary" size="small" @click="search" class="fr danger-button">查询</el-button>
            <el-input v-model="username" size="small" class="searchKey wat fr mr20" placeholder="请输入查询内容"></el-input>
        </div>
        <div class="box-content">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                v-loading="isLoading"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >
                <el-table-column
                    type="index"
                    label="ID"
                    sortable
                    width="60"
                >
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类型"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="user_agent"
                    label="Agent"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="ip"
                    label="IP"
                    width="130"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="city"
                    label="城市"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="datetime"
                    label="日期"
                    sortable
                    show-overflow-tooltip
                >
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination layout="sizes, total, prev, pager, next" background @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pageSize" :total="total" style="margin: 15px 0;float:right;">
                </el-pagination>
            </el-col>
            <div class="clear"></div>
        </div>
    </section>
</template>

<script>
	export default {
		name: "login-log",
		components: {

        },
		data() {
			return {
                username: '',
                tableData: [],
                multipleSelection: [],
                isLoading: false,
                total: 0,
                pageSize: 10,
                pageSizes: [10, 20, 30, 40, 50],
                page: 1
            }
		},
		methods: {
            search: function () {
                this.page = 1;
                this.getData();
            },
            handleSelectionChange: function () {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.search();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getData();
            },
            getData: async function() {
                let that = this;
                let params = {
                    username: that.username,
                    limit: that.pageSize,
                    offset: that.pageSize*(that.page-1),
                    type: 'get'

                };
                this.isLoading = true;
                that.$axios.get('http://localhost:8000/api/users/loginlog', { params: params})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            that.total = data.data.count ? data.data.count : 0;
                            that.tableData = data.data.results.length > 0 ? data.data.results : [];
                        }
                        that.isLoading = false;
                    })
                    .catch(function (response) {
                        that.isLoading = false;
                        that.$message({
                            message: '未知异常',
                            type: 'error',
                            duration: 1500
                        });
                    });
            }
        },
        mounted: function () {
            this.search();
        }
	}
</script>

<style lang="scss" scoped>
    .login-log-section {
        padding: 18px 15px;
        margin: 15px 0;
        background-color: #fff;
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
    }
</style>
