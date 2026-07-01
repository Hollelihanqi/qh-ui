<template>
  <DemoPage
    title="ProTable 组合演示"
    description="ProTable = SearchForm + Table + 分页 + 列设置。下方为模拟服务端分页/排序/筛选的完整流程。"
  >
    <DemoBlock title="基础用法" description="切换部门/状态筛选、点击表头排序、删除单行后表格自动刷新。">
      <hd-pro-table
        ref="proTableRef"
        :columns="columns"
        :form-controls="searchFormList"
        :request-api="requestTableData"
        current-page-key="pageNum"
        page-size-key="pageSize"
      />
    </DemoBlock>
  </DemoPage>
</template>

<script lang="ts" setup>
import DemoPage from '@/components/DemoPage.vue'
import DemoBlock from '@/components/DemoBlock.vue'

import { useProTable } from './useProTable'

const { columns, searchFormList, requestTableData } = useProTable()
</script>
