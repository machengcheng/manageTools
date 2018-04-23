<template>
    <section class="login-log-section">
        <div class="box-title">登录日志</div>
        <div class="box-operate">
            <el-button  type="primary" size="small" @click="search" class="fr">查询</el-button>
            <el-input v-model="searchKey" size="small" class="searchKey wat fr mr20" placeholder="请输入查询内容"></el-input>
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
                    prop="id"
                    label="ID"
                    sortable
                    width="60"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="用户名"
                    sortable
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类型"
                    sortable
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="agent"
                    label="Agent"
                    sortable
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="ip"
                    label="IP"
                    sortable
                    width="130"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="city"
                    label="城市"
                    sortable
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="日期"
                    sortable
                    show-overflow-tooltip
                >
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
		name: "login-log",
		components: {

        },
		data() {
			return {
                searchKey: '',
                tableData: [
                    {
                        id: 1,
                        name: 'admin',
                        type: 'Web',
                        agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
                        ip: '101.221.138.211',
                        city: '西安',
                        date: '2018年4月20日 10:25'
                    }
                ],
                isLoading: false,
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

            }
        }
	}
</script>

<style lang="scss" scoped>
    .login-log-section {
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
