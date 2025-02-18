<template>
  <ElTag size="small" effect="plain" hit round class="ml-2">a11y</ElTag>
</template>
<script setup lang="ts">
import { ElTag } from 'element-plus'
</script>
<style scoped>
.el-tag {
  color: #6222c2;
}
.el-tag.is-hit {
  border-color: #9065db;
}
.dark .el-tag {
  color: #9065db;
}
.dark .el-tag.is-hit {
  border-color: #6222c2;
}
</style>
