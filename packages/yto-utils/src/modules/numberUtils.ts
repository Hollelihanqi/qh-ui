export const thousandsSeparatoe = (num: number) => num.toLocaleString('en-US')

// 判断是否为整数
export const isInteger = (num: number): boolean => num % 1 === 0

// 格式化数字：显示单位为万/亿/兆
export const formatNumber = (num: number | string, fixedNum = 2, nullStr = '-'): string => {
  if (isNaN(num as number)) {
    return nullStr
  }
  num = Number(num)
  if (num >= 1000000000000) {
    return isInteger(num / 1000000000000) ? num / 1000000000000 + '兆' : (num / 1000000000000).toFixed(fixedNum) + '兆'
  } else if (num >= 100000000) {
    return isInteger(num / 100000000) ? num / 100000000 + '亿' : (num / 100000000).toFixed(fixedNum) + '亿'
  } else if (num >= 10000) {
    return isInteger(num / 10000) ? num / 10000 + '万' : (num / 10000).toFixed(fixedNum) + '万'
  } else if (num <= 0) {
    return String(num)
  } else {
    return String(num)
  }
}
