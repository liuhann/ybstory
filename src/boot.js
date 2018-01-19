import AppDao from './dao/app-dao';
import Vue from 'vue'
import VueRouter from 'vue-router'

import './fontello/css/fontello.css';
import './style/common.less';
import './style/transitions.less';

import config from './js/config';
import common from './js/common';

import HttpClient from './common/httpclient';
import contextProto from './common/context';

import loading from './common/ui/loading.vue';
import BootVue from './vue/boot.vue';
import Player from './vue/player.vue';
import Main from './vue/main.vue';
import PageLabel from './vue/labels.vue';
import LabelStories from './vue/label-stories.vue';
import Login from './vue/login.vue';
import Register from './vue/register.vue';
import Favorites from './vue/favorites';
import Me from './vue/me.vue';
import Download from './vue/download';
import History from './vue/history';
import Searcher from './vue/search';
import AlbumStories from './vue/album-stories';
import Albums from './vue/album-list';

Vue.component('loading', loading);
Vue.use(VueRouter);

const routes = [
    {
        path: '/home',
        component: Main
    }, {
        path: '/labels',
        components: {
            'full-topped': PageLabel,
            default: Main
        }
    }, {
        path: '/label/:label',
        components : {
            'full-topped': LabelStories,
            default: Main,
        }
    },{
        path: '/album/:album',
        components : {
            'full-topped': AlbumStories,
            default: Main,
        }
    },{
        path: '/search',
        components : {
            'full-topped': Searcher,
            default: Main,
        }
    }, {
        path: '/me',
        component: Me
    },  {
        path: '/login',
        components : {
            'full-topped': Login,
            default: Me,
        }
    }, {
        path: '/register',
        components : {
            'full-topped': Register,
            default: Me,
        }
    }, {
        path: '/favorites',
        component : Favorites,
    },
    {
        path: '/download',
        component : Download,
    },{
        path: '/albums',
        component : Albums,
        components : {
            'full-topped': History,
            default: Main,
        }
    },{
        path: '/history',
        components : {
            'full-topped': History,
            default: Main,
        }
    }
];


let app = null;
function startVue() {

    const ctx = getContext();
    const appDao = new AppDao(``, ctx);

    function getContext() {
        const ctx = Object.create(contextProto);
        ctx.client = new HttpClient({
            baseURL: config.SERVER
        });
        return ctx;
    }

    Vue.mixin({
        beforeCreate: function() {
            this.ctx = ctx;
            this.appDao = appDao;
        }
    });

    const router = new VueRouter({
        routes // （缩写）相当于 routes: routes
    });

    const now = new Date().getTime();
    appDao.listHome().then((response)=> {
        const homeData = response;
        app = new Vue({
            el: '#app',
            data: {
                homeData: homeData,
                currentStory: null,
                playing: false,
            },
            components: {
                BootVue
            },
            router,
            template: '<boot-vue ref="boot"></boot-vue>',
            methods: {
                play: function(story) {
                    this.$refs.boot.play(story, true, true);
                }
            }
        });
        router.replace('/home');
    });
}

if (window.navigator.platform === 'Win32') {
    startVue();
} else {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        startVue();

        document.addEventListener("backbutton", onBackKeyDown, false);

        let clicked = 0;
        function onBackKeyDown() {
            if (app) {
                if (app.$refs.boot.playerFront) {
                    app.$refs.boot.hidePlayer();
                    return;
                }
            }

            const now = new Date().getTime();
            if (now - clicked > 800) {
                common.methods.notice('连续按两次返回键退出元宝故事');
                clicked  = now;
            } else {
                navigator.app.exitApp();
            }
            // Handle the back button
        }
    }
}
