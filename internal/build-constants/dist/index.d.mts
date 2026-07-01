declare const PKG_PREFIX = "@hd-custom";
declare const PKG_NAME = "@rdeam/hd-ui";
declare const PKG_CAMELCASE_NAME = "HdCustom";
declare const PKG_BRAND_NAME = "Hd Custom";
/**
 * 组件导出名 / Vue 注册名的统一前缀。
 *
 * 只改这里，就可以同时影响：
 * - 组件导出名：`HdJdataViewer`
 * - Vue 注册名：`HdJdataViewer`
 * - resolver 自动解析规则里的组件前缀
 */
declare const COMPONENT_EXPORT_PREFIX = "Hd";
/**
 * 组件样式类名 / 主题文件名的统一前缀。
 *
 * 只改这里，就可以同时影响：
 * - 组件样式类名：`hd-uploader`
 * - 主题构建文件：`hd-uploader.css`
 * - resolver 的 sideEffects 样式路径
 */
declare const COMPONENT_STYLE_PREFIX = "hd";
/**
 * kebab-case 转 PascalCase。
 *
 * 示例：`date-picker` -> `DatePicker`
 */
declare function toPascalCase(name: string): string;
/**
 * kebab-case 转 camelCase。
 *
 * 示例：`date-picker` -> `datePicker`
 */
declare function toCamelCase(name: string): string;
/**
 * 根据组件目录名生成组件导出名。
 *
 * 示例：`date-picker` -> `HdDatePicker`
 */
declare function getComponentExportName(componentName: string): string;
/**
 * 根据组件目录名生成样式名 / 主题文件名前缀。
 *
 * 示例：`date-picker` -> `hd-date-picker`
 */
declare function getComponentStyleName(componentName: string): string;

declare const REPO_OWNER = "hd-custom";
declare const REPO_NAME = "hd-custom";
declare const REPO_PATH = "hd-custom/hd-custom";
declare const REPO_BRANCH = "dev";

export { COMPONENT_EXPORT_PREFIX, COMPONENT_STYLE_PREFIX, PKG_BRAND_NAME, PKG_CAMELCASE_NAME, PKG_NAME, PKG_PREFIX, REPO_BRANCH, REPO_NAME, REPO_OWNER, REPO_PATH, getComponentExportName, getComponentStyleName, toCamelCase, toPascalCase };
