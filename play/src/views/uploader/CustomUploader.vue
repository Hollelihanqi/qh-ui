<template>
  <yto-uploader
    v-bind="$attrs"
    :options="uploaderOptions"
    @on-exceed-limit="handleExceedLimit"
    @on-type-error="handleTypeError"
    @file-success="handleUploadSuccess"
  >
    <template #uploaderBtn>
      <slot name="uploaderBtn">
        <el-button type="primary" plain>文件上传</el-button>
      </slot>
    </template>
  </yto-uploader>
</template>

<script lang="ts" setup>
import { mergeFile } from '@/api'
import { getToken } from '@/utils'
// import Uploader from '@yto-custom/components/uploader/src/uploader.vue'
// import '@yto-custom/components/uploader/src/uploader.scss'
import { ElMessage } from 'element-plus'
const props = defineProps({
  requestParams: {
    type: Object,
    default: () => ({}),
  },
  mergetParams: {
    type: Object,
    default: () => ({}),
  },
})
const emits = defineEmits(['up-error', 'up-skipUpload', 'up-success'])
const uploaderOptions = {
  target: '/api/v2/upload', // 目标上传 URL
  headers: { authorization: getToken() },
  // 额外的自定义查询参数
  query: (file: any, chunk: any) => {
    return {
      chunk: chunk.offset, // 当前切片id
      task_id: file.uniqueIdentifier, // 当前文件id
      ...file.params,
      ...props.requestParams,
    }
  },
  // 服务器分片校验函数，秒传及断点续传基础
  checkChunkUploadedByResponse: function (chunk: any, message: any) {
    const _message = JSON.parse(message)
    if (_message.data.ifExist) {
      return true
    }
    return (_message.data.chunks || []).indexOf(chunk.offset) >= 0
  },
}
//文件上传个数超出
const handleExceedLimit = (file: any, limit: any) => {
  console.error('上传数量超出', file, limit)
}
//文件上传类型错误
const handleTypeError = (file: any, accept: any) => {
  console.error('文件类型错误', file, accept)
}
// 附件上传结果回调
const handleUploadSuccess = async (_: any, file: any, message: any) => {
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
      emits('up-skipUpload', file)
    } else {
      if (!msg.code || msg.code !== 'SUCCESS_REQUEST') {
        ElMessage.error(msg.message || '上传失败！')
        return
      }
      const res: any = await mergeFile({
        task_id: file.uniqueIdentifier, // 当前文件id
        name: file.name,
        ...props.mergetParams,
      })
      file.fileID = res.fileID
      emits('up-success', file)
    }
  } else {
    ElMessage.error(msg.message || '上传失败！')
    await nextTick()
    file.setStatus('error')
    emits('up-error', file)
  }
}
</script>
