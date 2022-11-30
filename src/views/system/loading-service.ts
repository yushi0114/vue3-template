/**
 * @author songxiwen
 * @date 2022/11/15
 * @desc 全局loading service
 */

import {ElLoading} from 'element-plus';
import type {LoadingInstance} from 'element-plus/es/components/loading/src/loading';

export class LoadingService {
    private static instance?: LoadingService;
    private loadingInstance?: LoadingInstance;
    private loadingStatic: typeof ElLoading;
    static getInstance() {
        if (!this.instance) {
            this.instance = new LoadingService();
        }
        return this.instance;
    }
    private constructor() {
        this.loadingStatic = ElLoading;
    }

    loading() {
        this.loadingInstance = this.loadingStatic?.service({
            lock: true,
            text: '加载中'
        });
    }

    stop() {
        this.loadingInstance?.close();
    }
}
