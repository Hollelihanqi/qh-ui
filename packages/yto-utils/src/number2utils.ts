// 数字单位常量
const UNITS = {
  TRILLION: 1000000000000,
  BILLION: 100000000,
  MILLION: 10000
} as const

// 单位文字
const UNIT_TEXTS = {
  TRILLION: '兆',
  BILLION: '亿',
  MILLION: '万'
} as const

/**
 * 添加千位分隔符
 * @param num 需要格式化的数字
 * @returns 格式化后的字符串
 */
export const thousandsSeparator = (num: number): string => {
  return num.toLocaleString('en-US')
}

/**
 * 判断是否为整数
 * @param num 需要判断的数字
 * @returns 是否为整数
 */
export const isInteger = (num: number): boolean => Number.isInteger(num)

/**
 * 格式化大数字，添加单位（万/亿/兆）
 * @param num 需要格式化的数字或字符串
 * @param fixedNum 小数位数
 * @param nullStr 无效数字的替代显示
 * @returns 格式化后的字符串
 */
export const formatNumber = (
  num: number | string,
  fixedNum = 2,
  nullStr = '-'
): string => {
  const numValue = Number(num)

  if (isNaN(numValue)) {
    return nullStr
  }

  if (numValue <= 0) {
    return String(numValue)
  }

  const formatUnit = (value: number, unit: number, unitText: string): string => {
    const divided = value / unit
    return isInteger(divided)
      ? `${divided}${unitText}`
      : `${divided.toFixed(fixedNum)}${unitText}`
  }

  if (numValue >= UNITS.TRILLION) {
    return formatUnit(numValue, UNITS.TRILLION, UNIT_TEXTS.TRILLION)
  }

  if (numValue >= UNITS.BILLION) {
    return formatUnit(numValue, UNITS.BILLION, UNIT_TEXTS.BILLION)
  }

  if (numValue >= UNITS.MILLION) {
    return formatUnit(numValue, UNITS.MILLION, UNIT_TEXTS.MILLION)
  }

  return String(numValue)
}
