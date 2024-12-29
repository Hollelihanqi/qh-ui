import SimpleUploader from 'simple-uploader.js'
import SparkMD5 from 'spark-md5'
import { ref, onBeforeMount, provide, onMounted } from 'vue'
import { UploaderProps } from './uploader'

export const baseOptions = {
  target: '/api/v2/upload', // 目标上传 URL
  chunkSize: 1024 * 1024 * 1, // 分块大小 4M
  connectionCount: 3, //同时上传的连接数
  fileParameterName: 'file', // 上传文件时文件的参数名，默认file
  maxChunkRetries: 3, // 最大自动失败重试上传次数
  simultaneousUploads: 3, // 并发上传数 默认为 3
  testChunks: true, // 是否开启服务器分片校验
  // 服务器分片校验函数，秒传及断点续传基础
  checkChunkUploadedByResponse: null,
  headers: {},
  // 额外的自定义查询参数
  query: {}
}

// 处理 options 参数
const handleOptions = (props: UploaderProps) => {
  const query = (file: any, chunk: any) => {
    return {
      chunk: chunk.offset,
      task_id: file.uniqueIdentifier,
      ...file.params,
      ...(typeof props.requestParams === 'function'
        ? props.requestParams()
        : props.requestParams || {}),
    }
  }

  const options = {
    ...baseOptions,
    query,
    ...props.options
  }

  return options
}

