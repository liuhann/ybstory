import AppDao from './dao/app-dao';
import Vue from 'vue'
import VueRouter from 'vue-router'

import './fontello/css/fontello.css';
import './style/common.less';
import './style/transitions.less';

import config from './js/config';

import HttpClient from '../common/httpclient';
import contextProto from '../common/context';

import loading from '../common/ui/loading.vue';
import BootVue from './vue/boot.vue';
import Player from './vue/player.vue';
import Main from './vue/main.vue';
import PageLabel from './vue/labels.vue';
import LabelStories from './vue/label-stories.vue';
import Login from './vue/login.vue';
import Register from './vue/register.vue';
import Favorites from './vue/favorites';

import Me from './vue/me.vue';

alert('booting');

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
        path: '/label-list/:label', 
        components : {
            'full-topped': LabelStories,
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
];

function getContext() {
    const ctx = Object.create(contextProto);
    ctx.client = new HttpClient({
        baseURL: config.SERVER 
    });
    return ctx;
}

Vue.mixin({
    beforeCreate: function() {
        this.ctx = getContext();
        this.appDao = new AppDao(``, this.ctx);
    }
});

const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
});

const app = new Vue({
    el: '#app',
    data: {
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