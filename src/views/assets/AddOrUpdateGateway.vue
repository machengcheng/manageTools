<template>
    <section class="add-or-update-gateway-section">
        <div class="box-title mb20">{{this.$route.query.addOrUpdate == 'add' ? '创建网关' : '更新网关'}}<el-button type="text" size="small" @click="goBack" class="fr tip-text" style="height: 48px;margin: 0 20px;">返回</el-button></div>
        <div class="box-content">
            <el-form :model="addOrUpdateGatewayForm" :rules="rules" ref="addOrUpdateGatewayForm" class="demo-form-inline" label-width="120px">
                <div class="content">
                    <div class="item-split">
                        <span class="item-title">基本</span>
                    </div>
                    <el-col :span="24">
                        <el-form-item
                            label="名称: "
                            prop="name"
                        >
                            <el-input
                                v-model="addOrUpdateGatewayForm.name"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="IP: "
                            prop="ip"
                        >
                            <el-input
                                v-model="addOrUpdateGatewayForm.ip"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="端口: "
                            prop="port"
                        >
                            <el-input
                                v-model="addOrUpdateGatewayForm.port"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="协议: "
                            prop="protocol"
                        >
                            <el-select
                                id="assets-select"
                                v-model="addOrUpdateGatewayForm.protocol"
                                placeholder="请选择协议"
                            >
                                <el-option
                                    v-for="item in protocolList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="网域: "
                            prop="network"
                        >
                            <el-select
                                id="assets-select1"
                                v-model="addOrUpdateGatewayForm.network"
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
                    <el-col :span="24">
                        <el-form-item
                            label="用户名: "
                            prop="userName"
                        >
                            <el-input
                                v-model="addOrUpdateGatewayForm.userName"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="密码: "
                            prop="password"
                        >
                            <el-input
                                v-model="addOrUpdateGatewayForm.password"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="ssh私钥: "
                            prop="sshCode"
                        >
                            <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                <el-button size="small" type="primary" class="danger-button">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <div class="item-split">
                        <span class="item-title">其它</span>
                    </div>
                    <el-col :span="24">
                        <el-form-item label="备注: "
                                      prop="remark"
                        >
                            <el-input
                                type="textarea"
                                :rows="4"
                                style="width: 500px;"
                                size="medium"
                                resize="none"
                                placeholder="请输入备注信息"
                                v-model="addOrUpdateGatewayForm.remark">
                            </el-input><br/>
                            <el-checkbox true-label="1" false-label="0" v-model="addOrUpdateGatewayForm.activate">激活</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" align="center">
                        <el-button class="default-button">取 消</el-button>
                        <el-button type="primary" class="danger-button" @click="submitForm('addOrUpdateGatewayForm')" :loading="isLoading">确 定</el-button>
                    </el-col>
                    <div class="clear"></div>
                </div>
            </el-form>
        </div>
    </section>
</template>

