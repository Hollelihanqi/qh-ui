<template>
  <yto-water-mark :content="content">
    <div class="h-[500px] bg-white"></div>
  </yto-water-mark>
</template>
<script lang="ts" setup>
const content = ref('测试水印')
</script>
