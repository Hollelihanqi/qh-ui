---
title: LayoutRouter 布局路由
---

# LayoutRouter 布局路由

布局路由组件，用于实现页面的整体布局结构。

## 基础用法

:::demo
layout-router/basic
:::

## API

### LayoutRouter 属性

| 属性名       | 说明                         | 类型                       | 默认值     | 备注                                     |
| ------------ | ---------------------------- | -------------------------- | ---------- | ---------------------------------------- |
| footer       | 是否显示底部区域             | boolean                    | false      | -                                        |
| max          | 最大页签数量                 | number                     | -          | -                                        |
| cacheable    | 是否开启页面缓存             | boolean                    | false      | -                                        |
| tabsKeyLabel | 页签标题对应的键名           | string                     | 'title'    | -                                        |
| formatTab    | 自定义页签项格式化方法       | function                   | -          | -                                        |
| showTab      | 是否显示页签栏               | boolean                    | true       | -                                        |
| type         | 布局方式                     | 'vertical' \| 'horizontal' | 'vertical' | vertical：上下布局；horizontal：左右布局 |
| routerGoback | 关闭页签时是否返回上一级路由 | boolean                    | false      | -                                        |
| activeMenu   | 是否需要激活左侧菜单         | boolean                    | false      | 仅在 showTab 为 false 时生效             |
| theme        | 主题风格                     | 'purple' \| 'dark'         | 'purple'   | purple：紫色主题；dark：蓝色主题         |

### LayoutRouter 插槽

| 插槽名  | 说明             |
| ------- | ---------------- |
| default | 内容区域左侧插槽 |
| header  | 顶部区域插槽     |
| footer  | 底部区域插槽     |
| tab     | 页签栏自定义插槽 |

### LayoutRouter 方法

| 方法名      | 说明                   | 参数 | 返回值    |
| ----------- | ---------------------- | ---- | --------- |
| getTabsList | 获取当前打开的页签列表 | -    | TabItem[] |

### 样式变量

| 变量名                              | 说明               |
| ----------------------------------- | ------------------ |
| --yto-layout-router-background      | 布局背景色         |
| --yto-layout-nav-background         | 导航栏背景色       |
| --yto-layout-nav-color-item-divider | 页签分割线颜色     |
| --yto-layout-nav-background-item    | 页签默认背景色     |
| --yto-layout-nav-color-textr        | 页签默认文字颜色   |
| --yto-layout-nav-color-text-active  | 页签激活态文字颜色 |
| --yto-layout-nav-background-active  | 页签激活态背景色   |
| --yto-layout-nav-background-hover   | 页签悬浮态背景色   |

### 代码示例

```vue
<template>
  <div id="layout">
    <yto-c-layout-router class="router-class">
      <template #header>
        <yto-c-layout-header
          title="圆通党建"
          :collapse="collapse"
          :logo="logo"
          :user-info="userInfo"
          @collapse="collapse = !collapse"
        />
      </template>
      <yto-c-layout-menu :unique-opened="true" :collapse="collapse" :menus="listNavigation" />
    </yto-c-layout-router>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { IOptionTabPane, tabPaneAdd } from 'gold-core'
import logo from '@/assets/vue.svg'

const collapse = ref(false)
const userInfo = {
  userCode: '02348618',
  userName: '魏春霈',
}

const listNavigation = [
  {
    label: '公告管理',
    icon: 'icon iconfont party-web-icon-caidan3',
    children: [
      {
        label: '公告列表',
        href: '/layout-child-1?abc=1',
        code: '/layout-child-1',
        closable: false,
        mode: 'router',
      },
    ],
  },
  {
    label: '资讯管理',
    icon: 'icon iconfont party-web-icon-caidan3',
    children: [
      {
        label: '资讯列表',
        href: '/layout-child-2',
        code: '/layout-child-2',
        mode: 'router',
      },
    ],
  },
]

// 添加默认页签
const firstTab = listNavigation[0].children[0]
tabPaneAdd(firstTab?.href, firstTab as IOptionTabPane)
</script>

<style lang="scss">
#layout {
  .layout-header {
    --layout-header-background: #900808;
  }

  .layout-menu {
    --layout-menu-active-color: #ef1017;
    --layout-menu-active-background: rgba(239, 16, 23, 0.1);
  }

  .router-class {
    height: 100%;
  }
}
</style>
```
