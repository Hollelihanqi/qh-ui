<template>
  <div class="p-4">
    <el-button @click="onLook" type="primary" >只读</el-button>
    <el-button @click="onDisabled" type="primary">禁用</el-button>
    <el-button @click="onHidden" type="primary">隐藏某一项</el-button>
    <yto-table-editor :columns="tableColumns" :data="formData.tableData" :readonly="isReadonly" :disabled="isDisabled"></yto-table-editor>  
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const isReadonly = ref(false)
const isDisabled = ref(false)
const isHidden = ref(false)
const onLook = () => {
  isReadonly.value = !isReadonly.value
  isDisabled.value = false
  isHidden.value = false
}
const onDisabled = () => {
  isDisabled.value = !isDisabled.value
  isReadonly.value = false
  isHidden.value = false
}
const onHidden = () => {
  isHidden.value = !isHidden.value
  isReadonly.value = false
  isDisabled.value = false
}
const tableColumns = [
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

    ]
  },
  {
    prop: 'common',
    label: '备注',
    itemType: 'input',
    isHidden: (row: any) => isHidden.value && row.sex === '1',
  }
]
const formData = ref<any>({
  tableData: [{
    name: '张三',
    age: '18',
    sex: '1',
    common: '时间是个美丽'
  },{
    name: '李思',
    age: '18',
    sex: '1',
    common: '时间是个美丽'
  },{}]
})

</script>
<style scoped lang="scss">
:deep(.el-form-item__content) {
  > div {
  width: 100%;
  }
}
</style>
