<template>
  <div v-if="fileList.length" class="uploader-list">
    <div v-for="file in fileList" :key="file.id" class="file-item">
      <slot name="fileListItem" :file="file">
        <UploadInfo :file="file" :list="true" />
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { inject, computed } from 'vue'
import UploadInfo from './UploadInfo.vue'

const uploader: any = inject('uploader')

const fileList = computed(() => {
  return uploader.value.fileList
})
</script>
<style lang="scss" scoped>
.uploader-list {
  padding-top: 8px;
}
.file-item:last-child {
  .upload-info {
    border: none;
  }
}
</style>
