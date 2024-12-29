<template>
  <div
    class="w-full h-full text-center text-[#666] bg-[#f5f5f5] h-[200px] flex items-center justify-center"
    v-resize-element="handle"
  >
    宽度:{{ el?.width }}<br />
    高度：{{ el?.height }}
  </div>
</template>

<script setup lang="ts">
const el: any = ref()
const handle = (e: any) => {
  el.value = e
  // el.value = e;
  console.log('000000000000', el.value)
}
</script>
