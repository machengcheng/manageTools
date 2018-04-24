<template>
    <section class="add-or-update-assets-section">
        <div class="box-title mb20">{{this.$route.query.addOrUpdate == 'add' ? '创建资产' : '更新资产'}}</div>
        <div class="box-content">
            <el-form :model="addOrUpdateAssetsForm" :rules="rules" ref="addOrUpdateAssetsForm" class="demo-form-inline" label-width="120px">
                <div class="content">
                    <div class="item-split">
                        <span class="item-title">基本</span>
                    </div>
                    <el-col :span="12">
                        <el-form-item
                            label="主机名: "
                            prop="hostName"
                        >
                            <el-input
                                v-model="addOrUpdateAssetsForm.hostName"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="IP: "
                            prop="ip"
                        >
                            <el-input
                                v-model="addOrUpdateAssetsForm.ip"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="端口: "
                            prop="port"
                        >
                            <el-input
                                v-model="addOrUpdateAssetsForm.port"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="系统平台: "
                            prop="system"
                        >
                            <el-select
                                id="userGroup"
                                v-model="addOrUpdateAssetsForm.system"
                                filterable
                                placeholder="请选择系统平台"
                            >
                                <el-option
                                    v-for="item in systemList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="公网IP: "
                            prop="publicNetIp"
                        >
                            <el-input
                                v-model="addOrUpdateAssetsForm.publicNetIp"
                                size="medium"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="网域: "
                            prop="network"
                        >
                            <el-select
                                id="userGroup"
                                v-model="addOrUpdateAssetsForm.network"
                                filterable
                                placeholder="请选择网域"
                            >
                                <el-option
                                    v-for="item in networkList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <div class="item-split">
                        <span class="item-title">认证</span>
                    </div>
                    <el-col :span="12">
                        <el-form-item
                            label="管理用户: "
                            prop="manageUser"
                        >
                            <el-select
                                id="userGroup"
                                v-model="addOrUpdateAssetsForm.manageUser"
                                filterable
                                placeholder="请选择管理用户"
                            >
                                <el-option
                                    v-for="item in manageUserList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <div class="clear"></div>
                    <div class="item-split">
                        <span class="item-title">节点</span>
                    </div>
                    <el-col :span="12">
                        <el-form-item
                            label="节点管理: "
                            prop="nodeManage"
                        >
                            <el-select
                                id="userGroup"
                                v-model="addOrUpdateAssetsForm.nodeManage"
                                filterable
                                placeholder="请选择节点管理"
                            >
                                <el-option
                                    v-for="item in nodeManageList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <div class="clear"></div>
                    <div class="item-split">
                        <span class="item-title">标签管理</span>
                    </div>
                    <el-col :span="12">
                        <el-form-item
                            label="标签: "
                            prop="label"
                        >
                            <el-select
                                id="userGroup"
                                v-model="addOrUpdateAssetsForm.label"
                                multiple
                                placeholder="请选择标签"
                            >
                                <el-option
                                    v-for="item in labelList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <div class="clear"></div>
                    <div class="item-split">
                        <span class="item-title">其它</span>
                    </div>
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
                                v-model="addOrUpdateAssetsForm.remark">
                            </el-input><br/>
                            <el-checkbox v-model="addOrUpdateAssetsForm.activate">激活</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" align="center">
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
		name: "add-or-update-assets",
		components: {

        },
		data() {
			return {
                addOrUpdateAssetsForm: {
                    hostName: '',
                    ip: '',
                    port: '',
                    system: '',
                    publicNetIp: '',
                    network: '',
                    manageUser: '',
                    nodeManage: '',
                    label: '',
                    remark: '',
                    activate: true
                },
                systemList: [
                    {
                        value: '1',
                        label: 'Linux'
                    },
                    {
                        value: '2',
                        label: 'Unix'
                    },
                    {
                        value: '3',
                        label: 'MacOS'
                    },
                    {
                        value: '4',
                        label: 'BSD'
                    },
                    {
                        value: '5',
                        label: 'Windows'
                    },
                    {
                        value: '6',
                        label: 'Other'
                    }
                ],
                networkList: [
                    {
                        value: '1',
                        label: 'yeexun'
                    }
                ],
                manageUserList: [
                    {
                        value: '1',
                        label: 'admin'
                    },
                    {
                        value: '2',
                        label: 'root'
                    }
                ],
                nodeManageList: [
                    {
                        value: '1',
                        label: 'ROOT'
                    }
                ],
                labelList: [
                    {
                        value: '1',
                        label: '111'
                    },
                    {
                        value: '2',
                        label: '222'
                    }
                ],
                rules: {

                }
            }
		},
		methods: {

        }
	}
</script>

<style lang="scss">
    .add-or-update-assets-section {
        padding: 18px 15px;
        margin: 15px 0;
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
                width: 70%!important;
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
