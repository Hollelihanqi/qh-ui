const formatUnit = (value: number, unit: string, shouldAddZero: boolean = true): string => {
  return shouldAddZero && value < 10 ? `0${value}${unit}` : `${value}${unit}`
}

// 格式化给定的时间为字符串
export const formatTime = (
  timeInput: number, // 输入可以是毫秒或秒
  inputType: 'minute' | 'second' | 'millisecond' = 'second', // 指示输入是秒还是毫秒
  showUnits: ('day' | 'hour' | 'minute' | 'second' | 'millisecond')[] = ['day', 'hour', 'minute', 'second'],
): string => {
  if (!timeInput) return '--'

  // 根据输入类型计算时间单位
  let totalUnits = timeInput
  switch (inputType) {
    case 'minute':
      totalUnits = timeInput * 60 * 1000
      break
    case 'second':
      totalUnits = timeInput * 1000
      break
    default:
      break
  }

  // 计算各时间单位
  const days = Math.floor(totalUnits / (24 * 60 * 60 * 1000))
  const hours = Math.floor((totalUnits % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  const minutes = Math.floor((totalUnits % (60 * 60 * 1000)) / (60 * 1000))
  const seconds = Math.floor((totalUnits % (60 * 1000)) / 1000)
  const milliseconds = Math.floor(totalUnits % 1000)

  // 构建格式化后的时间字符串
  let formattedTime = ''
  if (showUnits.includes('day')) formattedTime += formatUnit(days, '天')
  if (showUnits.includes('hour')) formattedTime += formatUnit(hours, '时')
  if (showUnits.includes('minute')) formattedTime += formatUnit(minutes, '分')
  if (showUnits.includes('second')) formattedTime += formatUnit(seconds, '秒')
  if (showUnits.includes('millisecond')) formattedTime += formatUnit(milliseconds, '毫秒', false) // 不对毫秒前补零

  return formattedTime.trim()
}
