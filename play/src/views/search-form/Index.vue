<template>
  <div class="view-w">
    <hd-search-form
      v-model:search-model="filterData"
      :form-controls="controls"
      :collapsed-rows="2"
      collapse
      @on-search="handleSearch"
    />

    <div class="mt-4 flex items-center gap-3">
      <el-button @click="showKeyword = !showKeyword">切换关键字项</el-button>
      <el-radio-group v-model="tabAct">
        <el-radio-button value="ip">IP</el-radio-button>
        <el-radio-button value="user">用户</el-radio-button>
        <el-radio-button value="org">组织</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import type { SearchFormControlProps } from '@hd/custom'

const filterData = ref<Record<string, unknown>>({})
const showKeyword = ref(false)
const tabAct = ref('user')

const handleSearch = () => {
  console.log(filterData.value)
}

const controls: SearchFormControlProps[] = [
  {
    el: 'input',
    label: '关键字',
    field: 'keyword',
    defaultValue: '默认关键字',
    hide: () => showKeyword.value,
    clearDefaultValue: false,
  },
  {
    el: 'select',
    label: '类型',
    field: 'type',
    defaultValue: 0,
    options: [
      {
        label: '名称',
        value: 0,
      },
      {
        label: '编号',
        value: 1,
      },
    ],
  },
  {
    el: 'switch',
    label: '启用状态',
    field: 'enabled',
  },
  {
    el: 'checkbox',
    label: '多选条件',
    field: 'checked',
  },
  {
    el: 'date-picker',
    label: '日期',
    field: 'date',
  },
  {
    el: 'input',
    label: '动态条件',
    field: 'dynamicValue',
    hide: () => tabAct.value === 'ip',
  },
]
</script>
