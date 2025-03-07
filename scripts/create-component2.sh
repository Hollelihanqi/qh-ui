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
COMPONENT_NAME_CAMEL=$(echo "${COMPONENT_NAME_PASCAL}" | awk '{print tolower(substr($0,1,1)) substr($0,2)}')

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

# 创建 SCSS 文件内容
cat > "$SRC_DIR/$COMPONENT_NAME.scss" << EOF
.yto-${COMPONENT_NAME} {
  // 在此处添加样式
}
EOF

if [ "$TEMPLATE_TYPE" = "sfc" ]; then
    # 创建 SFC 组件文件
    cat > "$SRC_DIR/$COMPONENT_NAME.vue" << EOF
<template>
  <div class="yto-${COMPONENT_NAME}">
    <!-- 组件内容 -->
  </div>
</template>

<script lang="ts" setup>
import { ${COMPONENT_NAME_CAMEL}Props, ${COMPONENT_NAME_CAMEL}Emits } from './${COMPONENT_NAME}'

defineOptions({
  name: '${COMPONENT_NAME_PASCAL}',
})

const props = defineProps(${COMPONENT_NAME_CAMEL}Props)
const emit = defineEmits(${COMPONENT_NAME_CAMEL}Emits)
</script>
EOF

    # 创建类型定义文件
    cat > "$SRC_DIR/$COMPONENT_NAME.ts" << EOF
import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const ${COMPONENT_NAME_CAMEL}Props = buildProps({
  // 在此处定义 props
  // 示例:
  // title: {
  //   type: String,
  //   default: '',
  // },
  // data: {
  //   type: Array as PropType<{ [key: string]: any }[]>,
  //   default: () => [],
  // },
})

export const ${COMPONENT_NAME_CAMEL}Emits = []

export type ${COMPONENT_NAME_PASCAL}Props = ExtractPropTypes<typeof ${COMPONENT_NAME_CAMEL}Props>
EOF

else
    # 创建 TSX 组件文件
    cat > "$SRC_DIR/$COMPONENT_NAME.tsx" << EOF
import { defineComponent } from 'vue'
import { ${COMPONENT_NAME_CAMEL}Props, ${COMPONENT_NAME_CAMEL}Emits } from './i${COMPONENT_NAME}'

export default defineComponent({
  name: '${COMPONENT_NAME_PASCAL}',
  props: ${COMPONENT_NAME_CAMEL}Props,
  emits: ${COMPONENT_NAME_CAMEL}Emits,
  setup(props, { emit }) {
    return () => (
      <div class="yto-${COMPONENT_NAME}">
        {/* 组件内容 */}
      </div>
    )
  }
})
EOF

    # 创建接口文件
    cat > "$SRC_DIR/i$COMPONENT_NAME.ts" << EOF
import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@yto-custom/utils'

export const ${COMPONENT_NAME_CAMEL}Props = buildProps({
  // 在此处定义 props
  // 示例:
  // title: {
  //   type: String,
  //   default: '',
  // },
  // data: {
  //   type: Array as PropType<{ [key: string]: any }[]>,
  //   default: () => [],
  // },
})

export const ${COMPONENT_NAME_CAMEL}Emits = []

export type ${COMPONENT_NAME_PASCAL}Props = ExtractPropTypes<typeof ${COMPONENT_NAME_CAMEL}Props>
EOF
fi

# 创建 instance.ts 文件
if [ "$TEMPLATE_TYPE" = "sfc" ]; then
    # SFC 版本
    cat > "$SRC_DIR/instance.ts" << EOF
import type ${COMPONENT_NAME_PASCAL} from './${COMPONENT_NAME}.vue'

export type ${COMPONENT_NAME_PASCAL}Instance = InstanceType<typeof ${COMPONENT_NAME_PASCAL}>

EOF
else
    # TSX 版本
    cat > "$SRC_DIR/instance.ts" << EOF
import type ${COMPONENT_NAME_PASCAL} from './${COMPONENT_NAME}'

export type ${COMPONENT_NAME_PASCAL}Instance = InstanceType<typeof ${COMPONENT_NAME_PASCAL}>

EOF
fi

# 创建 index.ts 文件
if [ "$TEMPLATE_TYPE" = "sfc" ]; then
    # SFC 版本
    cat > "$COMPONENT_DIR/index.ts" << EOF
import { withInstall } from '@yto-custom/utils'

import ${COMPONENT_NAME_PASCAL} from './src/${COMPONENT_NAME}.vue'
import type { SFCWithInstall } from '@yto-custom/utils'

export const Yto${COMPONENT_NAME_PASCAL}: SFCWithInstall<typeof ${COMPONENT_NAME_PASCAL}> = withInstall(${COMPONENT_NAME_PASCAL})
export default Yto${COMPONENT_NAME_PASCAL}

export * from './src/${COMPONENT_NAME}'
export type { ${COMPONENT_NAME_PASCAL}Instance } from './src/instance'
EOF
else
    # TSX 版本
    cat > "$COMPONENT_DIR/index.ts" << EOF
import { withInstall } from '@yto-custom/utils'

import ${COMPONENT_NAME_PASCAL} from './src/${COMPONENT_NAME}'
import type { SFCWithInstall } from '@yto-custom/utils'

export const Yto${COMPONENT_NAME_PASCAL}: SFCWithInstall<typeof ${COMPONENT_NAME_PASCAL}> = withInstall(${COMPONENT_NAME_PASCAL})
export default Yto${COMPONENT_NAME_PASCAL}

export * from './src/i${COMPONENT_NAME}'
export type { ${COMPONENT_NAME_PASCAL}Instance } from './src/instance'
EOF
fi

# 创建 style 目录
STYLE_DIR="$COMPONENT_DIR/style"
mkdir -p "$STYLE_DIR"

# 创建 style/index.ts 文件
cat > "$STYLE_DIR/index.ts" << EOF
import '@yto-custom/components/${COMPONENT_NAME}/src/${COMPONENT_NAME}.scss'
EOF

# 更新目录结构输出
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
echo "├── style/"
echo "│   ├── index.ts"
echo "└── index.ts"

# 执行 gen-component-import 命令
echo "执行 gen-component-import 命令"
pnpm gen-component-import 