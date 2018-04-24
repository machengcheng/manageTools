<template>
    <section class="assets-auth-list-default-section">
        <div class="box-title">资产授权列表</div>
        <div class="box-operate">
            <el-button type="primary" size="small" @click="createAuthRule">创建权限规则</el-button>
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
                    prop="node"
                    label="节点"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small">{{ scope.row.node }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="userGroup"
                    label="用户组"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="systemUser"
                    label="系统用户"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="activate"
                    label="激活"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="deadline"
                    label="失效日期"
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
                            @click="updateAuthRule"
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
		name: "assets-auth-list-default",
		components: {

        },
		data() {
			return {
                searchKey: '',
                addOrUpdate: 'add',
                tableData: [
                    {
                        node: 'ROOT',
                        userGroup: 'Default',
                        systemUser: 'yanxu.wang',
                        activate: 1,
                        deadline: '2088-03-23'
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
            createAuthRule: function () {
                this.$router.push({ path: '/home/assetsAuthList/addOrUpdateAuthRule', query: {addOrUpdate: 'add'}});
            },
            updateAuthRule: function () {
                this.$router.push({ path: '/home/assetsAuthList/addOrUpdateAuthRule', query: {addOrUpdate: 'update'}});
            },
        }
	}
</script>

<style lang="scss">
    .assets-auth-list-default-section {
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
