<template>
    <section class="assets-auth-list-default-section">
        <div class="box-title">资产授权列表</div>
        <el-row>
            <el-col :span="6" class="pt20">
                <el-tree
                    ref="tree"
                    :data="nodeList"
                    empty-text="节点为空"
                    default-expand-all
                    :current-node-key="0"
                    :highlight-current="true"
                    :expand-on-click-node="false"
                    :props="defaultProps"
                    :render-content="renderContent"
                    @node-click="nodeClick"
                >
                </el-tree>
            </el-col>
            <el-col :span="18" class="pt20">
                <div class="box-operate pt0">
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
                                <el-button type="text" size="small">{{ scope.row.node ? scope.row.node.name : ''}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="user_group"
                            label="用户组"
                            show-overflow-tooltip
                        >
                            <template slot-scope="scope">
                                <el-button type="text" @click="userGroupDetail(scope.$index, scope.row)" size="small">{{ scope.row.user_group ? scope.row.user_group.name : '' }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="system_user"
                            label="系统用户"
                            show-overflow-tooltip
                        >
                            <template slot-scope="scope">
                                <el-button type="text" @click="systemUserDetail(scope.$index, scope.row)" size="small">{{ scope.row.system_user ? scope.row.system_user.name : '' }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="is_active"
                            label="激活"
                            show-overflow-tooltip
                        >
                            <template slot-scope="scope">
                                <el-button type="text" size="small">{{ scope.row.is_active === true ? '√' : 'X'}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="date_expired"
                            label="失效日期"
                            width="160"
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
                                    @click="updateAuthRule(scope.$index, scope.row)"
                                >
                                    更新
                                </el-button>
                                <el-button
                                    type="danger"
                                    size="mini"
                                    plain
                                    @click="deleteAuthRule(scope.$index, scope.row)"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-col :span="24" class="toolbar">
                        <el-pagination layout="sizes, total, prev, pager, next" background :current-page="page" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="pageSizes" :page-size="pageSize" :total="total" style="margin: 15px 0;float:right;">
                        </el-pagination>
                    </el-col>
                    <div class="clear"></div>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
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
                nodeList: [],
                currentNode: [],
                currentNodeId: '',
                defaultProps: {
                    id: 'id',
                    label: 'label',
                    key: 'key',
                    children: 'children',
                    parent: 'parent',
                    assets_amount: 'assets_amount'
                },
                isLoading: false,
                pageSizes: [1, 2, 3, 4, 5],
                total: 0,
                pageSize: 1,
                page: 1
            }
		},
		methods: {
            ...mapActions([
                'setAuthCurrentNode'
            ]),
            search: function () {
                this.page = 1;
                this.getData();
            },
            handleSelectionChange: function () {

            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.search();
            },
            handleCurrentChange: function (val) {
                this.page = val;
                this.getData();
            },
            createAuthRule: function () {
                this.setAuthCurrentNode(this.currentNode);
                this.$router.push({ path: '/home/assetsAuthList/addOrUpdateAuthRule', query: {addOrUpdate: 'add', node: this.currentNode.id }});
            },
            updateAuthRule: function (index, row) {
                this.$router.push({ path: '/home/assetsAuthList/addOrUpdateAuthRule', query: {addOrUpdate: 'update', ruleId: row.id }});
            },
            nodeClick: function (nodeObj, node, obj) {
                console.info('===============node000');
                console.info(obj);
                console.info('===============node111');
                let that = this;
                that.currentNode = nodeObj;
                that.currentNodeId = nodeObj.id;
                that.search();
            },
            renderContent(h, {node, data, store}) {
                let that = this;
                let nodeItem =
                    <span class="nodeItem">
                        <span>
                            <span>{node.label}</span>
                        </span>
                    </span>;

                if (node.data.id === that.currentNode.id) {
                    nodeItem =
                            <span class="nodeItem">
                                <span class="curSelectedNode">
                                    <span>{node.label}</span>
                                </span>
                            </span>;
                }

                return nodeItem;

            },
            toTreeData: function (data, attributes) {
                let resData = data;
                let tree = [];

                for (let i = 0; i < resData.length; i++) {
                    if (resData[i].parent === attributes.rootId && resData[i].id !== attributes.rootId) {
                        let obj = {
                            id: resData[i][attributes.id],
                            label: resData[i][attributes.label],
                            parent: resData[i][attributes.parent],
                            key: resData[i][attributes.key],
                            assets_amount: resData[i][attributes.assets_amount],
                            children: []
                        };
                        tree.push(obj);
                        resData.splice(i, 1);
                        i--;
                    }
                }

                run(tree);

                function run(chiArr) {
                    if (resData.length !== 0) {
                        for (let i = 0; i < chiArr.length; i++) {
                            for (let j = 0; j < resData.length; j++) {
                                if (resData[j][attributes.parent] === chiArr[i].id) {
                                    let obj = {
                                        id: resData[j][attributes.id],
                                        label: resData[j][attributes.label],
                                        parent: resData[j][attributes.parent],
                                        key: resData[j][attributes.key],
                                        assets_amount: resData[j][attributes.assets_amount],
                                        children: []
                                    };
                                    chiArr[i].children.push(obj);
                                    resData.splice(j, 1);
                                    j--;
                                }
                            }
                            run(chiArr[i].children);
                        }
                    }
                }

                return tree;
            },
            getNodeList: async function () {
                let that = this;
                that.nodeList.splice(0, that.nodeList.length);
                await this.$axios.get('http://localhost:8000/api/assets/nodes/', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            if (data.data.length > 0) {
                                // 属性配置信息
                                let attributes = {
                                    id: 'id',
                                    parent: 'parent',
                                    key: 'key',
                                    label: 'value',
                                    assets_amount: 'assets_amount',
                                    rootId: ''
                                };

                                data.data.forEach(function (item) {
                                    if (item.key === "0") {
                                        attributes.rootId = item.id;
                                    }
                                });

                                let datas = data.data;

                                let tempData = data.data.concat();

                                let treeData = that.toTreeData(datas, attributes);

                                tempData.forEach(function (item) {
                                    if (item.key === "0") {
                                        let obj = {
                                            id: item.id,
                                            label: item.value,
                                            parent: item.parent,
                                            key: item.key,
                                            assets_amount: item.assets_amount,
                                            children: []
                                        };

                                        that.currentNodeId = item.id;
                                        that.currentNode = item;

                                        if (treeData.length !== 0) {
                                            obj.children = treeData;
                                        }

                                        that.nodeList.push(obj);
                                    }
                                });

                                console.info(JSON.stringify(that.nodeList));

                                that.nodeList = JSON.parse(JSON.stringify(that.nodeList));
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
            getData: async function() {
                let that = this;
                let params = {
                    node_id: that.currentNodeId,
                    limit: that.pageSize,
                    offset: that.pageSize*(that.page-1)
                };
                this.isLoading = true;
                that.$axios.get('http://127.0.0.1:8000/api/perms/asset-permissions/', { params: params})
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
            deleteAuthRuleFunc: async function (index, row) {
                let that = this;
                let id = row.id;
                const res = await that.$axios.delete('http://localhost:8000/api/perms/asset-permissions/' + id + '/', {});
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
                that.search();
            },
            deleteAuthRule: function (index, row) {
                let that = this;

                that.$confirm('删除该记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.deleteAuthRuleFunc(index, row);
                }).catch(() => {
                    // that.$message({
                    //     type: 'info',
                    //     message: '已取消删除',
                    //     duration: 1500
                    // });
                });
            },
            userGroupDetail: function (index, row) {
                this.$router.push({ path: '/home/userGroup/userGroupDetail', query: {userId: row.user_group.pk}});
            },
            systemUserDetail: function (index, row) {
                this.$router.push({ path: '/home/systemUserList/SystemUserDetail', query: { userId: row.system_user.pk } });
            }
        },
        mounted: function () {
		    let that = this;
            that.getNodeList();
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
        .nodeItem {
            width: 100%;
            font-size: 13px;
            font-weight: 400;
        }
        .nodeItem:hover .nodeOpt {
            display: inline-block!important;
        }
        .curSelectedNode {
            color: #409eff;
            font-weight: bold;
        }
        .nodeOpt {
            display: none!important;
            margin-left: 10px;
        }
    }
</style>
