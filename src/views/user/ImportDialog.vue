<template>
    <section class="import-dialog">
        <el-dialog
            title="导入"
            :visible.sync="importDialogVisible"
            :before-close="closeDialog"
            width="60%"
            :lock-scroll="false"
            :close-on-click-modal="false"
            :open="initDialogData()"
            >

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

            }
		},
		methods: {
            closeDialog(){
                this.$emit('importDialogVisibleEvent', this.importDialogVisible);
            },
            initDialogData: function () {

            },
        }
	}
</script>

<style scoped>

</style>
