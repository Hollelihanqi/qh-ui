import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from 'node:path'
// import { fileURLToPath } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import { YtoCustomResolver } from '@yto/custom/resolvers'



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
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
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
    visualizer()
  ],
  resolve: {
    alias: {
      // '@yto/custom': path.resolve(__dirname, '../dist/yto-custom'),
    }
  },
  server: {
    watch: {
      // 使用 ignored 选项，通过 ! 前缀来包含 dist 目录
      ignored: ['!**/dist/**']
    }
  }
})
