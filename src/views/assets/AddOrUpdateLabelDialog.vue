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
                <div class="content">==={{datas}}
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
                <el-button type="primary" :loading="isLoading" @click="submitForm('addOrUpdateLabelDialogForm')">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
	export default {
		name: "add-or-update-label-dialog",
		components: {

        },
        props: ['addOrUpdateLabelDialogVisible', 'addOrUpdate', 'updateData', 'updateStatus'],
		data() {
			return {
                addOrUpdateLabelDialogForm: {
                    name: '',
                    value: '',
                    assets: []
                },
                isLoading: false,
                assetsList: [],
                datas: [],
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
        watch: {
            updateStatus: function (newVal, oldVal) {
                let that = this;
                that.addOrUpdateLabelDialogForm.name = '';
                that.addOrUpdateLabelDialogForm.value = '';
                that.addOrUpdateLabelDialogForm.assets.splice(0, this.addOrUpdateLabelDialogForm.assets.length);
                if(newVal != oldVal && that.addOrUpdate === 'update') {
                    this.getLabelDetail();
                } else {
                    that.addOrUpdateLabelDialogForm.datas.splice(0, this.addOrUpdateLabelDialogForm.datas.length);
                }
            }
        },
		methods: {
            closeDialog: function () {
                this.$emit('addOrUpdateLabelDialogEvent', this.addOrUpdateLabelDialogVisible);
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
            getLabelDetail: function () {
                let that = this;
                that.datas = that.updateData;
                that.addOrUpdateLabelDialogForm.name  = that.updateData.name;
                if (that.updateData.assets.length > 0) {
                    that.updateData.assets.forEach(function (item) {
                        that.addOrUpdateLabelDialogForm.assets.push(item);
                    });
                }
                that.addOrUpdateLabelDialogForm.value  = that.updateData.value;
            },
            getAssetsList: function () {
                let that = this;
                that.$axios.get('http://localhost:8000/api/assets/asset/', {})
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
                    name: that.addOrUpdateLabelDialogForm.name,
                    value: that.addOrUpdateLabelDialogForm.value,
                    asset: that.addOrUpdateLabelDialogForm.assets.join(',')
                };
                this.isLoading = true;
                const res = await that.$axios.post('http://localhost:8000/api/assets/labels/', params);
                if (res.status === 201) {
                    that.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    this.isLoading = false;
                    that.resetForm('addOrUpdateLabelDialogForm');
                    that.closeDialog();
                }
            },
            update: async function () {
                let that = this;
                let params = {
                    name: that.addOrUpdateLabelDialogForm.name,
                    value: that.addOrUpdateLabelDialogForm.value,
                    asset: that.addOrUpdateLabelDialogForm.assets.join(',')
                };

                that.isLoading = true;

                const res = await that.$axios.patch('http://localhost:8000/api/assets/labels/' + that.updateData.id + '/', params);
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
                that.$emit('addOrUpdateLabelDialogEvent', 'updated');
            }
        },
        mounted: function () {
            this.getAssetsList();
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
                width: 300px;
            }
            .el-select .el-input__inner {
                width: 300px;
            }
            [class*=el-col-12] {
                float: left;
            }
        }
    }
</style>
