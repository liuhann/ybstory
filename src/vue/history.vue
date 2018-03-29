<style lang="less">
    .history-container {
        .range {
            padding: 10px;
        }
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
            <router-link to="/home" tag="i" class="icon-left-open" replace style="flex:1;">
            </router-link>
            <div class="title">播放历史</div>
        </div>
        <div class="body full-scroll-container" ref="scroll">
            <div class="history-container">
                <div class="range" v-if="histories.day3.length">近3天收听的</div>
                <div v-for="story of histories.day3" class="story" @tap="playStory(story)">
                    <img :src="getImageUrl(story.cover, 60)">
                    <div class="info">
                    <div class="title">{{story.title}}</div>
                    <div class="story-teller">
                        <!--<div class="from">来自：{{getStoryTeller(story)}} </div>-->
                        播放 <i style="color:darkred;">{{story.count}}</i>次  {{story.updated | timeago}}播放</div>
                    </div>
                </div>
                <div class="range" v-if="histories.day7.length">近一周收听的</div>
                <div v-for="story of histories.day7" class="story" @tap="playStory(story)">
                    <img :src="getImageUrl(story.cover, 60)">
                    <div class="info">
                        <div class="title">{{story.title}}</div>
                        <div class="story-teller">
                            <!--<div class="from">来自：{{getStoryTeller(story)}} </div>-->
                            播放 <i style="color:darkred;">{{story.count}}</i>次  {{story.updated | timeago}}播放</div>
                    </div>
                </div>

                <div class="range" v-if="histories.olders.length">更早播放的故事</div>
                <div v-for="story of histories.olders" class="story" @tap="playStory(story)">
                    <img :src="getImageUrl(story.cover, 60)">
                    <div class="info">
                        <div class="title">{{story.title}}</div>
                        <div class="story-teller">
                            <!--<div class="from">来自：{{getStoryTeller(story)}} </div>-->
                            播放 <i style="color:darkred;">{{story.count}}</i>次  {{story.updated | timeago}}播放</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PageHead from './components/header.vue';
    import commonMixins from '../js/common';
    import timeago from '../common/timeago';

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

        filters: {
        	timeago: function(value) {
        		return timeago().format(value, 'zh_CN');
            }
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


