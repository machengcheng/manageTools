<template>
    <section class="add-or-update-label-dialog-section">
        <el-dialog
            :title="addOrUpdate == 'add' ? '创建标签' : '更新标签'"
            :visible.sync="addOrUpdateLabelDialogVisible"
            :before-close="closeDialog"
            :lock-scroll="false"
            :close-on-click-modal="false"
            :open="initDialogData()"
        >
            <el-form :model="addOrUpdateLabelDialogForm" :rules="rules" ref="addOrUpdateLabelDialogForm" class="demo-form-inline" label-width="120px">
                <div class="content">
                    <el-col :span="24">
                        <el-form-item
                            label="名称: "
                            prop="name"
                        >
                            <el-input
                                v-model="addOrUpdateLabelDialogForm.name"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="值: "
                            prop="value"
                        >
                            <el-input
                                v-model="addOrUpdateLabelDialogForm.value"
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
                                v-model="addOrUpdateLabelDialogForm.assets"
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
                    <div class="clear"></div>
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
		name: "add-or-update-label-dialog",
		components: {

        },
        props: ['addOrUpdateLabelDialogVisible', 'addOrUpdate'],
		data() {
			return {
                addOrUpdateLabelDialogForm: {
                    name: '',
                    value: '',
                    assets: ''
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
                    ],
                    value: [
                        {required: true, message: '值不能为空', trigger: 'blur,change'}
                    ]
                }
            }
		},
		methods: {
            closeDialog: function () {
                this.$emit('addOrUpdateLabelDialogEvent', this.addOrUpdateLabelDialogVisible);
            },
            initDialogData: function () {

            }
        }
	}
</script>

<style lang="scss">
    .add-or-update-label-dialog-section {
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
            .el-input .el-input__inner {
                width: 60%!important;
                min-width: 300px;
            }
            .el-select .el-input__inner {
                width: 60%!important;
                min-width: 260px;
            }
            [class*=el-col-12] {
                float: left;
            }
        }
    }
</style>
