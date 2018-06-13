<template>
    <section class="add-or-update-manage-user-section">
        <div class="box-title mb20">{{this.$route.query.addOrUpdate == 'add' ? '创建管理用户' : '更新管理用户'}}</div>
        <div class="box-content">
            <el-form :model="addOrUpdateManageUserForm" :rules="rules" ref="addOrUpdateManageUserForm" class="demo-form-inline" label-width="120px">
                <div class="content">
                    <el-col :span="24">
                        <el-form-item
                            label="名称: "
                            prop="name"
                        >
                            <el-input
                                v-model="addOrUpdateManageUserForm.name"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="用户名: "
                            prop="userName"
                        >
                            <el-input
                                v-model="addOrUpdateManageUserForm.userName"
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
                                v-model="addOrUpdateManageUserForm.password"
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
                                v-model="addOrUpdateManageUserForm.comment">
                            </el-input><br/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" align="center">
                        <el-button class="default-button">取 消</el-button>
                        <el-button type="primary" class="danger-button" @click="submitForm('addOrUpdateManageUserForm')" :loading="isLoading">确 定</el-button>
                    </el-col>
                    <div class="clear"></div>
                </div>
            </el-form>
        </div>
    </section>
</template>

<script>
	export default {
		name: "add-or-update-manage-user",
		components: {

        },
		data() {
			return {
                isLoading: false,
                addOrUpdateManageUserForm: {
                    name: '',
                    userName: '',
                    password: '',
                    sshCode: '',
                    comment: ''
                },
                manageUserInfo: [],
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
                    userName: [
                        {required: true, message: '用户名不能为空', trigger: 'blur,change'},
                        {min: 1, max: 128, message: '最大长度为128个字符', trigger: 'blur change'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur,change'},
                        {min: 1, max: 128, message: '最大长度为128个字符', trigger: 'blur change'}
                    ],
                    comment: [
                        {required: false, trigger: 'blur,change'},
                        {max: 128, message: '最大长度为200个字符', trigger: 'blur change'}
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
            getManageUserDetail: async function() {
                let that = this;
                let params = {
                    id__in: that.$route.query.userId
                };
                this.isLoading = true;
                that.$axios.get('http://127.0.0.1:8000/api/assets/admin-user/', { params: params })
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            that.manageUserInfo = data.data.results.length > 0 ? data.data.results[0] : [];
                            that.addOrUpdateManageUserForm.name = that.manageUserInfo.name;
                            that.addOrUpdateManageUserForm.userName = that.manageUserInfo.username;
                            that.addOrUpdateManageUserForm.password = that.manageUserInfo._password;
                            that.addOrUpdateManageUserForm.comment = that.manageUserInfo.comment;
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
                    name: that.addOrUpdateManageUserForm.name,
                    username: that.addOrUpdateManageUserForm.userName,
                    _password: that.addOrUpdateManageUserForm.password,
                    comment: that.addOrUpdateManageUserForm.comment,
                };
                that.isLoading = true;
                const res = await that.$axios.post('http://localhost:8000/api/assets/admin-user/', params);
                if (res.status === 201) {
                    that.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    that.isLoading = false;
                    that.resetForm('addOrUpdateManageUserForm');
                }
            },
            update: async function () {
                var that = this;
                let params = {
                    name: that.addOrUpdateManageUserForm.name,
                    username: that.addOrUpdateManageUserForm.userName,
                    _password: that.addOrUpdateManageUserForm.password,
                    comment: that.addOrUpdateManageUserForm.comment,
                };

                that.isLoading = true;
                const res = await that.$axios.patch('http://localhost:8000/api/assets/admin-user/' + that.$route.query.userId + '/', params);
                if (res.status === 200) {
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    that.isLoading = false;
                    that.getManageUserDetail();
                }
            }
        },
        mounted: function () {
		    if (this.$route.query.addOrUpdate === 'update') {
                this.getManageUserDetail();
            }
        }
	}
</script>

<style lang="scss">
    .add-or-update-manage-user-section {
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
                width: 50%!important;
            }
            .el-select .el-input__inner {
                width: 50%!important;
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
