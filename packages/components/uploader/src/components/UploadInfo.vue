<template>
  <div class="upload-info">
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
import { ref, onBeforeMount } from 'vue'
import SimpleUploader from 'simple-uploader.js'
import { computed, defineProps, watch } from 'vue'
import { logger } from '@yto-custom/utils'

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
      logger('已经开始计算 MD5')
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

<style lang="scss" scoped>
.upload-info {
  position: relative;
  height: 40px;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  background-color: rgba(240, 240, 240);
}
.upload-info[status='waiting'] .uploader-file-pause,
.upload-info[status='uploading'] .uploader-file-pause {
  display: block;
}
.upload-info[status='paused'] .uploader-file-resume {
  display: block;
}
.upload-info[status='error'] .uploader-file-retry {
  display: block;
}
.upload-info[status='success'] .uploader-file-remove {
  display: none;
}
.upload-info[status='error'] .uploader-file-progress {
  background: #ffe0e0;
}
.error-uploader-file-progress {
  background: #ffe0e0 !important;
}
.upload-info:hover {
  background-color: rgba(240, 240, 240);
  .uploader-file-progress {
    z-index: -1;
  }
}
.uploader-file-progress {
  position: absolute;
  width: 100%;
  height: 40px;
  background: #e2eeff;
  transform: translateX(-100%);
  z-index: 5;
}
.uploader-file-progressing {
  transition: all 0.4s linear;
}

.uploader-file-info {
  position: relative;
  z-index: 10;
  height: 100%;
  width: 100%;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  overflow: hidden;
  .name {
    width: 36%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
/* .uploader-file-info:hover {
  background-color: rgba(240, 240, 240, 0.2);
} */

.uploader-file-actions {
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  & > span {
    width: 18px;
    height: 18px;
    cursor: pointer;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABkCAYAAAD0ZHJ6AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAACxMAAAsTAQCanBgAAARkSURBVGje7ZnfS1NRHMAH4ptPkvQSuAdBkCxD8FUQJMEULUgzy1KyyPVQ4JMiiP4Bvg6EwUQQfMmwhwRDshwaKUjDVCgoSdDNHkzTJZ6+Z37Purve8+PeTb2TM/ggu+ew89l33x8H9BBCPG7GowXTJej3+wnDvEm0JuLC04+EYWftVAUv+fiCvDUdQR1BHUEdQR3BTIygvixoQS14XgTtthLVdpNWwXRLqvQ724LplFRtyrYF0yVpFLQrKRVMh6RZ0I6kkmCqklaCqpKZH0FX56Crq9jVfdDVk0RfFrSgFsxkQVmLcdKCVrKySCrryhPEyYShhzOcrFtG0EoilfHHk1CRU5rF6ZjNZhlVOW6RnMSVyyilKies4pO41diVy8wIujoHXV3FGdMHXTtJKLFYTLhZtq4vC1rwXApCZTIqgR6g1PBMCO9DL3bMMSqBHqDU8EyISDAHiGKvWwcCQG2KgjlAFCDAOhAAap0K5gKLphk8mqJgLrCIgoxRJ4J5wKpJ7gAoMkn5EBXBPGDVJHcAFJmkfIhQcAql1oBpTvTol9gG9pm4RHAKpdaAaU706JfYBvaZuJVgPQrt4sFlnOh5MC/p3lmJYD0K7eLBZZzoeTAv6d5ZnuAYHjpgEOnk5F0ufhG6v1ggOIaHDhhEOjl5l4tfhO4vthLcwAMrFNvLJO5vEwhu4IEViu1lEve3WQmyoihQFBzG/V0CQVYUBYqCw7i/SxTBcpsRbFeIYLnNCLZbCY5b5KAnxRwct8hBj9McZFVMW0ihRNBuFdMWUigRlFaxuQ9WWYjRMTiIe5z0wSoLMToGB3GPsA9aTZIJoB+nRgBnM1tzOkkmgH6cGgGczWzNpzqLx3n/aULJJgezeNw07oxQySbVywKjBOgFRnDs+VEsx8FlgVEC9AIjOPb8KJYjvSzoG7UW1IJaUAtqQS14toLNM5fN5APdwBJA8G83Pk/aK/rgzVvXzeQD3cASQPBvNz5P2ssTzAaGUIrHEO6zI5gNDKEUjyHcxxWkh4Ylcowwk1QQpIeGJXKMMJO0EgwqyjGCioJBJvDrxRMSuVOTJEXfbz1/bHwWtBL0yoQehK6RucgE+bGzanzulQh6E3IgQV+xpc8kcrfuSO7eTfJ3ZYmQw0Oy9azVKOk1C/bJ5D5F38YPeLfx0rjWJxHsS0SqsSYuxySjj5qO5Oj7xQWy2VBtFOwzCy6ryH3YfE3uh64Y1xckgstJPydEjkkeHv07Iy4Xaao15+KCWTBx6M/db+T9xivSErqaJDdzXI6yLRE8Vgg0coex/SPJvT0SbWu0KpZtbgSpCH3NRt7I5OxHkObc6heU+/M/J5vrpBFM5GBLqCQux14COXs5CNXK5OjPGm1tSMrJSOMNYQ4mVTGV/L6zTL7+DovkbFUxbSW0Wo05l8hJWsU+cRWfSh+Mt5Lb1ck/J1TvVsdDaR/MiEni+llsdZuZp62EViu+96bpNjNPWwmtVnzvFd5m9IVVC54x/wA7gNvqFG9vXQAAAABJRU5ErkJggg==')
      no-repeat 0 0;
  }
}
.uploader-file-actions .uploader-file-pause {
  background-position-y: 0;
}
.uploader-file-actions .uploader-file-resume {
  background-position-y: -17px;
}
.uploader-file-actions .uploader-file-retry {
  background-position-y: -53px;
}
.uploader-file-actions .uploader-file-remove {
  display: block !important;
  background-position-y: -34px;
}
.uploader-file-actions .uploader-file-pause:hover {
  background-position-x: -21px;
}
.uploader-file-actions .uploader-file-resume:hover {
  background-position-x: -21px;
}
.uploader-file-actions .uploader-file-retry:hover {
  background-position-x: -21px;
}
.uploader-file-actions .uploader-file-remove:hover {
  background-position-x: -21px;
}
</style>
