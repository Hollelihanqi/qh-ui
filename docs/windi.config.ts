/*
 * @Description: 配置主题色
 * @Author: ym
 * @Date: 2023-08-31 14:28:48
 * @LastEditTime: 2023-12-05 14:53:54
 */
function color(variable: string) {
  return (val: any) => {
    if (val.opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgba(${variable}, ${val.opacityValue})`
  }
}
module.exports = {
  extract: {
    include: ['**/*.{md,vue}', '.vitepress/**/*.{ts,md,vue}'],
  },
  theme: {
    extend: {
      colors: {
        primary1: 'var(--el-color-primary)',
        primary: color('var(--wi-color-primary)'),
      },
    },
  },
}
