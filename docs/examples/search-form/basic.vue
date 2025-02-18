<template>
  <div>
    <yto-search-form
      v-model:search-model="filterData"
      :form-controls="list"
      :col-config="{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }"
      :model-default="modelDefault"
      @on-search="handleSearch"
    >
      <template #input2="scope">
        <ElInput v-model="scope._value.value" placeholder="自定义插槽template"></ElInput>
      </template>
    </yto-search-form>
  </div>
</template>
<script lang="tsx" setup>
import RenderCSelect from './renderc.vue'
import { SearchFormControlProps } from '@yto/custom'
import { ElInput } from 'element-plus'

const filterData = ref<any>({})
const modelDefault = ref({})
const handleSearch = () => {
  console.log(filterData.value)
}
const list: SearchFormControlProps[] = [
  {
    el: 'input',
    label: '搜索组件',
    field: 'input0',
    defaultValue: '我是默认值，重置后我还会回来的',
  },
  {
    el: 'select',
    label: '搜索组件多选',
    field: 'input1',
    options: [
      {
        label: 'name',
        value: 0,
      },
      {
        label: 'age',
        value: 1,
      },
      {
        label: 'age3',
        value: 2,
      },
    ],
    props: {
      multiple: true,
      collapseTags: true,
    },
  },
  {
    el: 'switch',
    label: '搜索组件',
    field: 'input2',
  },
  {
    el: 'checkbox',
    label: '搜索组件',
    field: 'input3',
  },
  {
    el: 'date-picker',
    label: '搜索组件',
    field: 'input4',
  },
  {
    el: 'input',
    label: '搜索组件',
    field: 'input5',
  },
  {
    label: '远程搜索',
    field: 'input6',
    render: (_value: any) => <RenderCSelect v-model={_value.value} />,
  },
  {
    el: 'select',
    label: '远程搜索2',
    isRemote: true,
    field: 'input7',
    remoteProps: {
      url: '/api/v2/allopttag',
      valueKey: 'id',
      labelKey: 'name',
      isRemoteSearch: false,
      requestParams: {
        page: 1,
        size: 100,
      },
      requestHeaders: {
        authorization: '',
      },
    },
  },
]
</script>
