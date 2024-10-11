#! /bin/bash

# 获取组件名称
read -p "请输入组件名称（例如：my-component）：" component_name

# 使用组件名称作为目录名 (保留中横线)
component_dir=$component_name

# 检查组件目录是否已存在
if [ -d "packages/components/${component_dir}" ]; then
  echo "组件目录已存在: packages/components/${component_dir}"
  exit 1.


  ..........
fi

# 创建组件目录
mkdir -p "packages/components/${component_dir}/src"

# 生成 index.ts 文件内容
component_name_camel=`echo $component_dir | sed 's/-/\ /g' | sed 's/\(.*\)/\u\1/' | sed 's/ /\u/g'`
cat > "packages/components/${component_dir}/index.ts" <<EOF
import ${component_name_camel} from './src/index.vue'

import { install } from '@yto-custom/utils'

export const Yto${component_name_camel} = install(${component_name_camel})
export default Yto${component_name_camel}

export * from './src/interface'
export type ${component_name_camel}Instance = InstanceType<typeof ${component_name_camel}>
EOF

# 生成 props.ts 文件内容
cat > "packages/components/${component_dir}/src/props.ts" <<EOF
import type { ExtractPropTypes } from 'vue'
export const Props = {
}
export type ${component_name_camel}Props = ExtractPropTypes<typeof Props>
EOF

# 生成 index.vue 文件内容
cat > "packages/components/${component_dir}/src/index.vue" <<EOF
<template>
  <div>${component_name_camel}</div>
</template>

<script lang="ts" setup name="${component_name_camel}">

</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
EOF

# 生成 interface.ts 文件内容
cat > "packages/components/${component_dir}/src/interface.ts" <<EOF
export type { ${component_name_camel}Props } from './props'
EOF

# 生成 index.scss 文件
touch "packages/components/${component_dir}/src/index.scss"

echo "组件目录已创建: packages/components/${component_dir}"

# 执行 pnpm gen:components 命令
pnpm run gen:components

echo "组件生成完成！"