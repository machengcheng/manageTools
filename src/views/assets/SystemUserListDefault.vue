<template>
    <section class="system-user-list-default-section">
        <div class="box-title">系统用户列表</div>
        <div class="box-operate">
            <el-button type="primary" size="small" class="danger-button" @click="createSystemUser();">创建系统用户</el-button>
            <el-button  type="primary" size="small" @click="search" class="danger-button fr mr20">查询</el-button>
            <el-input v-model="searchKey" size="small" class="searchKey wat fr" placeholder="请输入查询内容"></el-input>
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
                    width="120"
                >
                    <template slot-scope="scope">
                        <el-button type="text" class="link-text" @click="systemUserDetail(scope.$index, scope.row)" size="small">{{ scope.row.name }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名"
                    width="120"
                >
                </el-table-column>
                <el-table-column
                    prop="protocol"
                    label="协议"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="assets_amount"
                    label="资产"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="reachable_amount"
                    label="可连接"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="unreachable_amount"
                    label="不可达"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="ratio"
                    label="比例"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="comment"
                    label="备注"
                    show-overflow-tooltip
                >
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
                            class="default-button"
                            plain
                            @click="updateSystemUser(scope.$index, scope.row)"
                        >
                            更新
                        </el-button>
                        <el-button
                            type="danger"
                            size="mini"
                            class="default-button"
                            plain
                            @click="deleteSystemUser(scope.$index, scope.row)"
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
		name: "system-user-list-default",
		components: {

        },
		data() {
			return {
                searchKey: '',
                tableData: [],
                isLoading: false,
                total: 0,
                pageSizes: [1, 2, 3, 4, 5],
                pageSize: 1,
                page: 1
            }
		},
		methods: {
            handleSelectionChange: function () {
                this.page = 1;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.search();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getData();
            },
            search: function () {
                this.page = 1;
                this.getData();
            },
            createSystemUser: function () {
                this.$router.push({ path: '/home/systemUserList/addOrUpdateSystemUser', query: {addOrUpdate: 'add'}});
            },
            updateSystemUser: function (index, row) {
                this.$router.push({ path: '/home/systemUserList/addOrUpdateSystemUser', query: {addOrUpdate: 'update', userId: row.id}});
            },
            systemUserDetail: function (index, row) {
                this.$router.push({ path: '/home/systemUserList/SystemUserDetail', query: { userId: row.id } });
            },
            getData: async function() {
                let that = this;
                let params = {
                    limit: that.pageSize,
                    offset: that.pageSize*(that.page-1),
                    type: 'get'
                };
                this.isLoading = true;
                that.$axios.get('http://127.0.0.1:8000/api/assets/system-user/', { params: params})
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
            deleteSystemUserFunc: async function (index, row) {
                let that = this;
                // let tempDelArr = [];
                // tempDelArr.push(row.id);
                // let params = {
                //     id__in: tempDelArr.join(',')
                // };
                const res = await that.$axios.delete('http://localhost:8000/api/assets/system-user/' + row.id + '/', {});
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
            deleteSystemUser: function (index, row) {
                let that = this;

                that.$confirm('删除该记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'default-button',
                    confirmButtonClass: 'danger-button',
                    type: 'warning'
                }).then(() => {
                    that.deleteSystemUserFunc(index, row);
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除',
                        duration: 1500
                    });
                });
            }
        },
        mounted: function () {
            this.getData();
        }
	}
</script>

<style lang="scss">
    .system-user-list-default-section {
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
