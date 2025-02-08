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
  const routes: RouteItem[] = []

  function scanDir(dir: string, baseRoute: string = '') {
    const files = fs.readdirSync(dir)

    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        scanDir(filePath, `${baseRoute}/${file}`)
      } else if (file.endsWith('.vue')) {
        const name = file.replace('.vue', '')
        if (name.toLowerCase() === 'index') {
          routes.push({
            path: baseRoute || '/',
            name: baseRoute.substring(1).replace(/\//g, '-') || 'home',
            component: `() => import('@/views${baseRoute}/Index.vue')`,
            meta: {
              title: baseRoute.split('/').pop() || 'Home'
            }
          })
        }
      }
    })
  }

  scanDir(viewsDir)

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
      .map((line, index) => index === 0 ? line : '    ' + line)
      .join('\n')}
  }
]`

  // 生成菜单文件
  const menuContent = `
export const menus = ${JSON.stringify(
    routes.map(route => ({
      label: route.meta?.title,
      href: route.path,
      code: route.path,
      closable: false,
      mode: 'router',
      icon: ''  // 如果需要默认图标，可以在这里设置
    })),
    null,
    2
  )}
`

  fs.writeFileSync(routesFile, routesContent)
  fs.writeFileSync(menuFile, menuContent)
}

// 初始生成
generateRouteAndMenu()

// 监听文件变化
chokidar.watch(viewsDir, {
  ignored: /(^|[\/\\])\../,
  persistent: true
}).on('all', (event, path) => {
  console.log(`检测到文件变化: ${event} ${path}`)
  generateRouteAndMenu()
}) 