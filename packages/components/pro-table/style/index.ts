import '@hd-custom/components/pro-table/src/pro-table.scss'

// 运行时样式依赖：pro-table 内部渲染了 search-form 与 table。
// 由 es 构建的 style-index 生成器（internal/build2/gen-style-index.ts）读取，
// 产出 es/components/pro-table/style/index.mjs；resolver 据此按需拉取，
// 并通过模块路径去重避免与直接使用 <hd-table>/<hd-search-form> 时重复打包。
export const styleDependencies = ['search-form', 'table']
