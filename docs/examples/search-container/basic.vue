<template>
  <div class="m-4">
    <yto-search-container :item-min-width="200" label-width="60px" :model="form" :is-use-form="true">
      <ElFormItem label="测试" data-cols="2">
        <ElInput placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="测试">
        <ElInput placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="测试">
        <ElInput placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="测试">
        <ElInput placeholder="请输入" />
      </ElFormItem>
      <template #operation>
        <ElButton size="small">重置</ElButton>
        <ElButton size="small" type="primary">搜索</ElButton>
      </template>
    </yto-search-container>
  </div>
</template>
<script setup lang="ts">
import { ElButton, ElInput, ElFormItem } from 'element-plus'
const form = {}
</script>
