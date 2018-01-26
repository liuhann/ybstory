<style lang="less">
    .login {
        .login-form {
            padding: 4vw;
            .field, .buttons {
                margin-top: 4vw;
                input {
                    width: 100%;
                    border-bottom: 1px solid #ccc;
                    font-size: 4.5vw;
                    padding: 5px;
                }
            }
            .errors {
                font-size: 12px;
                color: red;
                padding-bottom: 10px;
            }
        }
    }
</style>

<template>
    <div class="fs login">
        <div class="header">
            <router-link to="/login" tag="i"  replace class="icon-left-open" style="flex:1;">
            </router-link>
            <div class="title">手机号码注册</div>
        </div>
        <div class="body scroll-container">
            <div class="login-form">
                <div class="field">
                    <input type="text" v-model="loginForm.user" placeholder="请输入手机号码">
                </div>

                <div class="field">
                    <input type="password" v-model="loginForm.pwd" placeholder="请输入密码">
                </div>

                <div class="buttons">
                    <div class="errors">{{error}}</div>
                    <a class="btn" @click="register">注册</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PageHead from './components/header.vue';
    import config from '../js/config';

    export default {
        components: {
            PageHead
        },
        props: [

        ],
        data: function() {
            return {
                phoneReg : /^1[0-9]{10}$/,
                loginForm: {
                    user: '',
                    pwd: ''
                },
                error: '',
            };
        },

        created: async function () {

        },

        mounted: function() {

        },

        methods: {
            async register() {
                if (this.loginForm.user  && this.loginForm.pwd) {
                    if (this.phoneReg.test(this.loginForm.user)) {
                        const result = await this.appDao.register(this.loginForm.user, this.loginForm.pwd);
                        debugger;
                        if (result.status === 400) {
                            this.error = '请输入正确格式的手机号码';
                        } else {
                            localStorage.setItem('token', result.token);
                            localStorage.setItem('user', this.loginForm.user);
                            this.$router.replace('/me');
                        }
                    } else {
                        this.error = '请输入正确格式的手机号码';
                    }
                } else {
                    this.error = '请输入用户名及密码';
                }



            }
        },
    }

</script>


