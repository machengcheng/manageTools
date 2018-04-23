<template>
    <section class="auth-assets-tab-section">
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
                    prop="hostName"
                    label="主机名"
                    width="120"
                >
                </el-table-column>
                <el-table-column
                    prop="ip"
                    label="IP"
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
                    prop="link"
                    label="可连接"
                    show-overflow-tooltip
                >
                </el-table-column>
            </el-table>
        </div>
    </section>
</template>

<script>
	export default {
		name: "auth-assets-tab",
		components: {},
        props: ['authAssetsVisible'],
		data() {
			return {
			    tableData: [],
                isLoading: false,
                searchKey: ''
            }
		},
        watch: {
            authAssetsVisible: function (newVal, oldVal) {
                if(newVal != oldVal) {

                }
            }
        },
		methods: {
            search: function () {

            },
            handleSelectionChange: function () {

            }
        }
	}
</script>

<style lang="scss">
    .auth-assets-tab-section {
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
