<style lang="less">

    .story-list {
        .story-item {
            margin-top: 3vw;
            margin-left: 2vw;
            width: 47vw;
            height: 44vw;
            display: inline-block;
            background: #fff;
            overflow: hidden;
            border-radius: 2vw;
            padding: 3vw;

            img {
                width: 42vw;
                height: 28vw;
            }
            .short {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 43vw;
                color: #aaa;
                margin-top: 1vw;
            }
        }
    }

</style>

<template>
    <div class="full-scroll-container" ref="scroll">
        <div class="story-list clearfix">
            <div class="story-item" v-for="story in list" :key="story._id" @tap="itemClicked(story)">
                <div class="cover" >
                    <img :src="getImageUrl(story.cover)">
                </div>
                <div class="title">
                    {{story.title}}
                </div>
                <div class="short">
                    {{story.short}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../../js/config';
    import IScroll from '../../common/iscroll';

    export default {
        components: {

        },
        props: {
            filter: {
                type: Object
            },
            scrollBottom: {
                type:  Boolean,
                default: true,
            }
        },
        data: function() {
            return {
                width: 100,
                loading: false,
                skip: 0,
                limit: 10,
                total: 0,
                list: [],
            };
        },

        created: async function () {
            await this.loadData();
        },

        mounted: function() {
            
        },

        methods: {
            loadData: async function() {
                if (this.loading) {
                    return;
                }
                if (this.skip >this.total) {
                    return;
                }
                this.loading = true;
                const loaded = await this.appDao.filterStory(this.filter, this.skip, this.limit);
                
                this.list = this.list.concat(loaded.list);
                this.total = loaded.total;
                this.skip = this.skip + loaded.limit;
                this.loading = false;
                if (this.scrollBottom) {
                    this.$nextTick(()=> {
                        this.refreshIscroll();
                    });
                }
            },

            refreshIscroll: function() {
                let vueElem = this;
                if (this.iscroll) {
                    this.iscroll.refresh();
                } else {
                    this.iscroll = new IScroll(this.$el, {
                        tap: true,
                    });
                    this.iscroll.on('scrollEnd', function() {
                        if (this.y < this.maxScrollY + 30) {
                            vueElem.loadData();
                        }
                    });
                }
            },

            itemClicked : function(story) {
                this.$emit('clicked', story);
            },

            getImageUrl: function(cover) {
                const width = 240;
                if (cover) {
                    const height = Math.floor(width/3 * 2);
                    const y = Math.floor((width - height)/2);
                    return `${config.CDN_IMG}/${cover}.png@s_2,w_${width},h_${height}`;
                } else {
                    return config.HOST + '/image/imgSure.jpg';
                }
            },
        },

    }

</script>
