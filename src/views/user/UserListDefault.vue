<template>
    <section class="user-list-default-section">
        <import-dialog :importDialogVisible="importDialogVisible" @importDialogVisibleEvent="importDialogVisibleStatus"></import-dialog>
        <div class="box-title">用户列表</div>
        <div class="box-operate">
            <el-button type="primary" size="small" @click="createUser();" class="createBtn">创建用户</el-button>
            <el-button size="small" class="fr" @click="exportClick" :disabled="isExporting">导出</el-button>
            <el-button size="small" class="fr" @click="importClick">导入</el-button>
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
                        <el-button type="text" @click="userDetail(scope.$index, scope.row)" size="small">{{ scope.row.name }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名"
                    width="120"
                >
                </el-table-column>
                <el-table-column
                    prop="role"
                    label="角色"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="groups_display"
                    label="用户组"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="is_active"
                    label="激活中"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.is_active" class="dotY"></span><span class="dotYText" v-if="scope.row.is_active">是</span>
                        <span v-if="!scope.row.is_active" class="dotN"></span><span class="dotNText" v-if="!scope.row.is_active">否</span>
                        <!--<el-button type="text" size="small">{{ scope.row.is_active ? '是' : '否' }}</el-button>-->
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
                            class="updateBtn"
                            @click="updateUser(scope.$index, scope.row)"
                        >
                            更新
                        </el-button>
                        <el-button
                            type="danger"
                            size="mini"
                            plain
                            @click="deleteUser(scope.$index, scope.row)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination layout="sizes, total, prev, pager, next" background @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="pageSizes" :page-size="pageSize" :total="total" style="margin: 15px 0;float:right;">
                </el-pagination>
            </el-col>
        </div>
        <div class="box-operate">
            <el-select v-model="operateType" placeholder="请选择" size="small" style="width: 110px;">
                <el-option
                    v-for="item in operateTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button
                type="primary"
                size="small"
                plain
                :disabled="!operateType || multipleSelection.length === 0"
                @click="submitOperate"
            >
                提交
            </el-button>
        </div>
    </section>
</template>

<script>
    import axios from 'axios';
    import qs from 'qs';
    import ImportDialog from "./ImportDialog";
	export default {
		name: "user-list-default",
		components: {
            ImportDialog
        },
		data() {
			return {
                addOrUpdateUserDialogVisible: false,
                importDialogVisible: false,
                searchKey: '',
                operateType: '',
                isLoading: false,
                tableData: [],
                multipleSelection: [],
                userIds: [],
                isExporting: false,
                exportUrl: '',
                operateTypes: [
                    {
                        value: '1',
                        label: '批量删除'
                    },
                    {
                        value: '2',
                        label: '批量更新'
                    },
                    {
                        value: '3',
                        label: '禁用所选'
                    },
                    {
                        value: '4',
                        label: '激活所选'
                    }
                ],
                total: 0,
                pageSizes: [10, 20, 30, 40, 50],
                pageSize: 10,
                page: 1
            }
		},
		methods: {
            handleSelectionChange: function (val) {
                this.multipleSelection = val;
            },
            search: function () {
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
            getData: async function() {
                let that = this;
                let params = {
                    keyword: that.searchKey,
                    limit: that.pageSize,
                    offset: that.pageSize*(that.page-1),
                    type: 'get'

                };
                this.isLoading = true;
                that.$axios.get('http://localhost:8000/api/users/user', { params: params})
                    .then(function (response) {
                        let data = response.data;
                        if (data.code === '200') {

                        } else {
                            that.total = data.count ? data.count : 0;
                            that.tableData = data.results ? data.results : [];
                            console.info(data.results);
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
            createUser: function () {
                this.$router.push({ path: '/home/userList/addOrUpdateUser', query: {addOrUpdate: 'add'}});
            },
            updateUser: function (index, row) {
                this.$router.push({ path: '/home/userList/addOrUpdateUser', query: {addOrUpdate: 'update', userId: row.id}});
            },
            updateDialogStatus: function () {
                this.addOrUpdateUserDialogVisible = false;
            },
            importClick: function () {
                this.importDialogVisible = true;
            },
            exportClick: async function () {
                let that = this;
                that.userIds.splice(0, that.userIds.length);
                that.multipleSelection.forEach(function (item) {
                    that.userIds.push(item.id);
                });

                let params = {
                    users_id: that.userIds
                };
                this.isExporting = true;
                const res = await that.$axios.post('http://localhost:8000/users/user/export/', params);
                if (res.status === 200) {
                    that.exportUrl = res.data.redirect;
                    window.location.href = 'http://localhost:8000' + res.data.redirect;
                    this.isExporting = false;
                    that.$message({
                        message: '导出成功',
                        type: 'success'
                    });
                }
            },
            //批量操作
            submitOperate: function () {
                let that = this;
                let operateType = that.operateType;
                switch(operateType) {
                    case '1': //批量删除
                        that.deleteBatch();
                        break;
                    case '2':  //批量更新
                        that.updateBatch();
                        break;
                    case '3': //批量禁用所选
                        that.disabledBatch();
                        break;
                    case '4': //批量激活所选
                        that.activeBatch();
                        break;
                    default:
                        break;
                }
            },
            //批量删除
            deleteBatch: async function () {
                let that = this;
                let assets = [];
                that.multipleSelection.forEach(function (item) {
                    assets.push(item.id);
                });
                let params = {
                    id__in: assets.join(',')
                };
                const res = await that.$axios.delete('http://localhost:8000/api/users/user/', { params: params});
                if (res.status === 204) {
                    this.$message({
                        type: 'success',
                        message: '操作成功',
                        duration: 1500
                    });
                } else {
                    this.$message({
                        type: 'info',
                        message: '删除失败',
                        duration: 1500
                    });
                }
                that.operateType = '';
                that.search();
            },
            //批量激活所选
            activeBatch: async function () {
                let that = this;
                let users = [];
                that.multipleSelection.forEach(function (item) {
                    users.push({
                        pk: item.id,
                        is_active: true
                    });
                });
                let params = {
                    users: users
                };
                const res = await that.$axios.patch('http://localhost:8000/api/users/user/', params.users);
                if (res.status === 200) {
                    this.$message({
                        type: 'success',
                        message: '操作成功',
                        duration: 1500
                    });
                }
                that.operateType = '';
                that.search();
            },
            //批量禁用所选
            disabledBatch: async function () {
                let that = this;
                let users = [];
                that.multipleSelection.forEach(function (item) {
                    users.push({
                        pk: item.id,
                        is_active: false
                    });
                });
                let params = {
                    users: users
                };
                const res = await that.$axios.patch('http://localhost:8000/api/users/user/', params.users);
                if (res.status === 200) {
                    this.$message({
                        type: 'success',
                        message: '操作成功',
                        duration: 1500
                    });
                }
                that.operateType = '';
                that.search();
            },
            //批量更新
            updateBatch: function () {
                let that = this;
                let users = [];
                that.multipleSelection.forEach(function (item) {
                    users.push(item.id);
                });

                this.$router.push({path: '/home/userList/updateUserForBatch', query: { users: users }});
            },
            importDialogVisibleStatus: function () {
                this.importDialogVisible = false;
            },
            userDetail: function (index, row) {
                this.$router.push({ path: '/home/userList/userDetail', query: { userId: row.id } });
            },
            deleteUserFunc: async function (index, row) {
                let that = this;
                let tempDelArr = [];
                tempDelArr.push(row.id);
                let params = {
                    id__in: tempDelArr.join(',')
                };

                const res = await that.$axios.delete('http://localhost:8000/api/users/user/', { params: params});
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
            deleteUser: async function (index, row) {
                let that = this;

                that.$confirm('删除该记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.deleteUserFunc(index, row);
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除',
                        duration: 1500
                    });
                });


                // let that = this;
                // let tempDelArr = [];
                // tempDelArr.push(row.id);
                // let params = {
                //     id__in: tempDelArr.join(',')
                // };
                //
                // const res = await that.$axios.delete('http://localhost:8000/api/users/user/', { params: params});
                // that.search();

                // let that = this;
                // let tempDelArr = [];
                // tempDelArr.push(row.id);
                // let params = {
                //     id__in: tempDelArr.join(',')
                // };
                //
                // that.$axios.delete('http://localhost:8000/api/users/user/', params)
                //     .then(function (response) {
                //         let data = response.data;
                //         that.$message({
                //             message: '删除成功',
                //             type: 'success'
                //         });
                //         that.search();
                //     })
                //     .catch(function (response) {
                //         that.isLoading = false;
                //         that.$message({
                //             message: '未知异常',
                //             type: 'error',
                //             duration: 1500
                //         });
                //     });
            }
        },
        mounted: function () {
            this.search();
            console.info("user-list当前路由: ");
            console.info(this.$route);
        }
	}
</script>

<style lang="scss" scoped>
    .user-list-default-section {
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
