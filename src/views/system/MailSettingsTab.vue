<template>
    <section class="mail-settings-tab-section">
        <div class="box-content">
            <el-form :model="mailSettingsForm" :rules="rules" ref="mailSettingsForm" class="demo-form-inline" label-width="120px">
                <div class="content">
                    <el-col :span="24">
                        <el-form-item
                            label="SMTP主机: "
                            prop="webUrl"
                        >
                            <el-input
                                v-model="mailSettingsForm.host"
                                size="medium"
                                placeholder="SMTP主机"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="SMTP端口: "
                            prop="userUrl"
                        >
                            <el-input
                                v-model="mailSettingsForm.port"
                                size="medium"
                                placeholder="SMTP端口"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="SMTP账号: "
                            prop="mailPrefix"
                        >
                            <el-input
                                v-model="mailSettingsForm.account"
                                size="medium"
                                placeholder="SMTP账号"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="SMTP密码: "
                            prop="password"
                        >
                            <el-input
                                v-model="mailSettingsForm.password"
                                size="medium"
                                placeholder="SMTP密码"
                            >
                            </el-input>
                            <span>一些邮件提供商需要输入的是Token</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="使用SSL: "
                        >
                            <el-checkbox v-model="mailSettingsForm.useSSL">如果SMTP端口是465，通常需要启用SSL</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="使用TLS: "
                        >
                            <el-checkbox v-model="mailSettingsForm.useTLS">如果SMTP端口是587，通常需要启用TLS</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" align="center" class="mt20">
                        <el-button>测试连接</el-button>
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
		name: "mail-settings-tab",
		components: {

        },
        props: ['mailSettingsVisible'],
		data() {
			return {
                mailSettingsForm: {
                    host: '',
                    port: '',
                    account: '',
                    password: '',
                    useSSL: true,
                    useTLS: true
                },
                rules: {

                }
            }
		},
        watch: {
            mailSettingsVisible: function (newVal, oldVal) {
                if(newVal != oldVal) {

                }
            }
        },
		methods: {

        }
	}
</script>

<style lang="scss">
    .mail-settings-tab-section {
        padding: 36px 22px 36px;
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
                width: 100%!important;
            }
            [class*=el-col-12] {
                float: left;
            }
        }
    }
</style>
