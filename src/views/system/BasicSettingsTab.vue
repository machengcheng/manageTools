<template>
    <section class="basic-settings-tab-section">
        <div class="box-content">
            <el-form :model="basicSettingsForm" :rules="rules" ref="basicSettingsForm" class="demo-form-inline" label-width="120px">
                <div class="content">
                    <el-col :span="24">
                        <el-form-item
                            label="当前站点URL: "
                            prop="webUrl"
                        >
                            <el-input
                                v-model="basicSettingsForm.webUrl"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="用户向导URL: "
                            prop="userUrl"
                        >
                            <el-input
                                v-model="basicSettingsForm.userUrl"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="Email主题前缀: "
                            prop="mailPrefix"
                        >
                            <el-input
                                v-model="basicSettingsForm.mailPrefix"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" align="center" class="mt20">
                        <el-button>取 消</el-button>
                        <el-button type="primary">确 定</el-button>
                    </el-col>
                    <div class="clear"></div>
                </div>
            </el-form>
        </div>
    </section>
</template>

<script>
	export default {
		name: "basic-settings-tab",
		components: {

        },
        props: ['basicSettingsVisible'],
		data() {
			return {
                basicSettingsForm: {
                    webUrl: '',
                    userUrl: '',
                    mailPrefix: ''
                },
                rules: {

                }
            }
		},
        watch: {
            basicSettingsVisible: function (newVal, oldVal) {
                if(newVal != oldVal) {

                }
            }
        },
		methods: {

        }
	}
</script>

<style lang="scss">
    .basic-settings-tab-section {
        padding: 36px 22px 36px;
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
                width: 50%!important;
            }
            .el-select .el-input__inner {
                width: 100%!important;
            }
            [class*=el-col-12] {
                float: left;
            }
        }
    }
</style>
