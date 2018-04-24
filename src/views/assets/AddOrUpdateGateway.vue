<template>
    <section class="add-or-update-gateway-section">
        <div class="box-title mb20">{{this.$route.query.addOrUpdate == 'add' ? '创建网关' : '更新网关'}}</div>
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
                            <el-input
                                v-model="addOrUpdateGatewayForm.protocol"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="网域: "
                            prop="network"
                        >
                            <el-input
                                v-model="addOrUpdateGatewayForm.network"
                                size="medium"
                            >
                            </el-input>
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
                                <el-button size="small" type="primary">点击上传</el-button>
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
                            <el-checkbox v-model="addOrUpdateGatewayForm.activate">激活</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" align="center">
                        <el-button>取 消</el-button>
                        <el-button type="primary">确 定</el-button>
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
                    network: '',
                    userName: '',
                    password: '',
                    sshCode: '',
                    remark: '',
                    activate: true
                },
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
