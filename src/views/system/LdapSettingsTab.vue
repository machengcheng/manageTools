<template>
    <section class="ldap-settings-tab-section">
        <div class="box-content">
            <el-form :model="ldapSettingsForm" :rules="rules" ref="ldapSettingsForm" class="demo-form-inline" label-width="120px">
                <div class="content">
                    <el-col :span="24">
                        <el-form-item
                            label="LDAP地址: "
                            prop="ldapUrl"
                        >
                            <el-input
                                v-model="ldapSettingsForm.ldapUrl"
                                size="medium"
                                placeholder="LDAP地址"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="绑定DN: "
                            prop="bindDN"
                        >
                            <el-input
                                v-model="ldapSettingsForm.bindDN"
                                size="medium"
                                placeholder="绑定DN"
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
                                v-model="ldapSettingsForm.password"
                                size="medium"
                                placeholder="密码"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="用户OU: "
                            prop="userOU"
                        >
                            <el-input
                                v-model="ldapSettingsForm.userOU"
                                size="medium"
                                placeholder="SMTP密码"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="用户过滤器: "
                            prop="useuserFilterrOU"
                        >
                            <el-input
                                v-model="ldapSettingsForm.userFilter"
                                size="medium"
                                placeholder="用户过滤器"
                            >
                            </el-input>
                            <div style="font-size: 13px;">可能的选项是(cn或uid或sAMAccountName=%(user)s)</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="LDAP属性映射: "
                                      prop="propertyMap"
                        >
                            <el-input
                                type="textarea"
                                :rows="4"
                                style="width: 500px;"
                                size="medium"
                                resize="none"
                                placeholder="LDAP属性映射"
                                v-model="ldapSettingsForm.propertyMap">
                            </el-input>
                            <div style="font-size: 13px;">用户属性映射代表怎样将LDAP中用户属性映射到jumpserver用户上，username, name,email 是jumpserver的属性</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="使用SSL: "
                        >
                            <el-checkbox v-model="ldapSettingsForm.useSSL"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="启用LDAP认证: "
                        >
                            <el-checkbox v-model="ldapSettingsForm.useLdap"></el-checkbox>
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
		name: "ldap-settings-tab",
		components: {

        },
        props: ['ldapSettingsVisible'],
		data() {
			return {
                ldapSettingsForm: {
                    ldapUrl: '',
                    bindDN: '',
                    password: '',
                    userOU: '',
                    userFilter: '',
                    propertyMap: '',
                    useSSL: false,
                    useLdap: false
                },
                rules: {

                }
            }
		},
        watch: {
            ldapSettingsVisible: function (newVal, oldVal) {
                if(newVal != oldVal) {

                }
            }
        },
		methods: {

        }
	}
</script>

<style lang="scss">
    .ldap-settings-tab-section {
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
