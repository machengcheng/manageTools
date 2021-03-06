export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        name: '首页',
        component: resolve => require (['views/home/PageHome.vue'], resolve),
        meta: {
          title: '首页'
        },
        redirect: '/pageHomeDefault',
        hidden: true,
        children: [
            {
                path: 'pageHomeDefault',
                name: '仪表盘',
                component: resolve => require(['views/home/PageHomeDefault.vue'], resolve),
                meta: {
                    title: '仪表盘'
                }
            },
            {
                path: 'userList',
                name: '用户管理',
                component: resolve => require(['views/user/UserList.vue'], resolve),
                meta: {
                    title: '用户管理'
                },
                redirect: '/userListDefault',
                hidden: true,
                children: [
                    {
                        path: '/userListDefault',
                        name: '用户列表',
                        component: resolve => require(['views/user/UserListDefault.vue'], resolve),
                        meta: {
                            title: '用户列表'
                        }
                    },
                    {
                        path: 'userDetail',
                        name: '用户详情',
                        component: resolve => require(['views/user/UserDetail.vue'], resolve),
                        meta: {
                            title: '用户详情'
                        }
                    },
                    {
                        path: 'addOrUpdateUser',
                        name: '创建或更新用户',
                        component: resolve => require(['views/user/AddOrUpdateUser.vue'], resolve),
                        meta: {
                            title: '创建或更新用户'
                        }
                    },
                    {
                        path: 'updateUserForBatch',
                        name: '批量更新用户',
                        component: resolve => require(['views/user/UpdateUserForBatch.vue'], resolve),
                        meta: {
                            title: '批量更新用户'
                        }
                    }
                ]
            },
            {
                path: 'userGroup',
                name: '用户组管理',
                component: resolve => require(['views/user/userGroup.vue'], resolve),
                meta: {
                    title: '用户组管理'
                },
                redirect: '/userGroupDefault',
                hidden: true,
                children: [
                    {
                        path: '/userGroupDefault',
                        name: '用户组列表',
                        component: resolve => require(['views/user/UserGroupDefault.vue'], resolve),
                        meta: {
                            title: '用户组列表'
                        }
                    },
                    {
                        path: 'userGroupDetail',
                        name: '用户组详情',
                        component: resolve => require(['views/user/UserGroupDetail.vue'], resolve),
                        meta: {
                            title: '用户组详情'
                        }
                    }
                ]
            },
            {
                path: 'loginLog',
                name: '登录日志',
                component: resolve => require(['views/user/LoginLog.vue'], resolve),
                meta: {
                    title: '登录日志'
                }
            },
            {
                path: 'assetsList',
                name: '资产管理',
                component: resolve => require(['views/assets/AssetsList.vue'], resolve),
                meta: {
                    title: '资产管理'
                },
                redirect: '/assetsListDefault',
                hidden: true,
                children: [
                    {
                        path: '/assetsListDefault',
                        name: '资产列表',
                        component: resolve => require(['views/assets/AssetsListDefault.vue'], resolve),
                        meta: {
                            title: '资产列表'
                        }
                    },
                    {
                        path: 'addOrUpdateAssets',
                        name: '创建或更新资产',
                        component: resolve => require(['views/assets/AddOrUpdateAssets.vue'], resolve),
                        meta: {
                            title: '创建或更新资产'
                        }
                    },
                    {
                        path: 'assetsDetail',
                        name: '资产详情',
                        component: resolve => require(['views/assets/AssetsDetail.vue'], resolve),
                        meta: {
                            title: '资产详情'
                        }
                    },
                    {
                        path: 'updateAssetsForBatch',
                        name: '批量更新资产',
                        component: resolve => require(['views/assets/UpdateAssetsForBatch.vue'], resolve),
                        meta: {
                            title: '批量更新资产'
                        }
                    }
                ]
            },
            {
                path: 'networkList',
                name: '网域管理',
                component: resolve => require(['views/assets/NetworkList.vue'], resolve),
                meta: {
                    title: '网域管理'
                },
                redirect: '/networkListDefault',
                hidden: true,
                children: [
                    {
                        path: '/networkListDefault',
                        name: '网域列表',
                        component: resolve => require(['views/assets/NetworkListDefault.vue'], resolve),
                        meta: {
                            title: '网域列表'
                        }
                    },
                    {
                        path: 'networkDetail',
                        name: '网域详情',
                        component: resolve => require(['views/assets/NetworkDetail.vue'], resolve),
                        meta: {
                            title: '网域详情'
                        }
                    },
                    {
                        path: 'addOrUpdateGateway',
                        name: '创建或更新网关',
                        component: resolve => require(['views/assets/AddOrUpdateGateway.vue'], resolve),
                        meta: {
                            title: '创建或更新网关'
                        }
                    }
                ]
            },
            {
                path: 'manageUserList',
                name: '管理用户',
                component: resolve => require(['views/assets/ManageUserList.vue'], resolve),
                meta: {
                    title: '管理用户'
                },
                redirect: '/manageUserListDefault',
                hidden: true,
                children: [
                    {
                        path: '/manageUserListDefault',
                        name: '管理用户列表',
                        component: resolve => require(['views/assets/ManageUserListDefault.vue'], resolve),
                        meta: {
                            title: '管理用户列表'
                        }
                    },
                    {
                        path: 'manageUserDetail',
                        name: '管理用户详情',
                        component: resolve => require(['views/assets/ManageUserDetail.vue'], resolve),
                        meta: {
                            title: '管理用户详情'
                        }
                    },
                    {
                        path: 'addOrUpdateManageUser',
                        name: '创建或更新管理用户',
                        component: resolve => require(['views/assets/AddOrUpdateManageUser.vue'], resolve),
                        meta: {
                            title: '创建或更新管理用户'
                        }
                    }
                ]
            },
            {
                path: 'systemUserList',
                name: '系统用户',
                component: resolve => require(['views/assets/SystemUserList.vue'], resolve),
                meta: {
                    title: '系统用户'
                },
                redirect: '/systemUserListDefault',
                hidden: true,
                children: [
                    {
                        path: '/systemUserListDefault',
                        name: '系统用户列表',
                        component: resolve => require(['views/assets/SystemUserListDefault.vue'], resolve),
                        meta: {
                            title: '系统用户列表'
                        }
                    },
                    {
                        path: 'addOrUpdateSystemUser',
                        name: '创建或更新系统用户',
                        component: resolve => require(['views/assets/AddOrUpdateSystemUser.vue'], resolve),
                        meta: {
                            title: '创建或更新系统用户'
                        }
                    },
                    {
                        path: 'systemUserDetail',
                        name: '系统用户详情',
                        component: resolve => require(['views/assets/SystemUserDetail.vue'], resolve),
                        meta: {
                            title: '系统用户详情'
                        }
                    }
                ]
            },
            {
                path: 'labelManage',
                name: '标签管理',
                component: resolve => require(['views/assets/LabelManage.vue'], resolve),
                meta: {
                    title: '标签管理'
                },
                redirect: '/labelManageDefault',
                hidden: true,
                children: [
                    {
                        path: '/labelManageDefault',
                        name: '标签列表',
                        component: resolve => require(['views/assets/LabelManageDefault.vue'], resolve),
                        meta: {
                            title: '标签列表'
                        }
                    }
                ]
            },
            {
                path: 'assetsAuthList',
                name: '权限管理',
                component: resolve => require(['views/auth/AssetsAuthList.vue'], resolve),
                meta: {
                    title: '权限管理'
                },
                redirect: '/assetsAuthListDefault',
                hidden: true,
                children: [
                    {
                        path: '/assetsAuthListDefault',
                        name: '资产授权列表',
                        component: resolve => require(['views/auth/AssetsAuthListDefault.vue'], resolve),
                        meta: {
                            title: '资产授权列表',
                            requireAuth: true
                        }
                    },
                    {
                        path: 'addOrUpdateAuthRule',
                        name: '权限规则',
                        component: resolve => require(['views/auth/AddOrUpdateAuthRule.vue'], resolve),
                        meta: {
                            title: '权限规则'
                        }
                    }
                ]
            },
            {
                path: 'onlineSession',
                name: '会话管理',
                component: resolve => require(['views/session/OnlineSession.vue'], resolve),
                meta: {
                    title: '会话管理'
                },
                redirect: '/onlineSessionDefault',
                hidden: true,
                children: [
                    {
                        path: '/onlineSessionDefault',
                        name: ' 在线会话',
                        component: resolve => require(['views/session/OnlineSessionDefault.vue'], resolve),
                        meta: {
                            title: ' 在线会话'
                        }
                    }
                ]
            },
            {
                path: 'historySession',
                name: '历史会话',
                component: resolve => require(['views/session/HistorySession.vue'], resolve),
                meta: {
                    title: '历史会话'
                },
                redirect: '/historySessionDefault',
                hidden: true,
                children: [
                    {
                        path: '/historySessionDefault',
                        name: ' 历史会话',
                        component: resolve => require(['views/session/HistorySessionDefault.vue'], resolve),
                        meta: {
                            title: ' 历史会话'
                        }
                    }
                ]
            },
            {
                path: 'commandRecord',
                name: '命令记录',
                component: resolve => require(['views/session/CommandRecord.vue'], resolve),
                meta: {
                    title: '命令记录'
                },
                redirect: '/commandRecordDefault',
                hidden: true,
                children: [
                    {
                        path: '/commandRecordDefault',
                        name: ' 命令记录列表',
                        component: resolve => require(['views/session/CommandRecordDefault.vue'], resolve),
                        meta: {
                            title: ' 命令记录列表'
                        }
                    }
                ]
            },
            {
                path: 'terminalManage',
                name: ' 终端管理',
                component: resolve => require(['views/session/TerminalManage.vue'], resolve),
                meta: {
                    title: ' 终端管理'
                },
                redirect: '/terminalManageDefault',
                hidden: true,
                children: [
                    {
                        path: '/terminalManageDefault',
                        name: ' 终端列表',
                        component: resolve => require(['views/session/TerminalManageDefault.vue'], resolve),
                        meta: {
                            title: ' 终端列表'
                        }
                    },
                    {
                        path: 'terminalDetail',
                        name: '终端详情',
                        component: resolve => require(['views/session/TerminalDetail.vue'], resolve),
                        meta: {
                            title: '终端详情'
                        }
                    },
                    {
                        path: 'updateTerminal',
                        name: '更新终端',
                        component: resolve => require(['views/session/UpdateTerminal.vue'], resolve),
                        meta: {
                            title: '更新终端'
                        }
                    }
                ]
            },
            {
                path: 'systemSettings',
                name: '系统设置',
                component: resolve => require(['views/system/SystemSettings.vue'], resolve),
                meta: {
                    title: '系统设置'
                },
                redirect: '/systemSettingsDefault',
                hidden: true,
                children: [
                    {
                        path: '/systemSettingsDefault',
                        name: '系统设置信息',
                        component: resolve => require(['views/system/SystemSettingsDefault.vue'], resolve),
                        meta: {
                            title: '系统设置信息'
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: '登录',
        component: resolve => require (['views/login/Login.vue'], resolve),
	    meta: {
		    title: '登录页面'
	    }
    },
    {
        path: '*',
        redirect: '/'
    }
]
