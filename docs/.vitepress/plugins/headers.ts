import { resolveHeadersFromTokens, slugify } from '@mdit-vue/shared'
import type { MarkdownRenderer } from 'vitepress'

/**
 * 这个插件的主要功能是：
 * 1. 处理 Markdown 文档中的标题
 * 2. 将标题信息提取到 env 环境变量中
 */
export default (md: MarkdownRenderer): void => {
  // 保存原始的渲染函数引用
  const render = md.renderer.render.bind(md.renderer)

  // 定义要处理的标题级别：h2 到 h6
  const level = [2, 3, 4, 5, 6]

  // 重写渲染函数
  md.renderer.render = (tokens, options, env) => {
    // 从 tokens 中解析标题信息并存储到 env.headers
    env.headers = resolveHeadersFromTokens(tokens, {
      level, // 只处理 h2-h6 级别的标题
      shouldAllowHtml: true, // 允许标题中包含 HTML 标签
      shouldAllowNested: false, // 不允许标题嵌套
      shouldEscapeText: false, // 不转义标题文本
      slugify, // 用于生成 URL 友好的锚点链接
    })
    // 调用原始渲染函数继续处理
    return render(tokens, options, env)
  }
}
