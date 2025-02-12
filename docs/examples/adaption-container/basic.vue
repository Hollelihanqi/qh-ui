<template>
  <div class="wrapper">
    <yto-adaption-container :list="list">
      <template #default="{ info }">
        <div class="card">{{ info }}</div>
      </template>
    </yto-adaption-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])
</script>
<style lang="scss" scoped>
.wrapper {
  .card {
    @apply bg-[#f5f5f5] h-[50px] flex justify-center items-center text-[16px];
  }
}
</style>
