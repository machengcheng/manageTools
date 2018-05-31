<template>
    <section class="update-user-for-batch-section">
        <div class="box-title mb20">批量更新用户</div>
        <div class="box-content">
            <div class="attr-list">
                <p>选择需要修改的属性</p>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox v-model="checkRule" @change="handleCheckChange">角色</el-checkbox>
                <el-checkbox v-model="checkUserGroup" @change="handleCheckChange">用户组</el-checkbox>
                <el-checkbox v-model="checkDeadline" @change="handleCheckChange">失效日期</el-checkbox>
            </div>
            <div class="content">
                <el-form :model="updateUserForBatchForm" :rules="rules" ref="updateUserForBatchForm" class="demo-form-inline" label-width="120px">
                    <div class="content">
                        <el-col :span="24">
                            <el-form-item
                                label="选择用户: "
                                prop="users"
                            >
                                <el-select
                                    v-model="updateUserForBatchForm.users"
                                    multiple
                                    placeholder="请选择用户"
                                >
                                    <el-option
                                        v-for="item in usersList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" v-if="checkRule">
                            <el-form-item
                                label="角色: "
                                prop="role"
                            >
                                <el-select
                                    v-model="updateUserForBatchForm.role"
                                    filterable
                                    placeholder="请选择角色"
                                >
                                    <el-option
                                        v-for="item in roleList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="checkUserGroup">
                            <el-form-item
                                label="用户组: "
                                prop="userGroup"
                            >
                                <el-select
                                    v-model="updateUserForBatchForm.userGroup"
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
                        <el-col :span="24" v-if="checkDeadline">
                            <el-form-item label="失效日期: "
                                          prop="endDate"
                            >
                                <el-date-picker
                                    v-model="updateUserForBatchForm.endDate"
                                    type="datetime"
                                    size="medium"
                                    placeholder="请选择失效日期"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" align="center">
                            <el-button>取 消</el-button>
                            <el-button type="primary" :loading="isLoading" @click="submitForm('updateUserForBatchForm')">确 定</el-button>
                        </el-col>
                        <div class="clear"></div>
                    </div>
                </el-form>
            </div>
        </div>
    </section>
</template>

<script>
	export default {
		name: "update-user-for-batch",
		components: {

        },
		data() {
			return {
                isLoading: false,
                usersList: [],
                roleList: [
                    {
                        value: 'Admin',
                        label: '管理员'
                    },
                    {
                        value: 'User',
                        label: '用户'
                    },
                    {
                        value: 'App',
                        label: '应用程序'
                    }
                ],
                userGroupList: [

                ],
                updateUserForBatchForm: {
                    users: [],
                    role: '',
                    userGroup: [],
                    endDate: ''
                },
                rules: {
                    users: [
                        {required: true, message: '请选择用户', trigger: 'blur,change'}
                    ]
                },
                checkAll: true,
                isIndeterminate: false,
                checkRule: true,
                checkUserGroup: true,
                checkDeadline: true
            }
		},
		methods: {
            handleCheckAllChange(val) {
                let that = this;
                if (val) {
                    that.checkRule = true;
                    that.checkUserGroup = true;
                    that.checkDeadline = true;
                } else {
                    that.checkRule = false;
                    that.checkUserGroup = false;
                    that.checkDeadline = false;
                }
                that.isIndeterminate = false;
            },
            handleCheckChange: function (val) {
                let that = this;
                if (that.checkRule && that.checkUserGroup && that.checkDeadline) {
                    that.checkAll = true;
                    this.isIndeterminate = false;
                } else {
                    if (that.checkRule || that.checkUserGroup || that.checkDeadline) {
                        this.isIndeterminate = true;
                    } else {
                        that.checkAll = false;
                        this.isIndeterminate = false;
                    }
                }
            },
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
            getUserList: function () {
                let that = this;
                let params = {

                };
                that.$axios.get('http://localhost:8000/api/users/user', params)
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            if (data.data.results.length > 0) {
                                data.data.results.forEach(function (item) {
                                    that.usersList.push({
                                        value: item.id,
                                        label: item.name
                                    });
                                });
                            }
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
            update: async function () {
                let that = this;
                let user_ids = that.updateUserForBatchForm.users.join(',');
                let params = {
                    role: that.updateUserForBatchForm.role,
                    groups: that.updateUserForBatchForm.userGroup,
                    date_expired: that.formatDate(that.updateUserForBatchForm.endDate)
                };

                for (let index in params) {
                    if(!params[index] || params[index].length === 0) {
                        delete params[index];
                    }
                }

                that.isLoading = true;
                const res = await that.$axios.post('http://localhost:8000/api/users/multi-update/user/?user_ids=' + user_ids, params);
                if (res.status === 200) {
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    that.isLoading = false;
                    this.$router.push({path: '/home/userList' });
                }
            }
        },
        mounted: function () {
		    let that = this;
            let users = this.$route.query.users;
            if (users && users.length > 0) {
                users.forEach(function (item) {
                    that.updateUserForBatchForm.users.push(item);
                })
            }
            that.getUserList();
            that.getUserGroups();
        }
	}
</script>

<style lang="scss">
    .update-user-for-batch-section {
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
            .attr-list {
                padding: 5px 0 15px 10px;
                background: #f4f4f4;
                p {
                    font-size: 12px;
                    color: #999;
                }
            }
            .content {
                padding: 15px;
                .el-input .el-input__inner {
                    width: 400px!important;
                }
                .el-select .el-input__inner {
                    width: 100%!important;
                    min-width: 400px!important;
                }
                [class*=el-col-12] {
                    float: left;
                }
            }
        }
    }
</style>
