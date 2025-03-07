<template>
  <component :is="renderColumn(column)"></component>
</template>

<script lang="tsx" setup>
import { useSlots, Fragment } from 'vue'
import { ElMessage, ElTableColumn, ElIcon } from 'element-plus'
import { CopyDocument } from '@element-plus/icons-vue'

defineProps({
  column: {
    type: Object,
    default: () => ({}),
  },
})

const slots: any = useSlots()
const formatEnum = (column: any, row: any) => {
  if (Array.isArray(column.enum)) {
    const target = column.enum.find((e: any) => e.value === row[column.prop])
    return target?.label || '--'
  } else {
    return column.enum[row[column.prop]] || '--'
  }
}

// 辅助函数：转义 HTML 特殊字符
function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const copyTextToClipboard = (copyData = '') => {
  // 对 copyData 进行转义处理，防止 XSS 攻击
  const escapedCopyData = escapeHtml(copyData)

  try {
    const input = document.createElement('input')
    input.value = escapedCopyData
    document.body.appendChild(input)
    input.select()

    // 使用现代 API 替代 document.execCommand
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(escapedCopyData)
        .then(() => {
          ElMessage({
            type: 'success',
            message: '复制成功',
          })
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err)
          ElMessage({
            type: 'error',
            message: '复制失败',
          })
        })
    }
    document.body.removeChild(input)
  } catch (error) {
    console.error('Error during copy operation: ', error)
  }
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

// 复制
const getCopyText = (column: any, scope: any): string => {
  try {
    // 如果设置了 copyText
    if (column.copyText !== undefined) {
      // 如果是字符串直接返回
      if (typeof column.copyText === 'string') {
        return column.copyText
      }
      // 如果是函数则执行并返回结果
      if (typeof column.copyText === 'function') {
        const result = column.copyText(scope.row)
        return String(result || '--')
      }
    }

    // 如果有 prop 属性，则获取对应的值
    if (column.prop && scope.row) {
      const value = scope.row[column.prop]
      // 使用 nullish 运算符，只有值为 null 或 undefined 时才返回 '--'
      return value ?? '--'
    }

    return '--'
  } catch (error) {
    console.warn('获取复制文本时出错:', error)
    return '--'
  }
}

const copyRender = (column: any, scope: any) => {
  return (
    <ElIcon
      class="cursor-pointer copy-icon-color"
      onClick={() => {
        copyTextToClipboard(getCopyText(column, scope))
      }}
    >
      <CopyDocument />
    </ElIcon>
  )
}

const renderColumn = (column: any) => {
  return (
    <Fragment>
      {
        <ElTableColumn
          showOverflowTooltip={column.showOverflowTooltip ?? column.prop !== 'action'}
          {...column}
          className={[
            column.sortable && column.align === 'right' && 'sort-cell-td',
            column?.className ?? '',
            column.prop === 'action' && 'action-td',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {{
            default: (scope: any) => {
              if (column._children) return column._children.map((child: any) => renderColumn(child))
              if (column.copy) {
                return (
                  <div class="flex items-center gap-2">
                    {copyRender(column, scope)}
                    {column.render && column.render(scope)}
                    {column.prop && slots[column.prop] && slots?.[column.prop]?.(scope)}
                    {renderCellData(column, scope)}
                  </div>
                )
              }
              if (column.render) return column.render(scope)
              if (column.prop && slots[column.prop]) return slots?.[column.prop]?.(scope)
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
    </Fragment>
  )
}
</script>
