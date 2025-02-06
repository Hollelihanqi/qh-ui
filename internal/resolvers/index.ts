// 定义解析器选项接口
export interface YtoCustomResolverOptions {
  /**
   * 是否导入样式文件
   * @default true
   */
  importStyle?: boolean
}

// 获取样式副作用
function getSideEffects(componentName: string, importStyle: boolean) {
  if (!importStyle) return
  return [
    `@yto/custom/theme-chalk/yto-${componentName}.css`
  ]
}

export const YtoCustomResolver = (options: YtoCustomResolverOptions = {}) => {
  const resolvedOptions = {
    importStyle: true,
    ...options
  }

  return {
    type: 'component' as const,
    resolve: (name: string) => {
      if (name.startsWith('Yto')) {
        const componentName = name.slice(3) // 去除 'Yto' 前缀
        const jsname = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
        return {
          name: name,
          from: `@yto/custom/es/components/${jsname}/index.mjs`,
          sideEffects: getSideEffects(jsname, resolvedOptions.importStyle)
        }
      }
    },
  }
}
