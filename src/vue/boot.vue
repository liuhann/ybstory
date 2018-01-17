<style lang="less">

    .main-app {
        overflow: hidden;
        width: 100%;
        height: 100%
    }

    .main-screen {
        transition: transform .3s linear;
        width: 100vw;
        height: 100vh;
        &.slipped-left {
            transform: translateX(-100%);
        }
    }

    .media-player {
        display: none;
    }

</style>

<template>
    <div class="main-app">
        <div class="main-screen">
            <router-view></router-view>
            <!--<transition name="tab-slide">
            </transition>-->
            <tab-bar :tabs="tabs" :current="currentPath" @tabbed="tabClicked"></tab-bar>
        </div>
        <div class="external-container">
            <transition name="slide">
                <router-view name="full-topped"></router-view>
            </transition>
        </div>
        <transition name="slide">
            <player v-if="playerFront" :story="story" :playing="playing" :percent="percent" @hide="hidePlayer" @toggle="togglePlay"></player>
        </transition>
        
        <play-ball v-if="story!==null && playing && (!playerFront)" :playing="playing" :cover="coverImage" @clicked="ballClicked"></play-ball>

        <div class='media-player'>
            <audio id='media-video' controls="false" :src="audioUrl">
            </audio>
        </div>
    </div>
</template>

<script>
    import config from '../js/config';
    import commonMixins from '../js/common';
    import TabBar from '../common/ui/tabbar.vue';
    import Player from './player.vue';
    import playerMixins from './mixins/player';

    import PlayBall from './components/play-ball.vue';

    import shortid from 'shortid';

    export default {
        components : {
            TabBar,
            Player,
            PlayBall,
        },

        mixins: [playerMixins, commonMixins],
        data: function() {
            const tabs = [{
                title: '首页',
                path: '/home',
                icon: 'icon-home'
            }, /*{
                title: '故事专辑',
                path: '/albums',
                icon: 'icon-heart-empty'
            },*/ {
                title: '收藏',
                path: '/favorites',
                icon : "icon-heart-empty"
            }, {
                title: '下载',
                path: '/download',
                icon: 'icon-download'
            }, {
                title: '我的',
                path: '/me',
                icon: 'icon-user-circle'
            }];

            return {
                tabs,
                currentPath: '/home',
                loading: true
            };
        },

        created: function() {
            if (localStorage.getItem('token') == null) {
                localStorage.setItem('token', shortid.generate());
            }

            this.appDao.getUserByToken(localStorage.getItem('token')).then(function(res) {
                if (res.user) {
                    localStorage.setItem('user', res.user.user);
                }
            });
        },

        computed : {
            mainScreenStyle: function () {
                if (this.backend) {

                }
            },

            coverImage: function() {
                return this.getImageUrl(this.story.cover, 360);
            },
            
            audioUrl: function() {
                if (this.story && this.story.path) {
                    return config.CDN + '/' + this.story.path;
                } else {
                    return "";
                }
            }
        },

        methods: {
            //
            tabClicked: function(item) {
                this.currentPath = item.path;
                this.$router.replace(item.path);
                console.log('tab clicked', item);
            },            
        }
    }

</script>