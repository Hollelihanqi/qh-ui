import { ref, onMounted, nextTick, computed, useSlots, useTemplateRef } from 'vue'
import type { ProTableProps } from './pro-table'

// 过滤掉空值字段。
// 空字符串、null、undefined、空数组都会被丢弃，避免参与请求参数。
const filterNonEmptyFields = (obj: Record<string, any> = {}) => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const value = obj[key]
      const isNotEmpty =
        value !== '' && value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0)

      if (isNotEmpty) {
        acc[key] = value
      }

      return acc
    },
    {} as Record<string, any>,
  )
}

const useTable = (props: ProTableProps) => {
  // 内部表格组件实例。
  // 通过它访问下层 HdTable 暴露出来的更新数据、重置分页、获取 ElTable 实例等能力。
  const HTableRef = useTemplateRef<any>('HTableRef')

  // 搜索表单实例。
  // 用于读取 getValues() 拿到当前搜索条件。
  const SearchFormInstance = useTemplateRef<any>('SearchFormInstance')

  // 默认排序，handleReset 时会回到这里。
  const _defaultSort = ref({ ...(typeof props.defaultSort === 'function' ? {} : props.defaultSort) })

  // 父级插槽名集合。
  // 用于把外层传进来的所有插槽再向 HdTable 转发，保留按列自定义渲染能力。
  const slotNames = computed(() => Object.keys(useSlots()) as string[])

  // 额外请求参数。支持函数形式以便每次都重新求值。
  const _otherParams = () => {
    if (typeof props.otherRequestParams === 'function') {
      return (props.otherRequestParams as () => Record<string, any>)()
    }
    return props.otherRequestParams as Record<string, any>
  }

  // 读取搜索表单当前的取值。
  const getSearchValues = () => {
    return SearchFormInstance.value?.getValues()
  }

  // 拼装最终请求参数：额外参数 + 搜索值，并过滤空字段。
  const getRequestParams = () => {
    return filterNonEmptyFields({
      ..._otherParams(),
      ...getSearchValues(),
    })
  }

  // 把请求参数透传给 HdTable 触发数据刷新。
  const getTableList = async (params = {}) => {
    if (props.requestApi && typeof props.requestApi === 'function') {
      const _params = {
        ...getRequestParams(),
        ...params,
      }
      HTableRef.value?.updateTableData(_params)
    }
  }

  // 自定义 onSearch 时使用的“按外部参数直接刷新”逃生口。
  // 跳过本组件内部的搜索值拼装，由调用方完全控制传入的参数。
  const getTableList2 = (params = {}) => {
    if (props.requestApi && typeof props.requestApi === 'function') {
      HTableRef.value?.updateTableData(params)
    }
  }

  // 点击搜索：先重置到第一页，再根据是否有自定义 onSearch 决定走向。
  const handleSearch = () => {
    HTableRef.value?.resetPage()
    if (props.onSearch && typeof props.onSearch === 'function') {
      props.onSearch({ ...getSearchValues() }, getTableList2)
    } else {
      getTableList()
    }
  }

  // 点击重置：分页归一后，如果配了 defaultSort 则交给 ElTable 触发排序回归，
  // 否则直接重新拉一次数据。
  const handleReset = async (params = {}) => {
    HTableRef.value?.resetPage()
    await nextTick()
    const defaultSort = _defaultSort.value
    if (defaultSort && defaultSort.prop && defaultSort.order) {
      const elTable = HTableRef.value?.tableRef
      elTable?.sort?.(defaultSort.prop, defaultSort.order)
    } else {
      getTableList(params)
    }
  }

  // 对外暴露的“按当前搜索条件刷新”接口。
  const _updateTableData = (params = {}) => {
    HTableRef.value?.updateTableData({
      ...params,
      ...SearchFormInstance.value?.getValues(),
    })
  }

  // 对外暴露的“重置回默认状态”接口。
  const _resetTableData = (params = {}) => {
    handleReset(params)
  }

  // HdTable 内部分页/排序变化时，pro-table 接管参数拼装。
  const handleTableChange = () => {
    getTableList()
  }

  onMounted(() => {
    if (props.requestAuto) {
      getTableList()
    }
  })

  return {
    HTableRef,
    SearchFormInstance,
    slotNames,
    _defaultSort,
    handleSearch,
    handleReset,
    _updateTableData,
    _resetTableData,
    handleTableChange,
  }
}

export default useTable
