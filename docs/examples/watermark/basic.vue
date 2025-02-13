<template>
  <yto-watermark :content="content">
    <div class="h-[500px] bg-white"></div>
  </yto-watermark>
</template>
<script lang="ts" setup>
const content = ref('测试水印')
</script>
