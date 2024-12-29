/**
 * 判断一个值是否为空
 * @param value - 要检查的值
 * @returns {boolean} - 如果值为空返回 true，否则返回 false
 * @description
 * - null 或 undefined 返回 true
 * - 空字符串或空数组返回 true
 * - 空对象(没有自身属性)返回 true
 * - 其他情况返回 false
 */
export const isEmptyFun = (value: any): boolean => {
  if (value == null) {
    return true
  }
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }
  return false
}

/**
 * 检查一个值是否为函数
 * @param value - 要检查的值
 * @returns {boolean} - 如果值是函数返回 true，否则返回 false
 */
export const isFunctionFun = (value: any): boolean => {
  return typeof value === 'function'
}

/**
 * 创建一个防抖函数
 * @param func - 要防抖的函数
 * @param wait - 等待时间（毫秒）
 * @returns - 返回防抖后的函数
 * @description 在连续调用时，只有在等待了指定时间后才会执行函数
 */
export function debounceFun<F extends (...args: any[]) => any>(
  func: F,
  wait: number,
): (...args: Parameters<F>) => Promise<ReturnType<F>> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return function debounced(this: any, ...args: Parameters<F>): Promise<ReturnType<F>> {
    return new Promise((resolve) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        resolve(func.apply(this, args))
      }, wait)
    })
  }
}

/**
 * 生成一个 UUID
 * @returns {string} - 返回生成的 UUID 字符串
 * @description 生成格式为 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' 的 UUID
 */
export const guid = (): string => {
  const S4 = (): string => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`
}

/**
 * 复制文本到剪贴板
 * @param str - 要复制的字符串
 * @returns {Promise<boolean>} - 复制成功返回 true，失败返回 false
 * @description 使用现代的 Clipboard API，如果不支持则回退到传统方法
 */
export const copyStr = async (str: string): Promise<boolean> => {
  if (!str) return false

  try {
    // 优先使用现代 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(str)
      return true
    }

    // 回退到传统方法
    const textArea = document.createElement('textarea')
    textArea.value = str
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      document.execCommand('copy')
      textArea.remove()
      return true
    } catch (err) {
      textArea.remove()
      return false
    }
  } catch (err) {
    return false
  }
}
