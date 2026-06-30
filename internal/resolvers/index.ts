import { COMPONENT_EXPORT_PREFIX, getComponentStyleName } from '../build-constants/src/pkg'

export interface HdCustomResolverOptions {
  /**
   * 是否自动导入组件样式文件。
   *
   * @default true
   */
  importStyle?: boolean
}

function getSideEffects(componentName: string, importStyle: boolean) {
  if (!importStyle) return
  return [`@rdeam/qui/theme-chalk/${getComponentStyleName(componentName)}.css`]
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
          from: `@rdeam/qui/es/components/${jsname}/index.mjs`,
          sideEffects: getSideEffects(jsname, resolvedOptions.importStyle),
        }
      }
    },
  }
}
