---
title: Menu 菜单
---

# Menu 菜单

## 基础用法

:::demo
menu/basic
:::

## API

[完整配置请参考-element-plus](https://element-plus.org/zh-CN/component/menu.html)

### Menu 属性

| 属性名         | 说明           | 类型          | 可选值 | 默认值 | 备注                             |
| -------------- | -------------- | ------------- | ------ | ------ | -------------------------------- |
| menuData       | 菜单的数据配置 | IMenuData[]   | -      | -      | -                                |
| menuItemConfig | MenuItem配置项 | MenuItemProps | -      | -      | 继承自Element Plus的MenuItem属性 |
| subMenuConfig  | SubMenu配置项  | SubMenuProps  | -      | {}     | 继承自Element Plus的SubMenu属性  |
| 其他           | Menu组件属性   | MenuProps     | -      | -      | 继承自Element Plus的Menu属性     |

### Menu 事件

| 事件名        | 说明               | 回调参数                                                                                     |
| ------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| select        | 菜单激活时触发     | (index: string, indexPath: string[], item: MenuItem, routeResult: NavigationFailure \| void) |
| open          | SubMenu展开时触发  | (index: string, indexPath: string[])                                                         |
| close         | SubMenu收起时触发  | (index: string, indexPath: string[])                                                         |
| menuItemClick | MenuItem点击时触发 | (item: IMenuData) => void                                                                    |
