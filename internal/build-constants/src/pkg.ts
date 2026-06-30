export const PKG_PREFIX = '@hd-custom'
export const PKG_NAME = '@rdeam/qui'
export const PKG_CAMELCASE_NAME = 'HdCustom'
export const PKG_BRAND_NAME = 'Hd Custom'

/**
 * 组件导出名 / Vue 注册名的统一前缀。
 *
 * 只改这里，就可以同时影响：
 * - 组件导出名：`HdJdataViewer`
 * - Vue 注册名：`HdJdataViewer`
 * - resolver 自动解析规则里的组件前缀
 */
export const COMPONENT_EXPORT_PREFIX = 'Hd'

/**
 * 组件样式类名 / 主题文件名的统一前缀。
 *
 * 只改这里，就可以同时影响：
 * - 组件样式类名：`hd-uploader`
 * - 主题构建文件：`hd-uploader.css`
 * - resolver 的 sideEffects 样式路径
 */
export const COMPONENT_STYLE_PREFIX = 'hd'

/**
 * kebab-case 转 PascalCase。
 *
 * 示例：`date-picker` -> `DatePicker`
 */
export function toPascalCase(name: string) {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

/**
 * kebab-case 转 camelCase。
 *
 * 示例：`date-picker` -> `datePicker`
 */
export function toCamelCase(name: string) {
  const pascalName = toPascalCase(name)
  return pascalName.charAt(0).toLowerCase() + pascalName.slice(1)
}

/**
 * 根据组件目录名生成组件导出名。
 *
 * 示例：`date-picker` -> `HdDatePicker`
 */
export function getComponentExportName(componentName: string) {
  return `${COMPONENT_EXPORT_PREFIX}${toPascalCase(componentName)}`
}

/**
 * 根据组件目录名生成样式名 / 主题文件名前缀。
 *
 * 示例：`date-picker` -> `hd-date-picker`
 */
export function getComponentStyleName(componentName: string) {
  return `${COMPONENT_STYLE_PREFIX}-${componentName}`
}
