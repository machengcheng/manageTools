<template>
    <section class="add-or-update-assets-section">
        <div class="box-title mb20">{{this.$route.query.addOrUpdate == 'add' ? '创建资产' : '更新资产'}}</div>
        <div class="box-content">
            <el-form :model="addOrUpdateAssetsForm" :rules="rules" ref="addOrUpdateAssetsForm" class="demo-form-inline" label-width="120px">
                <div class="content">===={{assetsInfo}}
                    <div class="item-split">
                        <span class="item-title">基本</span>
                    </div>
                    <el-col :span="12">
                        <el-form-item
                            label="主机名: "
                            prop="hostName"
                        >
                            <el-input
                                v-model="addOrUpdateAssetsForm.hostName"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="IP: "
                            prop="ip"
                        >
                            <el-input
                                v-model="addOrUpdateAssetsForm.ip"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="端口: "
                            prop="port"
                        >
                            <el-input
                                v-model="addOrUpdateAssetsForm.port"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="系统平台: "
                            prop="platform"
                        >
                            <el-select
                                id="userGroup"
                                v-model="addOrUpdateAssetsForm.platform"
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
                    <el-col :span="12">
                        <el-form-item
                            label="公网IP: "
                            prop="publicIp"
                        >
                            <el-input
                                v-model="addOrUpdateAssetsForm.publicIp"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="网域: "
                            prop="network"
                        >
                            <el-select
                                id="userGroup"
                                v-model="addOrUpdateAssetsForm.network"
                                filterable
                                placeholder="请选择网域"
                            >
                                <el-option
                                    v-for="item in networkList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <div class="item-split">
                        <span class="item-title">认证</span>
                    </div>
                    <el-col :span="12">
                        <el-form-item
                            label="管理用户: "
                            prop="manageUser"
                        >
                            <el-select
                                id="userGroup"
                                v-model="addOrUpdateAssetsForm.manageUser"
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
                    <div class="clear"></div>-----{{$route.query.assetId}}
                    <div class="item-split">
                        <span class="item-title">节点</span>
                    </div>
                    <el-col :span="12">===={{addOrUpdateAssetsForm.nodeManage}}
                        <el-form-item
                            label="节点管理: "
                            prop="nodeManage"
                        >
                            <el-select
                                id="userGroup"
                                v-model="addOrUpdateAssetsForm.nodeManage"
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
                    <div class="clear"></div>
                    <div class="item-split">
                        <span class="item-title">标签管理</span>
                    </div>
                    <el-col :span="12">
                        <el-form-item
                            label="标签: "
                            prop="label"
                        >
                            <el-select
                                id="userGroup"
                                v-model="addOrUpdateAssetsForm.label"
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
                    <div class="clear"></div>
                    <div class="item-split">
                        <span class="item-title">其它</span>
                    </div>
                    <el-col :span="24">
                        <el-form-item label="备注: "
                                      prop="comment"
                        >
                            <el-input
                                type="textarea"
                                :rows="4"
                                style="width: 500px;"
                                size="medium"
                                resize="none"
                                placeholder="请输入备注信息"
                                v-model="addOrUpdateAssetsForm.comment">
                            </el-input><br/>
                            <el-checkbox v-model="addOrUpdateAssetsForm.is_active">激活</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" align="center">
                        <el-button>取 消</el-button>
                        <el-button type="primary" :loading="isLoading" @click="submitForm('addOrUpdateAssetsForm')">确 定</el-button>
                    </el-col>
                    <div class="clear"></div>
                </div>
            </el-form>
        </div>
    </section>
</template>

