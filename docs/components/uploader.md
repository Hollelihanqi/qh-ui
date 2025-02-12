---
title: Uploader 文件上传
---

# Uploader 文件上传

::: tip
一个基于 [simple-uploader.js](https://github.com/simple-uploader/Uploader/blob/master/README_zh-CN.md) 的 Vue3 大文件分片上传组件。支持断点续传、秒传及文件状态管理等功能。
:::

## 基础用法

:::demo
uploader/basic
:::

## API

### Uploader 属性

| 属性名                       | 说明                                                                                                                                  | 类型            | 默认值 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------ |
| options                      | uploader 实例配置项，详见下方 options 配置                                                                                            | Object          | {}     |
| isSlice                      | 是否启用文件分片上传                                                                                                                  | Boolean         | true   |
| checkChunkUploadedByResponse | 检查分片是否已上传的回调函数，返回 true 表示该分片已上传。参数为(chunk, message)，其中 chunk 为当前分片信息，message 为服务端返回数据 | Function        | null   |
| autoUpload                   | 是否在选择文件后自动上传                                                                                                              | Boolean         | true   |
| multiple                     | 是否允许多文件上传                                                                                                                    | Boolean         | true   |
| limit                        | 最大上传文件数量(0表示不限制)                                                                                                         | Number          | 0      |
| listHide                     | 是否隐藏文件上传列表                                                                                                                  | Boolean         | false  |
| accept                       | 接受的文件类型，例如 `.jpg,.png`                                                                                                      | String          | ""     |
| isCheckFileType              | 是否校验文件类型                                                                                                                      | Boolean         | true   |
| headers                      | 上传请求的 HTTP 头                                                                                                                    | Object/Function | {}     |
| requestParams                | 上传请求的额外参数                                                                                                                    | Object          | {}     |

### Options 配置项

| 属性名                       | 说明                     | 类型     | 默认值      |
| ---------------------------- | ------------------------ | -------- | ----------- |
| target                       | 上传接口地址             | String   | ''          |
| chunkSize                    | 分片大小(单位:字节)      | Number   | 4194304(4M) |
| connectionCount              | 并发上传连接数           | Number   | 3           |
| fileParameterName            | 上传文件的参数名         | String   | 'file'      |
| maxChunkRetries              | 分片上传失败最大重试次数 | Number   | 3           |
| simultaneousUploads          | 并发上传数               | Number   | 3           |
| testChunks                   | 是否开启分片校验         | Boolean  | true        |
| checkChunkUploadedByResponse | 分片上传完成校验函数     | Function | -           |

### 事件

| 事件名           | 说明                   | 回调参数                   |
| ---------------- | ---------------------- | -------------------------- |
| on-file-added    | 文件添加前的钩子       | (file: File) => boolean    |
| on-file-success  | 文件上传成功时触发     | (rootFile, file, response) |
| on-file-error    | 文件上传失败时触发     | (rootFile, file, response) |
| on-file-complete | 文件上传完成时触发     | (rootFile)                 |
| on-file-removed  | 文件被移除时触发       | (file)                     |
| on-type-error    | 文件类型校验失败时触发 | (file)                     |
| on-exceed-limit  | 超出文件数量限制时触发 | (files)                    |

### 插槽

| 插槽名       | 说明             |
| ------------ | ---------------- |
| uploaderBtn  | 自定义上传按钮   |
| fileListItem | 自定义文件列表项 |
| tip          | 自定义提示文本   |

### File 对象方法

文件对象提供以下方法用于控制上传:

| 方法名   | 说明     |
| -------- | -------- |
| pause()  | 暂停上传 |
| resume() | 继续上传 |
| retry()  | 重试上传 |
| cancel() | 取消上传 |

### File 对象属性

| 属性名       | 说明           |
| ------------ | -------------- |
| name         | 文件名         |
| size         | 文件大小(字节) |
| status       | 上传状态       |
| progress     | 上传进度(0-1)  |
| averageSpeed | 平均上传速度   |
| currentSpeed | 当前上传速度   |
| \_response   | 服务器响应数据 |
