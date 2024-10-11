<template>
  <component :is="renderColumn(column)"></component>
</template>

<script lang="tsx" setup>
import { useSlots } from 'vue'
import { ElMessage, ElTableColumn, ElIcon } from 'element-plus'
import { CopyDocument } from '@element-plus/icons-vue'
import { logger } from '@yto-custom/utils'

defineProps({
  column: {
    type: Object,
    default: () => ({}),
  },
})

const slots = useSlots()
const formatEnum = (column: any, row: any) => {
  if (Array.isArray(column.enum)) {
    const target = column.enum.find((e: any) => e.value === row[column.prop])
    return target?.label || '--'
  } else {
    return column.enum[row[column.prop]] || '--'
  }
}
// 复制
const handleCopyClick = (copyData = '') => {
  const input = document.createElement('input')
  logger(copyData)
  input.value = copyData.toLocaleString()
  document.body.appendChild(input)
  input.select()
  document.execCommand('Copy')
  document.body.removeChild(input)
  ElMessage({
    type: 'success',
    message: '复制成功',
  })
}

// 渲染表格数据
const renderCellData = (item: any, scope: any) => {
  return item.formatText
    ? item.formatText(scope.row)
    : item.enum
      ? formatEnum(item, scope.row)
      : item.prop && scope.row[item.prop] === ''
        ? '--'
        : (scope.row[item.prop] ?? '--')
}

const renderColumn = (column: any) => {
  return (
    <>
      {
        <ElTableColumn
          showOverflowTooltip={column.showOverflowTooltip ?? column.prop !== 'action'}
          {...column}
          className={`${column.sortable && column.align === 'right' ? 'sort-cell-td' : ''} ${column?.className || ''} `}
        >
          {{
            default: (scope: any) => {
              if (column._children) return column._children.map((child: any) => renderColumn(child))
              if (column.render) return column.render(scope)
              if (column.prop && slots[column.prop]) return slots?.[column.prop]?.(scope)
              if (column.copy)
                return (
                  <div class="flex items-center gap-2">
                    <span>{renderCellData(column, scope)}</span>
                    <ElIcon
                      class="cursor-pointer copy-icon-color"
                      onClick={() => {
                        handleCopyClick(renderCellData(column, scope))
                      }}
                    >
                      <CopyDocument />
                    </ElIcon>
                  </div>
                )
              return renderCellData(column, scope)
            },
            header: () => {
              if (column.headerRender) return column.headerRender(column)
              if (slots[`${column.prop}Header`]) return slots[`${column.prop}Header`]!({ row: column })
              return column.label
            },
          }}
        </ElTableColumn>
      }
    </>
  )
}
</script>
