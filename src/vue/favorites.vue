<style lang="less" scoped>

    .fav-container {
        .story {
            display: flex;
        }
    }
</style>

<template>
    <div class="favorites">
        <div class="header">
            <div class="title">我的收藏</div>
        </div>
        <div class="body scroll-container" ref="scroll">
            <div class="fav-container">
                <div v-for="story of favorites" class="story" @tap="playStory(story)">
                    <img :src="getImageUrl(story.cover, 90)">
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
                favorites: []
            };
        },

        created: async function () {
            const favorites  = await this.appDao.getFavorites();
            console.log('favorites', favorites);
            this.favorites = favorites;

            this.$nextTick(()=> {

            })
        },

        mounted: function() {

        },

        methods: {

        },
    }

</script>


