<!--
 * @Author: weichunpei
 * @Date: 2023-10-20 13:07:20
 * @LastEditors: weichunpei
 * @LastEditTime: 2023-12-28 14:32:25
 * @Description:
-->

# LayoutFrame

用于职能类后台管理项目布局组件(iFrame 模式)。

### 功能

- 支持设置最大页签数量
- 支持插槽

## 基本使用

<demo src="./basic.vue"></demo>

```vue
<template>
  <div class="layout h-full">
    <yto-c-layout-frame class="frame">
      <template #header>
        <yto-c-layout-header
          title="圆通党建"
          :collapse="collapse"
          :logo="logo"
          :user-info="userInfo"
          @collapse="collapse = !collapse"
        >
          <template #logout>
            <span>退出登录</span>
          </template>
        </yto-c-layout-header>
      </template>
      <yto-c-layout-menu :unique-opened="true" :collapse="collapse" :menus="listNavigation"></yto-c-layout-menu>
    </yto-c-layout-frame>
  </div>
</template>

<script lang="ts" setup>
import { IOptionTabPane, session, tabPaneAdd } from 'gold-core'
import logo from '@/assets/vue.svg'

const collapse = ref(false)
const userInfo = {
  userCode: '02348618',
  userName: '魏春霈',
}
const listNavigation: IOptionTabPane[] = [
  { label: '百度', href: 'https://www.baidu.com', code: 'www.baidu.com' },
  { label: '测试', href: '/demo/list', closable: false, code: '/demo/list' },
  { label: '必应', href: 'https://cn.bing.com/', code: 'cn.bing.com' },
  {
    label: '组件管理',
    children: [
      { label: '组件配置', href: '/widget/component/list', code: '/widget/component/list' },
      { label: '属性配置', href: '/widget/component-attribute/list', code: '/widget/component-attribute/list' },
      { label: '事件配置', href: '/widget/component-event/list', code: '/widget/component-event/list' },
    ],
  },
]

const frist = listNavigation[0]

tabPaneAdd(frist?.href as string, frist as IOptionTabPane)
</script>
<style lang="scss">
:root {
  // --el-color-primary: #ef1017;
}
.layout {
  .layout-header {
    --layout-header-background: #900808;
  }
  .layout-menu {
    --layout-menu-active-color: #ef1017;
    --layout-menu-active-background: rgba(239, 16, 23, 0.1);
  }
  .frame {
    height: 100%;
  }
}
</style>
```

### LayoutFrame 属性

| 属性名      | 说明         | 类型    | 可选值                | 默认值     | 备注                                     |
| ----------- | ------------ | ------- | --------------------- | ---------- | ---------------------------------------- |
| `footer`    | 显示底部区域 | boolean | -                     | `false`    |                                          |
| `max`       | 最大页签数   | number  | -                     | `undefind` |                                          |
| `cacheable` | 是否开启缓存 | boolean | -                     | `false`    |                                          |
| `type`      | 布局方式     | string  | `vertical/horizontal` | `vertical` | vertical：上下布局；horizontal：左右布局 |

### LayoutFrame 插槽

| 属性名    | 说明             |
| --------- | ---------------- |
| `default` | 内容区域左侧插槽 |
| `header`  | 顶部区域插槽     |
| `footer`  | 底部区域插槽     |

### layoutHeader 样式变量

| 属性名                  | 说明                 |
| ----------------------- | -------------------- |
| `--layout-frame-bg`     | 背景颜色             |
| `--nav-tabs-bg`         | 导航页签背景颜色     |
| `--nav-tabs-active-bg`  | 导航页签激活背景颜色 |
| `--nav-tabs-text-color` | 导航页签激活文字颜色 |
