<template>
    <section class="add-or-update-system-user-section">
        <div class="box-title mb20">{{this.$route.query.addOrUpdate == 'add' ? '创建系统用户' : '更新系统用户'}}</div>
        <div class="box-content">
            <el-form :model="addOrUpdateSystemUserForm" :rules="rules" ref="addOrUpdateSystemUserForm" class="demo-form-inline" label-width="120px">
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
                                v-model="addOrUpdateSystemUserForm.name"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="用户名: "
                            prop="username"
                        >
                            <el-input
                                v-model="addOrUpdateSystemUserForm.username"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="优先级: "
                            prop="priority"
                        >
                            <el-input
                                v-model="addOrUpdateSystemUserForm.priority"
                                type="number"
                                min="1"
                                max="10"
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
                                id="protocol-select"
                                v-model="addOrUpdateSystemUserForm.protocol"
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
                    <div class="item-split">
                        <span class="item-title">认证</span>
                    </div>
                    <!--<el-col :span="24">-->
                        <!--<el-form-item-->
                            <!--label="自动生成密钥: "-->
                            <!--&gt;-->
                            <!--<el-checkbox v-model="isAutoKey"></el-checkbox>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="24">
                        <el-form-item
                            label="密码: "
                            prop="password"
                        >
                            <el-input
                                v-model="addOrUpdateSystemUserForm.password"
                                size="medium"
                                type="password"
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
                                <el-button size="small" class="danger-button" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="自动推送: "
                        >
                            <el-checkbox v-model="addOrUpdateSystemUserForm.auto_push"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <div class="item-split">
                        <span class="item-title">其它</span>
                    </div>
                    <el-col :span="24">
                        <el-form-item label="Sudo: "
                                      prop="sudo"
                        >
                            <el-input
                                type="textarea"
                                :rows="4"
                                style="width: 500px;"
                                size="medium"
                                resize="none"
                                v-model="addOrUpdateSystemUserForm.sudo">
                            </el-input><br/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="Shell: "
                            prop="shell"
                        >
                            <el-input
                                v-model="addOrUpdateSystemUserForm.shell"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
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
                                v-model="addOrUpdateSystemUserForm.comment">
                            </el-input><br/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" align="center">
                        <el-button class="default-button">取 消</el-button>
                        <el-button type="primary" class="danger-button" :loading="isLoading" @click="submitForm('addOrUpdateSystemUserForm')">确 定</el-button>
                    </el-col>
                    <div class="clear"></div>
                </div>
            </el-form>
        </div>
    </section>
</template>

<script>
	export default {
		name: "add-or-update-system-user",
		components: {

        },
		data() {
			return {
                isAutoKey: true,
                isAutoPush: true,
                isLoading: false,
                addOrUpdateSystemUserForm: {
                    name: '',
                    username: '',
                    priority: '',
                    protocol: '',
                    sshCode: '',
                    sudo: '',
                    shell: '',
                    auto_push: true,
                    comment: ''
                },
                systemUserInfo: [],
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
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur,change'},
                        {min: 1, max: 128, message: '最大长度为128个字符', trigger: 'blur change'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur,change'}
                    ],
                    protocol: [
                        {required: true, message: '请选择协议', trigger: 'blur,change'}
                    ],
                    sudo: [
                        {required: true, message: 'sudo不能为空', trigger: 'blur,change'},
                        {min: 1, max: 500, message: '最大长度为500个字符', trigger: 'blur change'}
                    ],
                    shell: [
                        {required: true, message: 'shell不能为空', trigger: 'blur,change'},
                        {min: 1, max: 128, message: '最大长度为128个字符', trigger: 'blur change'}
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
            getSystemUserDetail: async function() {
                let that = this;
                let id = that.$route.query.userId;
                this.isLoading = true;
                that.$axios.get('http://127.0.0.1:8000/api/assets/system-user/' + id + '/', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            that.systemUserInfo = data.data ? data.data : [];
                            that.addOrUpdateSystemUserForm.name = that.systemUserInfo.name;
                            that.addOrUpdateSystemUserForm.username = that.systemUserInfo.username;
                            that.addOrUpdateSystemUserForm.password = that.systemUserInfo._password;
                            that.addOrUpdateSystemUserForm.priority = that.systemUserInfo.priority;
                            that.addOrUpdateSystemUserForm.protocol = that.systemUserInfo.protocol;
                            that.addOrUpdateSystemUserForm.auto_push = that.systemUserInfo.auto_push;
                            that.addOrUpdateSystemUserForm.sudo = that.systemUserInfo.sudo;
                            that.addOrUpdateSystemUserForm.shell = that.systemUserInfo.shell;
                            that.addOrUpdateSystemUserForm.comment = that.systemUserInfo.comment;
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
                    name: that.addOrUpdateSystemUserForm.name,
                    username: that.addOrUpdateSystemUserForm.username,
                    priority: that.addOrUpdateSystemUserForm.priority,
                    _password: that.addOrUpdateSystemUserForm.password,
                    auto_push: that.addOrUpdateSystemUserForm.auto_push,
                    sudo: that.addOrUpdateSystemUserForm.sudo,
                    shell: that.addOrUpdateSystemUserForm.shell,
                    comment: that.addOrUpdateSystemUserForm.comment
                };

                that.isLoading = true;
                const res = await that.$axios.post('http://localhost:8000/api/assets/system-user/', params);
                if (res.status === 201) {
                    that.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    that.isLoading = false;
                    that.resetForm('addOrUpdateSystemUserForm');
                }
            },
            update: async function () {
                var that = this;
                let params = {
                    name: that.addOrUpdateSystemUserForm.name,
                    username: that.addOrUpdateSystemUserForm.username,
                    priority: that.addOrUpdateSystemUserForm.priority,
                    _password: that.addOrUpdateSystemUserForm.password,
                    auto_push: that.addOrUpdateSystemUserForm.auto_push,
                    sudo: that.addOrUpdateSystemUserForm.sudo,
                    shell: that.addOrUpdateSystemUserForm.shell,
                    comment: that.addOrUpdateSystemUserForm.comment
                };

                that.isLoading = true;
                const res = await that.$axios.patch('http://localhost:8000/api/assets/system-user/' + that.$route.query.userId + '/', params);
                if (res.status === 200) {
                    that.$message({
                        message: '更新成功',
                        type: 'success'
                    });
                    that.isLoading = false;
                    that.getManageUserDetail();
                }
            }
        },
        mounted: function () {
            if (this.$route.query.addOrUpdate === 'update') {
                this.getSystemUserDetail();
            }
        }
	}
</script>

<style lang="scss">
    .add-or-update-system-user-section {
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
