<template>
    <section class="assets-list-default">
        <div class="box-title">资产列表</div>
        <div class="box-operate">
            <el-button type="primary" size="small" @click="createAssets();">创建资产</el-button>
            <el-button size="small" class="fr">导出</el-button>
            <el-button size="small" class="fr">导入</el-button>
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
                    prop="hostName"
                    label="主机名"
                    sortable
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="assetsDetail" size="small">{{ scope.row.hostName }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ip"
                    label="IP"
                    sortable
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="hardware"
                    label="硬件"
                    sortable
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="activating"
                    label="激活中"
                    sortable
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="link"
                    label="可连接"
                    sortable
                    width="130"
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
                            @click="updateAssets"
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
	export default {
		name: "assets-list-default",
		components: {

        },
		data() {
			return {
                searchKey: '',
                operateType: '',
                tableData: [
                    {
                        hostName: '点1',
                        ip: '10.221.121.1',
                        hardware: '',
                        activating: '√',
                        link: ''
                    }
                ],
                isLoading: false,
                total: 0,
                pageSize: 1,
                page: 1,
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
                        label: '从节点移除'
                    },
                    {
                        value: '4',
                        label: '禁用所选'
                    },
                    {
                        value: '5',
                        label: '激活所选'
                    }
                ],
            }
		},
		methods: {
            search: function () {

            },
            handleSelectionChange: function () {

            },
            handleCurrentChange: function () {

            },
            createAssets: function () {
                this.$router.push({ path: '/home/assetsList/addOrUpdateAssets', query: {addOrUpdate: 'add'}});
            },
            updateAssets: function () {
                this.$router.push({ path: '/home/assetsList/addOrUpdateAssets', query: {addOrUpdate: 'update'}});
            },
            assetsDetail: function () {
                this.$router.push({ path: '/home/assetsList/assetsDetail' });
            }
        }
	}
</script>

<style lang="scss" scoped>
    .assets-list-default {
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
