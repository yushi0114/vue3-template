import type { App } from 'vue';
import Watermark from './watermark';

export function installDirective(app: App) {
    app.directive(Watermark.name, Watermark);
}
