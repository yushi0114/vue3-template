import { fileURLToPath, URL } from 'node:url';
import { argv } from 'node:process';
import type { ConfigEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss';
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
export default ({ mode }: ConfigEnv): UserConfig => {
    return {
        plugins: [
            vue(),
            vueJsx(),
            unocss({
                presets: [
                    presetUno(),
                    presetAttributify(),
                    presetIcons({
                        cdn: 'https://esm.sh/',
                    }),
                ],
                shortcuts: {
                    'flex-center': 'flex items-center justify-center',
                    'flex-between': 'flex items-center justify-between',
                },
                transformers: [transformerDirectives()],
            }),
            autoImport({
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/,
                    /\.vue\?vue/, // .vue
                ],
                imports: [
                    'vue',
                    'vue-router',
                    'pinia',
                    {
                        '@vueuse/core': ['onKeyStroke', 'useFocus'],
                        '/src/utils/func.ts': ['omit', 'cloneDeep'],
                        '/src/composables/index.ts': ['useApi'],
                        'element-plus': ['ElMessage'],
                    },
                ],
                dirs: ['./composables', './components', './types', './utils', './stores'],
                resolvers: [elementPlusResolver(), iconsResolver({ prefix: 'Icon' })],
                eslintrc: {
                    enabled: true,
                },
            }),
            components({
                resolvers: [
                    iconsResolver({
                        enabledCollections: ['ep'],
                    }),
                    elementPlusResolver(),
                ],
            }),
            icons({
                autoInstall: true,
            }),
            // 使用unplugin-vue-components按需加载样式，开发环境会导致项目异常卡顿
            // 导致原因：vite会预加载style，当首次启动 vite 服务时会对 style 进行依赖预构建，，因为element-plus的按需样式会导入大量style文件，导致页面会卡住直至style构建完成
            // https://github.com/antfu/unplugin-vue-components/issues/361
            // 这里自定义一个vite插件，更改src/main.js内容，开发环境全局引入样式
            {
                name: 'import-element-plus-style',
                transform(code, id) {
                    if (/src\/main.ts$/.test(id)) {
                        if (mode === 'development') {
                            return {
                                code: `${code};import 'element-plus/dist/index.css';`,
                                map: null,
                            };
                        } else {
                            return {
                                code: `${code};import 'element-plus/theme-chalk/el-message-box.css';import 'element-plus/theme-chalk/el-message.css';`,
                                map: null,
                            };
                        }
                    }
                },
            },
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        css: {
            postcss: {
                plugins: [autoprefixer, postcssNesting],
            },
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "@/style/global.scss" as *; \n
                        @use "@/style/mixin.scss" as *; \n
                    `,
                },
            },
        },
        server: {
            // host: 'localhost',
            port: 8088,
            proxy: {
                '/clib-service': {
                    target: `http://${proxyHost}:10209`,
                    changeOrigin: true,
                },
                '/dms-service': {
                    target: `http://${proxyHost}:10208`,
                    changeOrigin: true,
                },
                '/lncredit': {
                    target: 'http://10.0.30.9',
                    changeOrigin: true,
                },
                '/zjfw': {
                    target: 'http://10.0.30.9',
                    changeOrigin: true,
                },
            },
        },
    };
};
