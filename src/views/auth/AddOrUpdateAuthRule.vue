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
                                :disabled="true"
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
                            <el-checkbox v-model="addOrUpdateAuthRuleForm.is_active"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            prop="deadline"
                            label="失效日期: "
                            >
                            <el-date-picker
                                v-model="addOrUpdateAuthRuleForm.deadline"
                                type="datetime"
                                placeholder="选择日期">
                            </el-date-picker>
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
                                v-model="addOrUpdateAuthRuleForm.comment">
                            </el-input><br/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" align="center">
                        <el-button>取 消</el-button>
                        <el-button type="primary" :loading="isLoading" @click="submitForm('addOrUpdateAuthRuleForm')">确 定</el-button>
                    </el-col>
                    <div class="clear"></div>
                </div>
            </el-form>
        </div>
    </section>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
	export default {
		name: "add-or-update-auth-rule",
		components: {

        },
		data() {
			return {
                isLoading: false,
                addOrUpdateAuthRuleForm: {
                    nodeName: '',
                    userGroup: '',
                    systemUser: '',
                    deadline: '',
                    is_active: true,
                    comment: ''
                },
                currentNode: [],
                currentRule: [],
                userGroupList: [],
                systemUserList: [],
                rules: {
                    nodeName: [
                        {required: true, message: '节点不能为空', trigger: 'blur,change'},
                        {min: 1, max: 128, message: '最大长度为128个字符', trigger: 'blur change'}
                    ],
                    userGroup: [
                        {required: true, message: '用户组不能为空', trigger: 'blur,change'}
                    ],
                    systemUser: [
                        {required: true, message: '系统用户不能为空', trigger: 'blur,change'}
                    ]
                }
            }
		},
        computed: {
            ...mapGetters({
                getAuthCurrentNode: 'getAuthCurrentNode'
            })
        },
		methods: {
            format: function(fmt, date) {
                var o = {
                    "M+": date.getMonth() + 1, //月份
                    "d+": date.getDate(), //日
                    "h+": date.getHours(), //小时
                    "m+": date.getMinutes(), //分
                    "s+": date.getSeconds(), //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            },
            formatDate: function (cellValue) {
                return this.format('yyyy-MM-dd hh:mm:ss', new Date(cellValue));
                // return this.format('yyyy-MM-dd', new Date(cellValue));
            },
            getUserGroups: function () {
                let that = this;
                this.$axios.get('http://localhost:8000/api/users/group', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            if (data.data.results.length > 0) {
                                data.data.results.forEach(function (item) {
                                    that.userGroupList.push({
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
            getSystemUser: function () {
                let that = this;
                this.$axios.get('http://localhost:8000/api/assets/system-user', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            if (data.data.results.length > 0) {
                                data.data.results.forEach(function (item) {
                                    that.systemUserList.push({
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
            getNodeDetail: async function () {
                let that = this;
                await this.$axios.get('http://localhost:8000/api/assets/nodes/' + that.$route.query.node + '/', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            that.currentNode = data.data ? data.data : [];
                            that.addOrUpdateAuthRuleForm.nodeName = that.currentNode.value;
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
            getRuleDetail: async function () {
                let that = this;
                await this.$axios.get('http://localhost:8000/api/perms/asset-permissions/' + that.$route.query.ruleId + '/', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            that.currentRule = data.data ? data.data : [];
                            that.addOrUpdateAuthRuleForm.nodeName = that.currentRule.node.name;
                            that.addOrUpdateAuthRuleForm.userGroup = that.currentRule.user_group.pk;
                            that.addOrUpdateAuthRuleForm.systemUser = that.currentRule.system_user.pk;
                            that.addOrUpdateAuthRuleForm.deadline = that.currentRule.date_expired;
                            that.addOrUpdateAuthRuleForm.comment = that.currentRule.comment;
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
            add: async function () {
                var that = this;
                let params = {
                    node: that.currentNode.id,  //节点id
                    user_group: that.addOrUpdateAuthRuleForm.userGroup,  //用户组id
                    system_user: that.addOrUpdateAuthRuleForm.systemUser, //系统用户id
                    date_expired: that.formatDate(that.addOrUpdateAuthRuleForm.deadline),  //过期时间
                    is_active: that.addOrUpdateAuthRuleForm.is_active,  //是否激活
                    comment: that.addOrUpdateAuthRuleForm.comment,  //备注信息
                };
                that.isLoading = true;
                const res = await that.$axios.post('http://localhost:8000/api/perms/asset-permissions/', params);
                if (res.status === 201) {
                    that.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    that.isLoading = false;
                    that.$router.push({ path: '/home/assetsAuthList' });
                }
            },
            update: async function () {
                let that = this;
                let params = {
                    node: that.currentNode.id,  //节点id
                    user_group: that.addOrUpdateAuthRuleForm.userGroup,  //用户组id
                    system_user: that.addOrUpdateAuthRuleForm.systemUser, //系统用户id
                    date_expired: that.formatDate(that.addOrUpdateAuthRuleForm.deadline),  //过期时间
                    is_active: that.addOrUpdateAuthRuleForm.is_active,  //是否激活
                    comment: that.addOrUpdateAuthRuleForm.comment,  //备注信息
                };

                that.isLoading = true;
                const res = await that.$axios.patch('http://localhost:8000/api/perms/asset-permissions/' + that.$route.query.ruleId + '/', params);
                if (res.status === 200) {
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    that.isLoading = false;
                    that.$router.push({ path: '/home/assetsAuthList' });
                }
            }
        },
        mounted: function () {
		    let that = this;
            that.getUserGroups();
            that.getSystemUser();
            if (that.$route.query.addOrUpdate === 'add') {
                that.getNodeDetail();
            }
            if (that.$route.query.addOrUpdate === 'update') {
                that.getRuleDetail();
            }
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
