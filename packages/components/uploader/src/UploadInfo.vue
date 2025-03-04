<template>
  <div class="upload-info" :status="status2">
    <slot :progress="progress" :status="status2">
      <div
        class="uploader-file-progress"
        :class="file.error ? 'error-uploader-file-progress' : progressingClass"
        :style="progressStyle"
      ></div>
      <div class="uploader-file-info">
        <div class="name">
          <span> {{ file.name }}</span>
        </div>
        <div class="size">{{ fileSize }}</div>
        <div class="status">
          <!-- <span v-show="status !== 'uploading'">{{ file.error ? statusText.error : statusText[status] }}</span> -->
          <span v-show="status2 !== 'uploading'">{{ statusText[status2] }}</span>
          <div v-show="status2 === 'uploading'" class="flex items-center gap-2">
            <span>{{ progressStyle.progress }}</span>
            <span>{{ uploadAverageSpeed }}</span>
          </div>
        </div>
        <div class="uploader-file-actions">
          <span v-if="status2 === 'uploading'" class="uploader-file-pause" @click="pause"></span>
          <span v-if="status2 === 'paused'" class="uploader-file-resume" @click="resume">️</span>
          <span v-if="status2 === 'error' || file.error" class="uploader-file-retry" @click="retry"></span>
          <span class="uploader-file-remove" @click="remove"></span>
        </div>
      </div>
    </slot>
  </div>
</template>
<script lang="ts" setup>
import SimpleUploader from 'simple-uploader.js'
import { computed, watch, ref, onBeforeMount } from 'vue'

const props = defineProps({
  file: {
    type: Object,
    default: () => ({}),
  },
})

const paused = ref(false)
const error = ref(false)
const isComplete = ref(false) // 文件是否已上传完成，并收到服务器响应
const isUploading = ref(false) // 是否正在上传
const averageSpeed = ref(0)
const currentSpeed = ref(0)
const progress = ref(0) //当前文件上传进度
const progressingClass = ref('')
const uploadedSize = ref('')
const timeRemaining = ref('') // 剩余时间
const uploadFileSize = ref('') // 上传文件总大小
const extension = ref('') // 文件扩展名
const fileType = ref('') // 文件类型

const statusText = {
  success: '成功',
  error: '错误',
  uploading: '正在上传...',
  paused: '暂停',
  cmd5: '计算MD5...',
  waiting: '等待中...',
} as any

const status2 = ref('waiting')

watch(
  () => status2.value,
  (newStatus, oldStatus) => {
    let timer: any = null
    if (oldStatus && newStatus === 'uploading' && oldStatus !== 'uploading') {
      timer = setTimeout(() => {
        progressingClass.value = 'uploader-file-progressing'
      }, 300)
    } else {
      clearTimeout(timer)
      progressingClass.value = ''
    }
  },
)

const progressStyle = computed(() => {
  const _progress = Math.floor(progress.value * 100)
  const style = `translateX(${Math.floor(_progress - 100)}%)`
  return {
    progress: `${_progress}%`,
    webkitTransform: style,
    mozTransform: style,
    msTransform: style,
    transform: style,
  }
})

const fileSize = computed(() => {
  return props.file.getFormatSize()
})

const uploadAverageSpeed = computed(() => {
  return `${SimpleUploader.utils.formatSize(averageSpeed.value)} / s`
})

const pause = () => {
  props.file.pause()
  status2.value = 'paused'
}
const resume = () => {
  props.file.resume()
  _actionCheck()
}
const remove = () => {
  props.file.cancel()
}
const retry = () => {
  props.file.retry()
  // _actionCheck();
}

const _fileProgress = () => {
  const _isUploading = props.file.isUploading()
  const _progress = props.file.progress()
  progress.value = _progress
  averageSpeed.value = props.file.averageSpeed
  currentSpeed.value = props.file.currentSpeed
  isUploading.value = props.file.isUploading()
  timeRemaining.value = props.file.timeRemaining()
  uploadedSize.value = props.file.sizeUploaded()
  if (_isUploading) {
    status2.value = 'uploading'
  }
}

const _actionCheck = () => {
  paused.value = props.file.paused
  error.value = props.file.error
  isUploading.value = props.file.isUploading()
}

const setStatus = (value: string) => {
  status2.value = value
}

watch(
  () => props.file.error,
  (newValue) => {
    if (newValue) {
      setStatus('error')
    }
  },
)

watch(
  () => props.file.cmd5,
  (newValue) => {
    if (newValue) {
      console.log('已经开始计算 MD5')
      setStatus('cmd5')
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

onBeforeMount(() => {
  averageSpeed.value = props.file.averageSpeed
  uploadedSize.value = props.file.sizeUploaded()
  uploadFileSize.value = props.file.getSize()
  extension.value = props.file.getExtension()
  fileType.value = props.file.getType()
  paused.value = props.file.paused
  progress.value = props.file.progress()
  isComplete.value = props.file.isComplete()
  isUploading.value = props.file.isUploading()
  timeRemaining.value = props.file.timeRemaining()
  currentSpeed.value = props.file.currentSpeed
  // props.file.setErrorStatus = _setErrorStatus;
  props.file.setStatus = setStatus
  props.file.status = status2
  props.file.uploader.on('fileProgress', _fileProgress)
})
defineExpose({ setStatus })
</script>