<script>
	export default {
		name: "add-or-update-assets",
		components: {

        },
		data() {
			return {
                isLoading: false,
                addOrUpdateAssetsForm: {
                    hostName: '',
                    ip: '',
                    port: '',
                    platform: '',
                    publicIp: '',
                    network: '',
                    manageUser: '',
                    nodeManage: [],
                    label: [],
                    comment: '',
                    is_active: true
                },
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
                networkList: [],
                manageUserList: [],
                nodeManageList: [],
                labelList: [],
                assetsInfo: [],
                rules: {
                    hostName: [
                        {required: true, message: '主机名不能为空', trigger: 'blur,change'},
                        {min: 1, max: 128, message: '最大长度为128个字符', trigger: 'blur change'}
                    ],
                    ip: [
                        {required: true, message: 'ip地址不能为空', trigger: 'blur,change'},
                        {pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: '请输入正确的ip地址', trigger: 'blur change'}
                    ],
                    port: [
                        {required: true, message: '端口不能为空', trigger: 'blur,change'},
                        {pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/, message: '请输入正确的端口号', trigger: 'blur change'}
                    ],
                    platform: [
                        {required: true, message: '请选择系统平台', trigger: 'blur,change'}
                    ],
                    publicIp: [
                        {pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: '请输入正确的ip地址', trigger: 'blur change'}
                    ]
                }
            }
		},
		methods: {
            submitForm(formName) {
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        switch(that.$route.query.addOrUpdate) {
                            case 'add':
                                that.add();
                                break;
                            case 'update':
                                that.update();
                                break;
                            default:
                                break;
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getNetworkList: function () {
                let that = this;
                this.$axios.get('http://localhost:8000/api/assets/domain/', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            if (data.data.results.length > 0) {
                                data.data.results.forEach(function (item) {
                                    that.networkList.push({
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
            getAssetsDetail: async function() {
                let that = this;
                let params = {
                    id__in: that.$route.query.assetId
                };
                this.isLoading = true;
                that.$axios.get('http://127.0.0.1:8000/api/assets/asset/', { params: params })
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            that.assetsInfo = data.data.results.length > 0 ? data.data.results[0] : [];
                            that.addOrUpdateAssetsForm.hostName = that.assetsInfo.hostname;
                            that.addOrUpdateAssetsForm.ip = that.assetsInfo.ip;
                            that.addOrUpdateAssetsForm.port = that.assetsInfo.port;
                            that.addOrUpdateAssetsForm.platform = that.assetsInfo.platform;
                            that.addOrUpdateAssetsForm.publicIp = that.assetsInfo.public_ip;
                            that.addOrUpdateAssetsForm.network = that.assetsInfo.domain;
                            that.addOrUpdateAssetsForm.manageUser = that.assetsInfo.admin_user;
                            that.addOrUpdateAssetsForm.nodeManage = that.assetsInfo.nodes ? that.assetsInfo.nodes : [];
                            that.addOrUpdateAssetsForm.label = that.assetsInfo.labels ? that.assetsInfo.labels : [];
                            that.addOrUpdateAssetsForm.comment = that.assetsInfo.comment;
                            that.addOrUpdateAssetsForm.is_active = that.assetsInfo.is_active;
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
            add: async function () {
                let that = this;
                let params = {
                    hostname: that.addOrUpdateAssetsForm.hostName,
                    ip: that.addOrUpdateAssetsForm.ip,
                    port: that.addOrUpdateAssetsForm.port,
                    public_ip: that.addOrUpdateAssetsForm.publicIp,
                    platform: that.addOrUpdateAssetsForm.platform,
                    domain: that.addOrUpdateAssetsForm.network,
                    admin_user: that.addOrUpdateAssetsForm.manageUser,
                    nodes: that.addOrUpdateAssetsForm.nodeManage,
                    labels: that.addOrUpdateAssetsForm.label,
                    is_active: that.addOrUpdateAssetsForm.is_active,
                    comment: that.addOrUpdateAssetsForm.comment
                };

                this.isLoading = true;
                const res = await that.$axios.post('http://localhost:8000/api/assets/asset/', params);
                if (res.status === 201) {
                    that.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    this.isLoading = false;
                    that.resetForm('addOrUpdateAssetsForm');
                }
            },
            update: async function () {
                let that = this;
                let params = {
                    hostname: that.addOrUpdateAssetsForm.hostName,
                    ip: that.addOrUpdateAssetsForm.ip,
                    port: that.addOrUpdateAssetsForm.port,
                    public_ip: that.addOrUpdateAssetsForm.publicIp,
                    platform: that.addOrUpdateAssetsForm.platform,
                    domain: that.addOrUpdateAssetsForm.network,
                    admin_user: that.addOrUpdateAssetsForm.manageUser,
                    nodes: that.addOrUpdateAssetsForm.nodeManage,
                    labels: that.addOrUpdateAssetsForm.label,
                    is_active: that.addOrUpdateAssetsForm.is_active,
                    comment: that.addOrUpdateAssetsForm.comment
                };

                that.isLoading = true;
                const res = await that.$axios.patch('http://localhost:8000/api/assets/asset/' + that.$route.query.assetId + '/', params);
                if (res.status === 200) {
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    that.isLoading = false;
                    that.getAssetsDetail();
                }
            }
        },
        mounted: function () {
            this.getNetworkList();
            this.getManageUserList();
            this.getNodeList();
            this.getLabelList();
            if (this.$route.query.assetId) {
                this.addOrUpdateAssetsForm.nodeManage.push(this.$route.query.assetId);
            }
            if (this.$route.query.addOrUpdate === 'update') {
                this.getAssetsDetail();
            }
        }
	}
</script>

<style lang="scss">
    .add-or-update-assets-section {
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
        .content {
            .item-split {
                border-bottom: 1px solid #eee;
                margin-bottom: 20px;
                .item-title {
                    display: inline-block;
                    border-bottom: 2px solid #409eff;
                }
            }
            .el-input .el-input__inner {
                width: 70%!important;
            }
            .el-select .el-input__inner {
                width: 100%!important;
            }
            [class*=el-col-12] {
                float: left;
            }
        }
    }
</style>
