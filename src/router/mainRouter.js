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
                    }
                ]
            },
            {
                path: 'networkList',
                name: '资产管理',
                component: resolve => require(['views/assets/NetworkList.vue'], resolve),
                meta: {
                    title: '资产管理'
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
