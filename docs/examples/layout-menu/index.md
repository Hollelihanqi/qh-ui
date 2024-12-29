<!--
 * @Author: weichunpei
 * @Date: 2023-10-20 09:30:23
 * @LastEditors: weichunpei
 * @LastEditTime: 2024-02-20 19:55:53
 * @Description: layoutHeader 组件
-->

# LayoutMenu

用于职能类后台管理项目布局的左侧导航菜单组件。

### 功能

- 支持设置 IconFont
- 支持折叠
- 支持 ElMenu 的所有配置

## 基本使用

<demo src="./basic.vue"></demo>

### LayoutMenu 属性

| 属性名              | 说明                   | 类型             | 可选值 | 默认值     | 备注 |
| ------------------- | ---------------------- | ---------------- | ------ | ---------- | ---- |
| `collapse`          | 系统名称               | boolean          | -      | ""         |      |
| `menus`             | 菜单数据               | IOptionTabPane[] | -      | []         |      |
| `width`             | 菜单宽度               | string           | —      | "210px"    |      |
| `searchable`        | 是否可搜索             | boolean          | —      | true       |      |
| `title`             | 系统名称               | string           | -      | ""         |      |
| `logo`              | 系统 logo              | Img              | —      | -          |      |
| `formatMenu`        | tabsItem 格式化方法    | function         | —      | -          |      |
| `searchPlaceholder` | 菜单搜索的 placeholder | string           | —      | '菜单查询' |      |

### LayoutMenu 样式变量

| 属性名                                              | 说明                         |
| --------------------------------------------------- | ---------------------------- |
| `--yto-layout-menu-background`                      | 背景色                       |
| `--yto-layout-menu-color-text`                      | 文字颜色                     |
| `--yto-layout-menu-color-text-active`               | 激活文字颜色                 |
| `--yto-layout-menu-background-search`               | 搜索框背景色                 |
| `--yto-layout-menu-background-title`                | 顶部 title 区域背景颜色      |
| `--yto-layout-menu-color-title`                     | 顶部 title 区域文字颜色      |
| `--yto-layout-menu-color-triangle`                  | 折叠/展开三角颜色            |
| `--yto-layout-menu-level-1-background-color`        | level-1 背景色               |
| `--yto-layout-menu-level-1-background-color-hover`  | level-1 的 hover 背景色      |
| `--yto-layout-menu-level-1-background-color-active` | level-1 的选中背景色         |
| `--yto-layout-menu-level-1-background-color-expand` | level-1 的展开背景色         |
| `--yto-layout-menu-level-1-box-shadow`              | level-1 区域 box-shadow 样式 |
| `--yto-layout-menu-level-2-background-color`        | level-2 背景色               |
| `--yto-layout-menu-level-2-background-color-hover`  | level-2 的 hover 背景色      |
| `--yto-layout-menu-level-2-background-color-active` | level-2 的选中背景色         |
| `--yto-layout-menu-level-2-background-color-expand` | level-2 的展开背景色         |
| `--yto-layout-menu-level-3-background-color`        | level-3 背景色               |
| `--yto-layout-menu-level-3-background-color-hover`  | level-3 的 hover 背景色      |
| `--yto-layout-menu-level-3-background-color-active` | level-3 的选中背景色         |

### Interface

```ts
interface IOptionTabPane {
  code?: string
  target?: string
  mode?: string
  closable?: boolean
  refresh?: boolean
  label: string
  href?: string
  children?: IOptionTabPane[]
  showIcon?: boolean
}
```

### 紫色配色方案

```json
    --layout-menu-title-color: #fff;
    --layout-menu-text-color: #fff;
    --layout-menu-background: #56297e;
    --layout-menu-active-color: #fff;
    --layout-menu-search-background: #33154b;
    --layout-menu-active-background: #8942c9;
    --layout-menu-hover-color: #8942c9;
    --layout-menu-border-color: rgba(0, 0, 0, 0.1);
    --layout-menu-active-border-color: #8942c9;
    --layout-menu-active-parent-background: #6d31a3;
    --layout-menu-inline-bg-color: #40195f;
    --layout-menu-triangle-color: #a985c9;
```

### 蓝色系配色方案

```json
     --layout-menu-title-color: #fff;
     --layout-menu-text-color: #fff;
     --layout-menu-background: #333f5f;
     --layout-menu-active-color: #fff;
     --layout-menu-search-background: #2a3249;
     --layout-menu-active-background: #4272dd;
     --layout-menu-hover-color: #4272dd;
     --layout-menu-border-color: rgba(0, 0, 0, 0.1);
     --layout-menu-active-border-color: #4272dd;
     --layout-menu-active-parent-background: #334c84;
     --layout-menu-inline-bg-color: #2a3249;
     --layout-menu-triangle-color: #969ca2;
```
