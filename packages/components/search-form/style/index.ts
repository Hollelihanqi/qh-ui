import '@hd-custom/components/search-form/src/search-form.scss'

// 运行时样式依赖：SearchFormItem 可渲染 remote-search（isRemote）。
// 读取方与去重机制见 pro-table/style/index.ts 注释。
export const styleDependencies = ['remote-search']
