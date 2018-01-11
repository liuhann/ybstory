<style lang="less">

    @import "../style/variables";

    .searcher {

        .search-header {
            height: 48px;
            .main-back-gradient;
            position: relative;
            color: #fff;
            font-size: 18px;
            line-height: 48px;
        }

        input.search {
            color: #fff;
            margin-left: 10px;
            width: 74vw;
            background: transparent;
            border-bottom: 1px solid #eee;
            line-height: 32px;
            -webkit-tap-highlight-color: transparent;
        }
        .icon-search {
            padding: 5px;
        }
    }
</style>

<template>
    <div class="fs searcher">
        <div class="search-header">
            <router-link to="/home" tag="i" class="icon-left-open">
            </router-link>
            <input type="text" class="search" v-model="searchValue">
            <i class="icon-search" @click="search"></i>
        </div>
        <story-list v-if="filter" :filter="filter" @clicked="playStory"></story-list>
    </div>
</template>

<script>
    import commonMixins from '../js/common';
    import StoryList from './components/story-list.vue';

    export default {
        components: {
            StoryList
        },
        mixins: [commonMixins],
        props: [

        ],
        data: function() {
            return {
                filter: null,
                searchValue: '',
            };
        },

        created: async function () {


        },

        mounted: function() {

        },

        methods: {
            search: async function() {
                this.filter = {
                    title: this.searchValue
                };

            },
            openLabel: function(item) {
                this.$router.replace('/label/' + item);
            }
        },
    }

</script>


