import axios from 'axios';
import { encrypt, encryptHexMd5, isString } from '@/utils';
import { genUUID, jsonReplacer, resolveParams } from './utils';
import { useToken } from '@/composables';
import { router } from '@/router';
import { HttpContentType, HttpStatus } from './types';

const service = axios.create({
    timeout: 30000
});

service.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

// request拦截器
service.interceptors.request.use(config => {
    const _t = new Date().getTime();
    const { get: getToken } = useToken();
    // 设置 token
    if (config.headers) {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = token;
        }
        const uuid = genUUID();
        config.headers['uuid'] = uuid;

        const menuName = router.currentRoute.value.meta.menu;

        if (config.method === 'get') {
            config.params = { ...config.params, menuName };
        } else if (config.method === 'post') {
            if (config.headers['Content-Type'] === HttpContentType.formData) {
                config.params = { ...config.params, menuName };
            }
            config.data = resolveParams({ ...config.data, menuName }, config.headers['Content-Type'] as HttpContentType);
        }


        // 添加sign
        const stringifyParams = encryptHexMd5(
            config.method === 'get'
                ? JSON.stringify(config.params || {}, jsonReplacer)
                : JSON.stringify(config.data || {})
        );

        config.headers['Sign'] = encrypt(
            `_t=${_t}&uuid=${uuid}&token=${config.headers['Authorization'] || ''}&params=${stringifyParams}`
        );
    }

    // 添加时间戳，防止缓存
    config.params = { ...config.params, _t };
    return config;
}, error => {
    Promise.reject(error);
});

// 响应拦截器
// TODO: 根据新项目重新调整 code 判断, 现在demo用的是 ClibService
service.interceptors.response.use(res => {
    const token = useToken();
    // 未设置状态码则默认成功状态
    const code = res.data.code || HttpStatus.ok;

    // 文件下载状态码置为200
    if (res.headers['content-type'] === 'application/octet-stream') {
        return res.data;
    }
    // 获取错误信息
    const msg = res.data.msg;
    if (code === 10010) {
        ElMessage({
            message: '当前账号已在其他设备登录！',
            type: 'error'
        });
        token.remove();
        router.replace('/login');
        return Promise.reject('error');
    } else if (code === HttpStatus.unauthorized) {
        token.remove();
        router.replace('/login');
    } else if (code === HttpStatus.internalServerError) {
        console.error(msg);
        return Promise.reject(new Error(msg));
    } else if (code !== HttpStatus.ok) {
        ElMessage({
            message: msg,
            type: 'error'
        });
        return Promise.reject(res.data);
    } else {
        return isString(res.data.code) ? res.data : res.data.data;
    }
}, error => {
    console.log('err' + error);
    let { message } = error;
    if (message == 'Network Error') {
        message = '后端接口连接异常';
    } else if (message.includes('timeout')) {
        message = '系统接口网络超时';
    } else if (message.includes('Request failed with status code')) {
        message = '系统接口' + message.substr(message.length - 3) + '异常';
    }
    ElMessage({
        message: message,
        type: 'error'
    });
    return Promise.reject(error);
});

export { service as api };
