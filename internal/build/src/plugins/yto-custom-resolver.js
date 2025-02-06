// 定义解析器选项说明
/**
 * @typedef {Object} YtoCustomResolverOptions
 * @property {boolean} [importStyle=true] - 是否导入样式文件
 */

// 获取样式副作用
function getSideEffects(componentName, importStyle) {
  if (!importStyle) return
  return [
    `@yto/custom/theme-chalk/yto-${componentName}.css`
  ]
}

/**
 * @param {YtoCustomResolverOptions} options
 */
export const YtoCustomResolver = (options = {}) => {
  const resolvedOptions = {
    importStyle: true,
    ...options
  }

  return {
    type: 'component',
    resolve: (name) => {
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