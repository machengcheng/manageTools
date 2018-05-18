<template>
    <section class="update-assets-for-batch-section">
        <div class="box-title mb20">批量更新资产</div>
        <div class="box-content">
            <div class="attr-list">
                <p>选择需要修改的属性</p>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox v-model="checkPort" @change="handleCheckChange">端口</el-checkbox>
                <el-checkbox v-model="checkAdminUser" @change="handleCheckChange">管理用户</el-checkbox>
                <el-checkbox v-model="checkLabelAdmin" @change="handleCheckChange">标签管理</el-checkbox>
                <el-checkbox v-model="checkNodeAdmin" @change="handleCheckChange">节点管理</el-checkbox>
                <el-checkbox v-model="checkSystemPlatform" @change="handleCheckChange">系统平台</el-checkbox>
            </div>
            <div class="content">
                <el-form :model="updateAssetsForBatchForm" :rules="rules" ref="updateAssetsForBatchForm" class="demo-form-inline" label-width="120px">
                    <div class="content">
                        <el-col :span="24">
                            <el-form-item
                                label="资产: "
                                prop="assets"
                            >
                                <el-select
                                    id="assets-select"
                                    v-model="updateAssetsForBatchForm.assets"
                                    multiple
                                    placeholder="请选择资产"
                                >
                                    <el-option
                                        v-for="item in assetsList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" v-if="checkPort">
                            <el-form-item
                                label="端口: "
                                prop="port"
                            >
                                <el-input
                                    v-model="updateAssetsForBatchForm.port"
                                    size="medium"
                                    type="number"
                                    min="1"
                                    max="65535"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" v-if="checkAdminUser">
                            <el-form-item
                                label="管理用户: "
                                prop="manageUser"
                            >
                                <el-select
                                    v-model="updateAssetsForBatchForm.manageUser"
                                    filterable
                                    placeholder="请选择管理用户"
                                >
                                    <el-option
                                        v-for="item in manageUserList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" v-if="checkLabelAdmin">
                            <el-form-item
                                label="标签: "
                                prop="label"
                            >
                                <el-select
                                    v-model="updateAssetsForBatchForm.label"
                                    multiple
                                    placeholder="请选择标签"
                                >
                                    <el-option
                                        v-for="item in labelList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" v-if="checkNodeAdmin">
                            <el-form-item
                                label="节点管理: "
                                prop="nodeManage"
                            >
                                <el-select
                                    v-model="updateAssetsForBatchForm.nodeManage"
                                    filterable
                                    multiple
                                    placeholder="请选择节点管理"
                                >
                                    <el-option
                                        v-for="item in nodeManageList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" v-if="checkSystemPlatform">
                            <el-form-item
                                label="系统平台: "
                                prop="platform"
                            >
                                <el-select
                                    v-model="updateAssetsForBatchForm.platform"
                                    filterable
                                    placeholder="请选择系统平台"
                                >
                                    <el-option
                                        v-for="item in platformList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" align="center">
                            <el-button>取 消</el-button>
                            <el-button type="primary" :loading="isLoading" @click="submitForm('updateAssetsForBatchForm')">确 定</el-button>
                        </el-col>
                        <div class="clear"></div>
                    </div>
                </el-form>
            </div>
        </div>
    </section>
</template>

