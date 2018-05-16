<template>
    <section class="manage-user-assets-list-tab-section">
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
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                    prop="hostname"
                    label="主机名"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="assetsDetail(scope.$index, scope.row)">{{ scope.row.hostname }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ip"
                    label="IP"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="port"
                    label="端口"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="is_connective"
                    label="可连接"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small">{{ scope.row.is_connective === true ? '√' : 'X'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </section>
</template>

<script>
	export default {
		name: "manage-user-assets-list-tab",
		components: {

        },
        props: ['managerUserAssetsVisible'],
		data() {
			return {
                searchKey: '',
                isLoading: false,
                tableData: [],
                total: 0,
                pageSize: 1,
                page: 1
            }
		},
        watch: {
            'managerUserAssetsVisible': function (newVal, oldVal) {
                if(newVal != oldVal) {
                    this.search();
                }
            }
        },
		methods: {
            handleSelectionChange: function () {

            },
            search: function () {
                this.page = 1;
                this.getData();
            },
            getData: async function() {
                let that = this;
                let params = {
                    admin_user: that.$route.query.userId,
                    limit: that.pageSize,
                    offset: that.pageSize*(that.page-1)
                };
                this.isLoading = true;
                that.$axios.get('http://127.0.0.1:8000/api/assets/asset/', { params: params })
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
            assetsDetail: function (index, row) {
                this.$router.push({path: '/home/assetsList/assetsDetail', query: { assetId: row.id }});
            }
        },
        mounted: function () {
            this.search();
        }
	}
</script>

<style lang="scss">
    .manage-user-assets-list-tab-section {
        padding: 26px 22px;
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
