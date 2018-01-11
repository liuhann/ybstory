<style lang="less" scoped>
    @import "../style/variables";
    .page-home {
        .home-title {
            .main-back-gradient;
            position: absolute;
            width: 100vw;
            top: 0;
            left: 0;
            z-index: 10;
            display: flex;
            height: 7vh;
            padding: 1vh 2vw;
            .logo {
                img {
                    margin: .5vh;
                    width: 4vh;
                    height: 4vh;
                }
            }
            .search-form-input {
                width: 65vw;
                margin-left: 10vw;
                span {
                    font-size: 3.5vw;
                    color: #fff;
                    display: inline-block;
                    width: 65vw;
                    line-height: 5vh;
                    padding: 0px 2vw;
                    border-bottom: 1px solid #fff;
                    //background-color: #eee;
                }
            }
            .history {
                width: 10vw;
                font-size: 5vw;
                line-height: 5vh;
                color: #fff;
                text-align: right;
            }
        }
    }
    .scroll-container {
        position: absolute;
        overflow: hidden;
        top: 0px;
        bottom: 60px;
        left: 0;
        right: 0;
    }

    .quick-entry {
        .entry {
            float: left;
            width: 20vw;
            height: 25vw;
            padding: 4vw 3vw;
            .name {
                font-size: 3vw;
                text-align: center;
            }
        }
    }

    .titled-block {
        border-top: 1px solid #e4e4e4;
            background-color: #fff;
        margin-top: 20px;
        .title {
            font-size: 18px;
            padding: 1vw 3vw;
            border-left: 3px solid #ddd;
            color: #666;
        }

        .clearfix {
            padding: 2vw 2vw;
            .home-story-item {
                float: left;
                width: 32vw;
                height: 35vw;
                img {
                    margin: 2vw 2vw 0vw 2vw;
                    width: 28vw;
                }
                span.story-name {
                    display: block;
                    text-align: center;
                }
            }
        }
    }
</style>

<template>
    <div class="page-home">
        <div class="home-title">
            <div class="logo">,
                <img src="../common/res/mushroom.svg">
            </div>
            <div class="search-form-input">
                <span @click="searchStory">搜索故事</span>
            </div>
            <div class="history">
                <router-link to="/history">
                    <i class="icon-history" style="color: #fff"></i>
                </router-link>
            </div>
        </div>

        <div class="scroll-container" ref="scroll">
            <div class="scroll-content">
                <div class="slide-container">
                    <slider ref="slider" :slides="slides" :height="50"></slider>
                </div>

                <div class="quick-entry clearfix">
                    <div class="entry">
                        <img class="icon" src="../common/res/picture.svg">
                        <div class="name">精选绘本</div>
                    </div>
                    <div class="entry">
                        <img class="icon" src="../common/res/reading.svg">
                        <div class="name">亲子阅读</div>
                    </div>
                    <div class="entry">
                        <img class="icon" src="../common/res/tale.svg">
                        <div class="name">经典童话</div>
                    </div>

                    <div class="entry" @tap="routeToUrl('/label-list/睡前故事')">
                        <img class="icon" src="../common/res/sleep.svg">
                        <div class="name">睡前故事</div>
                    </div>

                    <div class="entry" @tap="routeToUrl('/labels')">
                        <img class="icon" src="../common/res/labels.svg">
                        <div class="name">故事分类</div>
                    </div>
                </div>

                <div class="picture-picked titled-block" v-for="list in homeList" :key="list.label">
                    <div class="title">
                        {{list.label}}
                    </div>
                    <div class="clearfix">
                        <div v-for="story in list.list" :key="story.img" class="home-story-item" @tap="playStory(story)">
                            <img :src="getImageUrl(story.cover, 90)">
                            <span class="story-name">{{story.title}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Slider from '../common/ui/slider.vue';
    import commonMixins from '../js/common';

    export default {
        components: {
            Slider
        },
        mixins: [commonMixins],

        data: function() {
            const homeData = this.$root.homeData;
            const slides = [];
            for(let album of homeData.homesAlbum) {
                slides.push({
                    img: this.getImageUrl(album.cover, window.innerWidth)
                });
            }
            return {
                slides: slides,
                homeList: homeData.list,
            };
        },

        created: async function() {
           /* const homeData = await this.appDao.listHome();

            const slides = [];
            for(let album of homeData.homesAlbum) {
                slides.push({
                    img: this.getImageUrl(album.cover, window.innerWidth)
                });
            }
            this.slides = slides;
            this.homeList = homeData.list;*/
            this.$nextTick(()=> {
                this.scroll(this.$refs.scroll);
            })
        },
        updated: async function() {
            this.$refs.slider.ready();
        },
       /* beforeRouteEnter (to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
            next();
        },*/

        beforeRouteUpdate(to, from, next) {
            new IScroll(this.$refs.scroll, {
                tap: true
            });
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
        },

        methods : {
            routeToUrl: function(path) {
                this.$router.push({
                    path
                })
            },
            searchStory: function() {
                alert(location.href);
            },
        }
    }
</script>