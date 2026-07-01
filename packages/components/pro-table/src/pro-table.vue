<template>
  <div class="hd-pro-table pro-table-w h-[100%] w-[100%] flex flex-col overflow-hidden gap-2">
    <HdSearchForm
      v-if="!searchFormHide"
      ref="SearchFormInstance"
      class="mb-[8px]"
      okpos="left"
      :collapsed-rows="2"
      collapse
      v-bind="$attrs"
      @on-search="handleSearch"
      @on-reset="handleReset"
    />
    <div class="ptable-box flex-1 h-0 p-[16px] bg-white">
      <HdTable
        ref="HTableRef"
        :request-api="requestApi"
        :request-auto="false"
        :table-action-is-call-api="false"
        :default-sort="_defaultSort"
        stripe
        highlight-current-row
        v-bind="$attrs"
        @on-table="handleTableChange"
      >
        <template v-for="slotName in slotNames" #[slotName]="scope">
          <slot :name="slotName" v-bind="scope"></slot>
        </template>
      </HdTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import HdSearchForm from '@hd-custom/components/search-form'
import HdTable from '@hd-custom/components/table'
import { proTableProps, proTableEmits } from './pro-table'
import useTable from './use-table'

defineOptions({
  name: 'ProTable',
})

const props = defineProps(proTableProps)
defineEmits(proTableEmits)

const {
  HTableRef,
  slotNames,
  _defaultSort,
  handleSearch,
  handleReset,
  _updateTableData,
  _resetTableData,
  handleTableChange,
} = useTable(props)

// 透传内层 HdTable 暴露的 ElTable 实例引用，方便调用方直接操作 sort/clearSelection 等原生 API。
const tableRef = computed(() => HTableRef.value?.tableRef)

defineExpose({
  tableRef,
  updateTableData: _updateTableData,
  resetTableData: _resetTableData,
  resetPage: () => HTableRef.value?.resetPage(),
  updatePage: (params = {}) => HTableRef.value?.updatePage(params),
  getData: () => HTableRef.value?.getData(),
  resetSearch: handleReset,
})
</script>
