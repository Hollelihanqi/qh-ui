import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import fs, { copyFileSync } from 'fs'
import { readFile } from 'fs/promises'
import { outputFile, copy } from 'fs-extra'
import { visualizer } from 'rollup-plugin-visualizer'
import MoveFile from './vite-plugin-move'
import dts from 'vite-plugin-dts'
import { compRoot, buildOutput, pkgRoot, directiveRoot } from '@yto-custom/build-utils'
import UnoCSS from 'unocss/vite'

function getComponentEntries2() {
  const indexFilePath = path.join(compRoot, 'index.ts')
  const indexFileContent = fs.readFileSync(indexFilePath, 'utf-8')

  // 解析有效的导出路径
  const lines = indexFileContent.split('\n')
  const exportStatements = lines.filter(
    (line) => !line.trim().startsWith('//') && line.trim().startsWith('export * from '),
  )

  const components = exportStatements
    .map((statement) => {
      const match = statement.match(/export \* from '\.\/(.*?)'/)
      if (match) {
        const componentPath = path.resolve(compRoot, match[1], 'index.ts')
        const componentDirName = path.basename(path.dirname(componentPath))
        // const componentName = convertToYtoCamelCase(componentDirName)
        return { name: componentDirName, path: componentPath }
      }
      return null
    })
    .filter(Boolean)

  // 返回结果
  return components.reduce((acc, component) => {
    acc[component.name] = component.path
    return acc
  }, {})
}

const componentEntries = getComponentEntries2()

export default defineConfig({
  plugins: [
    vue(),

    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),

    UnoCSS({
      layers: {
        component: 10,
      },
    }),

    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'types/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: 'types/.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),

    vueSetupExtend(),

    dts({
      tsconfigPath: './tsconfig.build.json',
      outDir: ['dist/types'], // 可以指定一个数组来输出到多个目录中
    }),

    MoveFile(() => {
      move()
    }),

    visualizer(),
  ],
  build: {
    target: 'modules',
    emptyOutDir: false,
    sourcemap: true,
    lib: {
      entry: {
        index: resolve('./index.ts'),
        ...componentEntries,
      },
      name: 'YtoCustom',
    },
    rollupOptions: {
      output: [
        {
          name: 'YtoCustom',
          format: 'es', // ES模块格式
          dir: 'dist/es', // 输出目录
          exports: 'named',
          generatedCode: {
            symbols: true,
          },
          entryFileNames: '[name].js',
          manualChunks(id) {
            if (id.includes('packages/utils') || id.includes('packages/yto-utils')) {
              return 'utils'
            } else if (id.includes('packages/directives')) {
              return 'directives'
            } else if (id.includes('simple-uploader')) {
              return 'simple-uploader'
            } else if (id.includes('node_modules')) {
              // 将 node_modules 中的依赖打包到 vendor chunk 中
              return 'vendor'
            }
          },
        },
      ],
      external: [
        'vue',
        'vue-router',
        'echarts',
        'axios',
        '@vue/runtime-core',
        'gold-core',
        'element-plus',
        '@element-plus/icons-vue',
        'immutable',
        'spark-md5',
      ],
    },
  },
})

/** 打包结束之后将一些静态文件进行移入 */
const move = (): void => {
  readFile('./package.json').then((data: any) => {
    const json = JSON.parse(data)
    delete json.scripts
    delete json.publishConfig.directory
    outputFile(path.resolve('./dist', `package.json`), JSON.stringify(json), 'utf-8')
    const files = [
      { input: './README.md', outDir: 'dist/README.md' },
      { input: './LICENSE', outDir: 'dist/LICENSE' },
    ] as const

    files.forEach((item): void => {
      copyFileSync(item.input, item.outDir)
    })
    console.warn('\n' + `${json.name} ${json.version} 版本打包成功! ` + '\n')
  })

  const stylePath = path.resolve(buildOutput, 'es/style.css')
  const styleIPath = path.resolve(buildOutput, 'index.css')
  fs.copyFile(stylePath, styleIPath, (copyErr) => {
    if (copyErr) {
      console.error('Error copying file:', copyErr)
      return
    }

    // 删除源文件
    fs.unlink(stylePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error('Error deleting source file:', unlinkErr)
      } else {
        console.log('style.css 从 dist/es 移动到 dist/index.css!')
      }
    })
  })

  const resolverPath = path.resolve(pkgRoot, 'resolver/index.ts')
  const resolverIPath = path.resolve(buildOutput, 'resolve.js')
  fs.copyFile(resolverPath, resolverIPath, (copyErr) => {
    if (copyErr) {
      console.error('Error copying file:', copyErr)
      return
    }
  })

  const directivesIPath = path.resolve(buildOutput, 'directives')

  // copy(directiveRoot, buildOutput, (err) => {
  //   if (err) return console.error(err)
  //   console.log('指令包复制成功!')
  // })
  copyDirectory(directiveRoot, directivesIPath)
}

async function copyDirectory(sourceDir, destinationDir) {
  try {
    await copy(sourceDir, destinationDir, { dereference: true })
    console.log('指令目录复制成功！')
  } catch (err) {
    console.error('复制目录时出错:', err)
  }
}
