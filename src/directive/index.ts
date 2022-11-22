import type { App } from 'vue';
import Watermark from './watermark';
import { realImg } from './real-img';

export function installDirective(app: App) {
    app.directive(Watermark.name, Watermark);
    realImg(app);
}
