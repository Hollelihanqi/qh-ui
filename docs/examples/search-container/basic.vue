<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-19 15:52:25
 * @LastEditTime: 2024-02-20 19:52:45
-->
<template>
  <div class="m-4">
    <yto-c-search-container :item-min-width="200" label-width="60px" :model="form" :is-use-form="true">
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
      <!-- <el-form-item  class="sm:w-[100%] md:w-[50%] lg:w-[33.3%] xl:w-[60%] 2xl:w-[50%]" label="Activity name">
          <el-input placeholder="请输入啊啊啊"/>
        </el-form-item> -->
      <template #operation>
        <el-button size="small">重置</el-button>
        <el-button size="small" type="primary">搜索</el-button>
      </template>
    </yto-c-search-container>
  </div>
</template>
<script setup lang="ts">
const form = {}
</script>
