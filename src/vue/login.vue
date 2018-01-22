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
      }
  }
</style>

<template>
   <div class="fs login">
       <div class="header">
           <router-link to="/me" tag="i"  replace class="icon-left-open" style="flex:1;">
           </router-link>
           <div class="title">用户登录</div>
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
                   <a class="btn" @click="login">登录</a>
                   <div class="extra" style="margin-top:10px;">
                       <router-link to="/register" style="color:#ff1c1c; font-size: 4vw;float:left;">无账号请先注册</router-link>
                       <router-link to="/forgot" style="color:#ff1c1c; font-size: 4vw;float:right;">忘记密码</router-link>
                   </div>
               </div>
           </div>
       </div>
    </div>
</template>

<script>
    import uimixins from '../common/ui/mixin';

    export default {
        components: {
        },

        mixins: [uimixins],

        props: [

        ],
        data: function() {
            return {
                loginForm: {
                    user: '',
                    pwd: ''
                },
            };
        },

        created: async function () {
            this.loading = false;
        },

        mounted: function() {
            
        },

        methods: {
            login: async function() {
                const result = await this.appDao.login(this.loginForm.user, this.loginForm.pwd);

                if (result.status === 400) {
                    this.showMessage('用户名或密码无效');
                }

                if (result.token) {
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('user', this.loginForm.user);
                    this.$router.replace('/me');
                }
            }
        },
    }

</script>


