<style >
.play-ball {
    width: 17vw;
    padding: 4vw;
    height: 17vw;
    border: 2px solid #dddddd;
    border-radius: 10vw;
    text-align: center;
    position: absolute;
    z-index: 999;
    right: 4vw;
    bottom: 13vh;
    background-size: contain;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
}
.play-ball img {
    float: left;
    width: 15vw;
    height: 15vw;
}

.playing .line:nth-last-child(1) {
    -webkit-animation: loading 1.5s 0s infinite;
}
.playing .line:nth-last-child(2) {
    -webkit-animation: loading 1.5s .5s infinite;
}
.playing .line:nth-last-child(3) {
    -webkit-animation: loading 1.5s 1s infinite;
}

.line {
    display: inline-block;
    width: 2vw;
    height: 8vw;
    background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0,0,0,.4) 100%);
}

@-webkit-keyframes loading
{
    0% {
        -webkit-transform: scaleY(.7);
        transform: scaleY(.7);
    }
    50% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }
    100% {
        -webkit-transform: scaleY(.7);
        transform: scaleY(.7);
    }
}

</style>

<template>
    <div class="play-ball" @click="ballClicked()" :class="playing?'playing':''" :style="styleBallCover">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
    </div>
</template>

<script>
    export default {
        props: {
            playing: Boolean,
            cover: String,
        },
        
        data : function() {
            return {};
        },

        computed : {
            styleBallCover: function() {
                return {
                    backgroundImage: "url('" + this.cover + "')"
                }
            }
        },
        methods: {
            back: function() {
                this.$router.back();
            },
            ballClicked() {
                this.$emit('clicked');
            },
        }
    }
</script>
