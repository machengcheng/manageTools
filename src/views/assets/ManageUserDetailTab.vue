<template>
    <section class="manage-user-detail-tab-section">
        <el-row>
            <el-col :span="16" class="pd10">
                <div class="block-item" style="min-height: 300px;">
                    <div class="block-title">admin.104</div>
                    <ul class="info-list">
                        <li class="info-item">
                            <span class="tips">名称:</span>
                            <span class="detail">admin.104</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">用户名:</span>
                            <span class="detail">root</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">创建日期:</span>
                            <span class="detail">2018年4月11日 19:16</span>
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
        </el-row>
    </section>
</template>

<script>
	export default {
		name: "manage-user-detail-tab",
		components: {

        },
        props: ['manageUserDetailVisible'],
		data() {
			return {

            }
		},
        manageUserDetailVisible: function (newVal, oldVal) {
            if(newVal != oldVal) {

            }
        },
		methods: {

        }
	}
</script>

<style lang="scss">
    .manage-user-detail-tab-section {
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
