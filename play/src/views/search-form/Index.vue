<template>
  <div class="view-w">
    <div>
      <yto-search-form
        v-model:search-model="filterData"
        :form-controls="list"
        :collapsed-rows="2"
        collapse
        @on-search="handleSearch"
      ></yto-search-form>
    </div>
    <el-button @click="show = !show">显示搜索组件1</el-button>
    <el-radio-group v-model="tabAct">
      <el-radio-button value="ipFirst">IP</el-radio-button>
      <el-radio-button value="userCode">用户</el-radio-button>
      <el-radio-button value="orgCode">网点</el-radio-button>
    </el-radio-group>
  </div>
</template>
<script lang="tsx" setup>
import { getToken } from '@/utils'
const filterData = ref<any>({})
import type { SearchFormControlProps } from '@yto/custom'
const tabAct = ref('userCode')
const handleSearch = () => {
  console.log(filterData.value)
}
const show = ref(false)
const list: SearchFormControlProps[] = [
  {
    el: 'input',
    label: '搜索组件1',
    field: 'input0',
    defaultValue: '我是默认值，重置后我还会回来的',
    hide: () => show.value,
    clearDefaultValue: false,
  },
  {
    el: 'select',
    label: '搜索组件2',
    field: 'input1',
    defaultValue: 0,
    options: [
      {
        label: 'name',
        value: 0,
      },
      {
        label: 'age',
        value: 1,
      },
    ],
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
        authorization: getToken(),
      },
    },
  },
]

const list2 = [
  {
    el: 'input',
    label: '风险编号',
    field: 'search',
  },
  {
    el: 'input',
    label: 'IP地址',
    field: 'value',
    hide: () => tabAct.value === 'ipFirst',
  },
  {
    el: 'input',
    label: '账号名',
    field: 'value',
    hide: () => tabAct.value === 'userCode',
  },
  {
    el: 'input',
    label: '组织编码',
    field: 'value',
    hide: () => tabAct.value === 'orgCode',
  },
  {
    el: 'select',
    label: '风险等级',
    field: 'deci',
  },
  {
    el: 'select',
    label: '状态',
    field: 'ensure',
  },
  {
    label: '异常大类',
    field: 'big_cate',
    el: 'input',
    span: 2,
  },
  {
    label: '网点编号',
    field: 'orgCode',
    el: 'input',
    hide: () => tabAct.value === 'userCode',
  },
  {
    label: '异常小类',
    field: 'small_cate',
    el: 'input',
  },
  {
    label: '异常名称',
    field: 'rule_id',
    el: 'input',
  },
  {
    el: 'date-picker',
    label: '时间范围',
    field: 'time',
    span: 2,
    props: {
      type: 'datetimerange',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
    },
  },
]
</script>
