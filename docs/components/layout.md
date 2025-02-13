---
title: Layout 布局
---

# Layout 布局

## 基础用法

:::demo
layout/basic
:::

## API

### Layout 属性

| 属性名       | 说明                         | 类型     | 可选值              | 默认值    | 备注                                              |
| ------------ | ---------------------------- | -------- | ------------------- | --------- | ------------------------------------------------- |
| footer       | 显示底部区域                 | boolean  | -                   | false     | -                                                 |
| max          | 最大页签数                   | number   | -                   | undefined | -                                                 |
| cacheable    | 是否开启缓存                 | boolean  | -                   | false     | -                                                 |
| tabsKeyLabel | tabs label对应的key          | string   | -                   | 'title'   | -                                                 |
| formatTab    | tabs item格式化方法          | function | -                   | -         | -                                                 |
| showTab      | 是否显示tab页签              | boolean  | -                   | true      | -                                                 |
| type         | 布局方式                     | string   | vertical/horizontal | vertical  | vertical：上下布局；horizontal：左右布局          |
| routerGoback | 关闭页签时路由是否返回上一级 | boolean  | -                   | false     | -                                                 |
| theme        | 主题                         | string   | purple/dark         | 'purple'  | purple：紫色主题；dark：蓝色主题                  |
| orgMenuList  | 导航菜单数据                 | Array    | -                   | []        | frame模式下用于解决刷新系统后菜单无法被激活的问题 |

### Layout 插槽

| 插槽名  | 说明             |
| ------- | ---------------- |
| default | 内容区域左侧插槽 |
| header  | 顶部区域插槽     |
| footer  | 底部区域插槽     |
| tab     | tab页签插槽      |

### Layout 方法

| 方法名      | 说明                   |
| ----------- | ---------------------- |
| getTabsList | 获取打开的tabs列表方法 |

### Layout 样式变量

| 变量名                              | 说明         |
| ----------------------------------- | ------------ |
| --yto-layout-nav-background         | 通栏背景色   |
| --yto-layout-nav-background-active  | 激活背景色   |
| --yto-layout-nav-background-hover   | hover背景色  |
| --yto-layout-nav-background-item    | 默认背景色   |
| --yto-layout-nav-color-text         | 文字颜色     |
| --yto-layout-nav-color-text-active  | 激活文字颜色 |
| --yto-layout-nav-color-item-divider | 分割线颜色   |

### 示例

```vue
<template>
  <div id="layout">
    <yto-layout
      ref="routerRef"
      class="h-full"
      :orgMenuList="listNavigation"
      :cacheable="false"
      :router-goback="false"
      type="horizontal"
      @tab-change="handleTabChange"
    >
      <template #header>
        <yto-layout-header :collapse="collapse" :user-info="userInfo" @collapse="collapse = !collapse">
          <template #extend>123</template>
        </yto-layout-header>
      </template>
      <yto-layout-menu
        title="测试项目"
        :logo="logo"
        :collapse="collapse"
        :unique-opened="true"
        :menus="listNavigation"
        width="220px"
        :format-menu="formatMenu"
        @menu-click="handleMenuClick"
      ></yto-layout-menu>
    </yto-layout>
  </div>
</template>

<script lang="ts" setup>
import { IOptionTabPane, tabPaneAdd } from 'gold-core'
import logo from '@/assets/vue.svg'
const collapse = ref(false)
const userInfo = {
  userCode: '02348618',
  userName: '魏春霈',
}
const listNavigation: any[] = [
  {
    label: '首页',
    href: '/layout-child-3',
    code: '/layout-child-3',
    icon: 'icon iconfont party-web-icon-caidan3',
    // closable: false,
    mode: 'router',
  },
  {
    label: 'Frame模式',
    icon: 'icon iconfont party-web-icon-caidan3',
    children: [
      {
        label: 'windicss',
        href: 'https://windicss.org/',
        code: '/windicss',
        // closable: false,
        mode: 'frame',
      },
      {
        label: '用户活跃度',
        href: 'http://192.168.201.37:8003/platform-overview?source=JSC&token=2803627440494f7fbdc3942e4445c419',
        code: '/platform-overview',
        // closable: false,
        mode: 'frame',
      },
    ],
  },
  {
    label: '三级菜单测试',
    icon: 'icon iconfont party-web-icon-caidan3',
    children: [
      {
        label: '资讯列表',
        children: [
          {
            label: '资讯详情',
            href: '/layout-child-2',
            code: '/layout-child-2',
            mode: 'router',
          },
        ],
      },
    ],
  },
  {
    label: '组件调试',
    icon: 'icon iconfont party-web-icon-caidan3',
    children: [
      {
        label: 'Chart',
        href: '/chart',
        code: '/chart',
        mode: 'router',
      },
    ],
  },
]
const formatMenu = (info: any) => {
  if (info.mode == 'frame') {
    const tmpArr = info.href.split('token=')
    info.href.includes('token=') && (info.href = `${tmpArr[0]}token=e49de2c2ff1c49c8886dcfa30aa15c71`)
  }
  console.log('formatMenu-----', info)
  // if (info.code === "/chart") {
  //   info.isInactive = true
  // }
  return info
}
const handleMenuClick = (info: any) => {
  console.log('handleMenuClick-----', info)
}
const handleTabChange = (info: any) => {
  const list = unref(routerRef).getTabsList()
  console.log('handleTabChange-----list', list)
  console.log('handleTabChange-----info', info)
}
</script>
<style lang="scss">
#layout {
  .layout-header {
    --layout-header-background: #fff;
    // --layout-header-left-width: 220px;
    --layout-header-text-color: #000;
  }
  :deep(.router-view-containe) {
    background: #fff;
  }
}
</style>
```
