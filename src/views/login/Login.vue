<template>
    <div class="login-body">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <div class="login-icon-block"><span class="login-icon"></span></div>
            <h3 class="title">XMonitor</h3>
            <el-form-item prop="account">
                <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="login" class="login-btn" :loading="isLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
	export default {
		name: "login",
		components: {

        },
		data() {
			return {
                isLogin: false,
                loginForm: {
                    account: '',
                    checkPass: ''
                },
                loginRules: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    checkPass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                },
                checked: true
            }
		},
		methods: {
            login: function(){
                var that = this;
                that.isLogin = true;
                setTimeout(function () {
                    that.isLogin = false;
                    that.$router.push({ path: '/home/pageHomeDefault' });
                }, 3000);
            }
        }
	}
</script>

<style lang="scss">
    @import '../../assets/styles/login.scss';
</style>
