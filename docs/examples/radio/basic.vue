<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2024-02-21 13:29:30
 * @LastEditTime: 2024-02-21 14:10:41
-->
<template>
  <div class="p-10">
    <yto-c-radio
      v-model="check"
      :options="[
        { label: '单间', value: 0 },
        { label: '标间', value: 1 },
      ]"
      @change="onChange"
    ></yto-c-radio>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const check = ref('')
const onChange = () => {}
</script>
