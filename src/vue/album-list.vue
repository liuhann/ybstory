<style lang="less">

    .album-list {
        .album-item {
            background: #fff;
            width: 100%;
            height: 100px;
            border-bottom: 1px solid #efefef;
            position: relative;

            .cover {
                position: absolute;
                left: 10px;
                top: 10px;
            }

            .title {
                position: absolute;
                font-size: 16px;
                left: 100px;
                top: 20px;
            }

            .total {
                position: absolute;
                top: 45px;
                font-size: 14px;
                color: #666;
                left: 100px;
            }
        }
    }
</style>

<template>
    <div class="fs">
        <div class="header">
            <router-link to="/home" tag="i"  replace class="icon-left-open" style="flex:1;">
            </router-link>
            <div class="title">专辑列表</div>
        </div>
        <div class="full-scroll-container" ref="scroll">
            <div class="album-list clearfix">
                <div class="album-item" v-for="album in albums" :key="album._id" @tap="itemClicked(album)">
                    <div class="cover" >
                        <img :src="getImageUrl(album.thumbCover[0], 80)">
                    </div>
                    <div class="title">
                        {{album.name}}
                    </div>
                    <div class="total">
                        共 {{album.stories || 0}}个故事
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import commonMixins from '../js/common';

    export default {
        components: {

        },
        mixins: [commonMixins],

        props: {

        },

        data: function() {
            return {
                albums: [],
            }
        },

        created: async function() {
            const albums = await this.appDao.getAllAlbums();
            this.albums = albums.result;

            for(let album of this.albums) {
                if (album.stories == null) {
                    const detailed = await this.appDao.getAlbumDetail(album);
                    album = Object.assign(album, detailed);
                }
            }
            this.$nextTick(()=> {
                this.scroll(this.$refs.scroll);
            })
        },

        methods: {
            itemClicked: async function(album) {
                this.$router.push('/album/' + album.name);
            }
        }


    }
</script>
