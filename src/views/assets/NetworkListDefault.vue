<template>
    <section class="network-list-default-section">
        <add-or-update-network-dialog :addOrUpdateNetworkDialogVisible="addOrUpdateNetworkDialogVisible" @addOrUpdateNetworkDialogEvent="updateDialogStatus" :addOrUpdate="addOrUpdate"></add-or-update-network-dialog>
        <div class="box-title">网域列表</div>
        <div class="box-operate">
            <el-button type="primary" size="small" @click="createNetwork();">创建网域</el-button>
            <el-button  type="primary" size="small" @click="search" class="fr mr20">查询</el-button>
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
                    sortable
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="networkDetail(scope.$index, scope.row)" size="small">{{ scope.row.name }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="assets"
                    label="资产"
                    sortable
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="gateway"
                    label="网关"
                    sortable
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注"
                    sortable
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
                            @click="updateUNetwork"
                        >
                            更新
                        </el-button>
                        <el-button
                            type="danger"
                            size="mini"
                            plain
                            @click="deleteNetwork(scope.$index, scope.row)"
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
    import AddOrUpdateNetworkDialog from './AddOrUpdateNetworkDialog';
	export default {
		name: "network-list-default",
		components: {
            AddOrUpdateNetworkDialog
        },
		data() {
			return {
                addOrUpdateNetworkDialogVisible: false,
                searchKey: '',
                isLoading: false,
                multipleSelection: [],
                addOrUpdate: 'add',
                tableData: [],
                total: 0,
                pageSize: 1,
                pageSizes: [1, 2, 3, 4, 5],
                page: 1
            }
		},
		methods: {
            search: function () {
                this.page = 1;
                this.getData();
            },
            createNetwork: function () {
                this.addOrUpdate = 'add';
                this.addOrUpdateNetworkDialogVisible = true;
            },
            updateUNetwork: function () {
                this.addOrUpdate = 'update';
                this.addOrUpdateNetworkDialogVisible = true;
            },
            handleSelectionChange: function (val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.search();
            },
            handleCurrentChange: function (val) {
                this.page = val;
                this.getData();
            },
            updateDialogStatus: function () {
                this.search();
                this.addOrUpdateNetworkDialogVisible = false;
            },
            networkDetail: function (index, row) {
                this.$router.push({ path: '/home/networkList/networkDetail', query: { gatewayId: row.id } });
            },
            getData: async function() {
                let that = this;
                let params = {
                    limit: that.pageSize,
                    offset: that.pageSize*(that.page-1)
                };
                that.isLoading = true;
                that.$axios.get('http://localhost:8000/api/assets/domain/', { params: params })
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
            deleteNetworkFunc: async function(index, row) {
                let that = this;
                let params = {
                    id__in: row.id
                };

                const res = await that.$axios.delete('http://localhost:8000/api/assets/domain/', { params: params});
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
            deleteNetwork: function (index, row) {
                let that = this;

                that.$confirm('删除该记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.deleteNetworkFunc(index, row);
                }).catch(() => {
                    console.info('已取消删除');
                });
            }
        },
        mounted: function () {
            this.getData();
        }
	}
</script>

<style lang="scss">
    .network-list-default-section {
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
