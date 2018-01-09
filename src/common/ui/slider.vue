<style lang="less">
    .xbn-ui-slider {
        width: 100vw;
        overflow: hidden;
        position: relative;
        .slide-container {
            display: flex;
            .slide {
                position: relative;
                width: 100vw;
            }
        }

        .dots {
            position: absolute;
            bottom: 5px;
            width: 100vw;
            text-align: center;
            span.slide-dot {
                border-radius: 8px;
                height: 8px;
                width: 8px;
                background: rgba(255,255,255,.3);
                margin: 0 4PX;
                display: inline-block;
                opacity: 1;
                &.focus {
                    background: rgba(255,255,255,.8);
                }
            }
        }
    }
</style>

<template>
    <div class="xbn-ui-slider">
        <div class="slide-container" :style="styleContainer">
            <div class="slide" v-for="slide in slides" @tap="open(slide)" :style="styleSlide">
                <img :src="slide.img">
            </div>
        </div>
        <div class="dots">
            <span v-for="(slide, index) in slides" class="slide-dot" :class="(currentPage===index)?'focus': ''"></span>
        </div>
    </div>
</template>

<script>
    import IScroll from '../iscroll';

    export default {
        props: {
            slides: Array,
            clazz: String,
            height: Number
        },

        data: function() {
            return {
                currentPage: 1,
                styleSlide: {
                    height: this.height + 'vw'
                }
            };
        },

        computed: {
            styleContainer: function() {
                return {
                    width: this.slides.length + '00vw',
                    height: this.height
                }
            }
        },
        components: {

        },

        created: function () {

        },

        mounted: function() {

        },

        updated: function() {

        },

        methods: {
            ready: function() {
                const slider = this;
                this.$nextTick(()=> {
                    this.iscroll = new IScroll(this.$el, {
                        snap: 'div',
                        tap: true,
                        scrollX: true,
                        scrollY: false
                    });
                    this.iscroll.on('scrollEnd', function() {
                        // slider.currentPage = slider.iscroll.currentPage.pageX;
                    });
                });
            },
            left: function(item) {
                this.$emit('left', item);
            },
            right: function(item) {
                this.$emit('right', item);
            },
            open: function(item) {
                this.$emit('open', item);
            },
        },
    }
</script>