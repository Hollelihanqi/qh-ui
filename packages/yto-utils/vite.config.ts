import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      outDir: ['dist/types'],
      include: ['./src/**/*.ts'],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@yto/utils',
      fileName: 'index',
      // 导出模块格式
      formats: ['es'],
    },
    rollupOptions: {
      // 确保外部化处理那些你的库中不需要的依赖
      external: ['vue', 'axios'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
