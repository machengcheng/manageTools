<template>
    <section class="add-or-update-user">
        <div class="box-title mb20">{{this.$route.query.addOrUpdate == 'add' ? '创建用户' : '更新用户'}}</div>
        <div class="box-content">
            <el-form :model="addUserDialogForm" :rules="rules" ref="addUserDialogForm" class="demo-form-inline" label-width="120px">
                <div class="content">
                    <div class="item-split">
                        <span class="item-title">账户</span>
                    </div>
                    <el-col :span="12">
                        <el-form-item
                            label="名称: "
                            prop="name"
                        >
                            <el-input
                                v-model="addUserDialogForm.name"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="用户名: "
                            prop="userName"
                        >
                            <el-input
                                v-model="addUserDialogForm.userName"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="邮件: "
                            prop="mail"
                        >
                            <el-input
                                v-model="addUserDialogForm.mail"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="用户组: "
                            prop="userGroup"
                        >
                            <el-select
                                id="userGroup"
                                v-model="addUserDialogForm.userGroup"
                                multiple
                                placeholder="请选择用户组"
                            >
                                <el-option
                                    v-for="item in userGroupList"
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
                            label="密码: "
                            v-if="this.$route.query.addOrUpdate == 'add'"
                        >
                            生成重置密码连接，通过邮件发送给用户
                        </el-form-item>
                        <el-form-item
                            label="密码: "
                            v-if="this.$route.query.addOrUpdate == 'update'"
                        >
                            <el-input
                                v-model="addUserDialogForm.password"
                                size="medium"
                                placeholder="请输入密码"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item
                            label="ssh公钥: "
                            v-if="this.$route.query.addOrUpdate == 'update'"
                        >
                            <el-input
                                type="textarea"
                                :rows="4"
                                style="width: 500px;"
                                size="medium"
                                resize="none"
                                placeholder="ssh-rsa AAAA..."
                                v-model="addUserDialogForm.pki">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <div class="clear"></div>
                    <div class="item-split">
                        <span class="item-title">角色安全</span>
                    </div>
                    <el-col :span="12">
                        <el-form-item
                            label="角色: "
                            prop="role"
                        >
                            <el-select v-model="addUserDialogForm.role" placeholder="请选择" size="small">
                                <el-option
                                    v-for="item in roleList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="失效日期: "
                                      prop="endDate"
                        >
                            <el-date-picker
                                v-model="addUserDialogForm.endDate"
                                type="datetime"
                                size="medium"
                                placeholder="请选择失效日期"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <div class="item-split">
                        <span class="item-title">个人信息</span>
                    </div>
                    <el-col :span="12">
                        <el-form-item
                            label="手机: "
                            prop="phone"
                        >
                            <el-input
                                v-model="addUserDialogForm.phone"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="微信: "
                            prop="weixin"
                        >
                            <el-input
                                v-model="addUserDialogForm.weixin"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注: "
                                      prop="description"
                        >
                            <el-input
                                type="textarea"
                                :rows="4"
                                style="width: 500px;"
                                size="medium"
                                resize="none"
                                placeholder="请输入备注信息"
                                v-model="addUserDialogForm.description">
                            </el-input>
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
		name: "add-or-update-user",
		components: {

        },
		data() {
			return {
                addOrUpdate: 'add',
                addUserDialogForm: {
                    name: '',
                    userName: '',
                    mail: '',
                    userGroup: '',
                    role: '',
                    endDate: '',
                    phone: '',
                    password: '',
                    pki: '',
                    weixin: '',
                    description: ''
                },
                roleList: [
                    {
                        value: '1',
                        label: '管理员'
                    },
                    {
                        value: '2',
                        label: '用户'
                    }
                ],
                userGroupList: [
                    {
                        value: '1',
                        label: 'Default'
                    },
                    {
                        value: '2',
                        label: 'aa'
                    },
                    {
                        value: '3',
                        label: 'bb'
                    },
                    {
                        value: '4',
                        label: 'cc'
                    },
                    {
                        value: '5',
                        label: 'dd'
                    },
                    {
                        value: '6',
                        label: 'ee'
                    },
                    {
                        value: '7',
                        label: 'ff'
                    },
                    {
                        value: '8',
                        label: 'gg'
                    },
                    {
                        value: '9',
                        label: 'hh'
                    }
                ],
                rules: {
                    name: [
                        {required: true, message: '名称不能为空', trigger: 'blur,change'}
                    ],
                    userName: [
                        {required: true, message: '用户名不能为空', trigger: 'blur,change'}
                    ],
                    mail: [
                        {required: true, message: '邮件不能为空', trigger: 'blur,change'}
                    ],
                    userGroup: [
                        {required: true, message: '用户组不能为空', trigger: 'blur,change'}
                    ],
                    role: [
                        {required: true, message: '角色不能为空', trigger: 'blur,change'}
                    ],
                    endDate: [
                        {required: true, message: '失效日期不能为空', trigger: 'blur,change'}
                    ],
                    phone: [
                        {required: false, trigger: 'blur,change'}
                    ],
                    weixin: [
                        {required: false, trigger: 'blur,change'}
                    ]
                }
            }
		},
		methods: {

        }
	}
</script>

<style lang="scss">
    .add-or-update-user {
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
