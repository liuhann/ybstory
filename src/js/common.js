import Vue from 'vue';
import config from './config';
import IScroll from '../common/iscroll';

const commonMixins =  {

   /* updated: async function() {
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
    },*/

    methods : {
        scroll(container) {
            setTimeout(()=> {
                if (this.iscroll) {
                    this.iscroll.destroy();
                }
                this.iscroll = null;
                this.iscroll = new IScroll(container, {
                    tap: true
                });
            }, 300);
        },

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
                return Math.floor(number/60) + ":" + (100 + number%60).toString().substring(1);
            } else {
                return '';
            }
        },

        addFavorite: async function(story) {
            const fav = {
                cover: story.cover,
                duration: story.duration,
                path: story.path,
                short: story.short,
                title: story.title
            };
            await this.appDao.addFavorite(fav);
            this.isFavorite = true;
        },

        downloadStory: function(story) {
            const user = localStorage.getItem("user");
            if (!user) {
                this.alert('请登录后下载故事');
                return;
            }

            const that = this;
            if (this.appDao.isDownloaded(story)) {
                return;
            }
            var uri = encodeURI(config.CDN + '/' + story.path);
            window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dirEntry) {
                dirEntry.getDirectory('yuanbaogushi', {create: true}, function(ybstoryEntry) {
                    ybstoryEntry.getFile(story.title + '.mp3', {
                        create: true,
                        exclusive: false
                    }, function(storyEntry) {
                        that.notice('开始下载');
                        that.download(storyEntry, uri, story);
                    }, function(err) {alert(err)});
                }, function(err) {alert(err)});
            }, function(err) {alert(err)});
        },

        download(fileEntry, uri, story) {
            var fileTransfer = new FileTransfer();
            var fileURL = fileEntry.toURL();

            const that = this;
            fileTransfer.download(
                uri,
                fileURL,
                function (entry) {
                    that.notice('下载完成');
                    that.appDao.addDownload(story);
                    that.isDownloaded = true;
                },
                function (error) {
                    that.notice('下载异常');
                },
                null, // or, pass false
                {
                    //headers: {
                    //    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                    //}
                }
            );
        },

        notice: function(msg) {
            const toast = document.getElementById('global-toast');
            if (toast) {
                document.body.removeChild(toast);
            }
            const toastTpl = Vue.extend({
                data() {
                    return {
                        style: {
                            position: "absolute",
                            zIndex: 9999,
                            top: "80vh",
                            textAlign: "center",
                            width: "100%",
                            left: 0,
                        },
                        contentStyle: {
                            fontSize: "4vw",
                            color: '#fff',
                            background: 'rgba(0,0,0,.7)',
                            display: 'inline-block',
                            padding: '5px 10px',
                            borderRadius: '5px'
                        }
                    };
                },
                template: `<div :style="style" class="msg-toast" id="global-toast"><div class="content" :style="contentStyle">${msg}</div></div>`,
            });
            const toastVM = new toastTpl();
            const tpl = toastVM.$mount().$el;
            document.body.appendChild(tpl);

            setTimeout(function(){
                const toast = document.getElementById('global-toast');
                if (toast) {
                    document.body.removeChild(toast);
                }
            }, 3000);
        },

        alert: function(msg) {
            const toast = document.getElementById('global-alert');
            if (toast) {
                document.body.removeChild(toast);
            }
            const toastTpl = Vue.extend({
                data() {
                    return {
                        maskStyle: {
                            position: 'absolute',
                            zIndex: 9999,
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.6)',
                        },
                        bodyStyle: {
                            position: 'absolute',
                            width: '80%',
                            maxWidth: '300px',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#FFFFFF',
                            textAlign: 'center',
                            borderRadius: '3px',
                            overflow: 'hidden',
                        },
                        contentStyle: {
                            fontSize: '16px',
                            padding: '20px 0 30px 0px',
                            borderBottom: '1px solid #eee',
                        },
                        btnStyle: {
                            margin: '10px 20px',
                            lineHeight: '6vw',
                            padding: '3vw 0',
                            borderRadius: '5px',
                            fontSize: '5vw',
                            color: '#fff',
                            backgroundColor: '#65bb57',
                            letterSpacing: '3vw',
                        }
                    };
                },
                template: `<div :style="maskStyle" class="toast-mask" id="global-alert">
                                <div :style="bodyStyle">
                                    <div class="content" :style="contentStyle">${msg}</div>
                                    <div @click="closeThis"  :style="btnStyle">确定</div>
                                </div>
                            </div>`,
                methods: {
                    closeThis() {
                        const toast = document.getElementById('global-alert');
                        if (toast) {
                            document.body.removeChild(toast);
                        }
                    }
                }
            });
            const toastVM = new toastTpl();
            const tpl = toastVM.$mount().$el;
            document.body.appendChild(tpl);
        }
    }
};

module.exports = commonMixins;