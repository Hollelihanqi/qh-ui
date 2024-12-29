<template>
  <yto-c-watermark :content="content">
    <div class="h-[500px] bg-white"></div>
  </yto-c-watermark>
</template>
<script lang="ts" setup>
const content = ref('测试水印')
</script>
<style lang="scss" scoped>
.wraper {
}
</style>
