<template>
  <div class="yto-uploader uploader-w" :style="styles">
    <div>
      <label ref="uploadBtn" style="margin-right: 8px">
        <slot name="uploaderBtn">
          <button>上传文件</button>
        </slot>
      </label>
      <slot name="tip"></slot>
    </div>
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
<script lang="ts" setup>
import { computed } from 'vue'
import UploadInfo from './UploadInfo.vue'
import { uploaderProps, uploaderEmits } from './uploader'
import useUploader from './use-uploader'
defineOptions({
  name: 'Uploader',
})

const props = defineProps(uploaderProps)
const emit = defineEmits(uploaderEmits)
const { uploadBtn, UPLOADER } = useUploader(props, emit)

const styles = computed(() => {
  return {
    width: props.listHide ? 'auto' : '100%',
  }
})
</script>
