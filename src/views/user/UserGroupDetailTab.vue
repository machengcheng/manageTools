<template>
    <section class="user-group-detail-tab-section">
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
                <div class="block-item" style="min-height: 272px;">
                    <div class="block-title">Default</div>
                    <ul class="info-list">
                        <li class="info-item">
                            <span class="tips">名称:</span>
                            <span class="detail">Default</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">创建者:</span>
                            <span class="detail"></span>
                        </li>
                        <li class="info-item">
                            <span class="tips">创建日期:</span>
                            <span class="detail">2018年4月11日 16:57</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">备注:</span>
                            <span class="detail"></span>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="8" class="pd10">
                <div class="block-item" style="min-height: 272px;">
                    <div class="block-title">用户组</div>
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
                                加入
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
		name: "user-group-detail-tab",
		components: {

        },
		data() {
			return {

            }
		},
		methods: {

        }
	}
</script>

<style lang="scss">
    .user-group-detail-tab-section {
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
