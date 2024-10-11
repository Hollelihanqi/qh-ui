export const isEmptyFun = (value: any): boolean => {
  if (value == null) {
    // undefined 或 null
    return true
  }
  if (typeof value === 'string' || Array.isArray(value)) {
    // 字符串或数组
    return value.length === 0
  }
  if (typeof value === 'object') {
    // 对象
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        return false
      }
    }
    return true
  }
  return false
}

export const isFunctionFun = (value: any): boolean => {
  return typeof value === 'function'
}

export function debounceFun<F extends (...args: any[]) => any>(
  func: F,
  wait: number,
): (...args: Parameters<F>) => ReturnType<F> | undefined {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return function debounced(...args: Parameters<F>): ReturnType<F> | undefined {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, wait)

    // TypeScript 2.8 及以上版本支持 Promise
    // 可以返回一个 Promise，用于异步获取回调函数的返回值
    // return new Promise<ReturnType<F>>((resolve) => {
    //   clearTimeout(timeoutId);
    //   timeoutId = setTimeout(() => {
    //     resolve(func.apply(this, args));
    //   }, wait);
    // });

    // 如果回调函数没有返回值，可以返回 undefined
    return undefined
  }
}

export const guid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

/**
 * @description: 字符串复制方法
 * @param {string} str 需要复制的字符串
 * @return {*}
 */
export const copyStr = (str: string) => {
  if (!str) return
  const inputEle: any = document.createElement('input')
  document.body.appendChild(inputEle)
  inputEle.value = str
  inputEle.select()
  document.execCommand('Copy')
  inputEle.remove()
}
