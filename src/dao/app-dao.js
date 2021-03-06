const low = require('lowdb');
const LocalStorageAdapter = require('lowdb/adapters/LocalStorage');

class AppDao {

    constructor(root, ctx) {
        this.root = root;
        this.ctx = ctx;

        this.adapter = new LocalStorageAdapter('db');
        this.db = low(this.adapter);

        this.db.defaults({
            favorites: [],
            downloads: [],
            historys: [],
        }).write();

    }

    async listHome() {
        const result = await this.ctx.client.get(`${this.root}/home?labels=今日推荐,凯迪克大奖,睡前故事,绘本故事`);
        return result;
    }

    async listAllLabels() {
        const result = await this.ctx.get(`${this.root}/story/labels`);
        return result;
    }

    async getAllAlbums() {
        const result = await this.ctx.get(`${this.root}/album/list`);
        return result;
    }

    async getAlbumDetail(album) {
        const result = await this.ctx.get(`${this.root}/album/info?album=` + album.name);
        return result;
    }


    async filterStory(filter, skip, limit) {
        const result = await this.ctx.get(`${this.root}/story/list`, Object.assign(filter, {skip, limit}));  
        return result;
    }

    async register(user, pwd) {
        const result = await this.ctx.post(`${this.root}/user/register`, {
            user,
            pwd
        });
        return result;
    }

    async login(user, pwd) {
        const result = await this.ctx.post(`${this.root}/user/login`, {
            user,
            pwd
        });
        return result;
    }

    async getUserByToken(token) {
        const result = await this.ctx.get(`${this.root}/user/token/check?token=${token}`);
        return result;
    }


    async getStoryContent(story) {
        const result = await this.ctx.get(`${this.root}/story/content?story=` + story._id);
        return result;
    }

    async addFavorite(story, token) {
        if(this.isFavorite(story)) {
            return;
        }
        this.db.get('favorites').push(story).write();
        const result = await this.ctx.post(`${this.root}/user/favorite/add?token=${token}`, story);
    }

    getFavorites() {
        return this.db.get('favorites').value();
    }

    async addDownload(story) {
        if(this.isDownloaded(story)) {
            return;
        }
        story.downloaded = true;
        this.db.get('downloads').push(story).write();
    }

    getDownloads() {
        return this.db.get('downloads').value();
    }

    isDownloaded(story) {
        const value = this.db.get('downloads').find({
            path: story.path
        }).value();
        if (value) {
            return true;
        } else {
            return false;
        }
    }

    isFavorite(story) {
        const value = this.db.get('favorites').find({
            path: story.path
        }).value();
        if (value) {
            return true;
        } else {
            return false;
        }
    }

    addPlayHistory(story) {
        const value = this.db.get('historys').find({
            path: story.path
        }).value();
        let count = 1;
        if(value) {
            if (value.count) {
                count = value.count + 1;
            }
            this.db.get('historys').remove({
                path: story.path
            }).write();
        }
        story.count = count;
        story.updated = new Date().getTime();
        this.db.get('historys').push(story).write();

        this.ctx.post(`${this.root}/user/play/log?user=${localStorage.getItem('user')}`, {
           story: story.title,
           path: story.path,
           storyId: story._id
        });
    }
    getHistories() {
        const histories = this.db.get('historys').orderBy(['updated'], ['desc']).value();

        const result = {
	        day3: [],
	        day7: [],
	        olders: []
        };

        const now = new Date().getTime();
        const day3 = 3 * 24 * 60 * 60 * 1000;
	    const day7 = 3 * 24 * 60 * 60 * 1000;
        for(let story of histories) {
			if (now - story.updated< day3 ) {
				result.day3.push(story)
			} else if (now - story.updated < day7) {
				result.day7.push(story)
			} else {
				result.olders.push(story)
			}
        }

        return result;
    }
}

export default AppDao;