<script>
	export default {
		name: "add-or-update-gateway",
		components: {

        },
		data() {
			return {
                addOrUpdateGatewayForm: {
                    name: '',
                    ip: '',
                    port: '',
                    protocol: '',
                    network: [],
                    userName: '',
                    password: '',
                    sshCode: '',
                    remark: '',
                    activate: '1'
                },
                protocolList: [
                    {
                        value: 'ssh',
                        label: 'ssh'
                    },
                    {
                        value: 'rdp',
                        label: 'rdp'
                    }
                ],
                networkList: [],
                gatewayInfo: [],
                isLoading: false,
                fileList: [
                    {
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    },
                    {
                        name: 'food2.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }
                ],
                rules: {
                    name: [
                        {required: true, message: '名称不能为空', trigger: 'blur,change'},
                        {min: 1, max: 128, message: '最大长度为128个字符', trigger: 'blur change'}
                    ],
                    ip: [
                        {required: true, message: 'IP地址不能为空', trigger: 'blur,change'},
                        {min: 1, max: 15, message: '最大长度为15个字符', trigger: 'blur change'}
                    ],
                    port: [
                        {required: true, message: '端口地址不能为空', trigger: 'blur,change'}
                    ],
                    protocol: [
                        {required: true, message: '协议不能为空', trigger: 'blur,change'}
                    ],
                    network: [
                        {required: true, message: '网域不能为空', trigger: 'blur,change'}
                    ],
                    userName: [
                        {required: true, message: '用户名不能为空', trigger: 'blur,change'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur,change'}
                    ]
                }
            }
		},
		methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            goBack: function () {
                this.$router.push({ path: '/home/networkList/networkDetail', query: {tabType: 'gateway-detail'}});
            },
            submitForm(formName) {
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        switch(that.$route.query.addOrUpdate) {
                            case 'add':
                                this.add();
                                break;
                            case 'update':
                                this.update();
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
                this.$axios.get('http://localhost:8000/api/assets/domain', {})
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
            getGatewayDetail: async function() {
                let that = this;
                let id = that.$route.query.gatewayId;
                this.isLoading = true;
                that.$axios.get('http://127.0.0.1:8000/api/assets/gateway/' + id + '/', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            that.gatewayInfo = data.data ? data.data : [];
                            that.addOrUpdateGatewayForm.name = that.gatewayInfo.name;
                            that.addOrUpdateGatewayForm.ip = that.gatewayInfo.ip;
                            that.addOrUpdateGatewayForm.port = that.gatewayInfo.port;
                            that.addOrUpdateGatewayForm.protocol = that.gatewayInfo.protocol;
                            that.addOrUpdateGatewayForm.network = that.gatewayInfo.domain;
                            that.addOrUpdateGatewayForm.userName = that.gatewayInfo.username;
                            that.addOrUpdateGatewayForm.password = that.gatewayInfo._password;
                            that.addOrUpdateGatewayForm.remark = that.gatewayInfo.comment;
                            that.addOrUpdateGatewayForm.activate = that.gatewayInfo.is_active;
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
                var that = this;
                let params = {
                    // id: '4b5635ed-36bf-4086-8fb0-5b77157bb5e1',   //网关id
                    name: that.addOrUpdateGatewayForm.name,  //网域名称
                    ip: that.addOrUpdateGatewayForm.ip, //ip
                    port: that.addOrUpdateGatewayForm.port, //端口
                    protocol: that.addOrUpdateGatewayForm.protocol,  //协议
                    username: that.addOrUpdateGatewayForm.userName, //用户名
                    _password: that.addOrUpdateGatewayForm.password, //密码
                    domain: that.addOrUpdateGatewayForm.network,  //网域ID
                    is_active: that.addOrUpdateGatewayForm.activate, //是否激活 1:是 0:否
                    comment: that.addOrUpdateGatewayForm.remark, //备注信息
                };

                that.isLoading = true;
                const res = await that.$axios.post('http://localhost:8000/api/assets/gateway/', params);
                if (res.status === 201) {
                    that.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    that.isLoading = false;
                    that.resetForm('addOrUpdateGatewayForm');
                } else {
                    that.$message({
                        message: '创建失败',
                        type: 'error'
                    });
                    that.isLoading = false;
                }
            },
            update: async function () {
                var that = this;
                let params = {
                    id: that.$route.query.gatewayId,   //网关id
                    name: that.addOrUpdateGatewayForm.name,  //网域名称
                    ip: that.addOrUpdateGatewayForm.ip, //ip
                    port: that.addOrUpdateGatewayForm.port, //端口
                    protocol: that.addOrUpdateGatewayForm.protocol,  //协议
                    username: that.addOrUpdateGatewayForm.userName, //用户名
                    _password: that.addOrUpdateGatewayForm.password, //密码
                    domain: that.addOrUpdateGatewayForm.network,  //网域ID
                    is_active: that.addOrUpdateGatewayForm.activate, //是否激活 1:是 0:否
                    comment: that.addOrUpdateGatewayForm.remark, //备注信息
                };

                that.isLoading = true;
                const res = await that.$axios.patch('http://localhost:8000/api/assets/gateway/' + that.$route.query.gatewayId + '/', params);
                if (res.status === 200) {
                    that.$message({
                        message: '更新成功',
                        type: 'success'
                    });
                    that.isLoading = false;
                    that.getGatewayDetail();
                }
            }
        },
        mounted: function () {
            this.getNetworkList();
            if (this.$route.query.addOrUpdate === 'update') {
                this.getGatewayDetail();
            }
        }
	}
</script>

<style lang="scss">
    .add-or-update-gateway-section {
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
                    border-bottom: 2px solid #E96373;
                }
            }
            .el-input .el-input__inner {
                width: 50%!important;
            }
            .el-select .el-input__inner {
                width: 100%!important;
            }
            [class*=el-col-12] {
                float: left;
            }
        }
        .upload-demo {
            width: 50%;
        }
    }
</style>
