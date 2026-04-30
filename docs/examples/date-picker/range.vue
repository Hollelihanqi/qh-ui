<template>
  <div class="p-4">
    <div>开始时间： {{ formData.start }}</div>
    <div class="my-2">结束时间： {{ formData.end }}</div>
    <hd-date-picker
      v-model:start="formData.start"
      v-model:end="formData.end"
      type="datetimerange"
      value-format="YYYY-MM-DD HH:mm:ss"
    ></hd-date-picker>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue'
const formData = ref({ start: '', end: '' })
</script>

<style></style>
