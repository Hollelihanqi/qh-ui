<template>
  <div class="p-4 h-[300px] overflow-y-auto">
    <ElForm ref="formRef" :model="tableData" class="">
      <hd-table-editor :columns="columns" :data="tableData" :setRules="setRules"></hd-table-editor>
    </ElForm>
    <ElButton @click="onSave" type="primary" class="ml-[85%]">保存</ElButton>
  </div>
</template>

<script lang="ts" setup>
import { ElForm, ElButton } from 'element-plus'
import { ref } from 'vue'
const columns = [
  {
    prop: 'name',
    label: '姓名',
    itemType: 'input',
  },
  {
    prop: 'age',
    label: '年龄',
    itemType: 'input',
    disabled: (row: any) => !row.name,
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
]
const tableData = ref([
  {
    name: '张三',
    age: '18',
    sex: '1',
  },
  {
    name: '李四',
    age: '19',
    sex: '2',
  },
  {},
])
const formRef = ref()
const setRules = (scope: any, item: any) => {
  return {
    required: true,
    message: `${item.label}不能为空`,
  }
}
const onSave = async () => {
  try {
    await formRef.value?.validate()
  } catch (error) {
    console.error(error)
  }
}
</script>
