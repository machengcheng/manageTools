<template>
    <section class="import-dialog-section">
        <el-dialog
            title="导入"
            :visible.sync="importDialogVisible"
            :before-close="closeDialog"
            :lock-scroll="false"
            :close-on-click-modal="false"
            :open="initDialogData()"
            >
            <div class="content">
                <el-col :span="24" align="left">
                    <el-button type="text">下载模板或使用导出的csv格式</el-button>
                </el-col>
                <el-col :span="24" align="left">
                    下载: <a href="http://localhost:8000/users/user/export/" class="link">模板</a>
                </el-col>
                <el-col :span="24" align="left">
                    用户csv文件 :
                    <el-upload
                        class="upload-demo"
                        action="http://localhost:8000/users/user/import/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                        style="display: inline-block;"
                        >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-col>
                <el-col :span="24" align="left">
                    <el-button type="text" class="tip">如果设置了id，则会使用该行信息更新该id的用户</el-button>
                </el-col>
                <el-col :span="24" align="left">
                    <div>
                        Created 0
                    </div>
                    <div>
                        Updated 0
                    </div>
                    <div>
                        Failed 0
                    </div>
                </el-col>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="closeDialog">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
	export default {
		name: "import-dialog",
		components: {

        },
        props: ['importDialogVisible'],
		data() {
			return {
                fileList: [
                    {
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    },
                    {
                        name: 'food2.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }
                ]
            }
		},
		methods: {
            closeDialog(){
                this.$emit('importDialogVisibleEvent', this.importDialogVisible);
            },
            initDialogData: function () {

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
	}
</script>

<style lang="scss">
    .import-dialog-section {
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
