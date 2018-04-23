<template>
    <section class="user-list-default-section">
        <import-dialog :importDialogVisible="importDialogVisible" @importDialogVisibleEvent="importDialogVisibleStatus"></import-dialog>
        <div class="box-title">用户列表</div>
        <div class="box-operate">
            <el-button type="primary" size="small" @click="createUser();">创建用户</el-button>
            <el-button size="small" class="fr">导出</el-button>
            <el-button size="small" class="fr" @click="importClick">导入</el-button>
            <el-button  type="primary" size="small" @click="search" class="fr mr20">查询</el-button>
            <el-input v-model="searchKey" size="small" class="searchKey wat fr" placeholder="请输入查询内容"></el-input>
        </div>
        <div class="box-content">
            <el-table
                ref="multipleTable"
                :data="tableData3"
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
                        <el-button type="text" @click="userDetail" size="small">{{ scope.row.name }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="userName"
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
                    prop="userGroup"
                    label="用户组"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="activating"
                    label="激活中"
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
                            @click="updateUser"
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
            >
                提交
            </el-button>
        </div>
    </section>
</template>

<script>
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
                tableData3: [],
                multipleSelection: [],
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
                pageSize: 1,
                page: 1
            }
		},
		methods: {
            handleSelectionChange: function (val) {
                this.multipleSelection = val;
            },
            handleCurrentChange: function () {

            },
            search: function () {
                this.page = 1;
                this.getData();
            },
            getData: async function() {
                this.tableData3 = [
                    {
                        name: 'Administrator',
                        userName: 'admin',
                        role: '管理员',
                        userGroup: 'Default',
                        activating: '√'
                    },
                    {
                        name: 'test',
                        userName: 'test',
                        role: '用户',
                        userGroup: 'Default',
                        activating: '√'
                    }
                ];
                this.total = this.tableData3.length;
                this.isLoading = false;
            },
            createUser: function () {
                this.$router.push({ path: '/home/userList/addOrUpdateUser', query: {addOrUpdate: 'add'}});
            },
            updateUser: function () {
                this.$router.push({ path: '/home/userList/addOrUpdateUser', query: {addOrUpdate: 'update'}});
            },
            updateDialogStatus: function () {
                this.addOrUpdateUserDialogVisible = false;
            },
            importClick: function () {
                this.importDialogVisible = true;
            },
            importDialogVisibleStatus: function () {
                this.importDialogVisible = false;
            },
            userDetail: function () {
                this.$router.push({ path: '/home/userList/userDetail' });
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
