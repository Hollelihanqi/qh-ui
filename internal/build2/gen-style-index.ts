import { readdirSync, existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { compRoot, hdOutput } from '@hd-custom/build-utils'
import { consola } from 'consola'

/**
 * 生成 es 侧的组件样式索引（element-plus 风格）。
 *
 * 每个组件产出 es/components/<name>/style/index.mjs，内容为：
 *   import '依赖组件 css'   // 依赖的「传递闭包」，叶子在前
 *   ...
 *   import '自身 css'
 *
 * resolver 的 sideEffects 指向这个 index.mjs。同一个 css 文件无论被多少组件
 * 的 style-index 引用，打包器都按模块路径去重，只产出一份——彻底替代过去
 * "父组件 scss @import 子组件 scss 把规则物理内联"导致的重复。
 *
 * 为什么是传递闭包而非直接依赖：resolver 只为模板里直接出现的组件拉 style-index
 * （如 <hd-pro-table>）。嵌套子组件（pro-table 内部的 search-form、search-form
 * 内部的 remote-search）不会被 resolver 单独解析，所以它们的样式必须由顶层组件的
 * style-index 一并拉全。这与 element-plus 生成 style/css 的方式一致。
 *
 * 依赖清单读自各组件 style/index.ts 里的 `export const styleDependencies = [...]`（直接依赖）。
 * 用正则提取而非动态 import：style/index.ts 内含 .scss import，运行时会报未知扩展名。
 */
const STYLE_DEPS_RE = /export\s+const\s+styleDependencies\s*=\s*\[([^\]]*)\]/

function readStyleDependencies(name: string): string[] {
  const styleIndex = resolve(compRoot, name, 'style/index.ts')
  if (!existsSync(styleIndex)) return []
  const matched = readFileSync(styleIndex, 'utf-8').match(STYLE_DEPS_RE)
  if (!matched) return []
  return matched[1]
    .split(',')
    .map((s) => s.trim().replace(/['"`]/g, ''))
    .filter(Boolean)
}

/** 后序 DFS：返回 name 的全部传递依赖（叶子在前、name 的直接依赖在后），不含 name 自身。 */
function resolveTransitiveDeps(
  name: string,
  directMap: Map<string, string[]>,
  ordered: string[],
  visited: Set<string>,
  onStack: Set<string>,
) {
  if (onStack.has(name)) {
    throw new Error(`检测到样式依赖环：${[...onStack, name].join(' -> ')}`)
  }
  if (visited.has(name)) return
  onStack.add(name)
  for (const dep of directMap.get(name) ?? []) {
    resolveTransitiveDeps(dep, directMap, ordered, visited, onStack)
  }
  onStack.delete(name)
  visited.add(name)
  ordered.push(name)
}

export async function generateStyleIndex() {
  const components = readdirSync(compRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  const directMap = new Map<string, string[]>()
  for (const name of components) directMap.set(name, readStyleDependencies(name))

  let count = 0
  for (const name of components) {
    // 后序 DFS 天然把 name 自身放在最后（依赖叶子在前），即完整且顺序正确的导入清单。
    const closure: string[] = []
    resolveTransitiveDeps(name, directMap, closure, new Set(), new Set())
    const lines = closure.map((dep) => `import '../../../../theme-chalk/hd-${dep}.css'`)
    const outDir = join(hdOutput, 'es', 'components', name, 'style')
    mkdirSync(outDir, { recursive: true })
    writeFileSync(join(outDir, 'index.mjs'), `${lines.join('\n')}\n`)

    // 让组件 JS 入口自身引入样式索引：resolver 只需返回 index.mjs，消费方 vite 预构建时
    // 把 style/index.mjs 折叠进 index.mjs 的同一个预构建块，每组件 JS 入口 2→1，
    // dev 下切菜单因“发现新依赖”而 reload 的次数减半。
    const indexMjs = join(hdOutput, 'es', 'components', name, 'index.mjs')
    if (existsSync(indexMjs)) {
      const marker = `import './style/index.mjs'`
      const raw = readFileSync(indexMjs, 'utf-8')
      if (!raw.startsWith(marker)) {
        writeFileSync(indexMjs, `${marker}\n${raw}`)
      }
    }

    count += 1
  }

  consola.success(
    `生成 ${count} 个组件样式索引 -> ${join(hdOutput, 'es', 'components', '<name>', 'style', 'index.mjs')}`,
  )
}
