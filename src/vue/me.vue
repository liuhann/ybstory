<style  lang="less">
@import "../style/variables.less";

.user-container {
    position: absolute;
    overflow: hidden;
    top: 0px;
    bottom: @tab-height;
    left: 0;
    right: 0;
    overflow-y: auto;
    .user-name {
        height: 40vh;
        padding: 10vh 0;
        text-align: center;
        .avtar {
            height: 14vh;
            i {
                font-size: 10vh;
                color: #fff;
            }
        }

        .logout {
            position: absolute;
            right: 10px;
            top: 10px;
            color: #fff;
            font-size: 20px;
        }

        .name {
            a {
                color: #fff;
                font-size: 4vw;
            }
            span {
                color: #fff;
                font-size: 4vw;
            }
        }
    }


    .vt-list {
        .vt-list-item {
            display: flex;
            font-size: 16px;
            padding: 16px 10px;
            color: #666;
            border-bottom: 1px solid #eee;
            .vt-list-item-icon {
                margin-right: 10px;
            }
        }
    }
}
</style>


<template>
    <div class="user-container">
        <div class="scroll">
        </div>
        <div class="user-name main-back-gradient">
            <div class="avtar">
                <i class="icon-user-circle"></i>
            </div>

            <div v-if="user" class="logout" @click="logout">
                <i class="icon-power"></i>
            </div>
            <div class="name">
                <router-link v-if="!user" to="/login">登录</router-link>
                <span>{{user}}</span>
            </div>
        </div>

        <div class="vt-list">
            <router-link to="/history" tag="div" class="vt-list-item">
                <div class="vt-list-item-icon icon-bell"></div>
                <div class="vt-list-item-text">播放历史</div>
                <div class="vt-list-item-arrow icon-right-open"></div>
            </router-link>

            <router-link to="/favorites" tag="div" replace class="vt-list-item">
                <div class="vt-list-item-icon icon-heart-empty"></div>
                <div class="vt-list-item-text">我的收藏</div>
                <div class="vt-list-item-arrow icon-right-open"></div>
            </router-link>

            <router-link to="/download" tag="div" replace class="vt-list-item">
                <div class="vt-list-item-icon icon-download"></div>
                <div class="vt-list-item-text">我的下载</div>
                <div class="vt-list-item-arrow icon-right-open"></div>
            </router-link>

            <div class="vt-list-item">
                <div class="vt-list-item-icon icon-bell"></div>
                <div class="vt-list-item-text">应用版本: 2.0.1</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        const user = localStorage.getItem('user');
        return {
            user: user
        }
    },

    watch: {
      '$route': function() {
          this.user = localStorage.getItem('user');
      }
    },

    created() {

    },

    methods: {

        logout() {
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },

        goHistory() {

        }
    }

}
</script>
