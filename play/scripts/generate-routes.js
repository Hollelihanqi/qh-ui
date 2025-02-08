import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chokidar from 'chokidar';
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var viewsDir = path.resolve(__dirname, '../src/views');
var routesFile = path.resolve(__dirname, '../src/router/routes.ts');
var menuFile = path.resolve(__dirname, '../src/router/menu.ts');
function generateRouteAndMenu() {
    var routes = [];
    function scanDir(dir, baseRoute) {
        if (baseRoute === void 0) { baseRoute = ''; }
        var files = fs.readdirSync(dir);
        files.forEach(function (file) {
            var filePath = path.join(dir, file);
            var stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                scanDir(filePath, "".concat(baseRoute, "/").concat(file));
            }
            else if (file.endsWith('.vue')) {
                var name_1 = file.replace('.vue', '');
                if (name_1.toLowerCase() === 'index') {
                    routes.push({
                        path: baseRoute || '/',
                        name: baseRoute.substring(1).replace(/\//g, '-') || 'home',
                        component: "() => import('@/views".concat(baseRoute, "/Index.vue')"),
                        meta: {
                            title: baseRoute.split('/').pop() || 'Home'
                        }
                    });
                }
            }
        });
    }
    scanDir(viewsDir);
    // 生成路由文件
    var routesContent = "\nimport type { RouteRecordRaw } from 'vue-router'\n\nexport const routes: RouteRecordRaw[] = [\n  {\n    path: '/',\n    component: () => import('@/layout/Index.vue'),\n    children: ".concat(JSON.stringify(routes, null, 2)
        .replace(/"component": "(.+)"/g, '"component": $1')
        .replace(/"/g, "'")
        .split('\n')
        .map(function (line, index) { return index === 0 ? line : '    ' + line; })
        .join('\n'), "\n  }\n]");
    // 生成菜单文件
    var menuContent = "\nexport const menus = ".concat(JSON.stringify(routes.map(function (route) {
        var _a;
        return ({
            label: (_a = route.meta) === null || _a === void 0 ? void 0 : _a.title,
            href: route.path,
            code: route.path,
            closable: false,
            mode: 'router',
            icon: '' // 如果需要默认图标，可以在这里设置
        });
    }), null, 2), "\n");
    fs.writeFileSync(routesFile, routesContent);
    fs.writeFileSync(menuFile, menuContent);
}
// 初始生成
generateRouteAndMenu();
// 监听文件变化
chokidar.watch(viewsDir, {
    ignored: /(^|[\/\\])\../,
    persistent: true
}).on('all', function (event, path) {
    console.log("\u68C0\u6D4B\u5230\u6587\u4EF6\u53D8\u5316: ".concat(event, " ").concat(path));
    generateRouteAndMenu();
});
