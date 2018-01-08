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
            downloads: []
        }).write();

    }

    async listHome() {
        const result = await this.ctx.client.get(`${this.root}/home?labels=今日推荐,凯迪克大奖,绘本故事`);
        return result;
    }

    async listAllLabels() {
        const result = await this.ctx.get(`${this.root}/story/labels`);
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
}


export default AppDao;