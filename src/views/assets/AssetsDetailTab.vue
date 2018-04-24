<template>
    <section class="assets-detail-tab-section">
        <el-row style="padding: 0 10px;">
            <el-col :span="24">
                <div class="box-operate pd0">
                    <el-button  type="primary" size="mini" class="fr">编辑</el-button>
                    <el-button  type="danger" size="mini" class="fr mr20">删除</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="16" class="pd10">
                <div class="block-item" style="min-height: 561px;">
                    <div class="block-title">点1</div>
                    <ul class="info-list">
                        <li class="info-item">
                            <span class="tips">主机名:</span>
                            <span class="detail">点1</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">IP:</span>
                            <span class="detail">10.221.121.1</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">公网IP:</span>
                            <span class="detail"></span>
                        </li>
                        <li class="info-item">
                            <span class="tips">端口:</span>
                            <span class="detail">22</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">管理用户:</span>
                            <span class="detail">admin.104</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">制造商:</span>
                            <span class="detail"></span>
                        </li>
                        <li class="info-item">
                            <span class="tips">型号:</span>
                            <span class="detail"></span>
                        </li>
                        <li class="info-item">
                            <span class="tips">CPU:</span>
                            <span class="detail">*</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">内存:</span>
                            <span class="detail"></span>
                        </li>
                        <li class="info-item">
                            <span class="tips">硬盘:</span>
                            <span class="detail"></span>
                        </li>
                        <li class="info-item">
                            <span class="tips">系统平台:</span>
                            <span class="detail">Linux</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">操作系统:</span>
                            <span class="detail"></span>
                        </li>
                        <li class="info-item">
                            <span class="tips">激活:</span>
                            <span class="detail">Yes</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">序列号:</span>
                            <span class="detail"></span>
                        </li>
                        <li class="info-item">
                            <span class="tips">资产编号:</span>
                            <span class="detail"></span>
                        </li>
                        <li class="info-item">
                            <span class="tips">创建者:</span>
                            <span class="detail">None</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">创建日期:</span>
                            <span class="detail"></span>
                        </li>
                        <li class="info-item">
                            <span class="tips">备注:</span>
                            <span class="detail"></span>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="8" class="pd10">
                <div class="block-item" style="height: 272px;">
                    <div class="block-title">快速修改</div>
                    <ul class="info-list">
                        <li class="info-item">
                            <span class="tips">激活中:</span>
                            <span class="detail">
                                <el-switch
                                    v-model="activateStatus"
                                >
                                </el-switch>
                            </span>
                        </li>
                        <li class="info-item">
                            <span class="tips">更新硬件信息:</span>
                            <span class="detail">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    plain
                                >
                                    发送
                                </el-button>
                            </span>
                        </li>
                        <li class="info-item">
                            <span class="tips">测试可连接性:</span>
                            <span class="detail">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    plain
                                >
                                    发送
                                </el-button>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="block-item" style="min-height: 272px;margin-top: 15px;">
                    <div class="block-title">节点管理</div>
                    <ul class="info-list">
                        <li class="info-item">
                            <el-input
                                size="medium"
                            >
                            </el-input>
                            <el-button
                                type="primary"
                                size="mini"
                                plain
                            >
                                确认
                            </el-button>
                        </li>
                        <li class="info-item bd0 mt10">
                            <span class="tips">Default</span>
                            <span class="fr">
                                <el-button
                                    type="danger"
                                    size="mini"
                                    plain
                                    icon="el-icon-minus"
                                >
                                </el-button>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="block-item" style="min-height: 272px;margin-top: 15px;">
                    <div class="block-title">标签管理</div>
                    <ul class="info-list">
                        <li class="info-item">
                            <el-tag type="primary">aaaa:111</el-tag>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
	export default {
		name: "assets-detail-tab",
		components: {

        },
        props: ['assetsDetailVisible'],
		data() {
			return {
                activateStatus: ''
            }
		},
        watch: {
            assetsDetailVisible: function (newVal, oldVal) {
                if(newVal != oldVal) {

                }
            }
        },
		methods: {

        }
	}
</script>

<style lang="scss">
    .assets-detail-tab-section {
        padding: 26px 22px;
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
        .block-item {
            background-color: #fff;
            border: 1px solid #ebebeb;
            box-shadow: 0 1px 4px 0 rgba(222,235,250,1);
            border-radius: 3px;
            .block-title {
                height: 48px;
                line-height: 48px;
                padding-left: 15px;
                color: #606266;
                font-size: 14px;
                background-color: #f5f7fa;
            }
        }
        .info-list {
            font-size: 13px;
            padding: 25px;
            line-height: 3.2em;
            color: #4E4E4E;
            .info-item {
                border-bottom: 1px solid #dcdfe6;
                span {
                    display: inline-block;
                }
                span.tips {
                    min-width: 130px;
                    text-align: left;
                }
                span.detail {
                    display: inline-block;
                    min-width: 150px;
                    text-align: left;
                }
                img {
                    width: 80px;
                    height: 80px;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                }
            }
            .info-item:last-of-type {
                border: 0;
            }
        }
        .pd10 {
            padding: 10px;
        }
        .pd15 {
            padding: 15px;
        }
    }
</style>
