import { reactive, watch } from 'vue'

export function useCssVar(varName: string, initialValue: string) {
  const cssVars = reactive({
    [varName]: initialValue,
  })

  const setCssVar = (varName: string, value: string) => {
    cssVars[varName] = value
    document.documentElement.style.setProperty(varName, value)
  }

  return {
    cssVars,
    setCssVar,
  }
}

export const newColorWithOpacity = (color: string, opacity: number, isRgb = false) => {
  const hex = color.replace(/^#/, '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  // 计算新的RGB值
  const newR = Math.round((1 - opacity) * 255 + opacity * r)
  const newG = Math.round((1 - opacity) * 255 + opacity * g)
  const newB = Math.round((1 - opacity) * 255 + opacity * b)

  // 将新的RGB值转换为16位颜色值
  const newColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB
    .toString(16)
    .padStart(2, '0')}`

  return isRgb ? `${newR},${newG},${newB}` : newColor
}
