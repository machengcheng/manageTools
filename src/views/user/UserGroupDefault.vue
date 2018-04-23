<template>
    <section class="user-group-default-section">
        <add-or-update-user-group-dialog :addOrUpdateUserGroupDialogVisible="addOrUpdateUserGroupDialogVisible" :addOrUpdate="addOrUpdate" @addOrUpdateUserGroupDialogEvent="updateDialogStatus"></add-or-update-user-group-dialog>
        <div class="box-title">用户组</div>
        <div class="box-operate">
            <el-button type="primary" size="small" @click="createUserGroup">创建用户组</el-button>
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
                    width="120"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="userGroupDetail" size="small">{{ scope.row.name }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="user"
                    label="用户"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="remark"
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
                            @click="updateUserGroup"
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
        </div>
    </section>
</template>

<script>
    import AddOrUpdateUserGroupDialog from "./AddOrUpdateUserGroupDialog";
    export default {
		name: "user-group-default",
		components: {
            AddOrUpdateUserGroupDialog
        },
		data() {
			return {
                addOrUpdateUserGroupDialogVisible: false,
                addOrUpdate: 'add',
                tableData: [
                    {
                        name: 'Default',
                        user: 1,
                        remark: '备注信息'
                    }
                ],
                isLoading: false,
                searchKey: '',
                total: 0,
                pageSize: 1,
                page: 1
            }
		},
		methods: {
            search: function () {

            },
            handleSelectionChange: function () {

            },
            handleCurrentChange: function () {

            },
            updateDialogStatus: function () {
                this.addOrUpdateUserGroupDialogVisible = false;
            },
            createUserGroup: function () {
                this.addOrUpdate = 'add';
                this.addOrUpdateUserGroupDialogVisible = true;
            },
            updateUserGroup: function () {
                this.addOrUpdate = 'update';
                this.addOrUpdateUserGroupDialogVisible = true;
            },
            userGroupDetail: function () {
                this.$router.push({ path: '/home/userGroup/userGroupDetail' });
            }
        }
	}
</script>

<style lang="scss">
    .user-group-default-section {
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
