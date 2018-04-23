<template>
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">登录页面</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="login" :loading="isLogin">登录</el-button>
        </el-form-item>
    </el-form>
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
