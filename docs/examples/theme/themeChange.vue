<template>
  <div class="w-[80%] min-w-[600px] mx-auto my-8 flex justify-end items-center">
    <span class="mr-4">换肤</span>
    <el-select v-model="theme" class="m-2" size="" @change="onChange">
      <el-option v-for="item in options" :key="item" :label="item" :value="item" />
    </el-select>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const options = ['default', 'theme1', 'theme2', 'theme3']
const theme = ref('default')
const onChange = () => {
  document.documentElement.setAttribute('data-theme', theme.value === 'default' ? '' : theme.value)
}
</script>
