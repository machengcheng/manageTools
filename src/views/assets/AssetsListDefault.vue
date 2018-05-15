<template>
    <section class="assets-list-default">
        <rename-node-name-dialog :updateData="updateData" :updateStatus="updateStatus" :renameNodeNameDialogVisible="renameNodeNameDialogVisible" @renameNodeNameDialogVisibleEvent="updateDialogStatus"></rename-node-name-dialog>
        <add-assets-to-node-dialog :updateData="updateData" :updateStatus="updateStatus" :addAssetsToNodeDialogVisible="addAssetsToNodeDialogVisible" @addAssetsToNodeDialogEvent="updateAssetsNodeDialogStatus"></add-assets-to-node-dialog>
        <div class="box-title">资产列表</div>
        <el-row>
            <el-col :span="6" class="pt20">
                <el-tree
                    :data="nodeList"
                    empty-text="节点为空"
                    default-expand-all
                    :highlight-current="true"
                    :expand-on-click-node="false"
                    :props="defaultProps"
                    :render-content="renderContent"
                    @node-click="nodeClick"
                    @node-contextmenu="nodeContextMenu"
                    >
                </el-tree>
                <v-contextmenu ref="contextmenu">
                    <v-contextmenu-item @click="createAssets">创建资产</v-contextmenu-item>
                    <v-contextmenu-item @click="addAssetsToNode">添加资产到节点</v-contextmenu-item>
                    <v-contextmenu-item>更新节点资产硬件信息</v-contextmenu-item>
                    <v-contextmenu-item>测试节点资产可连接性</v-contextmenu-item>
                    <v-contextmenu-item @click="addNode">新建节点</v-contextmenu-item>
                    <v-contextmenu-item @click="renameNode">重命名节点</v-contextmenu-item>
                    <v-contextmenu-item @click="removeNode">删除节点</v-contextmenu-item>
                </v-contextmenu>
            </el-col>
            <el-col :span="18" class="pt20">
                <div class="box-operate">
                    <el-button type="primary" size="small" @click="createAssets">创建资产</el-button>
                    <el-button size="small" class="fr">导出</el-button>
                    <el-button size="small" class="fr">导入</el-button>
                    <el-button  type="primary" size="small" @click="search" class="fr mr20">查询</el-button>
                    <el-input v-model="searchKey" size="small" @click="search" class="searchKey wat fr" placeholder="请输入查询内容"></el-input>
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
                                <el-button type="text" @click="assetsDetail(scope.$index, scope.row)" size="small">{{ scope.row.hostname }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="ip"
                            label="IP"
                            show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column
                            prop="hardware"
                            label="硬件"
                            show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column
                            prop="is_active"
                            label="激活中"
                            show-overflow-tooltip
                        >
                            <template slot-scope="scope">
                                <el-button type="text" size="small">{{ scope.row.is_active === true ? '√' : 'X'}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="is_connective"
                            label="可连接"
                            width="130"
                            show-overflow-tooltip
                        >
                            <template slot-scope="scope">
                                <el-button type="text"  size="small">{{ scope.row.is_connective === true ? '√' : 'X'}}</el-button>
                            </template>
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
                                    @click="updateAssets(scope.$index, scope.row)"
                                >
                                    更新
                                </el-button>
                                <el-button
                                    type="danger"
                                    size="mini"
                                    plain
                                    @click="deleteAsset(scope.$index, scope.row)"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-col :span="24" class="toolbar">
                        <el-pagination layout="total, prev, pager, next" background :current-page="page" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="margin: 15px 0;float:right;">
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
            </el-col>
        </el-row>
    </section>
</template>

<script type="text/jsx">
	import RenameNodeNameDialog from "./RenameNodeNameDialog";
    import AddAssetsToNodeDialog from "./AddAssetsToNodeDialog";

    export default {
		name: "assets-list-default",
		components: {
            AddAssetsToNodeDialog,
            RenameNodeNameDialog
        },
		data() {
			return {
                searchKey: '',
                operateType: '',
                tableData: [],
                isLoading: false,
                total: 0,
                pageSize: 1,
                currentNodeId: '',
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
                data: [
                    {
                        id: 'a1',
                        label: 'ROOT',
                        children: [
                            {
                                id: 'a2',
                                label: 'Mysql-lj',
                                children: [
                                    {
                                        id: 'a3',
                                        label: 'BookRegister5',
                                        children: [
                                            {
                                                id: 'a4',
                                                label: 'Id'
                                            },
                                            {
                                                id: 'a5',
                                                label: 'book_id'
                                            },
                                            {
                                                id: 'a6',
                                                label: 'book_name'
                                            },
                                            {
                                                id: 'a7',
                                                label: 'author_name'
                                            }
                                        ]
                                    },
                                    {
                                        id: 'a8',
                                        label: 'CallRecords1',
                                        children: [
                                            {
                                                id: 'a9',
                                                label: 'Id'
                                            },
                                            {
                                                id: 'a10',
                                                label: 'CID'
                                            },
                                            {
                                                id: 'a11',
                                                label: 'CallDuration'
                                            },
                                            {
                                                id: 'a12',
                                                label: 'PingLv'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                nodeList: [],
                currentNode: [],
                updateData: [],
                updateStatus: '',
                renameNodeNameDialogVisible: false,
                addAssetsToNodeDialogVisible: false,
                defaultProps: {
                    id: 'id',
                    label: 'label',
                    key: 'key',
                    children: 'children',
                    parent: 'parent',
                    assets_amount: 'assets_amount'
                }
            }
		},
		methods: {
            search: function () {
                this.page = 1;
                this.getData();
            },
            handleSelectionChange: function () {

            },
            handleCurrentChange: function (val) {
                this.page = val;
                this.getData();
            },
            createAssets: function () {
                let that = this;
                that.updateData = that.currentNode;
                this.$router.push({path: '/home/assetsList/addOrUpdateAssets', query: {addOrUpdate: 'add', assetId: that.updateData.id}});
            },
            addAssetsToNode: function () {
                let that = this;
                that.updateData = that.currentNode;
                let tempDate = new Date();
                that.updateStatus = tempDate.toTimeString();
                this.addAssetsToNodeDialogVisible = true;
            },
            updateAssets: function (index, row) {
                this.$router.push({path: '/home/assetsList/addOrUpdateAssets', query: {addOrUpdate: 'update', assetId: row.id}});
            },
            assetsDetail: function (index, row) {
                this.$router.push({path: '/home/assetsList/assetsDetail', query: { assetId: row.id }});
            },
            updateDialogStatus: function (val) {
                let that = this;
                that.renameNodeNameDialogVisible = false;
                if (val === 'updated') {
                    that.getData();
                    that.getNodeList();
                }
            },
            updateAssetsNodeDialogStatus: function (val) {
                let that = this;
                that.addAssetsToNodeDialogVisible = false;
                if (val === 'updated') {
                    that.search();
                    that.getNodeList();
                }
            },
            getData: async function () {
                let that = this;
                let params = {
                    hostname: that.searchKey,
                    node_id: that.currentNodeId,
                    limit: that.pageSize,
                    offset: that.pageSize * (that.page - 1)
                };
                that.isLoading = true;
                that.$axios.get('http://localhost:8000/api/assets/asset/', {params: params})
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
            nodeClick: function (nodeObj, node, obj) {
                let that = this;
                that.currentNodeId = nodeObj.id;
                that.search();
                // alert(JSON.stringify(nodeObj.id));
            },
            renderContent(h, {node, data, store}) {
                console.info('===============node0');
                console.info(node);
                console.info('===============node1');


                let nodeItem =
                    <span class="nodeItem">
                        <span>
                            <span>{node.label}({node.data.assets_amount})</span>
                        </span>
                    </span>;

                return nodeItem;

            },
            nodeContextMenu: function (event, nodeObj, node, obj) {
                let that = this;
                that.currentNodeId = nodeObj.id;
                that.search();
                // alert(JSON.stringify(nodeObj.id));
                // alert(90000000 + ": " + JSON.stringify(nodeObj) + "===" + node.isLeaf);

                console.info("=========当前节点信息000000");
                console.info(nodeObj);
                console.info("=========当前节点信息111111");

                that.currentNode = nodeObj;

                // console.info(this.$refs.contextmenu.$el);
                that.$refs.contextmenu.$el.style.display = "block";
                that.$refs.contextmenu.$el.style.top = (event.pageY) + 'px';
                that.$refs.contextmenu.$el.style.left = (event.pageX) + 'px';
            },
            addNode: async function () {
                var that = this;

                const res = await that.$axios.post('http://localhost:8000/api/assets/nodes/' + that.currentNode.id + '/children/', {});
                if (res.status === 201) {
                    that.getData();
                    that.getNodeList();
                }
            },
            renameNode: function () {
                this.updateData = this.currentNode;
                let tempDate = new Date();
                this.updateStatus = tempDate.toTimeString();
                this.renameNodeNameDialogVisible = true;
            },
            removeNodeFunc: async function() {
                let that = this;
                let nodeId = that.currentNode.id;
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
                that.getData();
                that.getNodeList();
            },
            removeNode: function () {
                let that = this;

                if (that.currentNode.children.length > 0) {
                    that.$message({
                        message: '该节点下存在子节点, 禁止删除',
                        type: 'warning',
                        duration: 1500
                    });
                    return;
                }

                that.$confirm('确认删除该节点?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.removeNodeFunc();
                }).catch(() => {
                    console.info('已取消删除');
                });
            },
            menuContext: function (e) {
                let that = this;
                that.$refs.contextmenu.$el.style.display = "none";
                e.stopPropagation();
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
            deleteAssetFunc: async function (index, row) {
                let that = this;
                let id = row.id;

                const res = await that.$axios.delete('http://localhost:8000/api/assets/asset/' + id + '/', {});
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
            deleteAsset: function (index, row) {
                let that = this;

                that.$confirm('删除该记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.deleteAssetFunc(index, row);
                }).catch(() => {
                    // that.$message({
                    //     type: 'info',
                    //     message: '已取消删除',
                    //     duration: 1500
                    // });
                });
            },
        },
        mounted: function () {
            let that = this;
            that.getData();
            that.getNodeList();
            document.body.addEventListener('click', that.menuContext, false);
        },
        beforeDestroy: function () {
            let that = this;
            document.body.removeEventListener('click', that.menuContext);
        }
	}
</script>

<style lang="scss">
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
        .nodeItem {
            width: 100%;
            font-size: 13px;
            font-weight: 400;
        }
        .nodeItem:hover .nodeOpt {
            display: inline-block!important;
        }
        .nodeOpt {
            display: none!important;
            margin-left: 10px;
        }
        .el-message-box {
            width: 150px!important;
        }
    }
</style>
