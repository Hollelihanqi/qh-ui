<template>
  <div class="m-4">
    <yto-search-container :item-min-width="200" label-width="60px" :model="form" :is-use-form="true">
      <el-form-item label="测试" data-cols="2">
        <el-input placeholder="请输入" />
      </el-form-item>
      <el-form-item label="测试">
        <el-input placeholder="请输入" />
      </el-form-item>
      <el-form-item label="测试">
        <el-input placeholder="请输入" />
      </el-form-item>
      <el-form-item label="测试">
        <el-input placeholder="请输入" />
      </el-form-item>
      <template #operation>
        <el-button size="small">重置</el-button>
        <el-button size="small" type="primary">搜索</el-button>
      </template>
    </yto-search-container>
  </div>
</template>
<script setup lang="ts">
const form = {}
</script>
