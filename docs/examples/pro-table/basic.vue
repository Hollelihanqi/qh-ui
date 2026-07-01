<template>
  <div class="h-[640px]">
    <hd-pro-table
      :columns="columns"
      :form-controls="searchControls"
      :request-api="getList"
      current-page-key="pageNum"
      page-size-key="pageSize"
      :default-sort="{ prop: 'id', order: 'ascending' }"
    >
      <template #tableHeader>
        <el-button type="primary">新建</el-button>
      </template>
    </hd-pro-table>
  </div>
</template>

<script lang="ts" setup>
import type { SearchFormControlProps } from '@rdeam/custom'

const DATA = Array.from({ length: 38 }, (_, i) => ({
  id: i + 1,
  name: `演示用户 ${i + 1}`,
  department: ['研发中心', '产品部', '数据部', '运维部'][i % 4],
  status: i % 4 === 0 ? '停用' : '启用',
  createTime: `2025-0${(i % 9) + 1}-12 10:00:00`,
}))

const columns = [
  { prop: 'id', label: '编号', width: 80, sortable: 'custom' },
  { prop: 'name', label: '姓名', minWidth: 140 },
  { prop: 'department', label: '部门', minWidth: 140 },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'createTime', label: '创建时间', minWidth: 180 },
]

const searchControls: SearchFormControlProps[] = [
  { el: 'input', label: '关键字', field: 'name', props: { placeholder: '搜索姓名' } },
  {
    el: 'select',
    label: '部门',
    field: 'department',
    options: [
      { label: '研发中心', value: '研发中心' },
      { label: '产品部', value: '产品部' },
      { label: '数据部', value: '数据部' },
      { label: '运维部', value: '运维部' },
    ],
  },
]

const getList = (params: any) =>
  new Promise((resolve) => {
    setTimeout(() => {
      let list = DATA
      if (params.name) list = list.filter((item) => item.name.includes(params.name))
      if (params.department) list = list.filter((item) => item.department === params.department)

      // 处理排序
      if (params.sortField) {
        const dir = params.sortBy === 'desc' ? -1 : 1
        list = [...list].sort((a, b) => {
          const av = (a as any)[params.sortField]
          const bv = (b as any)[params.sortField]
          return av === bv ? 0 : av > bv ? dir : -dir
        })
      }

      const pageNum = params.pageNum || 1
      const pageSize = params.pageSize || 10
      const start = (pageNum - 1) * pageSize
      resolve({ items: list.slice(start, start + pageSize), total: list.length })
    }, 200)
  })
</script>
