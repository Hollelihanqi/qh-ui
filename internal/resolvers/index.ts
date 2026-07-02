import { COMPONENT_EXPORT_PREFIX } from '../build-constants/src/pkg'

export interface HdCustomResolverOptions {
  /**
   * 是否自动导入组件样式文件。
   *
   * 样式入口是每个组件的 es/components/<name>/style/index.mjs，它内部 import 自身
   * 与依赖组件的 theme-chalk css。同一 css 被多个组件引用时由打包器按模块路径去重，
   * 因此 resolver 无需维护任何组件依赖表。
   *
   * @default true
   */
  importStyle?: boolean
}

function getSideEffects(componentName: string, importStyle: boolean) {
  if (!importStyle) return
  return [`@rdeam/hd-ui/es/components/${componentName}/style/index.mjs`]
}

export const HdCustomResolver = (options: HdCustomResolverOptions = {}) => {
  const resolvedOptions = {
    importStyle: true,
    ...options,
  }

  return {
    type: 'component' as const,
    resolve: (name: string) => {
      if (name.startsWith(COMPONENT_EXPORT_PREFIX)) {
        const componentName = name.slice(COMPONENT_EXPORT_PREFIX.length)
        const jsname = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

        return {
          name,
          from: `@rdeam/hd-ui/es/components/${jsname}/index.mjs`,
          sideEffects: getSideEffects(jsname, resolvedOptions.importStyle),
        }
      }
    },
  }
}
