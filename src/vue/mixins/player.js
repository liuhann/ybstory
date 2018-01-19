
export default {

    data() {
        return {
            playerFront: false,
            story: null,
            playing: false,
            percent: 0,
        }
    },

    computed: {
       
    },

    mounted() {
        this.audio = document.querySelector('#media-video');
        if(this.audio) {
            this.audio.addEventListener("timeupdate", this.timeUpdate);
            this.audio.addEventListener('canplay', this.canplay.bind(this));
        }
    },

    methods: {
        play(story, playing, front) {
            this.story = story;
            this.playing = playing;
            this.playerFront = front;
        },

        hidePlayer() {
            this.playerFront = false;
        },

        timeUpdate: function() {
            this.timestamp = event.target.currentTime;
            this.percent = Math.floor(100 * this.timestamp/this.story.duration);
        },

        canplay: function() {
            setTimeout(()=> {
                this.audio.play();
            }, 1000);
        },

        ballClicked() {
            if (this.playing) {
                this.playerFront = true;
            } else {
                this.togglePlay(true);
                this.playerFront = true;
            }
        },

        togglePlay(playing) {
            this.playing = playing; 
            if (this.playing) {
                this.audio.play();
            } else {
                this.audio.pause();
            }
        }

    }
}