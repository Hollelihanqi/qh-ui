<template>
  <div class="p-4 h-[400px] overflow-y-auto">
    <yto-c-form
      ref="formRef"
      :form="formData"
      :form-config="formConfig"
      :span="12"
      :item-config="{
        clearable: true,
      }"
      label-position="top"
    >
      <template #list>
        <el-button @click="onAdd" type="primary" class="ml-[85%] mb-1">新增</el-button>
        <yto-table-editor :columns="tableColumns" :data="formData.tableData" :setRules="setRules" :setProp="setProp"></yto-table-editor>  
      </template>
    </yto-c-form>
   <el-button @click="onSave" type="primary" class="ml-[85%]">保存</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const formConfig = [
  {itemType: 'input', prop: 'base', label: '基础信息', },
  {itemType: 'input', prop: 'source', label: '数据来源', },
  {itemType: 'input', prop: 'list', label: '数据列表', span: 24,},
]
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
  }
]
const formData = ref<any>({
  tableData: [{
    name: '张三',
    age: '18',
    sex: '',
  },]
})
const formRef = ref()
const setRules = (scope: any, item: any) => {
  return {
    required: true,
    message: `${item.label}不能为空`,
    trigger: item.itemType === 'input' ? 'blur' : 'change',
  };
};
const setProp = (scope: any, item: any) => {
  return `tableData[${scope.$index}].${item.prop}`;
};
const onSave = async () => {
  try {
    await formRef.value?.myForm?.validate()
  } catch (error) {
    console.error(error)
  }
}
const onAdd = () => {
  formData.value.tableData.push({})
}
</script>
<style scoped lang="scss">
:deep(.el-form-item__content) {
  > div {
  width: 100%;
  }
}
</style>
