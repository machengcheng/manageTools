<template>
    <section class="terminal-manage-default-section">
        <div class="box-title">终端列表</div>
        <div class="box-operate">
            <el-button  type="primary" size="small" @click="search" class="fr">查询</el-button>
            <el-input v-model="searchKey" size="small" class="searchKey wat fr mr10" placeholder="请输入查询内容"></el-input>
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
                        <el-button type="text" @click="terminalDetail" size="small">{{ scope.row.name }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ip"
                    label="地址"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="session"
                    label="会话"
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
                    prop="online"
                    label="在线"
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
	export default {
		name: "terminal-manage-default",
		components: {

        },
		data() {
			return {
                searchKey: '',
                tableData: [
                    {
                        name: 'yeexuncoco',
                        ip: '127.0.0.1',
                        session: 0,
                        activating: '',
                        online: ''
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
            terminalDetail: function () {
                this.$router.push({ path: '/home/terminalManage/terminalDetail' });
            }
        }
	}
</script>

<style lang="scss">
    .terminal-manage-default-section {
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
        .el-input, .el-input .el-input__inner {
            width: 100%!important;
            max-width: 150px;
        }
        .el-select .el-input__inner {
            width: 100%!important;
            max-width: 100px;
        }
    }
</style>
