<template>
  <component :is="renderColumn(column)"></component>
</template>

<script lang="tsx" setup>
import { useSlots, Fragment, computed } from 'vue'
import { ElMessage, ElTableColumn, ElIcon } from 'element-plus'
import { CopyDocument } from '@element-plus/icons-vue'
import { copyStr } from '@hd-custom/share'

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

// 复制文本到剪贴板：复用 @hd-custom/share 中的 copyStr，兼容 HTTP（非安全上下文）
const copyTextToClipboard = async (copyData = '') => {
  const text = String(copyData ?? '')
  const ok = await copyStr(text)

  ElMessage({
    type: ok ? 'success' : 'error',
    message: ok ? '复制成功' : '复制失败',
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
      class="copy-icon-color"
      onClick={() => {
        copyTextToClipboard(getCopyText(column, scope))
      }}
    >
      <CopyDocument />
    </ElIcon>
  )
}

const getRenderStrategy = computed(() => {
  return (column: any) => {
    // 预先确定渲染策略
    if (column._children) {
      return {
        type: 'children',
        render: () => column._children.map((child: any) => renderColumn(child)),
      }
    }

    if (column.copy) {
      return {
        type: 'copy',
        render: (scope: any) => {
          const content = column.render
            ? column.render
            : column.prop && slots[column.prop]
              ? slots[column.prop]
              : (scope: any) => renderCellData(column, scope)

          return (
            <div class="copy-cell">
              {copyRender(column, scope)}
              {content(scope)}
            </div>
          )
        },
      }
    }

    if (column.render) {
      return {
        type: 'custom',
        render: column.render,
      }
    }

    if (column.prop && slots[column.prop]) {
      return {
        type: 'slot',
        render: slots[column.prop],
      }
    }

    return {
      type: 'default',
      render: (scope: any) => renderCellData(column, scope),
    }
  }
})

const getColumnClassName = computed(() => {
  return (column: any) => ({
    'sort-cell-td': column.sortable && column.align === 'right',
    'action-td': column.prop === 'action',
    [column?.className || '']: !!column?.className,
  })
})

const renderColumn = (column: any) => {
  return (
    <Fragment>
      {
        <ElTableColumn
          showOverflowTooltip={column.showOverflowTooltip ?? column.prop !== 'action'}
          {...column}
          class={getColumnClassName.value(column)}
        >
          {{
            default: (scope: any) => {
              const strategy = getRenderStrategy.value(column)
              return strategy.render(scope)
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
