import type { TableProps } from './interface'
import { ref, onMounted, reactive, computed, nextTick, watch } from 'vue'
import { error } from '@yto-custom/utils'
import { ElLoading } from 'element-plus'
const useTable = (props: TableProps, emits: any) => {
  const ElTableInstance = ref()
  const _loading = ref(false)
  let loadingInstance: any = null
  const _tableData = ref<any>([])
  const _tableDataTotal = ref(0)
  const _showSummary = ref(false)
  const paginationParams = reactive({
    currentPage: props.currentPage,
    pageSize: props.pageSize,
  })
  let resetTableDataParams = {}
  let _sortItem: any = null

  const showLoading = (show = true) => {
    if (show) {
      loadingInstance = ElLoading.service({
        target: ElTableInstance.value.$el,
      })
    } else {
      loadingInstance?.close()
    }
  }

  const _sortFormat = (item?: any) => {
    if (item && item.order) {
      return {
        sortField: item.prop,
        sortBy: item.order === 'descending' ? 'desc' : 'asc',
      }
    }
    return {}
  }

  const _total = computed(() => {
    return props.requestApi ? _tableDataTotal.value : props.total
  })

  const _tdata = computed(() => {
    return props.requestApi ? _tableData.value : props.tableData
  })

  const _lastPage = computed(() => {
    return Math.ceil(_tableDataTotal.value / paginationParams.pageSize) || 1
  })
  const _defaultSort = computed(() => {
    if (typeof props.defaultSort === 'function') {
      return props.defaultSort()
    } else if (props.defaultSort) {
      return props.defaultSort
    } else {
      return { prop: '', order: '' }
    }
  })

  const cpaginationShow = computed(() => {
    // 返回一个布尔值，当不隐藏分页，或者自动隐藏且页面尺寸小于总数时显示
    return !(props.paginationHide || (props.paginationHideAuto && props.pageSize >= _total.value))
  })

  const isDataEmpty = computed(() => {
    return props.requestApi ? _tableData.value.length : props.tableData.length
  })
  const _sortFun = props.sortFormat || _sortFormat
  const _sortFieldFormat = (sort?: any) => {
    const curSort = sort || _sortItem || _defaultSort.value
    if (curSort) {
      return _sortFun(curSort)
    }
    return {}
  }

  const getTableData = async (params = {}) => {
    if (!props.requestApi || typeof props.requestApi !== 'function') return
    // _loading.value = props.requestLoadingHide ? false : true
    showLoading(props.requestLoadingHide)
    let _requestParams = props.requestParams
    if (typeof props.requestParams === 'function') {
      _requestParams = props.requestParams()
    }
    const _params: any = {
      ..._sortFieldFormat(),
      ...resetTableDataParams,
      ..._requestParams,
      ...params,
    }
    if (!props.paginationHide) {
      _params[props.currentPageKey] =
        props.pageLimit === 0 ? paginationParams.currentPage - 1 : paginationParams.currentPage
      _params[props.pageSizeKey] = paginationParams.pageSize
    }
    try {
      let result = (await props.requestApi(_params)) || []
      // _loading.value = false
      showLoading(false)
      if (props.dataCallback && typeof props.dataCallback === 'function') {
        result = props.dataCallback(result)
      }
      if (Array.isArray(result)) {
        _tableData.value = result
        _tableDataTotal.value = 0
      } else {
        _tableData.value = result[props.dataKey] || []
        _tableDataTotal.value = result.total || 0
      }
      await nextTick()
      props.dataUpdateAfter(_params, result)
    } catch (eor) {
      // _loading.value = false
      showLoading(false)
      error('表格请求数据发生错误...')
      error(eor)
      return Promise.reject(eor)
    } finally {
      resetTableDataParams = {}
    }
  }

  const handlePaginationChange = (type: 'size' | 'page' | 'sort', num: number): void => {
    if (type === 'size') {
      paginationParams.currentPage = 1 // 只有在改变大小时才重置当前页码
      paginationParams.pageSize = num
    }
    emits(
      'on-table',
      type,
      {
        currentPage: paginationParams.currentPage,
        pageSize: type === 'size' ? num : paginationParams.pageSize,
      },
      _sortItem,
    )

    // 如果不需要通过API请求数据，则直接调用tableChange
    if (props.tableChange && typeof props.tableChange === 'function') {
      props.tableChange(type, num)
    }

    if (props.tableActionIsCallApi) {
      getTableData()
    }
  }

  // 用于分页大小变化
  const handleSizeChange = (num: number): void => {
    handlePaginationChange('size', num)
  }

  // 用于分页页码变化
  const handlePageChange = (num: number) => {
    handlePaginationChange('page', num)
  }

  // 用于表格排序
  const handleSortChange = (item: { prop: string; order: string; column: any }) => {
    _sortItem = item && item.order ? item : null
    paginationParams.currentPage = 1
    emits('on-table', 'sort', item)
    // 为了兼容以前旧的 api
    if (props.tableChange && typeof props.tableChange === 'function') {
      props.tableChange('sort', item)
    }
    // 如果设置为调用API，则获取表格数据
    if (props.tableActionIsCallApi && !props.tableChange) {
      getTableData(_sortFieldFormat(item))
    }
  }

  const updateTableData = (params = {}) => {
    getTableData(params)
  }

  const resetTableData = (params: any) => {
    paginationParams.currentPage = 1
    if (props.defaultSort) {
      if (params) {
        resetTableDataParams = params
      }
      try {
        ElTableInstance.value.sort(_defaultSort.value.prop, _defaultSort.value.order)
      } catch (error) {
        console.error(error)
      }
    } else {
      getTableData(params)
    }
  }

  const resetPage = () => {
    paginationParams.currentPage = 1
    paginationParams.pageSize = props.pageSize
  }

  const updatePage = (obj: { currentPage?: number; pageSize?: number }) => {
    paginationParams.currentPage = obj?.currentPage || 1
    paginationParams.pageSize = obj?.pageSize || props.pageSize
  }

  const getData = () => {
    return _tableData.value
  }

  watch(
    () => _tdata.value,
    () => {
      if (
        !_tdata.value.length &&
        _lastPage.value === paginationParams.currentPage - 1 &&
        paginationParams.currentPage > 1
      ) {
        updatePage({ ...paginationParams, currentPage: paginationParams.currentPage - 1 })
        updateTableData()
      }
    },
  )

  watch(
    () => props.loading,
    () => {
      showLoading(props.loading)
    },
  )

  onMounted(() => {
    _showSummary.value = ElTableInstance.value?.showSummary
    if (props.requestAuto) {
      getTableData()
    }
  })
  return {
    ElTableInstance,
    loadingInstance,
    _loading,
    cpaginationShow,
    isDataEmpty,
    showLoading,
    _showSummary,
    _tdata,
    _defaultSort,
    _total,
    paginationParams,
    getTableData,
    handleSortChange,
    handleSizeChange,
    handlePageChange,
    updateTableData,
    resetTableData,
    resetPage,
    updatePage,
    getData,
  }
}

export default useTable
