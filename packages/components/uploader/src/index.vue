<template>
  <div class="uploader-w" :style="{ width: listHide ? 'auto' : '100%' }">
    <div>
      <label ref="uploadBtn" style="margin-right: 8px">
        <slot name="uploaderBtn">
          <button>上传文件</button>
        </slot>
      </label>
      <slot name="tip"></slot>
    </div>

    <!-- <UploadList v-if="!listHide">
      <template #fileListItem>
        <slot name="fileListItem"></slot>
      </template>
    </UploadList> -->
    <div v-show="UPLOADER?.fileList?.length && !listHide" class="uploader-list">
      <div v-for="file in UPLOADER.fileList" :key="file.id" class="file-item">
        <UploadInfo :file="file" :list="true">
          <template #default="{ progress, status }">
            <slot name="fileListItem" :file="file" :progress="progress" :status="status" />
          </template>
        </UploadInfo>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="Uploader">
import { ref, onMounted, provide, defineEmits, onBeforeMount } from 'vue'
import { Props } from './props'
import SimpleUploader from 'simple-uploader.js'
import SparkMD5 from 'spark-md5'
// import UploadList from './components/UploadList.vue'
import UploadInfo from './components/UploadInfo.vue'
import { logger, error } from '@yto-custom/utils'

const FILE_ADDED_EVENT = 'fileAdded'
// const FILES_ADDED_EVENT = "filesAdded";
// const UPLOAD_START_EVENT = 'uploadStart'
const props = defineProps(Props)

const emits = defineEmits(['on-type-error', 'on-exceed-limit', 'on-files-submitted', 'on-complete'])
const _options = {
  target: '/api/v2/upload', // 目标上传 URL
  chunkSize: props.isSlice ? 1024 * 1024 * 1 : Number.MAX_SAFE_INTEGER, // 分块大小 4M
  connectionCount: 3, //同时上传的连接数
  fileParameterName: 'file', // 上传文件时文件的参数名，默认file
  maxChunkRetries: 3, // 最大自动失败重试上传次数
  simultaneousUploads: 3, // 并发上传数 默认为 3
  testChunks: props.isSlice, // 是否开启服务器分片校验
  // 服务器分片校验函数，秒传及断点续传基础
  checkChunkUploadedByResponse: props.isSlice
    ? function (chunk: any, message: any) {
        const _message = JSON.parse(message)
        if (_message.data.ifExist) {
          return true
        }
        return (_message.data.chunks || []).indexOf(chunk.offset + 1) >= 0
      }
    : null,
  headers: typeof props.headers === 'function' ? props.headers() : props.headers,
  // 额外的自定义查询参数
  query: (file: any, chunk: any) => {
    return {
      chunk: chunk.offset, // 当前切片id
      task_id: file.uniqueIdentifier, // 当前文件id
      ...file.params,
      ...props.requestParams,
    }
  },
}

// const checkChunkUploaded = (chunk: any, message: any) => {
//   const _message = JSON.parse(message)
//   if (_message.data.ifExist) {
//     return true
//   }
//   return (_message.data.chunks || []).indexOf(chunk.offset + 1) >= 0
// }

const uploadBtn = ref()

// const started = ref(false)
const files = ref<any>([])
const fileList = ref<any>([])
let UPLOADER = ref<any>()
provide('uploader', UPLOADER)

const initUploader = () => {
  const uploader: any = new SimpleUploader({ ..._options, ...props.options })
  UPLOADER.value = uploader
}

const initUploaderEvent = () => {
  const elements = uploadBtn.value.querySelectorAll(':scope > *:not(input)')
  const arr = Array.from(elements)
  UPLOADER.value.assignBrowse(arr[0])
  UPLOADER.value.fileStatusText = props.statusText
  UPLOADER.value.on(FILE_ADDED_EVENT, fileAdded)
  UPLOADER.value.on('fileRemoved', fileRemoved)
  UPLOADER.value.on('filesSubmitted', filesSubmitted)
  UPLOADER.value.on('fileComplete', fileComplete)
  UPLOADER.value.on('fileSuccess', fileSuccess)
  UPLOADER.value.on('fileError', fileError)
  UPLOADER.value.on('complete', complete)
  UPLOADER.value.on('uploadStart', uploadStart)
}
// function kebabCase(s) {
//   return s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
// }
// const uploadStart = () => {
//   started.value = true;
// };

// 只允许一次添加一个文件
const setInputAttrs = () => {
  const inputElement = uploadBtn.value.querySelector('input[type="file"]')
  if (!props.multiple) {
    inputElement.multiple = false
  }
  if (props.accept) {
    inputElement.accept = props.accept
  }
}
// 移除文件
const _removeFile = (file: any) => {
  const fileList = UPLOADER.value.fileList
  UPLOADER.value.fileList = fileList.filter((item: any) => item.id !== file.id)
}
// 文件类型校验
const checkFileType = (file: any) => {
  const suffix = file.getExtension()
  const suffies = props.accept.split(',')
  if (!suffies.includes(`.${suffix}`)) {
    _removeFile(file)
    emits('on-type-error', file, props.accept)
    return false
  }
  return true
}

