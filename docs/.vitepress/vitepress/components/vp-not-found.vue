<script setup lang="ts">
import { isClient } from "@vueuse/core";
import { ElResult, ElButton } from 'element-plus'

const goHome = () => {
  if (!isClient) return;
  // window.location.href = `/${lang.value}/`;
};
</script>

<template>
  <ElResult icon="error" title="自定义标题Title" sub-title="sub-title">
    <template #extra>
      <ElButton @click="goHome">button-title</ElButton>
    </template>
  </ElResult>
</template>

<style scoped>
.el-result {
  height: 100vh;
  width: 100vw;
}
</style>
