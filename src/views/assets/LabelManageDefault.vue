<template>
    <section class="label-manage-default-section">
        <add-or-update-label-dialog :updateData="updateData" :updateStatus="updateStatus" :addOrUpdateLabelDialogVisible="addOrUpdateLabelDialogVisible" @addOrUpdateLabelDialogEvent="updateDialogStatus" :addOrUpdate="addOrUpdate"></add-or-update-label-dialog>
        <div class="box-title">标签管理</div>
        <div class="box-operate">
            <el-button type="primary" size="small" @click="createLabel">创建标签</el-button>
            <el-button  type="primary" size="small" @click="search" class="fr mr20">查询</el-button>
            <el-input v-model="searchKey" size="small" clearable class="searchKey wat fr" placeholder="请输入查询内容"></el-input>
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
                        <el-button type="text" size="small">{{ scope.row.name }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="value"
                    label="值"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="asset_count"
                    label="资产"
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
                            @click.native="updateLabel(scope.$index, scope.row)"
                        >
                            更新
                        </el-button>
                        <el-button
                            type="danger"
                            size="mini"
                            plain
                            @click="deleteLabel(scope.$index, scope.row)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination layout="total, prev, pager, next" background :current-page="page" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pageSize" :total="total" style="margin: 15px 0;float:right;">
                </el-pagination>
            </el-col>
            <div class="clear"></div>
        </div>
    </section>
</template>

<script>
    import AddOrUpdateLabelDialog from './AddOrUpdateLabelDialog';
	export default {
		name: "label-manage-default",
		components: {
            AddOrUpdateLabelDialog
        },
		data() {
			return {
                addOrUpdateLabelDialogVisible: false,
                updateStatus: '',
                updateData: [],
                searchKey: '',
                addOrUpdate: 'add',
                isLoading: false,
                tableData: [],
                total: 0,
                pageSize: 1,
                page: 1
            }
		},
		methods: {
            handleSelectionChange: function () {

            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.search();
            },
            handleCurrentChange: function (val) {
                this.page = val;
                this.getData();
            },
            search: function () {
                this.page = 1;
                this.getData();
            },
            createLabel: function () {
                let that = this;
                that.addOrUpdate = 'add';
                let tempDate = new Date();
                that.updateStatus = tempDate.toTimeString();
                that.addOrUpdateLabelDialogVisible = true;
            },
            updateLabel: function (index, row) {
                let that = this;
                that.updateData = row;
                that.addOrUpdate = 'update';
                let tempDate = new Date();
                that.updateStatus = tempDate.toTimeString();
                that.addOrUpdateLabelDialogVisible = true;
            },
            updateDialogStatus: function (val) {
                this.addOrUpdateLabelDialogVisible = false;
                this.getData();
            },
            getData: async function() {
                let that = this;
                let params = {
                    name: that.searchKey,
                    limit: that.pageSize,
                    offset: that.pageSize*(that.page-1)
                };
                that.isLoading = true;
                that.$axios.get('http://localhost:8000/api/assets/labels/', { params: params })
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
            deleteLabelFunc: async function (index, row) {
                let that = this;
                let id = row.id;

                const res = await that.$axios.delete('http://localhost:8000/api/assets/labels/' + id + '/', {});
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
            deleteLabel: function (index, row) {
                let that = this;

                that.$confirm('删除该记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.deleteLabelFunc(index, row);
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
            this.search();
        }
	}
</script>

<style lang="scss">
    .label-manage-default-section {
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
