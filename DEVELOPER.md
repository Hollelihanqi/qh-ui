# 组件库介绍

本组件库是基于 Element-Plus 进行封装符合自己业务需求的业务组件库，以及常用 Element-Plus 组件的二次封装。

# 开发规范

## 组件创建

- 进入 packages/yto-custom/src/components 目录
- 创建组件目录 xxx (小写开头，例如：table)
- 组件目录结构
  - xxx/index.ts 组件主入口
  - xxx/src 组件核心代码
  - xxx/src/index.vue 组件代码入口
  - xxx/src/instance.ts 组件 Type 声明
  - xxx/src/components/ 主组件依赖的公共组件

## 组件命名

大驼峰命名：Menu

```
     <script lang="ts" setup name="Menu"></script>

     <script>
        export default defineComponent({
            name: "Menu",
        })
     </script>
```

## 组件依赖安装

为了防止依赖包版本不一致，又避免组件库打包过于大，一般会在 vite.config.ts 中将某一个依赖排除在外，但是自己的组件又需要使用它。请将对应的依赖包安装到 peerDependencies 配置下。

```shell
  pnpm add --save-peer xxx
```

安装 workspace 下的包

```shell
  pnpm add <packageName> --workspace
```

删除已发布的指定版本

```shell
  npm unpublish @yto/custom@x.x.x-beta
```
