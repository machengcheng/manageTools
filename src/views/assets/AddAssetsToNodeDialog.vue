<template>
    <section class="add-assets-to-node-dialog-section">
        <el-dialog
            title="添加资产到节点"
            :visible.sync="addAssetsToNodeDialogVisible"
            :before-close="closeDialog"
            :lock-scroll="false"
            :close-on-click-modal="false"
            :open="initDialogData()"
        >
            <el-form :model="addAssetsToNodeDialogForm" ref="addAssetsToNodeDialogForm" class="demo-form-inline" label-width="120px">
                <div class="content">
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
                            prop="hostname"
                            label="主机名"
                            show-overflow-tooltip
                        >
                            <template slot-scope="scope">
                                <el-button type="text" @click="assetsDetail(scope.$index, scope.row)" size="small">{{ scope.row.hostname }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="ip"
                            label="IP"
                            show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column
                            prop="hardware"
                            label="硬件"
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
                            prop="is_connective"
                            label="可连接"
                            show-overflow-tooltip
                        >
                            <template slot-scope="scope">
                                <el-button type="text" size="small">{{ scope.row.is_connective === true ? '√' : 'X'}}</el-button>
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
                                    @click="updateAssets(scope.$index, scope.row)"
                                >
                                    更新
                                </el-button>
                                <el-button
                                    type="danger"
                                    size="mini"
                                    plain
                                    @click="deleteAsset(scope.$index, scope.row)"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-col :span="24" class="toolbar">
                        <el-pagination layout="total, prev, pager, next" background :current-page="page" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="margin: 15px 0;float:right;">
                        </el-pagination>
                    </el-col>
                    <div class="clear"></div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" :loading="isLoading" :disabled="multipleSelection.length === 0" @click="submitForm('addAssetsToNodeDialogForm')">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
	export default {
		name: "add-assets-to-node-dialog",
		components: {

        },
        props: ['addAssetsToNodeDialogVisible', 'updateData', 'updateStatus'],
		data() {
			return {
			    isLoading: false,
                addAssetsToNodeDialogForm: {

                },
                tableData: [],
                multipleSelection: [],
                currentAssetId: '',
                total: 0,
                pageSize: 10,
                page: 1
            }
		},
        watch: {
            updateStatus: function (newVal, oldVal) {
                if(newVal != oldVal) {
                    this.currentAssetId = this.updateData.id;
                    this.search();
                }
            }
        },
		methods: {
            search: function () {
                this.page = 1;
                this.getData();
            },
            closeDialog: function () {
                this.$emit('addAssetsToNodeDialogEvent', this.addAssetsToNodeDialogVisible);
            },
            initDialogData: function () {

            },
            handleSelectionChange: function (val) {
                this.multipleSelection = val;
            },
            handleCurrentChange: function (val) {
                this.page = val;
                this.getData();
            },
            assetsDetail: function (index, row) {
                this.$router.push({path: '/home/assetsList/assetsDetail', query: { assetId: row.id }});
            },
            updateAssets: function (index, row) {
                this.$router.push({path: '/home/assetsList/addOrUpdateAssets', query: {addOrUpdate: 'update', assetId: row.id}});
            },
            deleteAssetFunc: async function (index, row) {
                let that = this;
                let id = row.id;

                const res = await that.$axios.delete('http://localhost:8000/api/assets/asset/' + id + '/', {});
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
            deleteAsset: function (index, row) {
                let that = this;

                that.$confirm('删除该记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.deleteAssetFunc(index, row);
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除',
                        duration: 1500
                    });
                });
            },
            submitForm(formName) {
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.add();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getData: function () {
                let that = this;
                let params = {
                    limit: that.pageSize,
                    offset: that.pageSize * (that.page - 1)
                };
                that.isLoading = true;
                that.$axios.get('http://localhost:8000/api/assets/asset/', {params: params})
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
            add: async function () {
                let that = this;
                let tempArr = [];
                if (that.multipleSelection.length > 0) {
                    that.multipleSelection.forEach(function (item) {
                        tempArr.push(item.id);
                    });
                }
                let params = {
                    assets: tempArr
                };

                this.isLoading = true;
                const res = await that.$axios.patch('http://localhost:8000/api/assets/nodes/' + that.currentAssetId + '/assets/add/', params);
                if (res.status === 200) {
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.isLoading = false;
                    that.resetForm('addAssetsToNodeDialogForm');
                    this.$emit('addAssetsToNodeDialogEvent', 'updated');
                }
            }
        },
        mounted: function () {
            this.search();
        }
	}
</script>

<style lang="scss">
    .add-assets-to-node-dialog-section {

    }
</style>
