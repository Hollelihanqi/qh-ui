<template>
  <component :is="renderColumn(column)"></component>
</template>

<script lang="tsx" setup>
import { useSlots } from 'vue'
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
    } else {
      // 兼容旧浏览器
      document.execCommand('Copy')
      ElMessage({
        type: 'success',
        message: '复制成功',
      })
    }

    document.body.removeChild(input)
  } catch (error) {
    console.error('Error during copy operation: ', error)
    ElMessage({
      type: 'error',
      message: '复制失败',
    })
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

// const _showColumn = (column: any) => {
//   if (column.hide && typeof column.hide === "function") {
//     return column.hide();
//   } else {
//     return column.show !== false;
//   }
// };

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
                    <ElIcon
                      class="cursor-pointer copy-icon-color"
                      onClick={() => {
                        copyTextToClipboard(renderCellData(column, scope))
                      }}
                    >
                      <CopyDocument />
                    </ElIcon>
                    <span>{renderCellData(column, scope)}</span>
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
