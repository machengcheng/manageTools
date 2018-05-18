<template>
    <section class="terminal-manage-default-section">
        <div class="box-title">终端列表</div>
        <div class="box-operate">
            <el-button  type="primary" size="small" @click="search" class="fr">查询</el-button>
            <el-input v-model="searchKey" size="small" class="searchKey wat fr mr10" placeholder="请输入查询内容"></el-input>
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
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="名称"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="terminalDetail(scope.$index, scope.row)" size="small">{{ scope.row.name }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="remote_addr"
                    label="地址"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="session_online"
                    label="会话"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="is_active"
                    label="激活中"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small">{{ scope.row.is_active === true ? '√' : 'X'}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="is_alive"
                    label="在线"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small">{{ scope.row.is_alive === true ? '√' : 'X'}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="动作"
                    align="center"
                    width="160"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            plain
                            @click="updateTerminal(scope.$index, scope.row)"
                        >
                            更新
                        </el-button>
                        <el-button
                            type="danger"
                            size="mini"
                            plain
                            @click="deleteTerminal(scope.$index, scope.row)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination layout="sizes, total, prev, pager, next" background :current-page="page" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="pageSizes" :page-size="pageSize" :total="total" style="margin: 15px 0;float:right;">
                </el-pagination>
            </el-col>
            <div class="clear"></div>
        </div>
    </section>
</template>

<script>
	export default {
		name: "terminal-manage-default",
		components: {

        },
		data() {
			return {
                searchKey: '',
                tableData: [],
                isLoading: false,
                total: 0,
                pageSizes: [10, 20, 30, 50, 100],
                pageSize: 10,
                page: 1
            }
		},
		methods: {
            handleSelectionChange: function () {

            },
            handleCurrentChange: function (val) {
                this.page = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.search();
            },
            search: function () {
                this.page = 1;
                this.getData();
            },
            terminalDetail: function (index, row) {
                this.$router.push({ path: '/home/terminalManage/terminalDetail', query: { terminalId: row.id }});
            },
            updateTerminal: function (index, row) {
                this.$router.push({ path: '/home/terminalManage/updateTerminal', query: { terminalId: row.id }});
            },
            getData: async function() {
                let that = this;
                let params = {
                    limit: that.pageSize,
                    offset: that.pageSize*(that.page-1)
                };
                this.isLoading = true;
                that.$axios.get('http://127.0.0.1:8000/api/terminal/terminal/', { params: params})
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
            },
            deleteTerminalFunc: async function (index, row) {
                let that = this;
                let id = row.id;
                const res = await that.$axios.delete('http://localhost:8000/api/terminal/terminal/' + id + '/', {});
                if (res.status === 204) {
                    this.$message({
                        type: 'success',
                        message: '删除成功',
                        duration: 1500
                    });
                } else {
                    this.$message({
                        type: 'info',
                        message: '删除失败',
                        duration: 1500
                    });
                }
                that.search();
            },
            deleteTerminal: function (index, row) {
                let that = this;

                that.$confirm('删除该记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.deleteTerminalFunc(index, row);
                }).catch(() => {
                    // that.$message({
                    //     type: 'info',
                    //     message: '已取消删除',
                    //     duration: 1500
                    // });
                });
            }
        },
        mounted: function () {
            this.search();
        }
	}
</script>

<style lang="scss">
    .terminal-manage-default-section {
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
        .el-input, .el-input .el-input__inner {
            width: 100%!important;
            max-width: 150px;
        }
    }
</style>
