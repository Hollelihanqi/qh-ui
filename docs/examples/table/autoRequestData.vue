<template>
  <HdTable :columns="columns" :request-api="getList" :data-callback="dataCallback">
    <template #callStatus="scope">
      <span>{{ scope.row.status }}</span>
    </template>
  </HdTable>
</template>
<script lang="ts" setup>
const tableData = [
  {
    name: 'User 001',
    age: '26岁',
    sex: '男',
    isWife: '未婚',
    dream: '示例目标 001',
  },
  {
    name: 'User 002',
    age: '26岁',
    sex: '男',
    isWife: '未婚',
    dream: '示例目标 002',
  },
  {
    name: 'User 003',
    age: '26岁',
    sex: '女',
    isWife: '已婚',
    dream: '示例目标 003',
  },
  {
    name: 'User 004',
    age: '26岁',
    sex: '男',
    isWife: '已婚',
    dream: '示例目标 004',
  },
  {
    name: 'User 005',
    age: '26岁',
    sex: '男',
    isWife: '已婚',
    dream: '示例目标 005',
  },
]

// 模拟 API 请求接口
const getList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        items: tableData,
        total: 30,
      })
    }, 1000)
  })
}

// 数据 success callback
const dataCallback = (data: any) => {
  return data
}

// 列配置
const columns = [
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '年龄',
    prop: 'age',
  },
  {
    label: '性别',
    prop: 'sex',
  },
  {
    label: '是否已婚',
    prop: 'isWife',
  },
  {
    label: '梦想',
    prop: 'dream',
  },
]
</script>
