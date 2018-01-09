import delegates from 'delegates';

/**
 * 页面的上下文信息类
 */
const contextProto = {

    throwError(...args) {

    },

    onerror(err) {
        if (null == err) return;
    },

    toJSON() {
    },
}

//delegate httpclient （如果存在）的方法
delegates(contextProto, 'client')
    .method('get')
    .method('post')
    .method('request');

export default contextProto;