<template>
    <section class="label-manage-default-section">
        <add-or-update-label-dialog :addOrUpdateLabelDialogVisible="addOrUpdateLabelDialogVisible" @addOrUpdateLabelDialogEvent="updateDialogStatus" :addOrUpdate="addOrUpdate"></add-or-update-label-dialog>
        <div class="box-title">标签管理</div>
        <div class="box-operate">
            <el-button type="primary" size="small" @click="createLabel">创建标签</el-button>
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
                    prop="assets"
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
                            @click.native="updateLabel"
                        >
                            更新
                        </el-button>
                        <el-button
                            type="danger"
                            size="mini"
                            plain
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination layout="total, prev, pager, next" background @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="margin: 15px 0;float:right;">
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
                searchKey: '',
                addOrUpdate: 'add',
                isLoading: false,
                tableData: [
                    {
                        name: '123',
                        value: 19,
                        assets: 6
                    }
                ],
                total: 0,
                pageSize: 1,
                page: 1
            }
		},
		methods: {
            handleSelectionChange: function () {

            },
            handleCurrentChange: function () {

            },
            search: function () {

            },
            createLabel: function () {
                this.addOrUpdate = 'add';
                this.addOrUpdateLabelDialogVisible = true;
            },
            updateLabel: function () {
                this.addOrUpdate = 'update';
                this.addOrUpdateLabelDialogVisible = true;
            },
            updateDialogStatus: function () {
                this.addOrUpdateLabelDialogVisible = false;
            }
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
