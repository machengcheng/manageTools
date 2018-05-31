<template>
    <section class="command-record-default-section">
        <div class="box-title">命令记录列表</div>
        <div class="box-operate">
            <el-button  type="primary" size="small" @click="search" class="fr">查询</el-button>
            <el-input v-model="searchKey" size="small" clearable class="searchKey wat fr mr10" placeholder="请输入查询内容"></el-input>
            <el-select
                v-model="systemUser"
                filterable
                size="small"
                class="fr mr10"
                placeholder="系统用户"
            >
                <el-option
                    v-for="item in systemUserList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select
                v-model="assets"
                filterable
                size="small"
                class="fr mr10"
                placeholder="资产"
            >
                <el-option
                    v-for="item in assetsList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select
                v-model="user"
                filterable
                size="small"
                class="fr mr10"
                placeholder="用户"
            >
                <el-option
                    v-for="item in userList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-date-picker
                v-model="endDate"
                type="date"
                size="small"
                class="fr mr10"
                placeholder="结束日期">
            </el-date-picker>
            <span class="fr" style="display: inline-block;margin: 0 5px;width: 20px;height: 32px;line-height: 32px;text-align: center;color: #C0C4CE;font-size: 13px;">至</span>
            <el-date-picker
                v-model="startDate"
                type="date"
                size="small"
                class="fr"
                placeholder="开始日期">
            </el-date-picker>
        </div>
        <div class="box-content">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                v-loading="isLoading"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >
                <el-table-column
                    type="index"
                    prop="id"
                    label="ID"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="input"
                    label="命令"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="user"
                    label="用户"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="asset"
                    label="资产"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="system_user"
                    label="系统用户"
                    show-overflow-tooltip
                >
                </el-table-column>

                <el-table-column
                    label="会话"
                    width="80"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small">转到</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="timestamp"
                    label="日期"
                    show-overflow-tooltip
                    :formatter="formatCellDate"
                >
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination layout="sizes, total, prev, pager, next" background :current-page="page" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="pageSizes" :page-size="pageSize" :total="total" style="margin: 15px 0;float:right;">
                </el-pagination>
            </el-col>
            <div class="clear"></div>
        </div>
    </section>
</template>

<script>
	export default {
		name: "command-record-default",
		components: {

        },
		data() {
			return {
                searchKey: '',
                startDate: this.formatDate(new Date()),
                endDate: this.AddDayCount(7),
                user: '',
                assets: '',
                systemUser: '',
                userList: [],
                assetsList: [],
                systemUserList: [],
                conditions: [],
                tableData: [],
                isLoading: false,
                total: 0,
                pageSizes: [10, 20, 30, 50, 100],
                pageSize: 10,
                page: 1
            }
		},
		methods: {
		    //当前日期往后n天
            AddDayCount: function(AddDayCount) {
                let  dd = new Date();
                dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
                let y = dd.getFullYear();
                let m = dd.getMonth()+1;//获取当前月份的日期
                let d = dd.getDate();
                return y + '-' + m + '-' + d;
            },
            format: function(fmt, date) {
                var o = {
                    "M+": date.getMonth() + 1, //月份
                    "d+": date.getDate(), //日
                    "h+": date.getHours(), //小时
                    "m+": date.getMinutes(), //分
                    "s+": date.getSeconds(), //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            },
            formatDate: function (cellValue) {
                // return this.format('yyyy-MM-dd hh:mm:ss', new Date(cellValue));
                return this.format('yyyy-MM-dd', new Date(cellValue));
            },
            //格式化日期
            formatCellDate: function (row, column, cellValue) {
                let now = new Date(cellValue * 1000);
                let year = now.getFullYear();
                let month = now.getMonth() + 1;
                let date = now.getDate();
                let hour = now.getHours();
                let minute = now.getMinutes();
                let second = now.getSeconds();
                return year + "-" + month + "-" + date  +"  " + hour + ":" + minute + ":" + second;
            },
            handleSelectionChange: function () {

            },
            handleCurrentChange: function (val) {
                this.page = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.search();
            },
            search: function () {
                this.page = 1;
                this.getData();
            },
            getConditions: async function() {
                let that = this;
                that.$axios.get('http://127.0.0.1:8000/terminal/command/disctinct/', {})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            that.conditions = data.data ? data.data : [];
                            if (that.conditions.user && that.conditions.user.length >0) {
                                that.conditions.user.forEach(function (item) {
                                    that.userList.push({
                                        value: item,
                                        label: item
                                    });
                                })
                            }
                            if (that.conditions.asset && that.conditions.asset.length >0) {
                                that.conditions.asset.forEach(function (item) {
                                    that.assetsList.push({
                                        value: item,
                                        label: item
                                    });
                                })
                            }
                            if (that.conditions.system_user && that.conditions.system_user.length >0) {
                                that.conditions.system_user.forEach(function (item) {
                                    that.systemUserList.push({
                                        value: item,
                                        label: item
                                    });
                                })
                            }
                        }
                    })
                    .catch(function (response) {
                        that.$message({
                            message: '未知异常',
                            type: 'error',
                            duration: 1500
                        });
                    });
            },
            getData: async function() {
                let that = this;
                let params = {
                    date_from: that.formatDate(that.startDate),
                    date_to: that.formatDate(that.endDate),
                    user: that.user,
                    asset: that.assets,
                    system_user: that.systemUser,
                    command: that.searchKey,
                    limit: that.pageSize,
                    offset: that.pageSize * (that.page-1)
                };
                this.isLoading = true;
                that.$axios.get('http://127.0.0.1:8000/api/terminal/command/', { params: params})
                    .then(function (response) {
                        let data = response;
                        if (data.status === 200) {
                            that.total = data.data.count ? data.data.count : 0;
                            that.tableData = data.data.results.length > 0 ? data.data.results : [];
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
            let that = this;
            that.getConditions();
            that.search();
        }
	}
</script>

<style lang="scss">
    .command-record-default-section {
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
        .el-input, .el-input .el-input__inner {
            width: 100%!important;
            max-width: 150px;
        }
    }
</style>
