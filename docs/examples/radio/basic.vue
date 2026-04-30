<template>
  <div class="p-10">
    <hd-radio
      v-model="check"
      :options="[
        { label: '单间', value: 1 },
        { label: '标间', value: 2 },
      ]"
      @change="onChange"
    ></hd-radio>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const check = ref(1)
const onChange = () => {}
</script>
