<template>
    <section class="system-user-list-default-section">
        <div class="box-title">系统用户列表</div>
        <div class="box-operate">
            <el-button type="primary" size="small" @click="createSystemUser();">创建系统用户</el-button>
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
                        <el-button type="text" @click="systemUserDetail" size="small">{{ scope.row.name }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="userName"
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
                    prop="assets"
                    label="资产"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="link"
                    label="可连接"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="notArrive"
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
                            @click="updateSystemUser"
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
	export default {
		name: "system-user-list-default",
		components: {

        },
		data() {
			return {
                searchKey: '',
                tableData: [
                    {
                        name: 'admin.104',
                        userName: 'root',
                        protocol: 'ssh',
                        assets: 2,
                        link: 1,
                        notArrive: 1,
                        ratio: '50.0%',
                        remark: '备注'
                    }
                ],
                isLoading: false,
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
            createSystemUser: function () {
                this.$router.push({ path: '/home/systemUserList/addOrUpdateSystemUser', query: {addOrUpdate: 'add'}});
            },
            updateSystemUser: function () {
                this.$router.push({ path: '/home/systemUserList/addOrUpdateSystemUser', query: {addOrUpdate: 'update'}});
            },
            systemUserDetail: function () {

            }
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
