import type { App } from 'vue';
import Watermark from './watermark';
import { realImg } from './real-img';
import Empty from './empty';

export function installDirective(app: App) {
    app.directive(Watermark.name, Watermark);
    app.directive(realImg.name, realImg);
    app.directive(Empty.name, Empty);
}
