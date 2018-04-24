<template>
    <section class="page-home-default-section">
        <el-row>
            <el-col :span="6" class="pd10">
                <div class="item-box index-user-all">
                    <div class="pd15">
                        <span class="index-link-item">4</span>
                        <span class="fr">
                            <img src="../../assets/imgs/all-user-icon.png" />
                        </span>
                    </div>
                    <div class="pd15">
                        <span>All user</span>
                    </div>
                    <div class="pd15">
                        <span>用户总数</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" class="pd10">
                <div class="item-box index-host-all">
                    <div class="pd15">
                        <span class="index-link-item">2</span>
                        <span class="fr">
                            <img src="../../assets/imgs/all-host-icon.png" />
                        </span>
                    </div>
                    <div class="pd15">
                        <span>All hosts</span>
                    </div>
                    <div class="pd15">
                        <span>主机总数</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" class="pd10">
                <div class="item-box index-online-user-all">
                    <div class="pd15">
                        <span class="index-link-item">0</span>
                        <span class="fr">
                            <img src="../../assets/imgs/online-user-icon.png" />
                        </span>
                    </div>
                    <div class="pd15">
                        <span>Online users</span>
                    </div>
                    <div class="pd15">
                        <span>在线用户</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" class="pd10">
                <div class="item-box index-connected-host-all">
                    <div class="pd15">
                        <span class="index-link-item">0</span>
                        <span class="fr">
                            <img src="../../assets/imgs/connected-icon.png" />
                        </span>
                    </div>
                    <div class="pd15">
                        <span>Online sessions</span>
                    </div>
                    <div class="pd15">
                        <span>在线会话</span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" class="pd10">
                <div style="height: 330px;padding: 26px 22px;background-color: #fff;box-shadow: 0 1px 4px 0 rgba(222,235,250,1);border-radius: 3px;">
                    <div style="font-size:16px;color:rgba(78,78,78,1);">活跃用户TOP5</div>
                    <div style="margin: 5px 0;font-size: 13px;color: rgba(78,78,78,1);">过去一周共有1位用户登录2次服务器</div>
                    <ul class="activeUserList mt20">
                        <li>
                            <span style="display: inline-block;width: 16px;height: 16px;line-height: 16px;text-align: center;color: #fff;font-size:13px;background: rgba(172,181,195,1);border-radius: 3px;">1</span>
                            <span style="margin-left: 16px;font-size:13px;color:rgba(97,98,98,1);">MapReducd2</span>
                            <span class="fr" style="font-size:13px;color:rgba(97,98,98,1);">2次/周</span>
                        </li>
                        <li>
                            <span style="display: inline-block;width: 16px;height: 16px;line-height: 16px;text-align: center;color: #fff;font-size:13px;background: rgba(172,181,195,1);border-radius: 3px;">2</span>
                            <span style="margin-left: 16px;font-size:13px;color:rgba(97,98,98,1);">MapReducd2</span>
                            <span class="fr" style="font-size:13px;color:rgba(97,98,98,1);">2次/周</span>
                        </li>
                        <li>
                            <span style="display: inline-block;width: 16px;height: 16px;line-height: 16px;text-align: center;color: #fff;font-size:13px;background: rgba(172,181,195,1);border-radius: 3px;">3</span>
                            <span style="margin-left: 16px;font-size:13px;color:rgba(97,98,98,1);">MapReducd2</span>
                            <span class="fr" style="font-size:13px;color:rgba(97,98,98,1);">2次/周</span>
                        </li>
                        <li>
                            <span style="display: inline-block;width: 16px;height: 16px;line-height: 16px;text-align: center;color: #fff;font-size:13px;background: rgba(172,181,195,1);border-radius: 3px;">4</span>
                            <span style="margin-left: 16px;font-size:13px;color:rgba(97,98,98,1);">MapReducd2</span>
                            <span class="fr" style="font-size:13px;color:rgba(97,98,98,1);">2次/周</span>
                        </li>
                        <li>
                            <span style="display: inline-block;width: 16px;height: 16px;line-height: 16px;text-align: center;color: #fff;font-size:13px;background: rgba(172,181,195,1);border-radius: 3px;">5</span>
                            <span style="margin-left: 16px;font-size:13px;color:rgba(97,98,98,1);">MapReducd2</span>
                            <span class="fr" style="font-size:13px;color:rgba(97,98,98,1);">2次/周</span>
                        </li>
                        <li>
                            <span style="display: inline-block;width: 16px;height: 16px;line-height: 16px;text-align: center;color: #fff;font-size:13px;background: rgba(172,181,195,1);border-radius: 3px;">6</span>
                            <span style="margin-left: 16px;font-size:13px;color:rgba(97,98,98,1);">MapReducd2</span>
                            <span class="fr" style="font-size:13px;color:rgba(97,98,98,1);">2次/周</span>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="18" class="pd10">
                <div style="height: 330px;padding: 26px 22px;background-color: #fff;box-shadow: 0 1px 4px 0 rgba(222,235,250,1);border-radius: 3px;">
                    <div id="chartLine" ref="chartLine" style="width:100%; float: left;height: 100%;" class="mb20"></div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="16" class="pd10">
                <div style="height: 330px;padding: 26px 22px;background-color: #fff;box-shadow: 0 1px 4px 0 rgba(222,235,250,1);border-radius: 3px;">

                </div>
            </el-col>
            <el-col :span="8" class="pd10">
                <div style="height: 382px;background-color: #fff;box-shadow: 0 1px 4px 0 rgba(222,235,250,1);border-radius: 3px;">
                    <div style="height: 70px;padding: 17px 18px 0 30px;position: relative;color: #fff;background-color: #26B9C0;">
                        <div style="font-size: 20px;">登录记录</div>
                        <div style="font-size:13px;margin-top: 7px;">最近十次登录记录.</div>
                        <img src="../../assets/imgs/login-record-icon.png" style="position: absolute;right: 15px;bottom: 0;width: 94px;height: 70px;" />
                    </div>
                    <div style="height: 270px;padding: 10px 20px 20px 23px;">
                        <ul>
                            <li style="height: 70px;padding: 10px 0 5px;border-bottom: 1px solid #EEEEEE;">
                                <el-col :span="4">
                                    <img style="width: 38px;height: 38px;" src="../../assets/imgs/login-user-icon.png" />
                                </el-col>
                                <el-col :span="12">
                                    <div style="font-size:13px;color:rgba(78,78,78,1);">
                                        admin 登录了
                                    </div>
                                    <div style="font-size:13px;color:rgba(78,78,78,1);">
                                        10.221.121.2
                                    </div>
                                    <div style="font-size:13px;color:rgba(78,78,78,1);">
                                        April 8, 2018, 11:35 a.m
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <span style="font-size:13px;color:rgba(78,78,78,1);" class="fr"> 3 hours ago </span>
                                </el-col>
                            </li>
                            <li style="height: 70px;padding: 10px 0 5px;border-bottom: 1px solid #EEEEEE;">
                                <el-col :span="4">
                                    <img style="width: 38px;height: 38px;" src="../../assets/imgs/login-user-icon.png" />
                                </el-col>
                                <el-col :span="12">
                                    <div style="font-size:13px;color:rgba(78,78,78,1);">
                                        admin 登录了
                                    </div>
                                    <div style="font-size:13px;color:rgba(78,78,78,1);">
                                        10.221.121.2
                                    </div>
                                    <div style="font-size:13px;color:rgba(78,78,78,1);">
                                        April 8, 2018, 11:35 a.m
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <span style="font-size:13px;color:rgba(78,78,78,1);" class="fr"> 3 hours ago </span>
                                </el-col>
                            </li>
                            <li style="height: 70px;padding: 10px 0 5px;border-bottom: 1px solid #EEEEEE;">
                                <el-col :span="4">
                                    <img style="width: 38px;height: 38px;" src="../../assets/imgs/login-user-icon.png" />
                                </el-col>
                                <el-col :span="12">
                                    <div style="font-size:13px;color:rgba(78,78,78,1);">
                                        admin 登录了
                                    </div>
                                    <div style="font-size:13px;color:rgba(78,78,78,1);">
                                        10.221.121.2
                                    </div>
                                    <div style="font-size:13px;color:rgba(78,78,78,1);">
                                        April 8, 2018, 11:35 a.m
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <span style="font-size:13px;color:rgba(78,78,78,1);" class="fr"> 3 hours ago </span>
                                </el-col>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8" class="pd10">
                <div style="height: 330px;background-color: #fff;box-shadow: 0 1px 4px 0 rgba(222,235,250,1);border-radius: 3px;">
                    <div style="height: 70px;padding: 17px 18px 0 30px;position: relative;color: #fff;background-color: #5EA7ED;">
                        <div style="font-size: 20px;">一周Top10资产</div>
                        <div style="font-size:13px;margin-top: 7px;">登录次数及最近一次登录记录</div>
                        <img src="../../assets/imgs/top10-assets-icon.png" style="position: absolute;right: 15px;bottom: 0;width: 94px;height: 70px;" />
                    </div>
                    <el-row style="padding: 20px 46px 0 22px;">
                        <el-col :span="8">
                            <div style="padding-right: 15px;font-size:14px;">
                                <div style="text-align: right;color:rgba(78,78,78,1);">10.221.121.2</div>
                                <div style="text-align: right;color:rgba(59,163,248,1);">2次</div>
                            </div>
                        </el-col>
                        <el-col :span="14">
                            <div style="padding: 10px 0 10px 20px;line-height: 2.6em;font-size:13px;color:rgba(78,78,78,1);border-left: 2px solid #3BA3F8;background:rgba(210,234,254,1);border-radius: 3px;">
                                <div>最近一次登录用户</div>
                                <div>admin</div>
                                <div>于2018-04-08 11:35:50</div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8" class="pd10">
                <div style="height: 330px;background-color: #fff;box-shadow: 0 1px 4px 0 rgba(222,235,250,1);border-radius: 3px;">
                    <div style="height: 70px;padding: 17px 18px 0 30px;position: relative;color: #fff;background-color: #5EA7ED;">
                        <div style="font-size: 20px;">一周Top10用户</div>
                        <div style="font-size:13px;margin-top: 7px;">登录次数及最近一次登录记录</div>
                        <img src="../../assets/imgs/top10-assets-icon.png" style="position: absolute;right: 15px;bottom: 0;width: 94px;height: 70px;" />
                    </div>
                    <el-row style="padding: 20px 46px 0 22px;">
                        <el-col :span="8">
                            <div style="padding-right: 15px;font-size:14px;">
                                <div style="text-align: right;color:rgba(78,78,78,1);">10.221.121.2</div>
                                <div style="text-align: right;color:rgba(59,163,248,1);">2次</div>
                            </div>
                        </el-col>
                        <el-col :span="14">
                            <div style="padding: 10px 0 10px 20px;line-height: 2.6em;font-size:13px;color:rgba(78,78,78,1);border-left: 2px solid #3BA3F8;background:rgba(210,234,254,1);border-radius: 3px;">
                                <div>最近一次登录主机</div>
                                <div>admin</div>
                                <div>于2018-04-08 11:35:50</div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts';
	export default {
		name: "page-home-default",
		components: {},
		data() {
			return {
                chartLineData: null
            }
		},
		methods: {
		    getData: async function () {
		        var that = this;
		        let params = {

                };
                that.$axios.get('http://10.221.12.110:8000/api/users/', { params: params})
                    .then(function (response) {
                        let data = response.data;
                        if (data.code === '200') {

                        }
                    })
                    .catch(function (response) {
                        that.isLoading = false;
                        that.$message({
                            message: '未知异常',
                            type: 'error',
                            duration: 1500
                        });
                    });
            },
            drawLineChart() {
                this.chartLineData = echarts.init(this.$refs.chartLine);
                this.chartLineData.setOption({
                    title: {
                        text: '月数据总览',
                        subtext: '一个月内历史总汇',
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['登录次数', '活跃用户', '活跃资产'],
                        selectedMode: true,  //图例选择的模式(是否可以点击)
                        top: 0,
                        x: 'right'
                    },
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '3%',
                        containLabel: true //grid 区域是否包含坐标轴的刻度标签
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                        axisLine: {
                            show: false,
                            symbol: 'none',
                            lineStyle: {
                                color: '#232425',
                                width: 4,
                                type: 'solid'
                            }
                        },
                        axisTick: {
                            show: false,
                            inside: true,
                            lineStyle: {
                                width: 4,
                                color: '#232425'
                            }
                        },
                        axisLabel: {
                            show: true,
                            color: '#232425',
                            inside: false,
                            rotate: 0
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#999',
                                fontSize: 12,
                                fontWeight: 'bold'
                            }
                        }
                    },
                    series: [
                        {
                            name: '登录次数',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210],
                            //单个拐点标志的样式设置
                            itemStyle: {
                                color: '#4ED8DA'   //图形的颜色
                            }
                        },
                        {
                            name: '活跃用户',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310],
                            itemStyle: {
                                color: '#F2784B'
                            }
                        },
                        {
                            name: '活跃资产',
                            type: 'line',
                            stack: '总量',
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            itemStyle: {
                                color: '#B44AC4'
                            }
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawLineChart();
            }
        },
        mounted: function () {
            this.drawCharts();
            this.getData();
        },
        updated: function () {
            this.drawCharts();
        }
	}
</script>

<style lang="scss" scoped>
    .page-home-default-section {
        padding: 25px 0;
        .item-box {
            height: 160px;
            color: #fff;
            box-shadow: 0 2px 4px 0 rgba(222,235,250,1);
            border-radius: 3px;
            .index-link-item {
                font-size: 16px;
                font-weight: bold;
            }
        }
        .index-user-all {
            background-color: #26B9C0;
            img {
                width: 19px;
                height: 13px;
            }
        }
        .index-host-all {
            background-color: #5EA7ED;
            img {
                width: 19px;
                height: 12px;
            }
        }
        .index-online-user-all{
            background-color: #E8BE71;
            img {
                width: 19px;
                height: 17px;
            }
        }
        .index-connected-host-all {
            background-color: #36C9A9;
            img {
                width: 19px;
                height: 19px;
            }
        }
        .activeUserList {
            li {
                line-height: 2.4em;
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
