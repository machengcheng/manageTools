<template>
    <section class="system-user-detail-tab-section">
        <el-row>
            <el-col :span="16" class="pd10">
                <div class="block-item" style="min-height: 400px;">
                    <div class="block-title">	root</div>
                    <ul class="info-list">
                        <li class="info-item">
                            <span class="tips">名称:</span>
                            <span class="detail">root</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">用户名:</span>
                            <span class="detail">root</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">协议:</span>
                            <span class="detail">ssh</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">Sudo:</span>
                            <span class="detail">/sbin/ifconfig</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">Shell:</span>
                            <span class="detail">/bin/bash</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">创建日期:</span>
                            <span class="detail">2018年4月11日 18:35</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">创建者:</span>
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
                <div class="block-item" style="height: 240px;">
                    <div class="block-title">快速更新</div>
                    <ul class="info-list">
                        <li class="info-item">
                            <span class="tips">自动推送:</span>
                            <span class="detail">
                                <el-switch
                                    v-model="autoPush"
                                >
                                </el-switch>
                            </span>
                        </li>
                        <li class="info-item">
                            <span class="tips">立刻推送系统:</span>
                            <span class="detail">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    plain
                                >
                                    推送
                                </el-button>
                            </span>
                        </li>
                        <li class="info-item">
                            <span class="tips">测试资产可连接性:</span>
                            <span class="detail">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    plain
                                >
                                    测试
                                </el-button>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="block-item" style="min-height: 240px;margin-top: 15px;">
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
            </el-col>
        </el-row>
    </section>
</template>

<script>
	export default {
		name: "system-user-detail-tab",
		components: {

        },
        props: ['systemUserDetailVisible'],
		data() {
			return {
                autoPush: true
            }
		},
        systemUserDetailVisible: function (newVal, oldVal) {
            if(newVal != oldVal) {

            }
        },
		methods: {

        }
	}
</script>

<style lang="scss">
    .system-user-detail-tab-section {
        padding: 16px 22px 26px;
        background-color: #fff;
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
