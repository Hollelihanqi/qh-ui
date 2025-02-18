<template>
  <div class="join">
    <ElTooltip placement="top" :hide-after="1000" :offset="20">
      <template #content>
        homeLang-21
        <a href="mailto:element-plus@outlook.com" target="_blank"> &nbsp;element-plus@outlook.com </a>
      </template>
      <a href="mailto:element-plus@outlook.com" target="_blank">
        <ElButton style="overflow: hidden" :round="round">homeLang-20</ElButton>
      </a>
    </ElTooltip>
  </div>
</template>

<script lang="ts" setup>
import { ElButton, ElTooltip } from 'element-plus'
defineProps<{ round?: boolean }>();
</script>
