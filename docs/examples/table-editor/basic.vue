<template>
  <div class="p-4">
    <ElButton @click="onAdd" type="primary" class="mb-2">新增</ElButton>
    <hd-table-editor :columns="columns" :data="tableData"></hd-table-editor>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElButton } from 'element-plus'

const columns = [
  {
    prop: 'name',
    label: '姓名',
    itemType: 'input',
  },
  {
    prop: 'sex',
    label: '性别',
    itemType: 'select',
    options: [
      {
        label: '男',
        value: '1',
      },
      {
        label: '女',
        value: '2',
      },
    ],
  },
  {
    prop: 'age',
    label: '状态',
    itemType: 'switch',
    width: 200,
    itemProps: {
      activeText: '启用',
      inactiveText: '禁用',
    },
  },
]
const tableData = ref([
  {
    name: '张三',
    age: '18',
    sex: '1',
  },
  {},
])
const onAdd = () => {
  tableData.value.push({})
}
</script>
