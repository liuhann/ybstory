<style lang="less" scoped>
    
</style>

<template>
    <div class="header">
        <slot name="left">
            <div class="left" v-if="noback">
                <i class="icon-left-open" @click="back"> </i> 
            </div>
        </slot>

        <div class="title">{{title}}</div>

        <slot name="right">
            <div class="right"></div>
        </slot>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
        },

        name: 'page-head',
        
        data : function() {
            return {};
        },

        methods: {
            back: function() {
                this.$router.back();
            }
        }
    }
</script>
