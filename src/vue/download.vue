<style lang="less">

    .download-container {
        .story {
            display: flex;
            padding: 10px;

            img {
                width: 60px;
                height: 60px;
            }

            .info {
                flex: 1;
                padding-left: 10px;
                .title {
                    font-size: 16px;
                }
                .story-teller {
                    padding-top: 10px;
                    font-size: 14px;
                    color: #888;
                    display: flex;
                    border-bottom: none;
                    .from {
                        flex: 1;
                    }
                    .dura {
                        min-width: 40px;
                    }
                }
            }
            border-bottom: 1px solid #eee;
        }
    }
</style>

<template>
    <div class="favorites">
        <div class="header">
            <div class="title">我的下载</div>
        </div>
        <div class="main-scroll-container" ref="scroll">
            <div class="download-container">
                <div v-for="story of favorites" class="story" @tap="playStory(story)">
                    <img :src="getImageUrl(story.cover, 60)">
                    <div class="info">
                        <div class="title">{{story.title}}</div>
                        <div class="story-teller">
                            <div class="from">来自：{{getStoryTeller(story)}} </div>
                            <div class="dura">{{formatDura(story)}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="empty" v-if="favorites.length===0">
                <span>还未下载任何内容</span>
            </div>
        </div>
    </div>
</template>

<script>
    import PageHead from './components/header.vue';
    import commonMixins from '../js/common';

    export default {
        components: {
            PageHead
        },
        props: [

        ],
        mixins: [commonMixins],

        data: function() {
            return {
                favorites: []
            };
        },

        created: async function () {
            const favorites  = await this.appDao.getDownloads();
            console.log('favorites', favorites);
            this.favorites = favorites;

            this.$nextTick(()=> {
                this.scroll(this.$refs.scroll);
            })
        },

        mounted: function() {

        },

        methods: {

        },
    }

</script>


