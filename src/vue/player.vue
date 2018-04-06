<style lang="less">
@ctr-height: 12vh;

@import "../style/variables";

    .player {
        .play-cover {
            width: 100vw;
            height: 100vw;
            position: relative;
            .cover-images {
                img {
                    width: 100vw;
                    height: 100vw;
                }
            }
            .icons {
                position: absolute;
                opacity: 0;
                left: 0; top: 0; width: 100vw; height: 100vw;
                transition: opacity .3s linear;

                &.display {
                    opacity: 1;
                }
                .return-icon {
                    color: #fff;
                    background-color: rgba(0, 0, 0, 0.5);
                    border-radius: 10vw;
                    padding: 2vw;
                    width: 10vw;
                    height: 10vw;
                    text-align: center;
                    font-size: 4vw;
                    line-height: 6vw;
                    position: absolute;
                    left: 2vw;
                    top: 2vw;
                }

                .play-icon {
                    color: #fff;
                    background-color: rgba(0, 0, 0, 0.6);
                    border-radius: 10vw;
                    padding: 5vw;
                    width: 18vw;
                    font-size: 6vw;
                    text-align: center;
                    line-height: 8vw;
                    height: 18vw;
                    position: absolute;
                    left: 42vw;
                    top: 42vw;
                }
            }

            .play-progress {
                position: absolute;
                bottom:0;
                left: 0;
                width: 100vw;
                height: 5px;
                background-color: rgba(255,255,255, .5);
                .percent {
                    .main-back-gradient;
                    height: 5px;
                }
            }
        }

        .story-intro {
            display: flex;
            color: #666;
            padding: 10px 0px;
            .text-title {
                width: 70vw;
                padding: 10px;
                font-size: 18px;
            }
            .icons {
                font-size: 5vw;
                width: 29vw;
                i {
                    &.on {
                        color: #d82908;
                    }
                    width: 13vw;
                    line-height: 13vw;
                    text-align: center;
                    height: 13vw;
                    display: inline-block;
                }
            }
        }

        .story-teller {
            padding: 2vw;
            font-size: 14px;
            color: #666;
            display: flex;
            border-bottom: 1px solid #eee;
            .from {
                width: 70vw;
            }
            .dura {
                width: 30vw;
                text-align: right;
            }
        }
        .story-short {
            background: #fcfcfc;
            border-radius: 10px;
            border: 1px solid #f8f8f8;
            font-size: 14px;
            margin: 10px;
            padding: 10px;
            text-indent: 32px;
            line-height: 32px;
        }

        .story-content {
            .section-content {
                padding: 10px;
                font-size: 16px;
                text-indent: 32px;
                line-height: 32px;
            }
        }
    }
</style>

<template>
    <div class="fs" ref="scroll">
        <div class="scroll player">
            <div class="play-cover" @tap="showIcons">
                <div class="icons" :class="iconShow?'display':''">
                    <i class="return-icon icon-left-open" @tap="hidePlayer"></i>
                    <i class="play-icon" :class="playing?'icon-pause':'icon-play'" @tap="pauseOrPlay"></i>
                </div>
                <div class="play-progress">
                    <div class="percent" :style="{width: playPercent}"></div>
                </div>
                <div class="cover-images">
                    <img :src="coverImage">
                </div>
            </div>

            <div class="story-intro">
                <div class="text-title">{{story.title}}</div>
                <div class="icons">
                    <i @tap="addFavorite(story)" class="collect" :class="isFavorite?'on icon-heart':'icon-heart-empty'"></i>
                    <i @tap="downloadStory(story)" class="download icon-download" :class="isDownloaded?'on':''"></i>
                </div>
            </div>

            <div class="story-teller">
                <div class="from">来自：{{teller}} </div>
                <div class="dura">{{formatedDura}}</div>
            </div>

            <div class="story-short" v-if="story.short" v-html="storyShort">
            </div>

            <div class="story-content section" v-if="readable">
                <div class="section-title">
                    故事正文
                </div>
                <div class="section-content" v-html="storyContent">
                </div>
            </div>
            <div class="related">
            </div>
        </div>
    </div>
</template>

<script>
    import commonMixins from '../js/common';

    export default {
        props: {
            story: Object,
            playing: Boolean,
            front: Boolean,
            percent: Number,
        },

        mixins: [commonMixins],

        data: function() {
            return {
                lastStory: null,
                isFavorite: this.appDao.isFavorite(this.story),
                isDownloaded: this.appDao.isDownloaded(this.story),
                iconShow: false,
                readable: false,
            };
        },

        computed: {
            playPercent() {
              return this.percent + '%';  
            },

            coverImage: function() {
                return this.getImageUrl(this.story.cover, 360);
            },

            formatedDura: function() {
                if (this.story && this.story.duration) {
                    const dura = Math.floor(this.story.duration);
                    return Math.floor(dura/60) + '分' + dura%60 + '秒';
                } else {
                    return '';
                }
            },

            storyShort: function() {
                if (this.story && this.story.short) {
                    const lines = this.story.short.split('\n');
                    return '<p>' + lines.join('</p><p>') + '</p>';
                }
            },

            teller: function() {
                if (this.story && this.story.path) {
                    const splits = this.story.path.split('/');

                    for(const path of splits) {
                        if (path!=='') {
                            return path;
                        }
                    }
                } else {
                    return '';
                }
            },
        },

        created() {

        },

        updated: function() {
            if (this.lastStory != this.story) {
                this.scroll(this.$refs.scroll);
                this.lastStory = this.story;
                this.appDao.addPlayHistory(this.story);
                if (this.story.readable) {
                    this.appDao.getStoryContent(this.story).then((content)=>{
                        this.readable = true;
                        const lines = content.text.split('\n');
                        this.storyContent = '<p>' + lines.join('</p><p>') + '</p>';
                    });
                } else {
                    this.readable = false;
                    this.storyContent = '';
                }

            }
        },

        mounted: function() {
            this.showIcons();
        },

        methods: {
            hidePlayer: function() {
                this.$emit('hide');
            },

            pauseOrPlay: function() {
                this.$emit('toggle', !this.playing);
            },

            /**
             * show play & return icons
             * if showed and current playing, hide icons 10s later
             */
            showIcons: function() {
                //clear timer first
                if (this.timeOutId) {
                    clearTimeout(this.timeOutId);
                }

                //toggle show
                this.iconShow = !this.iconShow;
                if (this.iconShow && this.playing) {
                    this.timeOutId = setTimeout(()=>{
                        this.iconShow = false;
                    }, 8000);
                }
            },
        }
    }

</script>