<template>
  <HdTable :columns="columns" :table-data="tableData" pagination-hide></HdTable>
</template>
<script lang="ts" setup>
const tableData = [
  {
    name: 'User 001',
    age: '26岁',
    sex: 0,
    isWife: 0,
    dream: '示例目标 001',
  },
  {
    name: 'User 002',
    age: '26岁',
    sex: 1,
    isWife: 0,
    dream: '示例目标 002',
  },
  {
    name: 'User 003',
    age: '26岁',
    sex: 0,
    isWife: 1,
    dream: '示例目标 003',
  },
  {
    name: 'User 004',
    age: '26岁',
    sex: 1,
    isWife: 1,
    dream: '示例目标 004',
  },
  {
    name: 'User 005',
    age: '26岁',
    sex: 0,
    isWife: 1,
    dream: '示例目标 005',
  },
]

// 列配置
const columns = [
  {
    label: '姓名',
    prop: 'name',
    copy: true,
  },
  {
    label: '年龄',
    prop: 'age',
  },
  {
    label: '性别',
    enum: [
      { label: '男', value: 0 },
      { label: '女', value: 1 },
    ],
    prop: 'sex',
  },
  {
    label: '是否已婚',
    prop: 'isWife',
    enum: {
      0: '未婚',
      1: '已婚',
    },
  },
  {
    label: '梦想',
    prop: 'dream',
  },
]
</script>
