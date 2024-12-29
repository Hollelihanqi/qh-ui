type TimeUnit = 'day' | 'hour' | 'minute' | 'second' | 'millisecond'
type InputType = 'minute' | 'second' | 'millisecond'

interface TimeUnitConfig {
  value: number
  label: string
  milliseconds: number
}

const TIME_UNITS: Record<TimeUnit, TimeUnitConfig> = {
  day: { value: 24 * 60 * 60 * 1000, label: '天', milliseconds: 24 * 60 * 60 * 1000 },
  hour: { value: 60 * 60 * 1000, label: '时', milliseconds: 60 * 60 * 1000 },
  minute: { value: 60 * 1000, label: '分', milliseconds: 60 * 1000 },
  second: { value: 1000, label: '秒', milliseconds: 1000 },
  millisecond: { value: 1, label: '毫秒', milliseconds: 1 }
}

const formatUnit = (value: number, unit: string, shouldAddZero: boolean = true): string => {
  return shouldAddZero && value < 10 ? `0${value}${unit}` : `${value}${unit}`
}

/**
 * 格式化时间持续时间为易读字符串
 * @param timeInput 输入的时间值
 * @param inputType 输入时间的单位类型
 * @param showUnits 需要显示的时间单位数组
 * @returns 格式化后的时间字符串
 */
export const formatDuration = (
  timeInput: number,
  inputType: InputType = 'second',
  showUnits: TimeUnit[] = ['day', 'hour', 'minute', 'second'],
): string => {
  if (!timeInput) return '--'

  // 转换为毫秒
  const conversionMap: Record<InputType, number> = {
    minute: 60 * 1000,
    second: 1000,
    millisecond: 1
  }
  const totalMilliseconds = timeInput * conversionMap[inputType]

  // 计算各时间单位的值
  const result = showUnits.reduce((acc: string, unit: TimeUnit) => {
    const { value, label } = TIME_UNITS[unit]
    const unitValue = Math.floor((totalMilliseconds % (unit === 'day' ? Infinity : TIME_UNITS[showUnits[showUnits.indexOf(unit) - 1]]?.value || Infinity)) / value)

    if (unitValue === 0 && acc === '') return acc // 跳过前导零
    return acc + formatUnit(unitValue, label, unit !== 'millisecond')
  }, '')

  return result || '--'
}
