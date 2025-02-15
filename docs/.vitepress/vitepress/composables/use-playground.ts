import { onMounted, ref, watch } from 'vue'
import { utoa } from '../utils'
import { isDark } from './dark'
import type { Link } from '../types'

// 定义主文件名常量
const MAIN_FILE_NAME = 'App.vue'

// 判断是否为预览环境
export const usePreview = () => location.host.startsWith('preview')

// 获取预览PR的编号
export const usePreviewPR = () => location.host.split('-', 2)[1]

/**
 * 处理playground相关逻辑的组合式函数
 * @param source - 源代码字符串
 * @returns 返回编码后的字符串和完整的playground链接
 */
export const usePlayground = (source: string) => {
  // 解码源代码
  const code = source ? decodeURIComponent(source) : source
  // 创建包含主文件的代码对象
  const originCode = {
    [MAIN_FILE_NAME]: code,
  }

  // 将代码对象转换为base64编码
  const encoded = code ? utoa(JSON.stringify(originCode)) : ''

  // 设置基础playground链接
  let link = `https://element-plus.run/`

  // 如果是预览环境，添加PR参数
  if (usePreview()) {
    link = `${link}?pr=${usePreviewPR()}`
  }

  // 如果是暗色主题，添加主题参数
  if (isDark.value) {
    link = `${link}${usePreview() ? '&' : '?'}theme=dark`
  }

  // 如果有代码，将编码后的代码添加到链接中
  if (code) {
    link += `#${encoded}`
  }

  return {
    encoded,
    link,
  }
}

/**
 * 处理playground预览相关逻辑的组合式函数
 * @param props - 包含Link类型item属性的只读对象
 * @returns 返回目标链接的ref对象
 */
export const usePlaygroundPreview = (
  props: Readonly<{
    item: Link
  }>
) => {
  // 创建目标链接的响应式引用
  const targetLink = ref(props.item.link)

  // 处理链接更新的函数
  const handler = () => {
    // 如果是Playground链接，则生成新的playground链接
    if (props.item.text === 'Playground') {
      const { link } = usePlayground('')
      targetLink.value = link
    }
  }

  // 监听暗色主题变化，更新链接
  watch(() => isDark.value, handler)

  // 组件挂载时执行一次handler
  onMounted(handler)

  return targetLink
}
