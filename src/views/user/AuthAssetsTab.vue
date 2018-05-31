<template>
    <section class="auth-assets-tab-section">
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
                            show-overflow-tooltip
                        >
                            <template slot-scope="scope">
                                <el-button type="text"  size="small">{{ scope.row.is_connective === true ? '√' : 'X'}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-col :span="24" class="toolbar">
                        <el-pagination layout="total, prev, pager, next" background :current-page="page" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="margin: 15px 0;float:right;">
                        </el-pagination>
                    </el-col>
                </div>
            </el-col>
        </el-row>
    </section>
</template>
<script>
	export default {
		name: "auth-assets-tab",
		components: {

        },
        props: ['authAssetsVisible'],
		data() {
			return {
                defaultProps: {
                    id: 'id',
                    label: 'label',
                    key: 'key',
                    children: 'children',
                    parent: 'parent',
                    assets_amount: 'assets_amount'
                },
                isLoading: false,
                searchKey: '',
                nodeList: [],
                currentNode: [],
                currentNodeId: '',
                tableData: [],
                pageSizes: [10, 20, 30, 50, 100],
                total: 0,
                pageSize: 2,
                page: 1,
                tempTree: [
                    {
                        "id":"0966a665-49da-49d1-ac54-5a49131ca06c",
                        "key":"0:128:0:1",
                        "value":"新节点 147",
                        "parent":"c95eca9c-0712-4c6a-adfc-a57fbe2f6302",
                        "assets_amount":1
                    },
                    {
                        "id":"179c41aa-c498-4787-844b-e9bec396b554",
                        "key":"0:128:0:0",
                        "value":"新节点 143",
                        "parent":"c95eca9c-0712-4c6a-adfc-a57fbe2f6302",
                        "assets_amount":0
                    },
                    {
                        "id":"3cfc71bb-1b7c-44a5-954e-da9315b7c6f5",
                        "key":"0:125",
                        "value":"新节点 124",
                        "parent":"f3693230-ac22-415c-8165-36fe94155a18",
                        "assets_amount":0
                    },
                    {
                        "id":"8c3ceaf4-a07d-49d1-91e3-308c1f6d763d",
                        "key":"0:128:1",
                        "value":"新节点 139",
                        "parent":"e014b00c-9a47-4587-af26-eeba21d8dfbe",
                        "assets_amount":0
                    },
                    {
                        "id":"975ce50c-f977-4abe-b460-a6f83b2ce80d",
                        "key":"0:125:0",
                        "value":"新节点 135",
                        "parent":"3cfc71bb-1b7c-44a5-954e-da9315b7c6f5",
                        "assets_amount":0
                    },
                    {
                        "id":"ad1fae2e-6ad8-4065-85a2-f98b2cbd45a7",
                        "key":"0:128:0:2",
                        "value":"新节点 149",
                        "parent":"c95eca9c-0712-4c6a-adfc-a57fbe2f6302",
                        "assets_amount":0
                    },
                    {
                        "id":"afc7e4a7-bb0c-4443-bb4d-62273b4f5901",
                        "key":"0:128:2",
                        "value":"新节点 154",
                        "parent":"e014b00c-9a47-4587-af26-eeba21d8dfbe",
                        "assets_amount":0
                    },
                    {
                        "id":"bda22e27-263f-459c-9301-557017f7827b",
                        "key":"0:131:0",
                        "value":"新节点 133",
                        "parent":"f3693230-ac22-415c-8165-36fe94155a18",
                        "assets_amount":0
                    },
                    {
                        "id":"c95eca9c-0712-4c6a-adfc-a57fbe2f6302",
                        "key":"0:128:0",
                        "value":"新节点 137",
                        "parent":"e014b00c-9a47-4587-af26-eeba21d8dfbe",
                        "assets_amount":5
                    },
                    {
                        "id":"d24fcbf4-0b6f-4c38-87f8-898c95d55f0d",
                        "key":"0:128:1:0",
                        "value":"新节点 141",
                        "parent":"8c3ceaf4-a07d-49d1-91e3-308c1f6d763d",
                        "assets_amount":0
                    },
                    {
                        "id":"e014b00c-9a47-4587-af26-eeba21d8dfbe",
                        "key":"0:128",
                        "value":"新节点 127",
                        "parent":"f3693230-ac22-415c-8165-36fe94155a18",
                        "assets_amount":9
                    }
                ],
            }
		},
        watch: {
            authAssetsVisible: function (newVal, oldVal) {
                let that = this;
                if(newVal != oldVal) {
                    that.getNodeList();
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
            handleSizeChange(val) {
                this.pageSize = val;
                this.search();
            },
            handleCurrentChange: function (val) {
                this.page = val;
                this.getData();
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
                            <span>{node.data.label}</span>
                        </span>
                    </span>;

                if (node.data.id === that.currentNode.id) {
                    nodeItem =
                        <span class="nodeItem">
                            <span class="curSelectedNode">
                                <span>{node.data.label}</span>
                            </span>
                        </span>;
                }

                return nodeItem;

            },
            getTree: function (rows){
                let nodes = [];
                function exists(rows, parent){
                    for(let i=0; i<rows.length; i++){
                        if (rows[i].id == parent) {
                            return true;
                        }
                    }
                    return false;
                }
                // get the top level nodes
                for(let j=0; j<rows.length; j++){
                    let row = rows[j];
                    if (!exists(rows, row.parent)){
                        nodes.push({
                            id:row.id,
                            label:row.value
                        });
                    }
                }

                let toDo = [];
                for(let k=0; k<nodes.length; k++){
                    toDo.push(nodes[k]);
                }

                while(toDo.length){
                    let node = toDo.shift();  // the parent node
                    // get the children nodes
                    for(let m=0; m<rows.length; m++){
                        let row = rows[m];
                        if (row.parent == node.id){
                            let child = {id:row.id,label:row.value};
                            if (node.children){
                                node.children.push(child);
                            } else {
                                node.children = [child];
                            }
                            toDo.push(child);
                        }
                    }
                }

                return nodes;
            },
            getNodeList: async function () {
                let that = this;
                let userId = that.$route.query.userId;
                that.nodeList.splice(0, that.nodeList.length);
                await this.$axios.get('http://127.0.0.1:8000/api/perms/user/' + userId + '/nodes/', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            if (data.data.length > 0) {
                                let tempData = data.data;
                                let treeData = [{
                                    id: '',
                                    label: '',
                                    children: []
                                }];
                                tempData.forEach(function (item, index) {
                                    if (item.key === "0") {
                                        treeData[0].id = item.id;
                                        treeData[0].label = item.value;
                                        treeData[0].key = item.key;
                                        tempData.splice(index, 1);
                                    }
                                });

                                let tempTreeData = that.getTree(tempData);

                                if (treeData[0].id) {
                                    treeData[0].children = tempTreeData;
                                    that.nodeList = treeData;
                                } else {
                                    that.nodeList = tempTreeData;
                                }

                                that.currentNodeId = that.nodeList[0].id;
                                that.currentNode = that.nodeList[0];
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
            getData: function () {
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
            assetsDetail: function (index, row) {
                this.$router.push({path: '/home/assetsList/assetsDetail', query: { assetId: row.id }});
            },
        },
        mounted: function () {
            let that = this;
            that.getNodeList();
        }
	}
</script>

<style lang="scss">
    .auth-assets-tab-section {
        /*padding: 26px 22px;*/
        padding: 0 15px;
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
