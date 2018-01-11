<style lang="less">

    @import "../../style/variables";
    
    .ui-tab-bar {
        position: absolute;
        left: 0;
        height: 60px;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #eee;
        background: #f8f8f8;
        display: flex;
        box-sizing: border-box;
        a.tab-bar-item {
            text-decoration: none;
            display: block;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
            color: #7a7a7a;
            text-align: center;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            -webkit-transition: color 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);

            span.icon {
                display: inline-block;
                padding: 5px 0px;
                font-size: 20px;
            }

            &.current {
                color:rgba(47,178,74,.8);
            }
            .label {
                font-size: 12px;
                margin: 0;
            }
        }
    }
</style>

<template>
    <div class="ui-tab-bar">
        <a class="tab-bar-item" 
            :class="(current===tab.path) && 'current'" v-for="tab in tabs" @click="tabClicked(tab)" :key="tab.title">
            <div class="al-center">
                <span class="icon" :class="tab.icon"></span>
                <sup v-if="tab.badge">
                    <span class="vux-badge vux-badge-single">9</span></sup>
                <p v-if="tab.title" class="label"><span>{{tab.title}}</span></p>
            </div>
        </a>
    </div>
</template>

<script>
    export default {
        props:  {
            current: String,
            tabs: Array,
        },
        data: function() {
            return {
                currentStyle: {
                    color: this.currentColor
                }
            };
        },
        created: function () {

        },

        mounted: function() {

        },

        watch: {

        },

        methods: {
            tabClicked: function(item) {
                this.$emit('tabbed', item);
            }
        }
    }
</script>