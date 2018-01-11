<style lang="less">
    .history-container {
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
                    .from {
                        float: left;
                    }
                    .dura {
                        float: right;
                    }
                }
            }
            border-bottom: 1px solid #eee;
        }
    }
</style>

<template>
    <div class="histories fs">
        <div class="header">
            <router-link to="/home" tag="i" class="icon-left-open" style="flex:1;">
            </router-link>
            <div class="title">播放历史</div>
        </div>
        <div class="body full-scroll-container" ref="scroll">
            <div class="history-container">
                <div v-for="story of histories" class="story" @tap="playStory(story)">
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
                histories: []
            };
        },

        created: async function () {
            this.histories = await this.appDao.getHistories();

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