<script>
	export default {
		name: "update-assets-for-batch",
		components: {

        },
		data() {
			return {
                isLoading: false,
                updateAssetsForBatchForm: {
                    assets: [],
                    port: '',
                    manageUser: '',
                    label: [],
                    nodeManage: [],
                    platform: '',
                },
                assetsList: [],
                manageUserList: [],
                labelList: [],
                nodeManageList: [],
                platformList: [
                    {
                        value: 'Linux',
                        label: 'Linux'
                    },
                    {
                        value: 'Unix',
                        label: 'Unix'
                    },
                    {
                        value: 'MacOS',
                        label: 'MacOS'
                    },
                    {
                        value: 'BSD',
                        label: 'BSD'
                    },
                    {
                        value: 'Windows',
                        label: 'Windows'
                    },
                    {
                        value: 'Other',
                        label: 'Other'
                    }
                ],
                rules: {
                    assets: [
                        {required: true, message: '请选择资产', trigger: 'blur,change'}
                    ]
                },
                isIndeterminate: false,
                checkAll: true,
                checkPort: true, //端口
                checkAdminUser: true, //管理用户
                checkLabelAdmin: true, //标签管理
                checkNodeAdmin: true, //节点管理
                checkSystemPlatform: true //系统平台
            }
		},
		methods: {
            handleCheckAllChange(val) {
                let that = this;
                if (val) {
                    that.checkPort = true;
                    that.checkAdminUser = true;
                    that.checkLabelAdmin = true;
                    that.checkNodeAdmin = true;
                    that.checkSystemPlatform = true;
                } else {
                    that.checkPort = false;
                    that.checkAdminUser = false;
                    that.checkLabelAdmin = false;
                    that.checkNodeAdmin = false;
                    that.checkSystemPlatform = false;
                }
                that.isIndeterminate = false;
            },
            handleCheckChange: function (val) {
                let that = this;
                if (that.checkPort && that.checkAdminUser && that.checkLabelAdmin && that.checkNodeAdmin && that.checkSystemPlatform) {
                    that.checkAll = true;
                    this.isIndeterminate = false;
                } else {
                    if (that.checkPort || that.checkAdminUser || that.checkLabelAdmin || that.checkNodeAdmin || that.checkSystemPlatform) {
                        this.isIndeterminate = true;
                    } else {
                        that.checkAll = false;
                        this.isIndeterminate = false;
                    }
                }
            },
            submitForm(formName) {
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.update();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getAssetsList: function () {
                let that = this;
                this.$axios.get('http://localhost:8000/api/assets/asset', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            if (data.data.results.length > 0) {
                                data.data.results.forEach(function (item) {
                                    that.assetsList.push({
                                        value: item.id,
                                        label: item.hostname
                                    });
                                });
                            }
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
            getManageUserList: function () {
                let that = this;
                this.$axios.get('http://localhost:8000/api/assets/admin-user/', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            if (data.data.results.length > 0) {
                                data.data.results.forEach(function (item) {
                                    that.manageUserList.push({
                                        value: item.id,
                                        label: item.name
                                    });
                                });
                            }
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
            getLabelList: function () {
                let that = this;
                this.$axios.get('http://localhost:8000/api/assets/labels/', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            if (data.data.results.length > 0) {
                                data.data.results.forEach(function (item) {
                                    that.labelList.push({
                                        value: item.id,
                                        label: item.value
                                    });
                                });
                            }
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
            getNodeList: function () {
                let that = this;
                this.$axios.get('http://localhost:8000/api/assets/nodes/', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            if (data.data.length > 0) {
                                data.data.forEach(function (item) {
                                    that.nodeManageList.push({
                                        value: item.id,
                                        label: item.value
                                    });
                                    if (item.value === 'ROOT') {
                                        that.updateAssetsForBatchForm.nodeManage.push(item.id);
                                    }
                                });
                            }
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
            update: async function () {
                let that = this;
                let asset_ids = that.updateAssetsForBatchForm.assets.join(',');
                let params = {
                    port: that.updateAssetsForBatchForm.port,
                    admin_user: that.updateAssetsForBatchForm.manageUser,
                    labels: that.updateAssetsForBatchForm.label,
                    nodes: that.updateAssetsForBatchForm.nodeManage,
                    platform: that.updateAssetsForBatchForm.platform
                };

                for (let index in params) {
                    if(!params[index] || params[index].length === 0) {
                        delete params[index];
                    }
                }

                that.isLoading = true;
                const res = await that.$axios.post('http://localhost:8000/api/assets/multi-update/asset/?asset_ids=' + asset_ids, params);
                if (res.status === 200) {
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    that.isLoading = false;
                    this.$router.push({path: '/home/assetsList' });
                }
            }
        },
        mounted: function () {
		    let that = this;
            let assets = this.$route.query.assets;
            if (assets && assets.length > 0) {
                assets.forEach(function (item) {
                    that.updateAssetsForBatchForm.assets.push(item);
                })
            }

            this.getAssetsList();
            this.getManageUserList();
            this.getLabelList();
            this.getNodeList();
        }
	}
</script>

<style lang="scss">
    .update-assets-for-batch-section {
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
            .attr-list {
                padding: 15px 0 15px 10px;
                background: #f4f4f4;
                p {
                    font-size: 12px;
                    color: #999;
                }
            }
            .content {
                padding: 15px;
                .el-input .el-input__inner {
                    width: 400px!important;
                }
                .el-select .el-input__inner {
                    width: 100%!important;
                    min-width: 400px!important;
                }
                [class*=el-col-12] {
                    float: left;
                }
            }
        }
    }
</style>