// 超出 limit 数量 时触发
const fileLimitOver = (file: any) => {
  _removeFile(file)
  error('超出最大上传数量')
  emits('on-exceed-limit', file, props.limit)
}
//文件添加到上传队列之前调用，可用于文件校验，返回 false 禁止文件上传,并且从列表中移除当前文件
const fileAdded = (file: any) => {
  const fileList = UPLOADER.value.fileList
  // 如果上传文件数量超过最大上传数 limit
  if (props.limit && fileList.length > props.limit) {
    fileLimitOver(file)
    return false
  }
  if (props.accept && props.isCheckFileType && !checkFileType(file)) {
    return false
  }
  if (props.onFileAdded) {
    let bool = props.onFileAdded(file)
    if (!bool) {
      _removeFile(file)
    }
    return bool
  }
  return true
}

//特定文件已从上传队列中移除
const fileRemoved = (file: any) => {
  files.value = UPLOADER.value.files
  fileList.value = UPLOADER.value.fileList
  if (props.onFileRemoved) {
    props.onFileRemoved(file)
  }
}

//文件添加到上传队列之后，可用于开始上传当前添加的文件
const filesSubmitted = (files: any) => {
  files.value = UPLOADER.value.files
  fileList.value = UPLOADER.value.fileList
  emits('on-files-submitted', UPLOADER.value.getFileList())
  if (props.autoUpload) {
    files.forEach((file: any) => startUpload(file))
  }
}

// 文件上传完成后触发
const fileComplete = (rootFile: any) => {
  if (props.onFileComplete) {
    props.onFileComplete(rootFile)
  }
}

const processResponse = (message: any, file: any) => {
  let res = message
  try {
    res = JSON.parse(message)
    file._response = res
  } catch (e) {
    error('processResponse', e)
  }
}

// 单个文件上传成功后触发
const fileSuccess = (rootFile: any, file: any, message: any, chunk: any) => {
  setTimeout(() => {
    rootFile.setStatus('success')
  }, 500)
  processResponse(message, file)
  if (props.onFileSuccess) {
    props.onFileSuccess(rootFile, file, message, chunk)
  }
}

// 文件上传错误
const fileError = (rootFile: any, file: any, message: any, chunk: any) => {
  if (props.onFileError) {
    props.onFileError(rootFile, file, message, chunk)
  }
}

// 上传完成
const complete = () => {
  emits('on-complete', UPLOADER.value.fileList)
}

// 文件开始上传
const uploadStart = () => {
  logger('文件开始上传')
}

// 计算文件切片数量
const _ctotalChunks = (file: any) => {
  const _forceChunkSize = props.options.forceChunkSize || false
  const round = _forceChunkSize ? Math.ceil : Math.floor
  const chunkSize = props.options.chunkSize || _options.chunkSize
  const _totalChunks = Math.max(round(file.size / chunkSize), 1)
  file._totalChunks = _totalChunks
  return _totalChunks
}

//开始上传
const startUpload = (file: any) => {
  file.cmd5 = true
  const fileReader = new FileReader()
  const time = new Date().getTime()
  const blobSlice = File.prototype.slice
  let currentChunk = 0 // 初始化切片 id
  const chunkSize = props.options.chunkSize || _options.chunkSize
  const chunks = Math.ceil(file.size / chunkSize) // 计算切片数量
  const spark: any = new SparkMD5.ArrayBuffer()
  _ctotalChunks(file)
  // 暂停上传，开始计算文件的 MD5 值
  file.pause()

  // 循环读取文件切片
  loadNext()

  // 文件读取完成
  fileReader.onload = (e: any) => {
    spark.append(e.target.result) //添加数组缓冲区
    if (currentChunk < chunks) {
      currentChunk++
      loadNext()
    } else {
      const HASH = spark.end() // MD5 计算结束
      const spark2: any = new SparkMD5() // 解决不同文件名生成唯一 MD5 值
      spark2.append(HASH + file.name)
      const HASH2 = spark2.end()
      file.uniqueIdentifier = HASH2 // 增加文件唯一标识
      file.resume() // 恢复文件开始上传
      file.cmd5 = false
      logger(
        `MD5计算完毕：${file.name} \nMD5：${HASH} \n分片：${chunks} 大小:${file.size} 用时：${
          new Date().getTime() - time
        } ms`,
      )
    }
  }
  // 文件读取过程中发生错误
  fileReader.onerror = function () {
    error(`文件${file.name}读取出错，请检查该文件`)
    file.cancel() // 取消上传
  }

  function loadNext() {
    let start = currentChunk * chunkSize
    let end = start + chunkSize >= file.size ? file.size : start + chunkSize
    fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end))
  }
}

const clearFiles = () => {
  UPLOADER.value.fileList = []
}
const getFileList = () => {
  return UPLOADER.value.fileList
}
const removeFile = (file: any) => {
  file._removeFile(file)
}
const _upload = () => {
  uploadBtn.value.click()
}
onBeforeMount(() => {
  initUploader()
})

onMounted(() => {
  initUploaderEvent()
  UPLOADER.value.clearFiles = clearFiles
  UPLOADER.value.removeFile = removeFile
  UPLOADER.value.getFileList = getFileList
  UPLOADER.value._upload = _upload
  props.getInstance(UPLOADER)
  setInputAttrs()
})
</script>

<style lang="scss" scoped>
.uploader-w {
  position: relative;
  width: 100%;
}
.uploader-list {
  padding-top: 8px;
}
.file-item:last-child {
  .upload-info {
    border: none;
  }
}
</style>
