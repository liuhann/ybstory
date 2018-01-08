import config from './config';
import IScroll from '../common/iscroll';

const commonMixins =  {

    updated: async function() {
        if (this.$refs.scroll) {
            setTimeout(()=> {
                if (this.iscroll) {
                    this.iscroll.destroy();
                }
                this.iscroll = null;
                this.iscroll = new IScroll(this.$refs.scroll, {
                    tap: true
                });
            }, 300);
        }
    },

    methods : {
        getImageUrl: function(cover, width=120) {
            if (cover) {
                return config.CDN_IMG + '/' + cover + '.png@w_' + width;
            } else {
                return config.HOST + '/image/imgSure.jpg';
            }
        },

        getBigImageUrl: function(cover) {
            if (cover) {
                return config.CDN_IMG + '/' + cover + '.png@w_420,q_80';
            } else {
                return config.HOST + '/image/imgSure.jpg';
            }
        },

        getStoryTeller: function(story) {
            if (story && story.path) {
                const splits = story.path.split('/');
                for(const path of splits) {
                    if (path!=='') {
                        return path;
                    }
                }
            } else {
                return '';
            }
        },

        playStory: function(story) {
            this.$root.play(story);
        },

        formatDura: function(story) {
            if (story.duration) {
                const number = parseInt(story.duration);
                return Math.floor(number/60) + ":" + number%60;
            } else {
                return '';
            }
        }

    }
};

module.exports = commonMixins;