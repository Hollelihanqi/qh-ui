# RemoteSearch Select

基于 element-plus：ElSelect 二次封装，适用于远程搜索

### 功能

- 通过员工工号或者姓名进行搜索

## 基本使用

<demo src="./basic.vue"></demo>

## Attributes

[其它属性查看 remote-search](../remote-search/index.md)

### 属性

| 属性名    | 说明   | 类型            | 可选值 |
| --------- | ------ | --------------- | ------ |
| `v-model` | 绑定值 | `String Object` | —      |

前端本地开发代理配置

```json
server:{
    proxy: {
        "/service-api": {
        target: "http://10.130.16.149:8082",
        changeOrigin: true,
        },
    },
}
```
