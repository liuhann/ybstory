<style lang="less" scoped>

</style>

<template>
    <div class="fs">
        <page-head :title="label"></page-head>
        <story-list :filter="filter"></story-list>
    </div>
</template>

<script>
import PageHead from './components/header.vue';
import StoryList from './components/story-list.vue';

export default {
    components: {
        PageHead,
        StoryList
    },
    
    props: {

    },

    data: function() {
        return {
            label: '故事分类：' + this.$route.params.label,
            filter: {
                label: this.$route.params.label
            }
        }
    },

    created: function() {
        
    },


}
</script>
