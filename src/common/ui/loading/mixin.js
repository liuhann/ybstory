/**
 * Created by han on 2017/6/19.
 */
const Loading = require('./index');

const LoadingMixin = {
    data: function() {
          return {
              loading: true
          }
    },
    components: {
        Loading
    },
    methods: {
        setLoaded: function () {
            this.loading = false
        }
    }
};

module.exports = LoadingMixin;