<template>
    <section class="user-group-default-section">
        <add-or-update-user-group-dialog :updateData="updateData" :updateStatus="updateStatus" :addOrUpdateUserGroupDialogVisible="addOrUpdateUserGroupDialogVisible" :addOrUpdate="addOrUpdate" @addOrUpdateUserGroupDialogEvent="updateDialogStatus"></add-or-update-user-group-dialog>
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
                        <el-button type="text" @click="userGroupDetail(scope.$index, scope.row)" size="small">{{ scope.row.name }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="users"
                    label="用户"
                    show-overflow-tooltip
                    >
                    <template slot-scope="scope">
                        <el-popover
                            ref="popoverUsers"
                            placement="bottom"
                            width="200"
                            trigger="hover"
                            :content="scope.row.users.join(',')"
                            >
                        </el-popover>
                        <el-button type="text" v-popover:popoverUsers>{{ scope.row.users[0] }}</el-button>
                    </template>
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
                            @click="updateUserGroup(scope.$index, scope.row)"
                        >
                            更新
                        </el-button>
                        <el-button
                            type="danger"
                            size="mini"
                            plain
                            @click="deleteUserGroup(scope.$index, scope.row)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination layout="sizes, total, prev, pager, next" background :current-page="page" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-size="pageSize" :total="total" style="margin: 15px 0;float:right;">
                </el-pagination>
            </el-col>
            <div class="clear"></div>
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
                updateStatus: '',
                updateData: [],
                addOrUpdate: 'add',
                tableData: [],
                isLoading: false,
                searchKey: '',
                pageSizes: [10, 20, 30, 40, 50],
                total: 0,
                pageSize: 10,
                page: 1
            }
		},
		methods: {
            search: function () {
                this.page = 1;
                this.getData();
            },
            handleSelectionChange: function () {

            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.search();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getData();
            },
            updateDialogStatus: function () {
                this.addOrUpdateUserGroupDialogVisible = false;
                this.search();
            },
            createUserGroup: function () {
                this.addOrUpdate = 'add';
                this.addOrUpdateUserGroupDialogVisible = true;
            },
            updateUserGroup: function (index, row) {
                let that = this;

                console.info('===========updateUserGroup001');

                console.info(row);

                console.info('===========updateUserGroup001');

                that.updateData = row;



                this.addOrUpdate = 'update';
                let tempDate = new Date();
                this.updateStatus = tempDate.toTimeString();
                this.addOrUpdateUserGroupDialogVisible = true;
            },
            userGroupDetail: function (index, row) {
                this.$router.push({ path: '/home/userGroup/userGroupDetail', query: {userId: row.id}});
            },
            getData: async function() {
                var that = this;
                let params = {
                    limit: that.pageSize,
                    offset: that.pageSize*(that.page-1),
                    type: 'get'

                };
                this.isLoading = true;
                that.$axios.get('http://localhost:8000/api/users/group', { params: params})
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
            deleteUserGroupFunc: async function (index, row) {
                let that = this;
                let tempDelArr = [];
                tempDelArr.push(row.id);
                let params = {
                    id__in: tempDelArr.join(',')
                };

                const res = await that.$axios.delete('http://localhost:8000/api/users/group/', { params: params});
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
            deleteUserGroup: function (index, row) {
                let that = this;

                that.$confirm('删除该记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.deleteUserGroupFunc(index, row);
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
