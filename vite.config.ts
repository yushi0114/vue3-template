import { fileURLToPath, URL } from 'node:url';
import { argv } from 'node:process';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import unocss from 'unocss/vite';
import { presetUno } from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';
import autoprefixer from 'autoprefixer';
import postcssNesting from 'postcss-nesting';


let proxyHost = '127.0.0.1';

// start:local
if (argv[3] === '--env' && argv[4] === 'local') {
    proxyHost = 'localhost';
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        unocss({
            presets: [
                presetUno(),
            ],
            transformers: [
                transformerDirectives(),
            ]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        postcss: {
            plugins: [
                autoprefixer, postcssNesting,
            ]
        }
    },
    server: {
        host: 'localhost',
        port: 8088,
        proxy: {
            '/clib-service': {
                target: `http://${proxyHost}:10209`,
                changeOrigin: true
            },
        }
    }
});
