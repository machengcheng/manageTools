<template>
    <section class="add-or-update-auth-rule-section">
        <div class="box-title mb20">{{this.$route.query.addOrUpdate == 'add' ? '创建权限规则' : ' 更新资产授权'}}</div>
        <div class="box-content">
            <el-form :model="addOrUpdateAuthRuleForm" :rules="rules" ref="addOrUpdateAuthRuleForm" class="demo-form-inline" label-width="120px">
                <div class="content">
                    <div class="item-split">
                        <span class="item-title">基本</span>
                    </div>
                    <el-col :span="24">
                        <el-form-item
                            label="节点: "
                            prop="nodeName"
                        >
                            <el-input
                                v-model="addOrUpdateAuthRuleForm.nodeName"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="用户组: "
                            prop="userGroup"
                        >
                            <el-select
                                id="userGroup"
                                v-model="addOrUpdateAuthRuleForm.userGroup"
                                filterable
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
                    <el-col :span="24">
                        <el-form-item
                            label="系统用户: "
                            prop="systemUser"
                        >
                            <el-select
                                id="userGroup"
                                v-model="addOrUpdateAuthRuleForm.systemUser"
                                filterable
                                placeholder="请选择系统用户"
                            >
                                <el-option
                                    v-for="item in systemUserList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <div class="item-split">
                        <span class="item-title">其它</span>
                    </div>
                    <el-col :span="24">
                        <el-form-item
                            label="激活中: "
                        >
                            <el-checkbox v-model="addOrUpdateAuthRuleForm.activate"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="失效日期: "
                            >
                            <el-date-picker
                                v-model="addOrUpdateAuthRuleForm.deadline"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
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
                                v-model="addOrUpdateAuthRuleForm.remark">
                            </el-input><br/>
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
		name: "add-or-update-auth-rule",
		components: {

        },
		data() {
			return {
                addOrUpdateAuthRuleForm: {
                    nodeName: '',
                    userGroup: '',
                    systemUser: '',
                    deadline: '',
                    activate: true,
                    remark: ''
                },
                userGroupList: [
                    {
                        value: '1',
                        label: 'Default'
                    },
                    {
                        value: '2',
                        label: 'root1'
                    }
                ],
                systemUserList: [
                    {
                        value: '1',
                        label: 'root'
                    },
                    {
                        value: '2',
                        label: 'root001'
                    },
                    {
                        value: '3',
                        label: 'root002'
                    }
                ],
                rules: {

                }
            }
		},
		methods: {

        }
	}
</script>

<style lang="scss">
    .add-or-update-auth-rule-section {
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
            .el-date-editor .el-input__inner {
                width: 100%!important;
                min-width: 300px;
            }
            .el-select .el-input__inner {
                width: 100%!important;
                min-width: 300px;
            }
            [class*=el-col-12] {
                float: left;
            }
        }
    }
</style>
