/**
 * Created by han on 2017/6/19.
 */
const Loading = require('./loading');

const LoadingMixin = {

    data: function() {
          return {
              loading: false,
              message: ''
          }
    },

    components: {
        Loading
    },
    methods: {
        setLoaded: function () {
            this.loading = false
        },

        showMessage: function(msg) {
            this.message = msg;

            setTimeout(() => {
                this.message = '';
            }, 4000)
        }
    }
};

module.exports = LoadingMixin;