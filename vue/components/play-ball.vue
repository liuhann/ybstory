<style lang="less" scoped>
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

    img {
        float: left;
        width: 15vw;
        height: 15vw;
    }
} 

.playing {
    .line:nth-last-child(1) {animation: loadingA 1.5s 1s infinite;}
    .line:nth-last-child(2) {animation: loadingA 1.5s .5s infinite;}
    .line:nth-last-child(3) {animation: loadingA 1.5s 0s infinite;}
}

.line {
    display: inline-block;
    width: 2vw;
    height: 5vw;
    background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0,0,0,.4) 100%);
}

@keyframes loadingA {
    0 {height: 1vw;}
    50% {height: 9vw;}
    100% {height: 1vw;}
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
