<template>
    <section class="terminal-settings-tab-section">
        <div class="box-content">
            <el-form :model="terminalSettingsForm" :rules="rules" ref="terminalSettingsForm" class="demo-form-inline" label-width="120px">
                <div class="content">
                    <div class="item-split">
                        <span class="item-title">基本设置</span>
                    </div>
                    <el-col :span="24">
                        <el-form-item
                            label="资产列表排序: "
                        >
                            <el-select
                                v-model="terminalSettingsForm.assetsListSort"
                                filterable
                                size="medium"
                                placeholder="请选择资产列表排序"
                            >
                                <el-option
                                    v-for="item in assetsListSortList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="心跳间隔: "
                            prop="heartPeriod"
                        >
                            <el-input
                                v-model="terminalSettingsForm.heartPeriod"
                                size="medium"
                                placeholder="SMTP密码"
                                type="number"
                            >
                            </el-input>
                            <span>单位: 秒</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="密码认证: "
                        >
                            <el-checkbox v-model="terminalSettingsForm.passwordAuth"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item
                            label="密钥认证: "
                        >
                            <el-checkbox v-model="terminalSettingsForm.keyAuth"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="命令存储: "
                                      prop="commandStore"
                        >
                            <el-input
                                type="textarea"
                                :rows="4"
                                style="width: 500px;"
                                size="medium"
                                resize="none"
                                placeholder="命令存储"
                                v-model="terminalSettingsForm.commandStore">
                            </el-input>
                            <div style="font-size: 13px;">设置终端命令存储，default是默认用的存储方式</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="录像存储: "
                                      prop="videoStore"
                        >
                            <el-input
                                type="textarea"
                                :rows="4"
                                style="width: 500px;"
                                size="medium"
                                resize="none"
                                placeholder="录像存储"
                                v-model="terminalSettingsForm.videoStore">
                            </el-input>
                            <div style="font-size: 13px;">设置终端录像存储，default是默认用的存储方式</div>
                        </el-form-item>
                    </el-col>
                    <div class="item-split">
                        <span class="item-title">命令存储</span>
                    </div>
                    <el-col :span="24" align="center" class="mt20">
                        <el-button>测试连接</el-button>
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
		name: "terminal-settings-tab",
		components: {

        },
        props: ['terminalSettingsVisible'],
		data() {
			return {
                terminalSettingsForm: {
                    assetsListSort: '',
                    heartPeriod: 1,
                    passwordAuth: true,
                    keyAuth: true,
                    commandStore: '{"default": {"TYPE": "server"}}',
                    videoStore: '{"default": {"TYPE": "server"}}'

                },
                assetsListSortList: [
                    {
                        value: '1',
                        label: '主机名'
                    },
                    {
                        value: '2',
                        label: 'IP'
                    }
                ],
                rules: {

                }
            }
		},
        watch: {
            terminalSettingsVisible: function (newVal, oldVal) {
                if(newVal != oldVal) {

                }
            }
        },
		methods: {

        }
	}
</script>

<style lang="scss">
    .terminal-settings-tab-section {
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
                width: 192px!important;
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
