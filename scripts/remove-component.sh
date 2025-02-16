#!/bin/bash

# 显示组件名称格式说明
echo "组件名称格式要求："
echo "1. 只能包含小写字母和中横线"
echo "2. 必须使用中横线连接单词"
echo "3. 不能以中横线开头或结尾"
echo "正确示例：my-component, button, date-picker"
echo "----------------------------------------"

# 获取组件名称
read -p "请输入要删除的组件名称: " COMPONENT_NAME

# 检查组件名称是否为空
if [ -z "$COMPONENT_NAME" ]; then
    echo "错误：组件名称不能为空"
    exit 1
fi

# 检查组件名称格式
if ! [[ $COMPONENT_NAME =~ ^[a-z]+(-[a-z]+)*$ ]]; then
    echo "错误：组件名称格式不正确"
    echo "要求："
    echo "1. 只能包含小写字母和中横线"
    echo "2. 必须使用中横线连接单词"
    echo "3. 不能以中横线开头或结尾"
    echo "正确示例：my-component, button, date-picker"
    exit 1
fi

# 检查组件目录是否存在
COMPONENT_DIR="packages/components/$COMPONENT_NAME"
if [ ! -d "$COMPONENT_DIR" ]; then
    echo "错误：组件 '$COMPONENT_NAME' 不存在于 $COMPONENT_DIR"
    exit 1
fi

# 确认删除
read -p "确定要删除组件 '$COMPONENT_NAME' 吗？此操作不可恢复 (y/N): " CONFIRM
if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "操作已取消"
    exit 0
fi

# 删除组件目录
rm -rf "$COMPONENT_DIR"
echo "已删除组件目录: $COMPONENT_DIR"

# 执行 gen-component-import 命令更新组件索引
echo "正在更新组件索引..."
pnpm gen-component-import

echo "组件 '$COMPONENT_NAME' 已成功移除！" 