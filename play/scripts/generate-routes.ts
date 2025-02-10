import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import chokidar from 'chokidar'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const viewsDir = path.resolve(__dirname, '../src/views')
const routesFile = path.resolve(__dirname, '../src/router/routes.ts')
const menuFile = path.resolve(__dirname, '../src/router/menu.ts')

interface RouteItem {
  path: string
  name: string
  component: string
  meta?: {
    title: string
  }
}

function generateRouteAndMenu() {
  console.log('开始生成路由和菜单...')
  const routes: RouteItem[] = []

  function scanDir(dir: string, baseRoute: string = '') {
    // console.log(`扫描目录: ${dir}`)
    const files = fs.readdirSync(dir)

    files.forEach((file) => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        // console.log(`发现子目录: ${file}`)
        scanDir(filePath, `${baseRoute}/${file}`)
      } else if (file.endsWith('.vue')) {
        const name = file.replace('.vue', '')
        if (name.toLowerCase() === 'index') {
          console.log(`发现Index组件: ${filePath}`)
          routes.push({
            path: baseRoute || '/',
            name: baseRoute.substring(1).replace(/\//g, '-') || 'home',
            component: `() => import('@/views${baseRoute}/Index.vue')`,
            meta: {
              title: baseRoute.split('/').pop() || 'Home',
            },
          })
        }
      }
    })
  }

  scanDir(viewsDir)

  // console.log('生成的路由:', routes)

  // 生成路由文件
  const routesContent = `
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/Index.vue'),
    children: ${JSON.stringify(routes, null, 2)
      .replace(/"component": "(.+)"/g, '"component": $1')
      .replace(/"/g, "'")
      .split('\n')
      .map((line, index) => (index === 0 ? line : '    ' + line))
      .join('\n')}
  }
]`

  // 生成菜单文件
  const menuContent = `
export const menus = ${JSON.stringify(
    routes.map((route) => ({
      label: route.meta?.title,
      href: route.path,
      code: route.path,
      closable: false,
      mode: 'router',
      icon: '', // 如果需要默认图标，可以在这里设置
    })),
    null,
    2,
  )}
`

  fs.writeFileSync(routesFile, routesContent)
  console.log(`路由文件已生成: ${routesFile}`)

  fs.writeFileSync(menuFile, menuContent)
  console.log(`菜单文件已生成: ${menuFile}`)
}

console.log('脚本开始执行...')
console.log(`监听目录: ${viewsDir}`)

// 初始生成
generateRouteAndMenu()

// 修改监听配置
const watcher = chokidar.watch(viewsDir, {
  ignored: /(^|[\/\\])\../, // 忽略隐藏文件
  persistent: true,
  depth: 0, // 只监听 views 目录下的直接子目录
  ignoreInitial: false, // 首次启动时也触发事件
})

watcher
  .on('ready', () => {
    console.log('初始扫描完成，开始监听文件变化...')
  })
  .on('addDir', (path) => {
    // 确保只处理 views 的直接子目录
    if (path !== viewsDir && path.split('/').length === viewsDir.split('/').length + 1) {
      console.log(`检测到新目录: ${path}`)
      generateRouteAndMenu()
    }
  })
  .on('unlinkDir', (path) => {
    // 确保只处理 views 的直接子目录
    if (path !== viewsDir && path.split('/').length === viewsDir.split('/').length + 1) {
      console.log(`检测到目录被删除: ${path}`)
      generateRouteAndMenu()
    }
  })
  .on('error', (error) => {
    console.error('监听错误:', error)
  })

// 确保进程不会立即退出
process.on('SIGINT', () => {
  console.log('停止监听...')
  watcher.close()
  process.exit(0)
})
