# Uploader

基于 [simple-uploader.js](https://github.com/simple-uploader/Uploader) 库开发的 Vue3 大文件上传器

### 功能

- 大文件分片上传
- 断点续传
- 秒传

## 基本使用

<demo src="./basic.vue"></demo>

### Uploader 属性

| 属性名          | 说明                                                                                                                                                                                                                                                        | 类型            | 可选值     | 默认值 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------- | ------ |
| options         | uploader 实例配置项                                                                                                                                                                                                                                         | Object          | —          | {}     |
| isSlice         | 是否切片                                                                                                                                                                                                                                                    | Boolean         | true/false | true   |
| autoUpload      | 文件添加后是否立即上传                                                                                                                                                                                                                                      | Boolean         | true/false | true   |
| multiple        | 是否支持文件多选                                                                                                                                                                                                                                            | Boolean         | true/false | true   |
| limit           | 最大上传文件数(0 代表没有限制)                                                                                                                                                                                                                              | Number          | —          | 0      |
| listHide        | 是否隐藏文件上传列表                                                                                                                                                                                                                                        | Boolean         | true/false | false  |
| accept          | 指定文件上传控件可接受的文件类型                                                                                                                                                                                                                            | String          | —          | ""     |
| isCheckFileType | 是否检查文件类型 <span title="内部会调用 `checkFileType` 方法，根据 `accept` 属性进行文件后缀名检查，如果上传的文件类型不符合`accept`可接受的文件类型，直接移除文件，并且调用`on-type-error`事件。如果 `accept`为空，不会调用`checkFileType`方法">？</span> | Boolean         | true/false | true   |
| headers         | 上传文件时额外发送的 HTTP 请求头                                                                                                                                                                                                                            | Object/Function | —          | {}     |
| requestParams   | 额外的自定义请求参数                                                                                                                                                                                                                                        | Object          | —          | {}     |
| onFileAdded     | 文件添加到上传队列之前调用,可用于文件校验，返回 false 禁止文件上传,并且从列表中移除当前文件。`(file)=>{}`                                                                                                                                                   | Function        | —          | null   |
| onFileSuccess   | 单个文件上传成功后触发。`(rootFile, file, message, chunk)=>{}`                                                                                                                                                                                              | Function        | —          | null   |
| onFileError     | 文件上传错误。`(rootFile, file, message, chunk)=>{}`                                                                                                                                                                                                        | Function        | —          | null   |
| onFileComplete  | 所有文件上传完成后触发。`(rootFile)=>{}`                                                                                                                                                                                                                    | Function        | —          | null   |
| onFileRemoved   | 特定文件已从上传队列中移除后触发,返回当前删除文件。`(file)=>{}`                                                                                                                                                                                             | Function        | —          | null   |
| getInstance     | 返回 Uploader 实例`(UPLOADER) => ({})`                                                                                                                                                                                                                      | Function        | —          | null   |

### options 属性

| 属性                           | 说明                                                                                                      | 类型           | 默认值     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------- | -------------- | ---------- |
| `target`                       | 目标上传 URL                                                                                              | String         | ''         |
| `chunkSize`                    | 分片大小                                                                                                  | Number         | 4M         |
| `connectionCount`              | 同时上传的连接数                                                                                          | Number         | 3          |
| `fileParameterName`            | 上传文件时文件的参数名                                                                                    | String         | 'file'     |
| `maxChunkRetries`              | 最大自动失败重试上传次数                                                                                  | Number         | 3          |
| `simultaneousUploads`          | 并发上传数                                                                                                | Number         | 3          |
| `testChunks`                   | 是否开启服务器分片校验                                                                                    | Boolean        | true       |
| `checkChunkUploadedByResponse` | 该函数的作用是检查分片是否已经上传成功，如果上传成功则返回 true，否则返回 false。                         | Functon        | -          |
| `headers`                      | 请求头参数                                                                                                | Functon/Object | () => ({}) |
| `query`                        | POST 请求时额外参数。如果是函数，它将传递一个 Uploader.File、一个 Uploader.Chunk 对象和一个 isTest 布尔值 | Functon/Object | {}         |

```js
checkChunkUploadedByResponse: function(chunk, message) {
    var objMessage = {}
    try {
    objMessage = JSON.parse(message)
    } catch (e) {}
    return (objMessage.uploaded_chunks || []).indexOf(chunk.offset + 1) >= 0
}

query: (file: any, chunk: any) => {
    return {
    chunk: chunk.offset, // 当前切片id
    task_id: file.uniqueIdentifier, // 当前文件id
    ...file.params,
    ...props.requestParams,
    };
}

```

### Uploader 方法

| 名称     | 说明         | 备注           |
| -------- | ------------ | -------------- |
| `upload` | 恢复文件上传 | 可用于手动上传 |

### File 方法

| 名称             | 说明                             | 备注                                                              |
| ---------------- | -------------------------------- | ----------------------------------------------------------------- |
| `setErrorStatus` | 设置文件状态为 Error 状态        | 当接口上传错误时，可以调用此方法将，当前上传列表项置为 error 状态 |
| `pause`          | 暂停上传                         | 当调用 `pause()` 方法时会暂停文件上传                             |
| `resume`         | 恢复上传                         | 当调用 `resume()` 方法时会继续文件上传                            |
| `retry`          | 重新上传                         | 当调用 `retry()` 方法时会再次上传当前文件                         |
| `cancel`         | 中止上传，并从上传列表列表中移除 |                                                                   |
| `progress`       | 文件当前上传进度                 |                                                                   |
| `sizeUploaded`   | 返回上传的大小（以字节为单位）   |                                                                   |

### File 属性

| 名称               | 说明                           |
| ------------------ | ------------------------------ |
| `name`             | 文件名称                       |
| `averageSpeed`     | 平均上传速度，每秒字节数。     |
| `currentSpeed`     | 当前上传速度 ，每秒字节数。    |
| `uniqueIdentifier` | 分配给该文件对象的唯一标识符。 |
| `status`           | 文件上传状态。                 |
| `_response`        | 接口返回结果。                 |

### UploaderInstance 方法

| 名称          | 说明                                                                                       | 备注                                                                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clearFiles`  | 清空上传列表                                                                               |                                                                                                                                                                                                      |
| `removeFile`  | 移除上传列表中的某一个文件，此方法接收一个文件的唯一标识属性（如果没有直接传入 File 对象） |                                                                                                                                                                                                      |
| `getFileList` | 获取上传文件列表                                                                           |                                                                                                                                                                                                      |
| `_upload`     | 手动触发上传                                                                               | 一个页面上有多处上传的时候（列表这种情况比较多），`Uploader` 组件只需要引入一次，避免组件多次渲染。在需要上传的地方放一个普通的按钮（点击后调用此方法即可）。例：`UploaderInstance.value._upload();` |

### 事件

| 名称                 | 说明                                                 |
| -------------------- | ---------------------------------------------------- |
| `on-type-error`      | 文件校验错误后触发                                   |
| `on-exceed-limit`    | 文件超出最大上传数量后触发                           |
| `on-files-submitted` | 文件添加到上传队列之后，可用于开始上传当前添加的文件 |
| `on-complete`        | 文件上传完成                                         |

### 插槽

| 名称           | 说明           |
| -------------- | -------------- |
| `uploaderBtn`  | 触发上传按钮   |
| `fileListItem` | 上传文件列表项 |
| `tip`          | 文本说明       |
