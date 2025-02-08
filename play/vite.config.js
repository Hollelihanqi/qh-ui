import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';
import { YtoCustomResolver } from '@yto/custom/resolvers';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
// const __dirname = fileURLToPath(new URL('.', import.meta.url))
// https://vite.dev/config/
// 获取样式副作用
// function getSideEffects(componentName: string, importStyle: boolean) {
//   if (!importStyle) return
//   return [
//     `@yto/custom/theme-chalk/yto-${componentName}.css`
//   ]
// }
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            '~/': "".concat(path.resolve(__dirname, 'src'), "/")
        }
    },
    plugins: [
        vue(),
        vueJsx({
            transformOn: true,
            mergeProps: true,
        }),
        Unocss(),
        AutoImport({
            imports: ['vue', 'vue-router'],
            resolvers: [
                ElementPlusResolver(),
            ],
            dts: true,
            eslintrc: {
                enabled: true,
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true,
            },
        }),
        Components({
            resolvers: [
                ElementPlusResolver({
                    importStyle: "sass",
                    directives: true,
                    // version: "2.9.3",
                }),
                YtoCustomResolver()
                // {
                //   type: 'component',
                //   resolve: (name: string) => {
                //     console.log("name1", name)
                //     if (name.startsWith('Yto')) {
                //       const componentName = name.slice(3) // 去除 'Yto' 前缀
                //       const jsname = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
                //       console.log("name2", jsname)
                //       //play/node_modules/@yto/custom/es/components/tabs/index.mjs
                //       return {
                //         name: name,
                //         from: `@yto/custom/es/components/${jsname}/index.mjs`,
                //         sideEffects: getSideEffects(jsname, true)
                //       }
                //     }
                //   },
                // }
            ],
        }),
        // ElementPlus({
        //   useSource: true,
        // }),
        visualizer()
    ],
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData 的内容会在每个 scss 文件的开头自动注入
                additionalData: "@use \"~/assets/styles/variables.scss\" as *;", // 配置全局 scss
            },
        },
    },
    server: {
        port: 3009,
        watch: {
            // 使用 ignored 选项，通过 ! 前缀来包含 dist 目录
            ignored: ['!**/dist/**']
        }
    }
});
