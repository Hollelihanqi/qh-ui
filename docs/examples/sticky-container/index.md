# StickyContainer 粘性布局

### 功能

- 上(header)中(default)下(footer)三部分布局，上下固定，中间滚动
- 容器高度自动撑满父容器
- 支持下拉到底部

## 基本使用

<demo src="./basic.vue"></demo>

## 插槽

| 名称    | 说明         |
| ------- | ------------ |
| default | 主要内容部分 |
| header  | 头部内容     |
| footer  | 底部内容     |

## 方法

| 名称                 | 说明                   |
| -------------------- | ---------------------- |
| getScrollbarInstance | 获取 el-scrollbar 实例 |
| scrollToBottom       | 滚动到底部             |
