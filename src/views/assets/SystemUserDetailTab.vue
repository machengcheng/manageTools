<template>
    <section class="system-user-detail-tab-section">
        <el-row>
            <el-col :span="16" class="pd10">
                <div class="block-item" style="min-height: 400px;">
                    <div class="block-title">{{systemUserDetailData.name}}</div>
                    <ul class="info-list">
                        <li class="info-item">
                            <span class="tips">名称:</span>
                            <span class="detail">{{systemUserDetailData.name}}</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">用户名:</span>
                            <span class="detail">{{systemUserDetailData.username}}</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">协议:</span>
                            <span class="detail">{{systemUserDetailData.protocol}}</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">Sudo:</span>
                            <span class="detail">{{systemUserDetailData.sudo}}</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">Shell:</span>
                            <span class="detail">{{systemUserDetailData.shell}}</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">创建日期:</span>
                            <span class="detail">{{systemUserDetailData.date_created}}</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">创建者:</span>
                            <span class="detail">{{systemUserDetailData.created_by}}</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">备注:</span>
                            <span class="detail">{{systemUserDetailData.comment}}</span>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="8" class="pd10">
                <div class="block-item" style="height: 240px;">
                    <div class="block-title">快速更新</div>
                    <ul class="info-list">
                        <li class="info-item">
                            <span class="tips">自动推送:</span>
                            <span class="detail">
                                <el-switch
                                    v-model="autoPush"
                                >
                                </el-switch>
                            </span>
                        </li>
                        <li class="info-item">
                            <span class="tips">立刻推送系统:</span>
                            <span class="detail">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    plain
                                >
                                    推送
                                </el-button>
                            </span>
                        </li>
                        <li class="info-item">
                            <span class="tips">测试资产可连接性:</span>
                            <span class="detail">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    plain
                                >
                                    测试
                                </el-button>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="block-item" style="min-height: 240px;margin-top: 15px;">
                    <div class="block-title">节点管理</div>
                    <ul class="info-list">
                        <li class="info-item">
                            <el-select
                                id="userGroup"
                                v-model="node"
                                filterable
                                multiple
                                placeholder="请选择节点管理"
                            >
                                <el-option
                                    v-for="item in nodeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <div class="clear"></div>
                            <el-button
                                type="primary"
                                size="mini"
                                plain
                                @click="addNode"
                                :loading="isLoading"
                            >
                                确认
                            </el-button>
                        </li>
                        <li class="info-item bd0 mt10" v-for="item in systemUserDetailData.node_name">
                            <span class="tips">{{item.name}}</span>
                            <span class="fr">
                                <el-button
                                    type="danger"
                                    size="mini"
                                    plain
                                    icon="el-icon-minus"
                                    @click="deleteNode(item.id)"
                                >
                                </el-button>
                            </span>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
	export default {
		name: "system-user-detail-tab",
		components: {

        },
        props: ['systemUserDetailVisible'],
		data() {
			return {
                systemUserDetailData: [],
                autoPush: true,
                node: [],
                nodeList: [],
                isLoading: false,
            }
		},
        watch: {
            systemUserDetailVisible: function (newVal, oldVal) {
                if (newVal != oldVal) {
                    this.getData();
                }
            }
        },
		methods: {
            getData: async function() {
                let that = this;
                let userId = that.$route.query.userId;
                this.isLoading = true;
                await that.$axios.get('http://localhost:8000/api/assets/system-user/' + userId + '/', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            that.systemUserDetailData = data.data ? data.data : [];
                            if (that.systemUserDetailData.node_name.length > 0) {
                                that.systemUserDetailData.node_name.forEach(function (item) {
                                    that.node.push(item.id);
                                });
                            }
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
            getNodeList: async function () {
                let that = this;
                that.node.splice(0, that.node.length);
                await this.$axios.get('http://localhost:8000/api/assets/nodes/', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            if (data.data.length > 0) {
                                data.data.forEach(function (item) {
                                    that.nodeList.push({
                                        value: item.id,
                                        label: item.value
                                    });
                                });
                            }
                            that.getData();
                        }
                    })
                    .catch(function (response) {
                        that.$message({
                            message: '未知异常',
                            type: 'error',
                            duration: 1500
                        });
                    });
            },
            addNode: async function () {
                var that = this;
                let params = {};
                if (that.node.length === 0) {
                    params = {
                        none_node: 'none_node'
                    };
                } else {
                    params = {
                        nodes: that.node
                    };
                }

                that.isLoading = true;
                const res = await that.$axios.patch('http://localhost:8000/api/assets/system-user/' + that.$route.query.userId + '/', params);
                if (res.status === 200) {
                    that.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    that.isLoading = false;
                    that.getNodeList();
                }
            },
            deleteNodeFunc: async function (nodeId) {
                let that = this;
                const res = await that.$axios.delete('http://localhost:8000/api/assets/nodes/' + nodeId + '/', {});
                if (res.status === 204) {
                    this.$message({
                        type: 'success',
                        message: '删除成功',
                        duration: 1500
                    });
                } else {
                    this.$message({
                        type: 'info',
                        message: '删除失败',
                        duration: 1500
                    });
                }
                that.getNodeList();
            },
            deleteNode: function (nodeId) {
                let that = this;

                that.$confirm('删除该节点?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.deleteNodeFunc(nodeId);
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除',
                        duration: 1500
                    });
                });
            }
        },
        mounted: function () {
            this.getNodeList();
        }
	}
</script>

<style lang="scss">
    .system-user-detail-tab-section {
        padding: 16px 22px 26px;
        background-color: #fff;
        .el-select .el-input__inner {
            width: 100%!important;
        }
        .block-item {
            background-color: #fff;
            border: 1px solid #ebebeb;
            box-shadow: 0 1px 4px 0 rgba(222,235,250,1);
            border-radius: 3px;
            .block-title {
                height: 48px;
                line-height: 48px;
                padding-left: 15px;
                color: #606266;
                font-size: 14px;
                background-color: #f5f7fa;
            }
        }
        .info-list {
            font-size: 13px;
            padding: 25px;
            line-height: 3.2em;
            color: #4E4E4E;
            .info-item {
                border-bottom: 1px solid #dcdfe6;
                span {
                    display: inline-block;
                }
                span.tips {
                    min-width: 130px;
                    text-align: left;
                }
                span.detail {
                    display: inline-block;
                    min-width: 150px;
                    text-align: left;
                }
                img {
                    width: 80px;
                    height: 80px;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                }
            }
            .info-item:last-of-type {
                border: 0;
            }
        }
        .pd10 {
            padding: 10px;
        }
        .pd15 {
            padding: 15px;
        }
    }
</style>
