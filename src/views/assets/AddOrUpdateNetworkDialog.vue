<template>
    <section class="add-or-update-network-dialog-section">
        <el-dialog
            :title="addOrUpdate == 'add' ? '创建网域' : '更新网域'"
            :visible.sync="addOrUpdateNetworkDialogVisible"
            :before-close="closeDialog"
            :lock-scroll="false"
            :close-on-click-modal="false"
            :open="initDialogData()"
            >
            <el-form :model="addOrUpdateNetworkDialogForm" :rules="rules" ref="addOrUpdateNetworkDialogForm" class="demo-form-inline" label-width="120px">
                <div class="content">
                    <el-col :span="24">
                        <el-form-item
                            label="名称: "
                            prop="name"
                        >
                            <el-input
                                v-model="addOrUpdateNetworkDialogForm.name"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="资产: "
                            prop="assets"
                        >
                            <el-select
                                id="assets-select"
                                v-model="addOrUpdateNetworkDialogForm.assets"
                                multiple
                                placeholder="请选择资产"
                            >
                                <el-option
                                    v-for="item in assetsList"
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
                                v-model="addOrUpdateNetworkDialogForm.remark">
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
		name: "add-or-update-network-dialog",
		components: {

        },
        props: ['addOrUpdateNetworkDialogVisible', 'addOrUpdate'],
		data() {
			return {
                addOrUpdateNetworkDialogForm: {
                    name: '',
                    assets: '',
                    remark: ''
                },
                assetsList: [
                    {
                        value: '1',
                        label: '点1'
                    },
                    {
                        value: '2',
                        label: '104'
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
            closeDialog: function () {
                this.$emit('addOrUpdateNetworkDialogEvent', this.addOrUpdateNetworkDialogVisible);
            },
            initDialogData: function () {

            }
        }
	}
</script>

<style lang="scss">
    .add-or-update-network-dialog-section {
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
