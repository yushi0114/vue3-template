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
import autoImport from 'unplugin-auto-import/vite';
import icons from 'unplugin-icons/vite';
import iconsResolver from 'unplugin-icons/resolver';
import components from 'unplugin-vue-components/vite';
import { ElementPlusResolver as elementPlusResolver } from 'unplugin-vue-components/resolvers';

let proxyHost = '10.0.30.5';

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
        }),
        autoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/, /\.vue\?vue/, // .vue
            ],
            imports: [
                'vue',
                'vue-router',
                'pinia',
            ],
            dirs: [
                './composables',
                './components',
                './types',
                './utils',
                './common',
                './stores',
            ],
            resolvers: [
                elementPlusResolver({
                }),
                iconsResolver({ prefix: 'Icon' })
            ],
            eslintrc: {
                enabled: true,
            }
        }),
        components({
            resolvers: [
                iconsResolver({
                    enabledCollections: ['ep'],
                }),
                elementPlusResolver({
                }),
            ],
        }),
        icons({
            autoInstall: true,
        }),
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
        },
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @use "@/style/global.scss" as *; \n
                    @use "@/style/mixin.scss" as *; \n
                `,
            }
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
