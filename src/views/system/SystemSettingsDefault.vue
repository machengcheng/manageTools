<template>
    <section class="system-settings-default-section">
        <div class="result-list">
            <el-tabs v-model="tabType" type="border-card" :tab-position="tabPosition" @tab-click="tabClick">
                <el-tab-pane label="基本设置" :key="1" name="basic-settings">
                    <basic-settings-tab :basicSettingsVisible="basicSettingsVisible"></basic-settings-tab>
                </el-tab-pane>
                <el-tab-pane label="邮件设置" :key="2" name="mail-settings">
                    <mail-settings-tab :mailSettingsVisible="mailSettingsVisible"></mail-settings-tab>
                </el-tab-pane>
                <el-tab-pane label="LDAP设置" :key="3" name="ldap-settings">
                    <ldap-settings-tab :ldapSettingsVisible="ldapSettingsVisible"></ldap-settings-tab>
                </el-tab-pane>
                <el-tab-pane label="终端设置" :key="4" name="terminal-settings">
                    <terminal-settings-tab :terminalSettingsVisible="terminalSettingsVisible"></terminal-settings-tab>
                </el-tab-pane>
            </el-tabs>
        </div>
    </section>
</template>

<script>
    import BasicSettingsTab from './BasicSettingsTab';
    import MailSettingsTab from './MailSettingsTab';
    import LdapSettingsTab from './LdapSettingsTab';
    import TerminalSettingsTab from './TerminalSettingsTab';
	export default {
		name: "system-settings-default",
		components: {
            BasicSettingsTab,
            MailSettingsTab,
            LdapSettingsTab,
            TerminalSettingsTab
        },
		data() {
			return {
                tabType: 'basic-settings',
                tabPosition: 'top',
                basicSettingsVisible: '',
                mailSettingsVisible: '',
                ldapSettingsVisible: '',
                terminalSettingsVisible: ''
            }
		},
		methods: {
            tabClick: function (tab) {
                switch(tab.name) {
                    case 'basic-settings':
                        let tempDate1 = new Date();
                        this.basicSettingsVisible = tempDate1.toTimeString();
                        break;
                    case 'mail-settings':
                        let tempDate2 = new Date();
                        this.mailSettingsVisible = tempDate2.toTimeString();
                        break;
                    case 'ldap-settings':
                        let tempDate3 = new Date();
                        this.ldapSettingsVisible = tempDate3.toTimeString();
                        break;
                    case 'terminal-settings':
                        let tempDate4 = new Date();
                        this.terminalSettingsVisible = tempDate4.toTimeString();
                        break;
                    default:
                        break;
                }
            }
        }
	}
</script>

<style lang="scss">
    .system-settings-default-section {
        padding: 18px 15px;
        margin: 15px 0;
        background-color: #FCF9FB;
        .result-list {
            padding: 0;
            margin: 0 auto;
            .result-item {
                width: 220px;
                height: 260px;
                margin: 10px auto 40px auto!important;
                color: #fff;
                font-size: 16px;
                background: #EFEFEF!important;
                -webkit-border-radius: 0;
                -moz-border-radius: 0;
                border-radius: 0;
                position: relative;
                overflow: hidden;
                img {
                    width: 100%;
                    vertical-align: baseline;
                }
            }
            .thumbnail-block {

            }
            .el-tabs--border-card {
                -webkit-box-shadow: none;
                -webkit-box-shadow: none;
                -moz-box-shadow: none;
                box-shadow: none;
                border-bottom: 0;
                border-right: 0;
                border-left: 0;
            }
            .el-tabs__nav {
                float: left;
            }
            .el-tabs--border-card > .el-tabs__header {
                border-right: 1px solid #e4e7ed;
                border-left: 1px solid #e4e7ed;
            }
            .el-tabs--border-card>.el-tabs__content {
                padding: 0!important;
            }
        }
    }
</style>
