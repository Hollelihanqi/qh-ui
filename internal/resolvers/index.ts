import { readdirSync, existsSync } from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { COMPONENT_EXPORT_PREFIX } from '../build-constants/src/pkg'

/**
 * 组件解析器。
 *
 * 组件 JS 入口（es/components/<name>/index.mjs）自身已 import 它的样式索引
 * （style/index.mjs，含传递依赖的 theme-chalk css），所以这里只返回 from、
 * 不再单独声明样式 sideEffects。样式随组件 JS 一起加载，css 按模块路径去重。
 */
export const HdCustomResolver = () => {
  return {
    type: 'component' as const,
    resolve: (name: string) => {
      if (name.startsWith(COMPONENT_EXPORT_PREFIX)) {
        const componentName = name.slice(COMPONENT_EXPORT_PREFIX.length)
        const jsname = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

        return {
          name,
          from: `@rdeam/hd-ui/es/components/${jsname}/index.mjs`,
        }
      }
    },
  }
}

/**
 * dev 预构建插件（可选）。
 *
 * hd-ui 组件都是 node_modules 里的 .mjs，dev 下首次用到会被 vite 按需预构建并 reload。
 * 路由懒加载 + 每个新页面用到新组件 → 切菜单时反复 reload。
 * 在 vite plugins 里加一行 hdUiDevPlugin()，启动时把所有组件入口一次性预构建，
 * 即可杜绝运行时补构建造成的 reload。生产构建不受影响。
 *
 * 用法：
 *   import { HdCustomResolver, hdUiDevPlugin } from '@rdeam/hd-ui/resolvers'
 *   plugins: [Components({ resolvers: [HdCustomResolver()] }), hdUiDevPlugin()]
 */
export function hdUiDevPlugin() {
  return {
    name: 'hd-ui:optimize-deps',
    config(config: any) {
      // 本文件发布后位于 <pkg>/resolvers/index.mjs，组件在 <pkg>/es/components。
      const componentsDir = path.resolve(dirname(fileURLToPath(import.meta.url)), '..', 'es', 'components')
      if (!existsSync(componentsDir)) return
      const entries = readdirSync(componentsDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .flatMap((d) => [
          `@rdeam/hd-ui/es/components/${d.name}/index.mjs`,
          `@rdeam/hd-ui/es/components/${d.name}/style/index.mjs`,
        ])
      config.optimizeDeps = config.optimizeDeps ?? {}
      config.optimizeDeps.include = [...(config.optimizeDeps.include ?? []), ...entries]
    },
  }
}
