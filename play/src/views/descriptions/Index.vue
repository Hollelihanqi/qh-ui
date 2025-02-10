<template>
  <div class="view-w">
    <div>
      <el-radio-group v-model="radio">
        <el-radio-button label="基础使用" value="1" />
        <el-radio-button label="边框" value="2" />
      </el-radio-group>
    </div>
    <div class="flex-1 flex flex-col">
      <component :is="radio === '1' ? Basic : Bordert" />
    </div>
  </div>
</template>
<script lang="tsx" setup>
import Basic from './basic.vue'
import Bordert from './bordert.vue'
const radio = ref('1')
</script>
