import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import chokidar from 'chokidar'
var __filename = fileURLToPath(import.meta.url)
var __dirname = path.dirname(__filename)
var viewsDir = path.resolve(__dirname, '../src/views')
var routesFile = path.resolve(__dirname, '../src/router/routes.ts')
var menuFile = path.resolve(__dirname, '../src/router/menu.ts')
function generateRouteAndMenu() {
  console.log('开始生成路由和菜单...')
  var routes = []
  function scanDir(dir, baseRoute) {
    if (baseRoute === void 0) {
      baseRoute = ''
    }
    // console.log(`扫描目录: ${dir}`)
    var files = fs.readdirSync(dir)
    files.forEach(function (file) {
      var filePath = path.join(dir, file)
      var stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        // console.log(`发现子目录: ${file}`)
        scanDir(filePath, ''.concat(baseRoute, '/').concat(file))
      } else if (file.endsWith('.vue')) {
        var name_1 = file.replace('.vue', '')
        if (name_1.toLowerCase() === 'index') {
          console.log('\u53D1\u73B0Index\u7EC4\u4EF6: '.concat(filePath))
          routes.push({
            path: baseRoute || '/',
            name: baseRoute.substring(1).replace(/\//g, '-') || 'home',
            component: "() => import('@/views".concat(baseRoute, "/Index.vue')"),
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
  var routesContent =
    "\nimport type { RouteRecordRaw } from 'vue-router'\n\nexport const routes: RouteRecordRaw[] = [\n  {\n    path: '/',\n    component: () => import('@/layout/Index.vue'),\n    children: ".concat(
      JSON.stringify(routes, null, 2)
        .replace(/"component": "(.+)"/g, '"component": $1')
        .replace(/"/g, "'")
        .split('\n')
        .map(function (line, index) {
          return index === 0 ? line : '    ' + line
        })
        .join('\n'),
      '\n  }\n]',
    )
  // 生成菜单文件
  var menuContent = '\nexport const menus = '.concat(
    JSON.stringify(
      routes.map(function (route) {
        var _a
        return {
          label: (_a = route.meta) === null || _a === void 0 ? void 0 : _a.title,
          href: route.path,
          code: route.path,
          closable: false,
          mode: 'router',
          icon: '', // 如果需要默认图标，可以在这里设置
        }
      }),
      null,
      2,
    ),
    '\n',
  )
  fs.writeFileSync(routesFile, routesContent)
  console.log('\u8DEF\u7531\u6587\u4EF6\u5DF2\u751F\u6210: '.concat(routesFile))
  fs.writeFileSync(menuFile, menuContent)
  console.log('\u83DC\u5355\u6587\u4EF6\u5DF2\u751F\u6210: '.concat(menuFile))
}
console.log('脚本开始执行...')
console.log('\u76D1\u542C\u76EE\u5F55: '.concat(viewsDir))
// 初始生成
generateRouteAndMenu()
// 修改监听配置
var watcher = chokidar.watch(viewsDir, {
  ignored: /(^|[\/\\])\../, // 忽略隐藏文件
  persistent: true,
  depth: 0, // 只监听 views 目录下的直接子目录
  ignoreInitial: false, // 首次启动时也触发事件
})
watcher
  .on('ready', function () {
    console.log('初始扫描完成，开始监听文件变化...')
  })
  .on('addDir', function (path) {
    // 确保只处理 views 的直接子目录
    if (path !== viewsDir && path.split('/').length === viewsDir.split('/').length + 1) {
      console.log('\u68C0\u6D4B\u5230\u65B0\u76EE\u5F55: '.concat(path))
      generateRouteAndMenu()
    }
  })
  .on('unlinkDir', function (path) {
    // 确保只处理 views 的直接子目录
    if (path !== viewsDir && path.split('/').length === viewsDir.split('/').length + 1) {
      console.log('\u68C0\u6D4B\u5230\u76EE\u5F55\u88AB\u5220\u9664: '.concat(path))
      generateRouteAndMenu()
    }
  })
  .on('error', function (error) {
    console.error('监听错误:', error)
  })
// 确保进程不会立即退出
process.on('SIGINT', function () {
  console.log('停止监听...')
  watcher.close()
  process.exit(0)
})
