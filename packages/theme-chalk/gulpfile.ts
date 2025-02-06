import { series } from 'gulp'
import { buildStyles } from './tasks/buildStyles'
import { buildUnoCSS } from './tasks/buildUnoCSS'
import { mergeCSSFiles } from './tasks/mergeCSSFiles'
import { buildGlobalCSS } from './tasks/buildGlobalCSS'

export default series(
  buildStyles,     // 1. 构建基础样式
  buildUnoCSS,     // 2. 生成 UnoCSS
  mergeCSSFiles,   // 3. 合并组件 CSS
  buildGlobalCSS   // 4. 生成全局 CSS
)