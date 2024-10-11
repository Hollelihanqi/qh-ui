<script setup lang="ts">
import { computed } from "vue";
import { isClient } from "@vueuse/core";

const goHome = () => {
  if (!isClient) return;
  // window.location.href = `/${lang.value}/`;
};
</script>

<template>
  <el-result icon="error" title="自定义标题Title" sub-title="sub-title">
    <template #extra>
      <el-button @click="goHome">button-title</el-button>
    </template>
  </el-result>
</template>

<style scoped>
.el-result {
  height: 100vh;
  width: 100vw;
}
</style>
