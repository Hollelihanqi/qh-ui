<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-05-10 10:28:54
 * @LastEditTime: 2023-05-10 13:13:34
-->

# Menu 菜单

基于 element-plus：el-munu 二次封装，支持 element-plus 的所有属性,具体查看 element-plus 官网

### 功能

- JSON 数据渲染
- 多层嵌套

## 基本使用

<demo src="./basic.vue"></demo>

## Attributes

[完整配置请参考-element-plus](https://element-plus.org/zh-CN/component/menu.html)

### Menu 属性

| 属性名           | 说明             | 类型          | 可选值 | 默认值 | 备注                        |
| ---------------- | ---------------- | ------------- | ------ | ------ | --------------------------- |
| `menuData`       | 菜单的 json 数据 | IMenuData[]   | -      | -      |                             |
| `menuItemConfig` | menuItem 属性    | MenuItemProps | -      | -      | element menuItem 的所有属性 |
| `subMenuConfig`  | subMenu 属性     | SubMenuProps  | —      | {}     | element subMenu 的所有属性  |
| 其他             | menu 属性        | MenuProps     | —      |        | element Menu 标签的所有属性 |

### Menu 方法

| 方法名          | 说明                                     | 类型                                                                                                                                     |
| --------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `select`        | 菜单激活回调                             | index: 选中菜单项的 index, indexPath: 选中菜单项的 index path, item: 选中菜单项, routeResult: vue-router 的返回值（如果 router 为 true） |
| `open`          | sub-menu 展开的回调                      | index: 打开的 sub-menu 的 index, indexPath: 打开的 sub-menu 的 index path                                                                |
| `close`         | sub-menu 收起的回调                      | index: 收起的 sub-menu 的 index, indexPath: 收起的 sub-menu 的 index path                                                                |
| `menuItemClick` | element 的 meunItem 标签点击时的回调函数 | （item: IMenuData）=> vo                                                                                                                 |
