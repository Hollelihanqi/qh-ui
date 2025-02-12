import type { MarkdownRenderer } from 'vitepress'

export default (md: MarkdownRenderer): void => {
  // 在 'emphasis' 规则之前添加自定义的 'tag' 规则
  md.inline.ruler.before('emphasis', 'tag', (state, silent) => {
    // 定义标签的正则表达式：匹配 ^(标签内容) 格式
    const tagRegExp = /^\^\(([^)]*)\)/
    // 获取当前位置到结束位置的文本
    const str = state.src.slice(state.pos, state.posMax)

    // 如果不匹配标签格式，返回 false
    if (!tagRegExp.test(str)) return false
    // silent 模式下直接返回 true（用于验证语法）
    if (silent) return true

    // 匹配标签内容
    const result = str.match(tagRegExp)
    if (!result) return false

    // 创建 HTML 内联标记
    const token = state.push('html_inline', '', 0)
    const value = result[1].trim()

    // 检查是否是预定义的标签类型
    const tagClass = ['beta', 'deprecated', 'a11y', 'required'].includes(value) ? value : ''
    // 生成带有特定类名的 span 标签
    token.content = `<span class="vp-tag ${tagClass}">${value}</span>`
    token.level = state.level
    // 更新解析位置
    state.pos += result[0].length

    return true
  })
}
