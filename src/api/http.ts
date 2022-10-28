import axios from 'axios';
import { getToken, encrypt, encryptHexMd5 } from '@/utils';
import { uuid, jsonReplacer } from './utils';
const service = axios.create({
    timeout: 30000
});

service.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

// request拦截器
service.interceptors.request.use(config => {
    const _t = new Date().getTime();

    // 设置 token
    if (config.headers) {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = token;
        }
        config.headers['uuid'] = uuid();
        // 添加sign
        const stringifyParams = config.method === 'get'
            ? JSON.stringify(config.params || {}, jsonReplacer)
            : JSON.stringify(config.data || {});
        config.headers['Sign'] = encrypt(`_t=${_t}&uuid=${uuid}&token=${config.headers['Authorization'] || ''}&params=${encryptHexMd5(stringifyParams)}`);
    }

    // 添加时间戳，防止缓存
    config.params = { ...config.params, _t };
    return config;
}, error => {
    Promise.reject(error);
});

export { service as api };
