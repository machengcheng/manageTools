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
                                      prop="comment"
                        >
                            <el-input
                                type="textarea"
                                :rows="4"
                                style="width: 500px;"
                                size="medium"
                                resize="none"
                                placeholder="请输入备注信息"
                                v-model="addOrUpdateNetworkDialogForm.comment">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" :loading="isLoading" @click="submitForm('addOrUpdateNetworkDialogForm')">确 定</el-button>
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
			    isLoading: false,
                addOrUpdateNetworkDialogForm: {
                    name: '',
                    assets: [],
                    comment: ''
                },
                assetsList: [],
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

            getAssetsList: function () {
                let that = this;
                this.$axios.get('http://localhost:8000/api/assets/asset', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            if (data.data.results.length > 0) {
                                data.data.results.forEach(function (item) {
                                    that.assetsList.push({
                                        value: item.id,
                                        label: item.hostname
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
            add: async function () {
                var that = this;
                let params = {
                    name: that.addOrUpdateNetworkDialogForm.name,
                    asset: that.addOrUpdateNetworkDialogForm.assets.join(','),
                    comment: that.addOrUpdateNetworkDialogForm.comment,
                };
                that.isLoading = true;
                const res = await that.$axios.post('http://localhost:8000/api/assets/domain/', params);
                if (res.status === 201) {
                    that.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    that.isLoading = false;
                    that.resetForm('addOrUpdateNetworkDialogForm');
                    that.closeDialog();
                }
            },
            update: function () {

            }
        },
        mounted: function () {
            this.getAssetsList();
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
