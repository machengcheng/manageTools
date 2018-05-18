<template>
    <section class="update-terminal-section">
        <div class="box-title mb20">更新终端</div>
        <div class="box-content">
            <el-form :model="updateTerminalForm" :rules="rules" ref="updateTerminalForm" class="demo-form-inline" label-width="120px">
                <div class="content">
                    <div class="item-split">
                        <span class="item-title">信息</span>
                    </div>
                    <el-col :span="24">
                        <el-form-item
                            label="名称: "
                            prop="name"
                        >
                            <el-input
                                v-model="updateTerminalForm.name"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="远端地址: "
                            prop="remote_addr"
                        >
                            <el-input
                                v-model="updateTerminalForm.remote_addr"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="命令存储: "
                            prop="command_store"
                        >
                            <el-select
                                id="userGroup"
                                v-model="updateTerminalForm.command_store"
                                filterable
                                placeholder="请选择命令存储"
                            >
                                <el-option
                                    v-for="item in commandStoreList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <div class="tips">命令支持存储到服务器端数据库、ES中，默认存储的服务器端数据库，更多查看文档</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="录像存储: "
                            prop="video_store"
                        >
                            <el-select
                                id="userGroup"
                                v-model="updateTerminalForm.video_store"
                                filterable
                                placeholder="请选择命令存储"
                            >
                                <el-option
                                    v-for="item in videoStoreList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <div class="tips">录像文件支持存储到服务器端硬盘、AWS S3、 阿里云 OSS 中，默认存储到服务器端硬盘, 更多查看文档</div>
                        </el-form-item>
                    </el-col>
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
                                v-model="updateTerminalForm.comment">
                            </el-input><br/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" align="center">
                        <el-button>取 消</el-button>
                        <el-button type="primary" :loading="isLoading" @click="submitForm('updateTerminalForm')">确 定</el-button>
                    </el-col>
                    <div class="clear"></div>
                </div>
            </el-form>
        </div>
    </section>
</template>

<script>
	export default {
		name: "update-terminal",
		components: {

        },
		data() {
			return {
                isLoading: false,
                updateTerminalForm: {
                    name: '',
                    remote_addr: '',
                    command_store: '',
                    video_store: '',
                    comment: ''
                },
                commandStoreList: [
                    {
                        value: 'Default',
                        label: 'Default'
                    }
                ],
                videoStoreList: [
                    {
                        value: 'Default',
                        label: 'Default'
                    }
                ],
                terminalDetail: [],
                rules: {
                    name: [
                        {required: true, message: '名称不能为空', trigger: 'blur,change'},
                        {min: 1, max: 128, message: '最大长度为128个字符', trigger: 'blur change'}
                    ],
                    remote_addr: [
                        {required: true, message: '远端ip地址不能为空', trigger: 'blur,change'},
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
            getTerminalDetail: async function () {
                let that = this;
                await this.$axios.get('http://localhost:8000/api/terminal/terminal/' + that.$route.query.terminalId + '/', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            that.terminalDetail = data.data ? data.data : [];
                            that.updateTerminalForm.name = that.terminalDetail.name;
                            that.updateTerminalForm.remote_addr = that.terminalDetail.remote_addr;
                            that.updateTerminalForm.comment = that.terminalDetail.comment;
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
                let params = {
                    name: that.updateTerminalForm.name,
                    remote_addr: that.updateTerminalForm.remote_addr,
                    comment: that.updateTerminalForm.comment,  //备注信息
                };

                that.isLoading = true;
                const res = await that.$axios.patch('http://localhost:8000/api/terminal/terminal/' + that.$route.query.terminalId + '/', params);
                if (res.status === 200) {
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    that.isLoading = false;
                    that.$router.push({ path: '/home/terminalManage' });
                }
            }
        },
        mounted: function () {
		    let that = this;
            that.getTerminalDetail();
        }
	}
</script>

<style lang="scss">
    .update-terminal-section {
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
                width: 50% !important;
            }
            .el-select .el-input__inner {
                width: 100%!important;
                min-width: 300px;
            }
            .tips {
                font-size: 12px;
                color: rgb(97, 98, 98);
            }
        }
    }
</style>
