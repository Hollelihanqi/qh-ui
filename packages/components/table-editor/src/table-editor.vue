<template>
  <ElTable class="hd-table-editor">
    <ElTableColumn
      v-for="item in columns"
      :prop="item.prop"
      :label="item.label"
      :width="item.width || ''"
      :key="item.prop"
    >
      <template #default="scope">
        <slot :name="`${item.prop}-cell`" :row="scope.row">
          <span v-if="props.readonly">{{
            item.formateText ? item.formateText(scope.row) : scope.row[item.prop] || '--'
          }}</span>
          <ElFormItem
            :label-width="0"
            v-else-if="scope.$index > -1"
            :prop="setProp ? setProp(scope, item) : `[${scope.$index}].${item.prop}`"
            :rules="setRules ? setRules(scope, item) : {}"
          >
            <slot :name="item.prop" :row="scope.row">
              <BaseItem
                v-if="getVisible(item, scope.row)"
                v-model="scope.row[item.prop]"
                :config="item"
                :rowData="scope.row"
                :disabled="getDisabled(item, scope.row)"
              ></BaseItem>
              <span v-else>--</span>
            </slot>
          </ElFormItem>
        </slot>
      </template>
    </ElTableColumn>
    <ElTableColumn v-if="$slots.operate" label="操作" :width="operateWidth">
      <template #default="scope">
        <slot name="operate" :row="scope.row" :index="scope.$index"></slot>
      </template>
    </ElTableColumn>
  </ElTable>
</template>
<script lang="ts" setup>
import BaseItem from './components/BaseItem.vue'
import { ElTable, ElTableColumn, ElFormItem } from 'element-plus'
import { tableEditorProps, tableEditorEmits, IColumn, ITableEditorAnyObject } from './table-editor'

defineOptions({
  name: 'TableEditor',
})

const props = defineProps(tableEditorProps)
defineEmits(tableEditorEmits)

const getVisible = (item: IColumn, row: ITableEditorAnyObject) => {
  return !('isHidden' in item && (item.isHidden instanceof Function ? item?.isHidden(row) : item.isHidden))
}
const getDisabled = (item: IColumn, row: ITableEditorAnyObject) => {
  return (
    props.disabled || ('disabled' in item && (item.disabled instanceof Function ? item?.disabled(row) : item.disabled))
  )
}
</script>
