#!/bin/bash

# 显示组件名称格式说明
echo "组件名称格式要求："
echo "1. 只能包含小写字母和中横线"
echo "2. 必须使用中横线连接单词"
echo "3. 不能以中横线开头或结尾"
echo "正确示例：my-component, button, date-picker"
echo "----------------------------------------"

# 获取组件名称
read -p "请输入组件名称: " COMPONENT_NAME

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

# 检查目录是否已存在
COMPONENT_DIR="packages/components/$COMPONENT_NAME"
if [ -d "$COMPONENT_DIR" ]; then
    echo "错误：组件 '$COMPONENT_NAME' 已存在于 $COMPONENT_DIR"
    echo "请选其他名称或先删除现有组件"
    exit 1
fi

# 将组件名按横线分割，每部分首字母大写，然后合并
COMPONENT_NAME_PASCAL=$(echo "$COMPONENT_NAME" | awk 'BEGIN{FS="-";RS="-"} {printf "%s", toupper(substr($1,1,1)) substr($1,2)}')

echo "Debug: 组件名转换过程"
echo "原始输入: $COMPONENT_NAME"
echo "转换结果: $COMPONENT_NAME_PASCAL"

# 转换组件名称为小驼峰形式
COMPONENT_NAME_CAMEL=$(echo "${COMPONENT_NAME_PASCAL}" | awk '{print tolower(substr($0,1,1)) substr($0,2)}')

echo "Debug: 小驼峰组件名转换过程"
echo $COMPONENT_NAME_CAMEL

# 使用 select 命令实现空格选择
echo "请选择模板类型："
select TEMPLATE_TYPE in "sfc" "tsx"; do
    case $TEMPLATE_TYPE in
        "sfc"|"tsx")
            break
            ;;
        *)
            echo "请选择有效的选项 (1 或 2)"
            ;;
    esac
done

# 创建组件目录
SRC_DIR="$COMPONENT_DIR/src"
mkdir -p "$SRC_DIR"

# 创建 scss 文件
touch "$SRC_DIR/$COMPONENT_NAME.scss"

# 通用的 sed 替换命令，用于 Props 和 Emits
COMMON_REPLACEMENTS="-e s/Component/$COMPONENT_NAME_PASCAL/g \
                    -e s/componentProps/${COMPONENT_NAME_CAMEL}Props/g \
                    -e s/componentEmits/${COMPONENT_NAME_CAMEL}Emits/g"

if [ "$TEMPLATE_TYPE" = "sfc" ]; then
    # 处理 SFC 模板
    sed -e "s/defineOptions({name: 'Component'})/defineOptions({name: '$COMPONENT_NAME_PASCAL'})/" \
        -e "s/class=\"yto-component\"/class=\"yto-$COMPONENT_NAME\"/" \
        -e "s/from '\.\/component'/from '\.\/$COMPONENT_NAME'/" \
        -e "s/componentProps/${COMPONENT_NAME_CAMEL}Props/g" \
        -e "s/componentEmits/${COMPONENT_NAME_CAMEL}Emits/g" \
        -e "s/name: 'Component'/name: '$COMPONENT_NAME_PASCAL'/g" \
        template/component.vue > "$SRC_DIR/$COMPONENT_NAME.vue"
    
    # 检查是否缺少 script 闭合标签
    if ! grep -q "</script>" "$SRC_DIR/$COMPONENT_NAME.vue"; then
        echo "</script>" >> "$SRC_DIR/$COMPONENT_NAME.vue"
    fi
    
    # 替换组件名、Props、Emits 和导入路径
    sed $COMMON_REPLACEMENTS \
        -e "s/from '\.\/component'/from '\.\/$COMPONENT_NAME.vue'/" \
        template/component.ts > "$SRC_DIR/$COMPONENT_NAME.ts"
else
    # 处理 TSX 模板
    # 替换组件名、Props、Emits、路径和类名，但保持 vue 相关内容不变
    sed -e "s|from './component'|from './i$COMPONENT_NAME'|" \
        -e "s/class=\"yto-component\"/class=\"yto-$COMPONENT_NAME\"/" \
        -e "s/{ componentProps, componentEmits }/{ ${COMPONENT_NAME_CAMEL}Props, ${COMPONENT_NAME_CAMEL}Emits }/g" \
        -e "s/props: componentProps/props: ${COMPONENT_NAME_CAMEL}Props/g" \
        -e "s/emits: componentEmits/emits: ${COMPONENT_NAME_CAMEL}Emits/g" \
        -e "s/'Component'/'$COMPONENT_NAME_PASCAL'/g" \
        template/component.tsx > "$SRC_DIR/$COMPONENT_NAME.tsx"
    
    # 创建接口文件，使用中横线格式，同时替换导入路径（不带 .tsx 后缀）
    sed $COMMON_REPLACEMENTS \
        -e "s|from './component'|from './$COMPONENT_NAME'|" \
        -e "s|import type Component|import type $COMPONENT_NAME_PASCAL|" \
        template/component.ts > "$SRC_DIR/i$COMPONENT_NAME.ts"
fi

# 创建 instance.ts 文件
if [ "$TEMPLATE_TYPE" = "sfc" ]; then
    # SFC 类型，需要 .vue 后缀
    sed -e "s/Component/$COMPONENT_NAME_PASCAL/g" \
        -e "s|'./xxx'|'./$COMPONENT_NAME.vue'|" \
        template/instance.ts > "$SRC_DIR/instance.ts"
else
    # TSX 类型，不需要后缀
    sed -e "s/Component/$COMPONENT_NAME_PASCAL/g" \
        -e "s|'./xxx'|'./$COMPONENT_NAME'|" \
        template/instance.ts > "$SRC_DIR/instance.ts"
fi

# 创建 index.ts，根据模板类型设置不同的导入路径
if [ "$TEMPLATE_TYPE" = "sfc" ]; then
    IMPORT_PATH="./src/$COMPONENT_NAME.vue"
    EXPORT_PATH="./src/$COMPONENT_NAME"
else
    IMPORT_PATH="./src/$COMPONENT_NAME"
    EXPORT_PATH="./src/i$COMPONENT_NAME"
fi

# 替换 index.ts 的内容，添加 ComponentInstance 的导出
sed -e "s/Component/$COMPONENT_NAME_PASCAL/g" \
    -e "s|from './src/component.vue'|from '$IMPORT_PATH'|" \
    -e "s|from './component'|from '$EXPORT_PATH'|" \
    -e "s|from './src/instance'|from './src/instance'|" \
    template/src-index.ts > "$COMPONENT_DIR/index.ts"

echo "组件 $COMPONENT_NAME 创建完成！"
echo "目录结构："
echo "$COMPONENT_DIR/"
echo "├── src/"
echo "│   ├── $COMPONENT_NAME.scss"
if [ "$TEMPLATE_TYPE" = "sfc" ]; then
    echo "│   ├── $COMPONENT_NAME.vue"
    echo "│   ├── $COMPONENT_NAME.ts"
else
    echo "│   ├── $COMPONENT_NAME.tsx"
    echo "│   ├── i$COMPONENT_NAME.ts"
fi
echo "│   └── instance.ts"
echo "└── index.ts" 