<template>
    <section class="add-or-update-user-group-dialog-section">
        <el-dialog
            :title="addOrUpdate == 'add' ? '创建用户组' : '更新用户组'"
            :visible.sync="addOrUpdateUserGroupDialogVisible"
            :before-close="closeDialog"
            :lock-scroll="false"
            :close-on-click-modal="false"
            :open="initDialogData()"
            >
            <el-form :model="addUserGroupDialogForm" :rules="rules" ref="addUserGroupDialogForm" class="demo-form-inline" label-width="120px">
                <div class="content">==={{datas}}
                    <el-col :span="12">
                        <el-form-item
                            label="名称: "
                            prop="name"
                        >
                            <el-input
                                v-model="addUserGroupDialogForm.name"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="用户: "
                            prop="user"
                        >
                            <el-select
                                id="userGroup"
                                v-model="addUserGroupDialogForm.user"
                                multiple
                                placeholder="请选择用户"
                            >
                                <el-option
                                    v-for="item in userList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
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
                                v-model="addUserGroupDialogForm.remark">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" :loading="isLoading" @click="submitForm('addUserGroupDialogForm')">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
	export default {
		name: "add-or-update-user-group-dialog",
		components: {

        },
        props: ['addOrUpdateUserGroupDialogVisible', 'addOrUpdate', 'updateData', 'updateStatus'],
		data() {
			return {
			    isLoading: false,
                addUserGroupDialogForm: {
                    name: '',
                    user: [],
                    remark: ''
                },
                datas: [],
                userList: [],
                rules: {
                    name: [
                        {required: true, message: '名称不能为空', trigger: 'blur,change'}
                    ]
                }
            }
		},
        watch: {
            updateStatus: function (newVal, oldVal) {
                if(newVal != oldVal) {
                    this.getUserGroupDetail();
                }
            }
        },
		methods: {
            closeDialog(){
                this.$emit('addOrUpdateUserGroupDialogEvent', this.addOrUpdateUserGroupDialogVisible);
            },
            initDialogData: function () {

            },
            submitForm(formName) {
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        switch(that.addOrUpdate) {
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
                                   that.userList.push({
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
            getUserGroupDetail: function () {
                let that = this;
                that.datas = that.updateData;
                that.addUserGroupDialogForm.name  = that.updateData.name;
                if (that.updateData.users.length > 0) {
                    that.updateData.users.forEach(function (item) {
                        that.addUserGroupDialogForm.user.push(item);
                    });
                }
                that.addUserGroupDialogForm.remark  = that.updateData.comment;
            },
            add: async function () {
                var that = this;
                let params = {
                    name: that.addUserGroupDialogForm.name,
                    users: that.addUserGroupDialogForm.user,
                    comment: that.addUserGroupDialogForm.remark
                };
                this.isLoading = true;
                const res = await that.$axios.post('http://localhost:8000/api/users/group/', params);
                if (res.status === 201) {
                    that.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    this.isLoading = false;
                    that.resetForm('addUserGroupDialogForm');
                    that.closeDialog();
                }
            },
            update: async function () {
                let that = this;
                let params = {
                    name: that.addUserGroupDialogForm.name,
                    users: that.addUserGroupDialogForm.user,
                    comment: that.addUserGroupDialogForm.remark,
                };

                that.isLoading = true;

                const res = await that.$axios.patch('http://localhost:8000/api/users/group/' + that.updateData.id + '/', params);
                if (res.status === 200) {
                    that.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                } else {
                    that.$message({
                        message: '修改失败',
                        type: 'info'
                    });
                }
                that.isLoading = false;
                that.closeDialog();
            }
        },
        mounted: function () {
            this.getUserList();
        }
	}
</script>

<style lang="scss" scoped>
    .add-or-update-user-group-dialog-section {
        .el-dialog__wrapper {
            min-width: 600px!important;
            .el-dialog__body {
                padding-top: 10px!important;
            }
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
            .el-form-item .el-input__inner {
                width: 220px!important;
            }
            [class*=el-col-12] {
                float: left;
            }
        }
    }
</style>
