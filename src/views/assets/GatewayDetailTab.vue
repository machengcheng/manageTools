<template>
    <section class="gateway-detail-tab-section">
        <div class="box-operate">
            <el-button type="primary" size="small" @click="createGateway">创建网关</el-button>
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
                    prop="name"
                    label="名称"
                    show-overflow-tooltip
                >
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
                    prop="protocol"
                    label="协议"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="用户名"
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
                            @click="updateGateway"
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
        </div>
    </section>
</template>

<script>
	export default {
		name: "gateway-detail-tab",
		components: {

        },
        props: ['gatewayDetailVisible'],
		data() {
			return {
                searchKey: '',
                isLoading: false,
                tableData: [
                    {
                        name: 'mcc',
                        ip: '127.0.0.56',
                        port: '22',
                        protocol: 'ssh',
                        userName: 'haha',
                        remark: '备注信息'
                    }
                ]
            }
		},
        gatewayDetailVisible: function (newVal, oldVal) {
            if(newVal != oldVal) {

            }
        },
		methods: {
            search: function () {

            },
            handleSelectionChange: function () {

            },
            createGateway: function () {
                this.$router.push({ path: '/home/networkList/addOrUpdateGateway', query: {addOrUpdate: 'add'}});
            },
            updateGateway: function () {
                this.$router.push({ path: '/home/networkList/addOrUpdateGateway', query: {addOrUpdate: 'update'}});
            }
        }
	}
</script>

<style lang="scss">
    .gateway-detail-tab-section {
        padding: 16px 22px 26px;
        background-color: #fff;
    }
</style>
