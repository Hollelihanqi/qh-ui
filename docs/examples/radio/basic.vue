<template>
  <div class="p-10">
    <yto-radio
      v-model="check"
      :options="[
        { label: '单间', value: 0 },
        { label: '标间', value: 1 },
      ]"
      @change="onChange"
    ></yto-radio>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const check = ref('')
const onChange = () => {}
</script>
