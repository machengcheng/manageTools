<template>
    <section class="rename-node-name-dialog-section">
        <el-dialog
            title="重命名节点"
            :visible.sync="renameNodeNameDialogVisible"
            :before-close="closeDialog"
            :lock-scroll="false"
            :close-on-click-modal="false"
            :open="initDialogData()"
            >
            <el-form :model="renameNodeNameDialogForm" :rules="rules" ref="renameNodeNameDialogForm" class="demo-form-inline" label-width="60px">
                <div class="content">
                    <el-col :span="24">
                        <el-form-item
                            align="left"
                            label="名称: "
                            prop="name"
                        >
                            <el-input
                                v-model="renameNodeNameDialogForm.name"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" :loading="isLoading" @click="submitForm('renameNodeNameDialogForm')">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
	export default {
		name: "rename-node-name-dialog",
		components: {

        },
        props: ['renameNodeNameDialogVisible', 'updateData', 'updateStatus'],
		data() {
			return {
                isLoading: false,
                renameNodeNameDialogForm: {
                    nodeId: '',
                    name: ''
                },
                rules: {
                    name: [
                        {required: true, message: '节点名称不能为空', trigger: 'blur,change'}
                    ]
                }
            }
		},
        watch: {
            updateStatus: function (newVal, oldVal) {
                if(newVal != oldVal) {
                    this.getNodeDetail();
                }
            }
        },
		methods: {
            closeDialog: function () {
                this.$emit('renameNodeNameDialogVisibleEvent', this.renameNodeNameDialogVisible);
            },
            initDialogData: function () {

            },
            submitForm(formName) {
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.renameNode();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            renameNode: async function () {
                var that = this;
                let params = {
                    value: that.renameNodeNameDialogForm.name
                };
                that.isLoading = true;
                const res = await that.$axios.patch('http://localhost:8000/api/assets/nodes/' + that.renameNodeNameDialogForm.nodeId + '/', params);
                if (res.status === 200) {
                    that.$message({
                        message: '更新成功',
                        type: 'success'
                    });
                    that.isLoading = false;
                    that.resetForm('renameNodeNameDialogForm');
                    that.$emit('renameNodeNameDialogVisibleEvent', 'updated');
                }
            },
            getNodeDetail: function () {
                this.renameNodeNameDialogForm.name = this.updateData.label;
                this.renameNodeNameDialogForm.nodeId = this.updateData.id;
            }
        },
        mounted: function () {
		    this.getNodeDetail();
        }
	}

</script>

<style lang="scss">
    .rename-node-name-dialog-section {
        position: relative;
        .el-dialog {
            width: 460px!important;
            .el-dialog__body {
                padding-top: 10px!important;
            }
        }
    }
</style>
