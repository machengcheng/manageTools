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
                        <span class="index-link-item">6</span>
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
                        <span class="index-link-item">12</span>
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
                        <span class="index-link-item">15</span>
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
                    <div style="font-size:16px;color:rgba(78,78,78,1);">活跃用户资产占比</div>
                    <div style="margin: 5px 0;font-size: 13px;color: rgba(78,78,78,1);">以下图形分别描述一个月活跃用户和资产占所有用户主机的百分比</div>
                    <el-col :span="12" class="ac">
                        <div id="chartPieUser" ref="chartPieUser" style="width:250px; float: left;height: 250px;" class="mt20 mb20"></div>
                    </el-col>
                    <el-col :span="12" class="ac">
                        <div id="chartPieHost" ref="chartPieHost" style="width:250px; float: left;height: 250px;" class="mt20 mb20"></div>
                    </el-col>
                </div>
            </el-col>
            <el-col :span="8" class="pd10">
                <div class="login-record">
                    <div class="login-record-title">
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
                <div class="top10-assets">
                    <div class="top10-assets-title">
                        <div>一周Top10资产</div>
                        <div>登录次数及最近一次登录记录</div>
                        <img src="../../assets/imgs/top10-assets-icon.png" />
                    </div>
                    <el-row class="top10-assets-item">
                        <el-col :span="8">
                            <div class="top10-assets-item-left">
                                <div>10.221.121.2</div>
                                <div>2次</div>
                            </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="top10-assets-item-right">
                                <div>最近一次登录用户</div>
                                <div>admin</div>
                                <div>于2018-04-08 11:35:50</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="top10-assets-item">
                        <el-col :span="8">
                            <div class="top10-assets-item-left">
                                <div>10.221.121.2</div>
                                <div>2次</div>
                            </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="top10-assets-item-right">
                                <div>最近一次登录用户</div>
                                <div>admin</div>
                                <div>于2018-04-08 11:35:50</div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8" class="pd10">
                <div class="top10-user">
                    <div class="top10-user-title">
                        <div>一周Top10用户</div>
                        <div>登录次数及最近一次登录记录</div>
                        <img src="../../assets/imgs/top10-user-icon.png" />
                    </div>
                    <el-row class="top10-user-item">
                        <el-col :span="8">
                            <div class="top10-user-item-left">
                                <div>10.221.121.2</div>
                                <div>2次</div>
                            </div>
                        </el-col>
                        <el-col :span="14">
                            <div class="top10-user-item-right">
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
                chartLineData: null,
                chartPieUser: null,
                chartPieHost: null
            }
		},
		methods: {
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
                        icon: 'circle',  //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                        itemWidth: 12,
                        itemHeight: 12,
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
                                color: '#6FBED8'   //图形的颜色
                            },
                            lineStyle: {
                                width: 3
                            }
                        },
                        {
                            name: '活跃用户',
                            type: 'line',
                            stack: '总量',
                            symbol: 'circle',
                            data: [220, 182, 191, 234, 290, 330, 310],
                            itemStyle: {
                                color: '#F184AE'
                            },
                            lineStyle: {
                                width: 3
                            }
                        },
                        {
                            name: '活跃资产',
                            type: 'line',
                            stack: '总量',
                            symbol: 'circle',
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            itemStyle: {
                                color: '#F59A78'
                            },
                            lineStyle: {
                                width: 3
                            }
                        }
                    ]
                });
            },
            drawPieUser() {
                this.chartPieUser = echarts.init(this.$refs.chartPieUser);
                this.chartPieUser.setOption({
                    title: {
                        text: '用户',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)"
                    },
                    legend: {
                        data: ['月未登录用户', '月活跃用户', '禁用用户'],
                        selectedMode: false,  //图例选择的模式(是否可以点击)
                        bottom: 0,
                        x: 'center',
                        icon: 'circle',
                        itemWidth: 10,
                        itemHeight: 10,
                        itemGap: 1,
                        borderRadius: [4, 4, 0, 0],
                        textStyle: {
                            fontSize: 10
                        }
                    },
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '3%',
                        containLabel: true //grid 区域是否包含坐标轴的刻度标签
                    },
                    series: [
                        {
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            hoverOffset: 2,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 14,
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {
                                    name: '月未登录用户',
                                    value: 235,
                                    //单个拐点标志的样式设置
                                    itemStyle: {
                                        fontSize: 12,
                                        color: '#CACBCB'   //图形的颜色
                                    }
                                },
                                {
                                    name: '月活跃用户',
                                    value: 80,
                                    //单个拐点标志的样式设置
                                    itemStyle: {
                                        color: '#EF7C99'   //图形的颜色
                                    }
                                },
                                {
                                    name: '禁用用户',
                                    value: 26,
                                    //单个拐点标志的样式设置
                                    itemStyle: {
                                        color: '#F1AE6C'   //图形的颜色
                                    }
                                }
                            ]
                        }
                    ]
                });
            },
            drawPieHost() {
                this.chartPieHost = echarts.init(this.$refs.chartPieHost);
                this.chartPieHost.setOption({
                    title: {
                        text: '主机',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)"
                    },
                    legend: {
                        data: ['月未登录主机', '月被登录主机', '禁用主机'],
                        selectedMode: false,  //图例选择的模式(是否可以点击)
                        bottom: 0,
                        x: 'center',
                        icon: 'circle',
                        itemWidth: 10,
                        itemHeight: 10,
                        itemGap: 1,
                        borderRadius: [4, 4, 0, 0],
                        textStyle: {
                            fontSize: 10
                        }
                    },
                    grid: {
                        left: '1%',
                        right: '2%',
                        bottom: '3%',
                        containLabel: true //grid 区域是否包含坐标轴的刻度标签
                    },
                    series: [
                        {
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            hoverOffset: 2,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 14,
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {
                                    name: '月未登录主机',
                                    value: 135,
                                    //单个拐点标志的样式设置
                                    itemStyle: {
                                        fontSize: 12,
                                        color: '#DFE0E0'   //图形的颜色
                                    }
                                },
                                {
                                    name: '月被登录主机',
                                    value: 80,
                                    //单个拐点标志的样式设置
                                    itemStyle: {
                                        color: '#67CBE5'   //图形的颜色
                                    }
                                },
                                {
                                    name: '禁用主机',
                                    value: 180,
                                    //单个拐点标志的样式设置
                                    itemStyle: {
                                        color: '#7AACDB'   //图形的颜色
                                    }
                                }
                            ]
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawLineChart();
                this.drawPieUser();
                this.drawPieHost();
            }
        },
        mounted: function () {
		    let that = this;
            this.drawCharts();
            window.onresize = function temp() {
                that.chartLineData.resize();
                that.chartPieUser.resize();
                that.chartPieHost.resize();
            };
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
            /*background-color: #26B9C0;*/
            background: linear-gradient(-114.5deg, rgba(245,128,177,1), rgba(231,73,102,1));
            -webkit-box-shadow: 0 2px 4px 0 rgba(222,235,250,1);
            -moz-box-shadow: 0 2px 4px 0 rgba(222,235,250,1);
            -o-box-shadow: 0 2px 4px 0 rgba(222,235,250,1);
            box-shadow: 0 2px 4px 0 rgba(222,235,250,1);
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            img {
                width: 19px;
                height: 13px;
            }
        }
        .index-host-all {
            /*background-color: #5EA7ED;*/
            background:linear-gradient(-133.6deg, rgba(111,193,216,1), rgba(111,163,216,1));
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            opacity: 0.9;
            filter: alpha(opacity=90);
            img {
                width: 19px;
                height: 12px;
            }
        }
        .index-online-user-all{
            /*background-color: #E8BE71;*/
            background: linear-gradient(134.3deg, rgba(244,118,36,1), rgba(255,195,65,1));
            -webkit-box-shadow: 0 1px 4px 0 rgba(222,235,250,1);
            -moz-box-shadow: 0 1px 4px 0 rgba(222,235,250,1);
            -o-box-shadow: 0 1px 4px 0 rgba(222,235,250,1);
            box-shadow: 0 1px 4px 0 rgba(222,235,250,1);
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            opacity: 0.7;
            filter: alpha(opacity=70);
            img {
                width: 19px;
                height: 17px;
            }
        }
        .index-connected-host-all {
            /*background-color: #36C9A9;*/
            background: linear-gradient(-131.9deg, rgba(239,118,199,1), rgba(218,65,125,1));
            -webkit-box-shadow: 0 1px 4px 0 rgba(222,235,250,1);
            -moz-box-shadow: 0 1px 4px 0 rgba(222,235,250,1);
            -o-box-shadow: 0 1px 4px 0 rgba(222,235,250,1);
            box-shadow: 0 1px 4px 0 rgba(222,235,250,1);
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            opacity: 0.8;
            filter: alpha(opacity=80);
            img {
                width: 19px;
                height: 19px;
            }
        }
        .login-record {
            height: 382px;
            background-color: #fff;
            box-shadow: 0 1px 4px 0 rgba(222,235,250,1);
            border-radius: 3px;
            .login-record-title {
                height: 70px;
                padding: 17px 18px 0 30px;
                position: relative;
                color: #fff;
                /*background-color: #26B9C0;*/
                background: linear-gradient(-133.3deg, rgba(239,124,124,1), rgba(239,124,153,1));
                -webkit-border-radius: 3px 3px 0 0;
                -moz-border-radius: 3px 3px 0 0;
                border-radius: 3px 3px 0 0;
                border: 1px solid rgba(243, 244, 246, 1);
            }
        }
        .top10-assets {
            min-height: 340px;
            padding-bottom: 20px;
            background-color: #fff;
            box-shadow: 0 1px 4px 0 rgba(222,235,250,1);
            border-radius: 3px;
            .top10-assets-title {
                height: 70px;
                padding: 17px 18px 0 30px;
                position: relative;
                color: #fff;
                /*background-color: #5EA7ED;*/
                background:linear-gradient(-133.3deg, rgba(247,167,140,1), rgba(247,144,140,1));
                -webkit-border-radius: 3px 3px 0 0;
                -moz-border-radius: 3px 3px 0 0;
                border-radius: 3px 3px 0 0;
                border: 1px solid rgba(243, 244, 246, 1);
                div:first-of-type {
                    font-size: 20px;
                }
                div:last-of-type {
                    font-size:13px;
                    margin-top: 7px;
                }
                img {
                    position: absolute;
                    right: 15px;
                    bottom: 0;
                    width: 94px;
                    height: 70px;
                }
            }
            .top10-assets-item {
                padding: 20px 46px 0 22px;
                .top10-assets-item-left {
                    padding-right: 15px;
                    font-size:14px;
                    div {
                        text-align: right;
                    }
                    div:first-of-type {
                        color:rgba(78,78,78,1);
                    }
                    div:last-of-type {
                        color:rgba(233,99,115,1);
                    }
                }
                .top10-assets-item-right {
                    padding: 10px 0 10px 20px;
                    line-height: 2.0em;
                    font-size:13px;
                    color: rgba(78,78,78,1);
                    border-left: 2px solid #FAC7C1;
                    background: #FCEBE9;
                    border-radius: 3px;
                    div:first-of-type {
                        font-size: 14px;
                    }
                    div:last-of-type {
                        font-size:13px;
                        margin-top: 7px;
                    }
                    img {
                        position: absolute;
                        right: 15px;
                        bottom: 0;
                        width: 94px;
                        height: 70px;
                    }
                }
            }
        }
        .top10-user {
            min-height: 340px;
            padding-bottom: 20px;
            background-color: #fff;
            box-shadow: 0 1px 4px 0 rgba(222,235,250,1);
            border-radius: 3px;
            .top10-user-title {
                height: 70px;
                padding: 17px 18px 0 30px;
                position: relative;
                color: #fff;
                /*background-color: #5EA7ED;*/
                background: linear-gradient(-133.3deg,rgba(247,167,140,1),rgba(247,144,140,1));
                -webkit-border-radius: 3px 3px 0 0;
                -moz-border-radius: 3px 3px 0 0;
                border-radius: 3px 3px 0 0;
                border: 1px solid rgba(243, 244, 246, 1);
                div:first-of-type {
                    font-size: 20px;
                }
                div:last-of-type {
                    font-size:13px;
                    margin-top: 7px;
                }
                img {
                    position: absolute;
                    right: 15px;
                    bottom: 0;
                    width: 95px;
                    height: 70px;
                }
            }
            .top10-user-item {
                padding: 20px 46px 0 22px;
                .top10-user-item-left {
                    padding-right: 15px;
                    font-size:14px;
                    div {
                        text-align: right;
                    }
                    div:first-of-type {
                        color:rgba(78,78,78,1);
                    }
                    div:last-of-type {
                        color:rgba(233,99,115,1);
                    }
                }
                .top10-user-item-right {
                    padding: 10px 0 10px 20px;
                    line-height: 2.0em;
                    font-size:13px;
                    color: rgba(78,78,78,1);
                    border-left: 2px solid #FAC7C1;
                    background: #FCEBE9;
                    border-radius: 3px;
                    div:first-of-type {
                        font-size: 14px;
                    }
                    div:last-of-type {
                        font-size:13px;
                        margin-top: 7px;
                    }
                    img {
                        position: absolute;
                        right: 15px;
                        bottom: 0;
                        width: 94px;
                        height: 70px;
                    }
                }
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
