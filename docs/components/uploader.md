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

| 属性名                       | 说明                                                                                                                                  | 类型            | 默认值           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------- |
| modelValue                   | 用于获取当前上传的文件列表。注意：文件的添加、删除等操作请使用组件提供的方法，而不是直接修改此值                                      | Array           | []               |
| options                      | uploader 实例配置项，详见下方 options 配置                                                                                            | Object          | {}               |
| exposeRef                    | 暴露组件内部方法的引用对象                                                                                                            | Object          | null             |
| isSlice                      | 是否启用文件分片上传                                                                                                                  | Boolean         | true             |
| checkChunkUploadedByResponse | 检查分片是否已上传的回调函数，返回 true 表示该分片已上传。参数为(chunk, message)，其中 chunk 为当前分片信息，message 为服务端返回数据 | Function        | null             |
| autoUpload                   | 是否在选择文件后自动上传                                                                                                              | Boolean         | true             |
| multiple                     | 是否允许多文件上传                                                                                                                    | Boolean         | true             |
| limit                        | 最大上传文件数量(0表示不限制)                                                                                                         | Number          | 0                |
| listHide                     | 是否隐藏文件上传列表                                                                                                                  | Boolean         | false            |
| accept                       | 接受的文件类型，例如 `.jpg,.png`                                                                                                      | String          | ""               |
| isCheckFileType              | 是否校验文件类型                                                                                                                      | Boolean         | true             |
| statusText                   | 文件状态文本配置，可配置 success/error/uploading/paused/md5/waiting 等状态的显示文本                                                  | Object/Function | 默认中文状态文本 |
| headers                      | 上传请求的 HTTP 头                                                                                                                    | Object/Function | {}               |
| requestParams                | 上传请求的额外参数                                                                                                                    | Object/Function | {}               |
| getInstance                  | 获取 uploader 实例的回调函数                                                                                                          | Function        | () => ({})       |

### Options 配置项

| 属性名                       | 说明                     | 类型     | 默认值           |
| ---------------------------- | ------------------------ | -------- | ---------------- |
| target                       | 上传接口地址             | String   | '/api/v2/upload' |
| chunkSize                    | 分片大小(单位:字节)      | Number   | 1048576(1M)      |
| connectionCount              | 并发上传连接数           | Number   | 3                |
| fileParameterName            | 上传文件的参数名         | String   | 'file'           |
| maxChunkRetries              | 分片上传失败最大重试次数 | Number   | 3                |
| simultaneousUploads          | 并发上传数               | Number   | 3                |
| testChunks                   | 是否开启分片校验         | Boolean  | true             |
| checkChunkUploadedByResponse | 分片上传完成校验函数     | Function | null             |
| headers                      | 上传请求头               | Object   | {}               |
| query                        | 上传请求额外参数         | Object   | {}               |

### 事件

| 事件名             | 说明                                                                                         | 回调参数                          |
| ------------------ | -------------------------------------------------------------------------------------------- | --------------------------------- |
| update:modelValue  | 文件列表更新时触发                                                                           | (fileList: Array)                 |
| on-file-added      | 文件添加到上传队列之前调用，可用于文件校验，返回 false 禁止文件上传,并且从列表中移除当前文件 | (file: File) => boolean           |
| on-file-success    | 文件上传成功时触发                                                                           | (rootFile, file, response, chunk) |
| on-file-error      | 文件上传失败时触发                                                                           | (rootFile, file, response, chunk) |
| on-file-complete   | 文件上传完成时触发                                                                           | (rootFile)                        |
| on-file-removed    | 文件被移除时触发                                                                             | (file)                            |
| on-type-error      | 文件类型校验失败时触发                                                                       | (file, acceptedTypes)             |
| on-exceed-limit    | 超出文件数量限制时触发                                                                       | (file, limit)                     |
| on-files-submitted | 文件添加到上传队列后触发                                                                     | (fileList)                        |
| on-complete        | 所有文件上传完成时触发                                                                       | (fileList)                        |

### 插槽

| 插槽名       | 说明             | 作用域参数                 |
| ------------ | ---------------- | -------------------------- |
| uploaderBtn  | 自定义上传按钮   | -                          |
| fileListItem | 自定义文件列表项 | { file, progress, status } |
| tip          | 自定义提示文本   | -                          |

### 组件实例方法

通过 `exposeRef` 属性可以获取到以下方法：

| 方法名        | 说明             | 参数         |
| ------------- | ---------------- | ------------ |
| clearFiles    | 清空文件列表     | -            |
| removeFile    | 移除指定文件     | (file: File) |
| getFileList   | 获取文件列表     | -            |
| triggerUpload | 触发文件选择框   | -            |
| upload        | 开始上传所有文件 | -            |
| cancel        | 取消所有文件上传 | -            |

### File 对象方法

文件对象提供以下方法用于控制上传:

| 方法名   | 说明     |
| -------- | -------- |
| pause()  | 暂停上传 |
| resume() | 继续上传 |
| retry()  | 重试上传 |
| cancel() | 取消上传 |

### File 对象属性

| 属性名           | 说明                |
| ---------------- | ------------------- |
| name             | 文件名              |
| size             | 文件大小(字节)      |
| status           | 上传状态            |
| progress         | 上传进度(0-1)       |
| averageSpeed     | 平均上传速度        |
| currentSpeed     | 当前上传速度        |
| uniqueIdentifier | 文件唯一标识（MD5） |
| cmd5             | 是否正在计算MD5     |
| \_response       | 服务器响应数据      |
| \_totalChunks    | 文件分片总数        |

### 文件状态说明

文件在上传过程中会有以下状态：

| 状态值    | 说明      |
| --------- | --------- |
| success   | 上传成功  |
| error     | 上传失败  |
| uploading | 上传中    |
| paused    | 已暂停    |
| md5       | 计算MD5中 |
| waiting   | 等待上传  |