const eventList = {
  FILE_ADDED_EVENT: 'fileAdded',
  FILE_REMOVED_EVENT: 'fileRemoved',
  FILES_SUBMITTED_EVENT: 'filesSubmitted',
  FILE_COMPLETE_EVENT: 'fileComplete',
  FILE_SUCCESS_EVENT: 'fileSuccess',
  FILE_ERROR_EVENT: 'fileError',
  COMPLETE_EVENT: 'complete',
  UPLOAD_START_EVENT: 'uploadStart',
}
const useUploader = (props: UploaderProps, emits: any) => {
  const uploadBtn = ref()
  const files = ref<any[]>([])
  const fileList = ref<any[]>([])
  const UPLOADER = ref<any>(null)

  const initUploader = () => {
    const uploader = new SimpleUploader(handleOptions(props))
    UPLOADER.value = uploader
  }

  // 移除文件
  const __removeFile = (file: any) => {
    const fileList = UPLOADER.value.fileList
    UPLOADER.value.fileList = fileList.filter((item: any) => item.id !== file.id)
  }
  // 超出 limit 数量 时触发,并且从列表中移除当前文件
  const fileLimitOver = (file: any) => {
    __removeFile(file)
    console.error('超出最大上传数量')
    emits('on-exceed-limit', file, props.limit)
  }

  // 文件类型校验,返回 false 禁止文件上传,并且从列表中移除当前文件
  const __checkFileType = (file: any) => {
    const suffix = file.getExtension()
    const suffies = props.accept.split(',')
    if (!suffies.includes(`.${suffix}`)) {
      __removeFile(file)
      emits('on-type-error', file, props.accept)
      return false
    }
    return true
  }
  //文件添加到上传队列之前调用，可用于文件校验，返回 false 禁止文件上传,并且从列表中移除当前文件
  const fileAdded = (file: any) => {
    const fileList = UPLOADER.value.fileList
    // 如果上传文件数量超过最大上传数 limit
    if (props.limit && fileList.length > props.limit) {
      fileLimitOver(file)
      return false
    }
    if (props.accept && props.isCheckFileType && !__checkFileType(file)) {
      return false
    }
    if (props.onFileAdded) {
      let bool = props.onFileAdded(file)
      if (!bool) {
        __removeFile(file)
      }
      return bool
    }
    return true
  }

  //特定文件已从上传队列中移除时触发
  const fileRemoved = (file: any) => {
    files.value = UPLOADER.value.files
    fileList.value = UPLOADER.value.fileList
    if (props.onFileRemoved) {
      props.onFileRemoved(file)
    }
  }

  //文件添加到上传队列之后，可用于开始上传当前添加的文件时触发，可用于开始上传当前添加的文件
  const filesSubmitted = (files: any) => {
    files.value = UPLOADER.value.files
    fileList.value = UPLOADER.value.fileList
    emits('on-files-submitted', UPLOADER.value.getFileList())
    if (props.autoUpload) {
      files.forEach((file: any) => startUpload(file))
    }
  }

  // 单个文件上传完成时触发
  // 无论文件上传成功还是失败，只要传输过程结束，就会触发此事件。
  // 用于执行在每个文件上传结束后需要进行的操作，比如更新 UI 或者移除加载指示器。

  const fileComplete = (rootFile: any) => {
    if (props.onFileComplete) {
      props.onFileComplete(rootFile)
    }
  }

  // 处理服务器返回的数据
  const processResponse = (message: any, file: any) => {
    let res = message
    try {
      res = JSON.parse(message)
      file._response = res
    } catch (error) {
      console.error('processResponse', error)
    }
  }

  // 单个文件上传成功并且服务器返回成功响应后触发。
  // 通常用于处理成功上传后的业务逻辑，比如显示上传成功的消息，处理服务器返回的数据等。
  // 适用于只在文件成功上传时需要执行特定操作的场景。

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

  // 在整个上传任务完成后触发，通常是在所有文件上传完成时。
  // 用于执行与整个批次上传结束有关的操作，比如重置整个上传队列或更新整体进度。
  // 如果有多个文件上传时，通常在所有文件（不论成功或失败）都上传完成后触发此事件。

  const complete = () => {
    emits('on-complete', UPLOADER.value.fileList)
  }
  const initUploaderEvent = () => {
    const elements = uploadBtn.value?.querySelectorAll(':scope > *:not(input)') || []
    const arr = Array.from(elements)

    if (arr.length > 0) {
      UPLOADER.value.assignBrowse(arr[0])
    }

    UPLOADER.value.fileStatusText = props.statusText

    const events = [
      { event: eventList.FILE_ADDED_EVENT, handler: fileAdded },
      { event: eventList.FILE_REMOVED_EVENT, handler: fileRemoved },
      { event: eventList.FILES_SUBMITTED_EVENT, handler: filesSubmitted },
      { event: eventList.FILE_COMPLETE_EVENT, handler: fileComplete },
      { event: eventList.FILE_SUCCESS_EVENT, handler: fileSuccess },
      { event: eventList.FILE_ERROR_EVENT, handler: fileError },
      { event: eventList.COMPLETE_EVENT, handler: complete },
      { event: eventList.UPLOAD_START_EVENT, handler: () => { } },
    ]

    events.forEach(({ event, handler }) => {
      UPLOADER.value.on(event, handler)
    })
  }

  // 计算当前文件的切片数量
  const chunksTotal = (file: any) => {
    const _forceChunkSize = props.options.forceChunkSize || false
    const round = _forceChunkSize ? Math.ceil : Math.floor
    const chunkSize = props.options.chunkSize || baseOptions.chunkSize
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
    const chunkSize = props.options.chunkSize || baseOptions.chunkSize
    const chunks = Math.ceil(file.size / chunkSize) // 计算切片数量
    const spark: any = new SparkMD5.ArrayBuffer()
    chunksTotal(file)
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
        console.log(
          `MD5计算完毕：${file.name} \nMD5：${HASH} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time
          } ms`,
        )
      }
    }
    // 文件读取过程中发生错误
    fileReader.onerror = function () {
      console.error(`文件${file.name}读取出错，请检查该文件`)
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

  const removeFile = (file: any) => {
    file._removeFile(file)
  }

  const getFileList = () => {
    return UPLOADER.value.fileList
  }

  const __upload = () => {
    uploadBtn.value.click()
  }

  // 设置 input multiple 属性
  const setInputMultiple = (multiple = true) => {
    const inputElement = uploadBtn.value.querySelector('input[type="file"]')
    if (!props.multiple) {
      inputElement.multiple = multiple
    }
    if (props.accept) {
      inputElement.accept = props.accept
    }
  }

  onBeforeMount(() => {
    initUploader()
  })

  onMounted(() => {
    initUploaderEvent()
    UPLOADER.value.clearFiles = clearFiles
    UPLOADER.value.removeFile = removeFile
    UPLOADER.value.getFileList = getFileList
    UPLOADER.value._upload = __upload
    props.getInstance(UPLOADER)
    setInputMultiple(false)
  })

  provide('uploader', UPLOADER)

  return {
    uploadBtn,
    files,
    fileList,
    UPLOADER
  }
}

export default useUploader