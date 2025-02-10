<template>
  <div class="view-w">
    <CustomUploader
      :get-instance="getInstance2"
      :multiple="true"
      :limit="1"
      accept=".rar,.zip"
      @file-removed="handleFileRemoved"
      @up-skip-upload="handleUploadSuccess"
      @up-success="handleUploadSuccess"
    >
      <template #uploaderBtn> <el-button type="primary">上传附件</el-button></template>
    </CustomUploader>
  </div>
</template>
<script lang="ts" setup>
import CustomUploader from './CustomUploader.vue'

const UploaderInstance2 = ref<any>(null)

const getInstance2 = (uploader: any) => {
  UploaderInstance2.value = uploader.value
}

// 附件移除
const handleFileRemoved = () => {
  //
}

const handleUploadSuccess = async (file: any) => {
  console.log('上传成功', file)
}
</script>
