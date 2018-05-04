<template>
    <section class="network-detail-tab-section">
        <el-row>
            <el-col :span="16" class="pd10">
                <div class="block-item" style="min-height: 400px;height: auto;">===={{gatewayDetailData}}
                    <div class="block-title">{{gatewayDetailData.name}}</div>
                    <ul class="info-list">
                        <li class="info-item">
                            <span class="tips">名称:</span>
                            <span class="detail">{{gatewayDetailData.name}}</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">资产:</span>
                            <span class="detail">{{gatewayDetailData.asset_count}}</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">网关:</span>
                            <span class="detail">{{gatewayDetailData.gateway_count}}</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">创建日期:</span>
                            <span class="detail">{{gatewayDetailData.date_created}}</span>
                        </li>
                        <li class="info-item">
                            <span class="tips">创建者:</span>
                            <span class="detail"></span>
                        </li>
                        <li class="info-item">
                            <span class="tips">备注:</span>
                            <span class="detail">{{gatewayDetailData.comment}}水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费</span>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
	export default {
		name: "network-detail-tab",
		components: {

        },
        props: ['networkDetailVisible'],
		data() {
			return {
                gatewayDetailData: []
            }
		},
        watch: {
            networkDetailVisible: function (newVal, oldVal) {
                if (newVal != oldVal) {
                    this.getData();
                }
            }
        },
		methods: {
            getData: async function() {
                let that = this;
                let params = {
                    id__in: that.$route.query.gatewayId
                };
                this.isLoading = true;
                that.$axios.get('http://localhost:8000/api/assets/domain', { params: params})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            that.gatewayDetailData = data.data.results.length > 0 ? data.data.results[0] : [];
                        }
                        that.isLoading = false;
                    })
                    .catch(function (response) {
                        that.isLoading = false;
                        that.$message({
                            message: '未知异常',
                            type: 'error',
                            duration: 1500
                        });
                    });
            }
        },
        mounted: function () {
            this.getData();
        }
	}
</script>

<style lang="scss">
    .network-detail-tab-section {
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
                    line-height: 1.6em;
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
        .el-form-item__content {
            line-height: 22px;
        }
        .pd10 {
            padding: 10px;
        }
        .pd15 {
            padding: 15px;
        }
    }
</style>
