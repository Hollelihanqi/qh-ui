<template>
  <yto-c-table :columns="columns" :request-api="getList" :data-callback="dataCallback">
    <template #callStatus="scope">
      <span>{{ scope.row.status }}</span>
    </template>
  </yto-c-table>
</template>
<script lang="ts" setup>
const tableData = [
  {
    name: '魏春霈',
    age: '26岁',
    sex: '男',
    isWife: '未婚',
    dream: '妻妾成群',
  },
  {
    name: '李涵祺',
    age: '26岁',
    sex: '男',
    isWife: '未婚',
    dream: '你好，我是 李涵祺',
  },
  {
    name: '闫萌',
    age: '26岁',
    sex: '女',
    isWife: '已婚',
    dream: '按时下班',
  },
  {
    name: '李炳儒',
    age: '26岁',
    sex: '男',
    isWife: '已婚',
    dream: '有为青年',
  },
  {
    name: '柯发泽',
    age: '26岁',
    sex: '男',
    isWife: '已婚',
    dream: '天天发财',
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
