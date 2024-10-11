import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import fs, { copyFileSync } from 'fs'
import { readFile } from 'fs/promises'
import { outputFile } from 'fs-extra'
import { visualizer } from 'rollup-plugin-visualizer'
import MoveFile from './vite-plugin-move'
import dts from 'vite-plugin-dts'
import { compRoot, buildOutput } from '@yto-custom/build-utils'
import UnoCSS from 'unocss/vite'

// function convertToYtoCamelCase(input) {
// // 分割字符串，支持中划线和空格
// const words = input.split(/[- ]+/)

// // 将每个单词首字母大写
// const camelCaseWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

// // 合并单词并加前缀
// const result = 'Yto' + camelCaseWords.join('')

// return result
// }

// 从组件目录获取所有组件的入口
// function getComponentEntries() {
// const files = fs.readdirSync(compRoot)
// const componentEntries = {}
// files.forEach((file) => {
// const componentDir = path.join(compRoot, file)
// if (fs.statSync(resolve(componentDir)).isDirectory()) {
// const entryFile = path.join(componentDir, 'index.ts')
// if (fs.existsSync(resolve(entryFile))) {
// // 注意：这里我们修改了输出路径，使其进入 components 目录
// componentEntries[`${file}`] = resolve(entryFile)
// }
// }
// })
// return componentEntries
// }

// 从组件目录入口 index.ts 配置获取需要打包的组件入口
// function getComponentEntries2() {
// const indexFilePath = path.join(compRoot, 'index.ts')
// const indexFileContent = fs.readFileSync(indexFilePath, 'utf-8')

// // 解析有效的导出路径
// const lines = indexFileContent.split('\n')
// const exportStatements = lines.filter(
// (line) => !line.trim().startsWith('//') && line.trim().startsWith('export { default as '),
// )

// const components = exportStatements
// .map((statement) => {
// const match = statement.match(/export \{ default as (._?) \} from '\.\/(._?)'/)
// if (match) {
// const componentPath = path.resolve(compRoot, match[2], 'index.ts')
// const componentDirName = path.basename(path.dirname(componentPath))
// return { name: componentDirName, path: componentPath }
// }
// return null
// })
// .filter(Boolean)

// // 返回结果
// return components.reduce((acc, component) => {
// acc[component.name] = component.path
// return acc
// }, {})
// }
function getComponentEntries2() {
const indexFilePath = path.join(compRoot, 'index.ts')
const indexFileContent = fs.readFileSync(indexFilePath, 'utf-8')

// 解析有效的导出路径
const lines = indexFileContent.split('\n')
const exportStatements = lines.filter(
(line) => !line.trim().startsWith('//') && line.trim().startsWith('export \* from '),
)

const components = exportStatements
.map((statement) => {
const match = statement.match(/export \* from '\.\/(.\*?)'/)
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

// function getComponentEntries2() {
// const indexFilePath = path.join(compRoot, 'index.ts')
// const indexFileContent = fs.readFileSync(indexFilePath, 'utf-8')

// // 解析有效的导出路径
// const lines = indexFileContent.split('\n')
// const exportStatements = lines.filter((line) => !line.trim().startsWith('//') && line.trim().startsWith('export {'))

// const components = exportStatements
// .map((statement) => {
// // 修改正则表达式以匹配 `export { YtoTable } from './table'` 这样的形式
// const match = statement.match(/export \{ (._?) \} from '\.\/(._?)'/)
// if (match) {
// const componentPath = path.resolve(compRoot, match[2], 'index.ts')
// const componentName = path.basename(path.dirname(componentPath))
// // const componentDirName = path.basename(path.dirname(componentPath))
// return { name: componentName, path: componentPath }
// }
// return null
// })
// .filter(Boolean)

// // 返回结果
// return components.reduce((acc, component) => {
// acc[component.name] = component.path
// return acc
// }, {})
// }

// function getComponentEntries3() {
// const indexFilePath = path.join(compRoot, 'index.ts')
// const indexFileContent = fs.readFileSync(indexFilePath, 'utf-8')

// // 解析有效的导入路径
// const lines = indexFileContent.split('\n')
// const importStatements = lines.filter((line) => line.trim().startsWith('import'))

// const components = importStatements
// .map((statement) => {
// // 匹配形如 `import { YtoTable } from './table'` 的语句
// const match = statement.match(/import \{ (._?) \} from '\.\/(._?)'/)
// if (match) {
// const componentName = match[1]
// const componentDir = match[2]
// const componentPath = path.resolve(compRoot, componentDir, 'index.ts')
// return { name: componentName, path: componentPath }
// }
// return null
// })
// .filter(Boolean)

// // 返回结果
// return components.reduce((acc, component) => {
// acc[component.name] = component.path
// return acc
// }, {})
// }
const componentEntries = getComponentEntries2()

// const componentEntries2 = getComponentEntries3()
// console.log(componentEntries2)

function isPathInRoot(compRoot, componentPath) {
// 规范化路径
const normalizedCompRoot = path.normalize(compRoot)
const normalizedComponentPath = path.normalize(componentPath)

// 判断 componentPath 是否以 compRoot 作为前缀
return normalizedComponentPath.startsWith(normalizedCompRoot)
}

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
sourcemap: false,
cssCodeSplit: true, // 启用 CSS 代码分割
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
symbols: false,
},
entryFileNames: '[name].js',
// entryFileNames: '[name].js', // 确保入口文件名不带哈希
// chunkFileNames: '[name].js', // 确保 chunk 文件名不带哈希
// assetFileNames: '[name].[ext]', // 确保静态资源文件名不带哈希
assetFileNames: (chunkInfo) => {
// if (chunkInfo.name === 'style.css') {
// return 'index.css'
// }
console.log(chunkInfo)
if (chunkInfo.type === 'asset' && /\.(css)$/i.test(chunkInfo.name as string)) {
return 'theme/[name].[ext]'
}
return chunkInfo.name as string
},
manualChunks(id) {
// 使用 path.resolve 将路径转换为绝对路径进行比较
const normalizedId = path.resolve(id)
const normalizedCompRootIndex = path.resolve(compRoot, 'index.ts')
if (id.endsWith('index.ts') && isPathInRoot(compRoot, id) && normalizedId !== normalizedCompRootIndex) {
// 获取组件名称
// const componentName = path.basename(path.dirname(id))
// return componentName
} else if (id.includes('packages/utils') || id.includes('packages/yto-utils')) {
return 'utils'
} else if (id.includes('packages/directives')) {
return 'directives'
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

/\*_ 打包结束之后将一些静态文件进行移入 _/
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
}
