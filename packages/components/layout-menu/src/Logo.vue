<template>
  <div v-if="title || logo" class="menu-logo-title flex items-center px-[16px] h-[48px] leading-[48px]">
    <img v-if="logo" class="w-[32px] h-[32px] mr-[10px]" :src="logo" alt="logo" />
    <span v-show="!collapse" class="title overflow-hidden whitespace-nowrap text-[20px]">{{ title }}</span>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  logo: {
    type: String,
    default: '',
  },
  collapse: {
    type: Boolean,
    default: false,
  },
})
</script>
