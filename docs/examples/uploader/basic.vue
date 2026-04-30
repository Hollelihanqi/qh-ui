<template>
  <div style="padding: 16px">
    <hd-uploader
      :get-instance="getInstance"
      :options="options"
      @file-success="handleUploadSuccess"
      @file-removed="handleFileRemoved"
    >
      <template #uploaderBtn> <ElButton type="primary" plain :icon="Plus">文件上传</ElButton></template>
    </hd-uploader>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { ElButton } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const UploaderInstance = ref()
const mergeFile = (params = {}) => {
  //...
  return Promise.resolve({
    fileID: '123',
  })
}

// 获取 Uploader 实例
const getInstance = (uploader: any) => {
  UploaderInstance.value = uploader.value
}
// 附件上传结果回调
const handleUploadSuccess = async (rootFile: any, file: any, message: any, chunk: any) => {
  console.log('上传成功')
  let msg = message
  try {
    msg = JSON.parse(message)
  } catch (e) {
    console.error('json.parse error', e)
  }
  if (msg.success) {
    const skipUpload = msg.data ? msg.data.ifExist : 0 // 判断服务器是否已有当前上传文件
    if (skipUpload) {
      file.fileID = msg.data.fileID
    }
    const res: any = await mergeFile({
      task_id: file.uniqueIdentifier, // 当前文件id
      name: file.name,
    })
    file.fileID = res.fileID
  } else {
    await nextTick()
    file.setErrorStatus(file)
  }
}
// 附件移除
const handleFileRemoved = () => {
  //
}
const options = ref({
  target: '/api/v2/upload', // 目标上传 URL
  chunkSize: 1024 * 1024 * 4, // 分块大小 4M
  connectionCount: 3, //同时上传的连接数
  fileParameterName: 'file', // 上传文件时文件的参数名，默认file
  maxChunkRetries: 3, // 最大自动失败重试上传次数
  simultaneousUploads: 12, // 并发上传数 默认为 3
  testChunks: true, // 是否开启服务器分片校验
  // 服务器分片校验函数，秒传及断点续传基础
  checkChunkUploadedByResponse: function (chunk: any, message: any) {
    if (message) {
      let _message = message
      try {
        _message = JSON.parse(message)
      } catch (e) {
        console.error('json.parse error', e)
      }
      if (_message.data.ifExist) {
        return true
      }
      return (_message.data.chunks || []).indexOf(chunk.offset + 1) >= 0
    }
    return false
  },
  headers: {},
  // 额外的自定义查询参数
  query: (file: any, chunk: any) => {
    return {
      chunk: chunk.offset, // 当前切片id
      task_id: file.uniqueIdentifier, // 当前文件id
      ...file.params,
    }
  },
})
</script>
