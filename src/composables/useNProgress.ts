import { useStyleTag } from '@vueuse/core';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

function initNProgress() {
    NProgress.configure({
        showSpinner: false,
    });
}

export function useNProgress(option?: {
    color?: string
}) {

    const opt = Object.assign({
        color: '#FFAF36',
    }, option);

    initNProgress();
    const { load } = useStyleTag(`
#nprogress {
    pointer-events: none;
}

#nprogress .bar {
    background: ${opt.color} !important;
}
    `);

    load();

    return NProgress;
}
