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
                <div class="content">
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
                <el-button type="primary" @click="closeDialog">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
	export default {
		name: "add-or-update-user-group-dialog",
		components: {

        },
        props: ['addOrUpdateUserGroupDialogVisible', 'addOrUpdate'],
		data() {
			return {
                addUserGroupDialogForm: {
                    name: '',
                    user: '',
                    remark: ''
                },
                userList: [
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
                    ]
                }
            }
		},
		methods: {
            closeDialog(){
                this.$emit('addOrUpdateUserGroupDialogEvent', this.addOrUpdateUserGroupDialogVisible);
            },
            initDialogData: function () {

            }
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
