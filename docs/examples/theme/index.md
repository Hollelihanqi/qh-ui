<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-05-10 10:28:54
 * @LastEditTime: 2023-12-05 17:01:26
-->

# 换肤方案

基于 css 变量

### 功能

- 替换主题色
- 换肤

### 1. 主题色替换

效果展示：
<demo src="./index.vue"></demo>

配置步骤：

- 定义 css 变量

```css
:root {
  // 兼容windi opacity 变量
  --wi-color-primary: 52, 52, 206;
  // element-plus 主题色覆盖
  --el-color-primary: #3434ce;
  --el-color-primary-light-9: #3434ce;
  --el-color-primary-light-8: #3434ce;
  --el-color-primary-light-7: #3434ce;
  --el-color-primary-light-5: #3434ce;
  --el-color-primary-light-3: #3434ce;
  --el-color-primary-dark-2: #3434ce;
}
```

- windicss 使用 css 变量: windi.config.ts

```javascript
module.exports = {
  extract: {
    include: ['**/*.{md,vue}', '.vitepress/**/*.{ts,md,vue}'],
  },
  theme: {
    extend: {
      colors: {
        primary1: 'var(--el-color-primary)', // 直接使用css变量
        primary: color('var(--wi-color-primary)'), // 兼容opacity
      },
    },
  },
}
```

```javascript
function color(variable: string) {
  return (val: any) => {
    if (val.opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgba(${variable}, ${val.opacityValue})`;
  };
}
```

- 通过 setProperty 修改 html 根标签的 data-theme 属性

```javascript
document.documentElement.style.setProperty(varName, value)
```

### 2. 换肤

效果展示：
<demo src="./themeChange.vue"></demo>

配置步骤：

- 定义 css 变量以及 多套主题 css 变量值

```css
:root {
  --vp-c-bg: #fff;
  --vp-c-text-1: #000;
  --vp-sidebar-bg-color: #f6f6f7;
}
[data-theme='theme1'] {
  --vp-c-bg: #fdfefe;
  --vp-c-text-1: #0a6bc3;
  --vp-sidebar-bg-color: #e1e8ef;
}
[data-theme='theme2'] {
  --vp-c-bg: #eaeaef;
  --vp-c-text-1: #05058f;
  --vp-sidebar-bg-color: #fff;
}
[data-theme='theme3'] {
  --vp-c-bg: #395e45;
  --vp-c-text-1: #f5f5f5;
  --vp-sidebar-bg-color: #7b8d81;
}
```

- setAttribute 修改 data-theme 属性值

```javascript
document.documentElement.setAttribute('data-theme', theme.value)
```
