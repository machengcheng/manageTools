<template>
    <section class="add-or-update-user">
        <div class="box-title mb20">{{this.$route.query.addOrUpdate == 'add' ? '创建用户' : '更新用户'}}</div>
        <div class="box-content">
            <el-form :model="addOrUpdateUserForm" :rules="rules" ref="addOrUpdateUserForm" class="demo-form-inline" label-width="120px">
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
                                v-model="addOrUpdateUserForm.name"
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
                                v-model="addOrUpdateUserForm.userName"
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
                                v-model="addOrUpdateUserForm.mail"
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
                                v-model="addOrUpdateUserForm.userGroup"
                                multiple
                                placeholder="请选择用户组"
                                :disabled="!userGroupList.length"
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
                            prop="password"
                            label="密码: "
                            v-if="this.$route.query.addOrUpdate == 'update'"
                        >
                            <el-input
                                v-model="addOrUpdateUserForm.password"
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
                                v-model="addOrUpdateUserForm.pki">
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
                            <el-select v-model="addOrUpdateUserForm.role" placeholder="请选择" size="small">
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
                                v-model="addOrUpdateUserForm.endDate"
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
                                v-model="addOrUpdateUserForm.phone"
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
                                v-model="addOrUpdateUserForm.weixin"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注: "
                                      prop="comment"
                        >
                            <el-input
                                type="textarea"
                                :rows="4"
                                style="width: 448px;"
                                size="medium"
                                resize="none"
                                placeholder="请输入备注信息"
                                v-model="addOrUpdateUserForm.comment">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" align="center">
                        <el-button class="default-button">取 消</el-button>
                        <el-button type="primary" :loading="isLoading" class="danger-button" @click="submitForm('addOrUpdateUserForm')">确 定</el-button>
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
                isLoading: false,
                userInfo: [],
                addOrUpdateUserForm: {
                    name: '',
                    userName: '',
                    mail: '',
                    userGroup: [],
                    role: '',
                    endDate: '',
                    phone: '',
                    password: '',
                    pki: '',
                    weixin: '',
                    comment: ''
                },
                resultsList: '',
                roleList: [
                    {
                        value: 'Admin',
                        label: '管理员'
                    },
                    {
                        value: 'User',
                        label: '用户'
                    }
                ],
                userGroupList: [

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
                    mail: [
                        {required: true, message: '邮件不能为空', trigger: 'blur,change'},
                        {min: 1, max: 128, message: '最大长度为128个字符', trigger: 'blur change'}
                    ],
                    userGroup: [
                        {required: false, message: '用户组不能为空', trigger: 'blur,change'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur,change'}
                    ],
                    role: [
                        {required: true, message: '角色不能为空', trigger: 'blur,change'}
                    ],
                    endDate: [
                        {required: true, message: '失效日期不能为空', trigger: 'blur,change'}
                    ],
                    phone: [
                        {required: false, message: '手机不能为空', trigger: 'blur,change'},
                        {min: 11, max: 11, message: '长度为11个字符', trigger: 'blur change'}
                    ],
                    weixin: [
                        {required: false, trigger: 'blur,change'},
                        {max: 128, message: '最大长度为128个字符', trigger: 'blur change'}
                    ],
                    comment: [
                        {required: false, trigger: 'blur,change'},
                        {max: 128, message: '最大长度为200个字符', trigger: 'blur change'}
                    ]
                }
            }
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
            getUserDetail: function () {
                let that = this;
                let params = {
                    id: that.$route.query.userId
                };
                that.$axios.get('http://localhost:8000/api/users/user', { params: params})
                    .then(function (response) {
                        let data = response;
                        if(data.status === 200) {
                            that.userInfo = data.data.results.length > 0 ? data.data.results[0] : [];
                            that.addOrUpdateUserForm.name = that.userInfo.name;
                            that.addOrUpdateUserForm.userName = that.userInfo.username;
                            that.addOrUpdateUserForm.mail = that.userInfo.email;
                            // if (that.userInfo.groups.length > 0) {
                            //     that.addOrUpdateUserForm.userGroup.push(that.userInfo.groups[0]);
                            // }
                            if (that.userInfo.groups.length > 0) {
                                that.userInfo.groups.forEach(function (item) {
                                    that.addOrUpdateUserForm.userGroup.push(item);
                                });
                            }
                            that.addOrUpdateUserForm.password = that.userInfo.password;
                            that.addOrUpdateUserForm.role = that.userInfo.role;
                            that.addOrUpdateUserForm.endDate = that.userInfo.date_expired;
                            that.addOrUpdateUserForm.phone = that.userInfo.phone;
                            that.addOrUpdateUserForm.weixin = that.userInfo.wechat;
                            that.addOrUpdateUserForm.comment = that.userInfo.comment;
                        }
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
            add: async function () {
                var that = this;
                let params = {
                    name: that.addOrUpdateUserForm.name,
                    username: that.addOrUpdateUserForm.userName,
                    password: that.addOrUpdateUserForm.password,
                    email: that.addOrUpdateUserForm.mail,
                    groups: that.addOrUpdateUserForm.userGroup,
                    role: that.addOrUpdateUserForm.role,
                    date_expired: that.formatDate(that.addOrUpdateUserForm.endDate),
                    phone: that.addOrUpdateUserForm.phone,
                    wechat: that.addOrUpdateUserForm.weixin,
                    comment: that.addOrUpdateUserForm.comment,
                };
                this.isLoading = true;
                const res = await that.$axios.post('http://localhost:8000/api/users/user/', params);
                if (res.status === 201) {
                    that.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    this.isLoading = false;
                    that.resetForm('addOrUpdateUserForm');
                }
            },
            update: async function(){
                var that = this;
                let params = {
                    name: that.addOrUpdateUserForm.name,
                    username: that.addOrUpdateUserForm.userName,
                    password: that.addOrUpdateUserForm.password,
                    email: that.addOrUpdateUserForm.mail,
                    groups: that.addOrUpdateUserForm.userGroup,
                    role: that.addOrUpdateUserForm.role,
                    public_key: that.addOrUpdateUserForm.pki,
                    date_expired: that.formatDate(that.addOrUpdateUserForm.endDate),
                    phone: that.addOrUpdateUserForm.phone,
                    wechat: that.addOrUpdateUserForm.weixin,
                    comment: that.addOrUpdateUserForm.comment,
                };
                this.isLoading = true;
                const res = await that.$axios.patch('http://localhost:8000/api/users/user/' + that.$route.query.userId + '/', params);
                if (res.status === 200) {
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                } else {
                    that.$message({
                        message: '操作失败',
                        type: 'info'
                    });
                }
                this.isLoading = false;
                that.resetForm('addOrUpdateUserForm');
                that.getUserDetail();
            }
        },
        mounted: function () {
            this.getUserGroups();
            if (this.$route.query.addOrUpdate === 'update') {
                this.getUserDetail();
            }
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
                    border-bottom: 2px solid #E96373;
                }
            }
            .el-input .el-input__inner {
                width: 100%!important;
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
