<template>
  <div class="table-w h-[100%] w-full flex flex-col">
    <div v-if="$slots.tableHeader || toolBar" class="table-header flex items-center">
      <div class="flex-1 flex items-center">
        <slot name="tableHeader"></slot>
        <div v-if="toolBar" :class="`flex justify-end px-[8px] ${$slots.tableHeader ? '' : 'flex-1'}`">
          <ElButton :icon="Setting" circle @click="handleSetting" />
        </div>
      </div>
    </div>
    <ElTable
      ref="ElTableInstance"
      class="my-el-table w-[100%]"
      :class="{ 'pagination-hide-table': !cpaginationShow, 'flex-1': !isDataEmpty || !_showSummary }"
      :data="_tdata"
      :default-sort="_defaultSort"
      v-bind="$attrs"
      @sort-change="handleSortChange"
    >
      <!-- 默认插槽 -->
      <slot></slot>

      <template v-if="isDataEmpty" #append>
        <slot name="append"></slot>
      </template>
      <template #empty>
        <slot name="empty">
          <YtoEmpty v-bind="emptyOptions"></YtoEmpty>
        </slot>
      </template>

      <template v-for="item in _columns" :key="item">
        <!-- selection || index -->
        <ElTableColumn
          v-if="_showColumn(item) && (item.type === 'selection' || item.type === 'index')"
          v-bind="item"
          :align="item.align ?? 'center'"
          :reserve-selection="item.type === 'selection'"
        >
        </ElTableColumn>
        <!-- expand 支持 tsx 语法 && 作用域插槽 (tsx > slot) -->
        <ElTableColumn v-else-if="item.type === 'expand'" v-slot="scope" v-bind="item" :align="item.align ?? 'center'">
          <component :is="item.render" v-if="item.render" :row="scope.row" v-bind="scope"> </component>
          <slot v-else :name="item.type" :row="scope.row"></slot>
        </ElTableColumn>
        <!-- other 循环递归 -->
        <TableColumn v-else-if="_showColumn(item)" :column="item">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" :row="scope.row" :index="scope.$index" v-bind="scope"></slot>
          </template>
        </TableColumn>
      </template>

      <slot name="inAction"></slot>
    </ElTable>
    <div v-if="_showSummary" class="flex-1 opacity-0 h-0 phd"></div>
    <ElPagination
      v-if="cpaginationShow"
      v-model:page-size="paginationParams.pageSize"
      v-model:current-page="paginationParams.currentPage"
      class="my-el-pagination"
      :layout="layout"
      :total="_total"
      :page-sizes="pageSizes"
      v-bind="paginationOptions"
      @update:page-size="handleSizeChange"
      @update:current-page="handlePageChange"
    ></ElPagination>
  </div>
  <SettingV ref="SettingInstance" :columns="setColumns" @on-save="HandleSetSave" />
</template>

<script lang="tsx" setup name="Table">
import { defineEmits } from 'vue'
import { ElTable, ElTableColumn, ElPagination, ElButton } from 'element-plus'
import { Props } from './props'
import TableColumn from './components/TableColumn.vue'
import SettingV from './components/Setting.vue'
import { YtoEmpty } from '@yto-custom/components/empty'
import { Setting } from '@element-plus/icons-vue'
import useController from './use-controller'
import useTable from './useTable'

export interface ColumnsItemProps {
  [propsName: string]: any
}

const props = defineProps(Props)
const emits = defineEmits(['on-table'])
const {
  ElTableInstance,
  cpaginationShow,
  isDataEmpty,
  _showSummary,
  _tdata,
  _total,
  _defaultSort,
  paginationParams,
  handleSortChange,
  handleSizeChange,
  handlePageChange,
  updateTableData,
  resetTableData,
  resetPage,
  updatePage,
  getData,
} = useTable(props, emits)

const { _columns, _showColumn, setColumns, SettingInstance, handleSetting, HandleSetSave } = useController(
  props,
  ElTableInstance,
)

defineExpose({
  ElTableInstance,
  updateTableData,
  resetTableData,
  resetPage,
  updatePage,
  getData,
  setting: handleSetting,
  tableData: _tdata,
})
</script>
<style lang="scss">
@import './index.scss';
</style>
