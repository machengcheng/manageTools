<template>
    <section class="gateway-detail-tab-section">
        <div class="box-operate">
            <el-button type="primary" size="small" @click="createGateway">创建网关</el-button>
            <el-button  type="primary" size="small" @click="search" class="fr">查询</el-button>
            <el-input v-model="searchKey" size="small" class="searchKey wat fr mr20" placeholder="请输入查询内容"></el-input>
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
                </el-table-column>
                <el-table-column
                    prop="ip"
                    label="IP"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="port"
                    label="端口"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="protocol"
                    label="协议"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名"
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
                            plain
                            @click="updateGateway(scope.$index, scope.row)"
                        >
                            更新
                        </el-button>
                        <el-button
                            type="danger"
                            size="mini"
                            plain
                            @click="deleteGateway(scope.$index, scope.row)"
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
        </div>
    </section>
</template>

<script>
	export default {
		name: "gateway-detail-tab",
		components: {

        },
        props: ['gatewayDetailVisible'],
		data() {
			return {
                searchKey: '',
                isLoading: false,
                pageSizes: [1, 2, 3, 4, 5],
                tableData: [],
                total: 0,
                pageSize: 1,
                page: 1
            }
		},
        watch: {
		    gatewayDetailVisible: function (newVal, oldVal) {
                if (newVal != oldVal) {
                    this.search();
                }
            }
        },
		methods: {
            search: function () {
                this.page = 1;
                this.getData();
            },
            handleSelectionChange: function (val) {
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
            createGateway: function () {
                this.$router.push({ path: '/home/networkList/addOrUpdateGateway', query: {addOrUpdate: 'add'}});
            },
            updateGateway: function (index, row) {
                this.$router.push({ path: '/home/networkList/addOrUpdateGateway', query: {addOrUpdate: 'update'}});
            },
            getData: async function() {
                let that = this;
                let params = {
                    limit: that.pageSize,
                    offset: that.pageSize*(that.page-1)
                };
                this.isLoading = true;
                that.$axios.get('http://127.0.0.1:8000/api/assets/gateway/', { params: params })
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
            deleteGatewayFunc: async function (index, row) {
                let that = this;
                let params = {
                    id__in: row.id
                };

                const res = await that.$axios.delete('http://localhost:8000/api/assets/gateway/', { params: params});
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
            deleteGateway: function (index, row) {
                let that = this;

                that.$confirm('删除该记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.deleteGatewayFunc(index, row);
                }).catch(() => {
                    console.info('已取消删除');
                });
            }
        },
        mounted: function () {
            this.search();
        }
	}
</script>

<style lang="scss">
    .gateway-detail-tab-section {
        padding: 16px 22px 26px;
        background-color: #fff;
    }
</style>
