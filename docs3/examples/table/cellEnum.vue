<template>
  <yto-c-table :columns="columns" :table-data="tableData" pagination-hide></yto-c-table>
</template>
<script lang="ts" setup>
const tableData = [
  {
    name: '魏春霈',
    age: '26岁',
    sex: 0,
    isWife: 0,
    dream: '妻妾成群',
  },
  {
    name: '李涵祺',
    age: '26岁',
    sex: 1,
    isWife: 0,
    dream: '你好，我是 李涵祺',
  },
  {
    name: '闫萌',
    age: '26岁',
    sex: 0,
    isWife: 1,
    dream: '按时下班',
  },
  {
    name: '李炳儒',
    age: '26岁',
    sex: 1,
    isWife: 1,
    dream: '有为青年',
  },
  {
    name: '柯发泽',
    age: '26岁',
    sex: 0,
    isWife: 1,
    dream: '天天发财',
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
