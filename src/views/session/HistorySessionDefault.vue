<template>
    <section class="history-session-default-section">
        <div class="box-title">历史会话</div>
        <div class="box-operate">
            <el-button  type="primary" size="small" @click="search" class="fr">查询</el-button>
            <el-input v-model="searchKey" size="small" class="searchKey wat fr mr10" placeholder="请输入查询内容"></el-input>
            <el-select
                v-model="systemUser"
                filterable
                size="small"
                class="fr mr10"
                placeholder="系统用户"
            >
                <el-option
                    v-for="item in systemUserList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select
                v-model="assets"
                filterable
                size="small"
                class="fr mr10"
                placeholder="资产"
            >
                <el-option
                    v-for="item in assetsList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select
                v-model="user"
                filterable
                size="small"
                class="fr mr10"
                placeholder="用户"
            >
                <el-option
                    v-for="item in userList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-date-picker
                v-model="endDate"
                type="date"
                size="small"
                class="fr mr10"
                placeholder="结束日期">
            </el-date-picker>
            <span class="fr" style="display: inline-block;margin: 0 5px;width: 20px;height: 32px;line-height: 32px;text-align: center;color: #C0C4CE;font-size: 13px;">至</span>
            <el-date-picker
                v-model="startDate"
                type="date"
                size="small"
                class="fr"
                placeholder="开始日期">
            </el-date-picker>
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
                    prop="id"
                    label="ID"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small">{{ scope.row.id }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="用户"
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
                    prop="systemUser"
                    label="系统用户"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="remoteAddr"
                    label="远端地址"
                    width="130"
                >
                </el-table-column>
                <el-table-column
                    prop="terminalManage"
                    label="终端管理"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="command"
                    label="命令"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="startDate"
                    label="开始日期"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="period"
                    label="时长"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    label="动作"
                    align="center"
                    width="100"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="warning"
                            size="mini"
                            plain
                        >
                            回放
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
		name: "history-session-default",
		components: {

        },
		data() {
			return {
                searchKey: '',
                startDate: '',
                endDate: '',
                user: '',
                assets: '',
                systemUser: '',
                userList: [
                    {
                        value: '1',
                        label: 'root'
                    },
                    {
                        value: '2',
                        label: 'root001'
                    },
                    {
                        value: '3',
                        label: 'root002'
                    },
                    {
                        value: '4',
                        label: 'Administrator'
                    }
                ],
                assetsList: [
                    {
                        value: '1',
                        label: '101'
                    },
                    {
                        value: '2',
                        label: '102'
                    },
                    {
                        value: '3',
                        label: '103'
                    }
                ],
                systemUserList: [
                    {
                        value: '1',
                        label: 'root'
                    },
                    {
                        value: '2',
                        label: 'root1'
                    },
                    {
                        value: '3',
                        label: 'root2'
                    }
                ],
                tableData: [
                    {
                        id: 1,
                        userName: 'admin',
                        assets: 104,
                        systemUser: 'yanxu.cheng',
                        remoteAddr: '10.221.12.110',
                        terminalManage: 'yeexuncoco',
                        command: 2,
                        startDate: '2018-04-16',
                        period: '4h'
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

            }
        }
	}
</script>

<style lang="scss">
    .history-session-default-section {
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
