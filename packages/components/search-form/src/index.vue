<script lang="tsx">
import { defineComponent, ref, computed } from 'vue'
import { ElForm, ElFormItem, ElButton } from 'element-plus'
import { Props } from './props'
import { SearchFormControlProps } from './interface'
import Grid from './components/Grid/index.vue'
import GridItem from './components/Grid/components/GridItem.vue'
import SearchFormItem from './components/SearchFormItem.vue'
import { ResizeElement } from '@yto-custom/directives'
import { BreakPoint } from './components/Grid/interface/index'

export default defineComponent({
  name: 'SearchForm',
  directives: { ResizeElement },
  props: Props,
  emits: ['update:searchModel', 'on-search', 'on-reset'],
  setup(props, { emit, expose, slots }) {
    const collapsed = ref(false)
    const searchFormInstance = ref()
    const GridInstance = ref()
    const breakPoint = computed<BreakPoint>(() => GridInstance.value?.breakPoint)
    const searchContainerWidth = ref(0)
    const searchActionBoxWidth = ref(0)
    const SearchActionEl = ref()
    const showSpnas = ref(0)
    const collapseIndex = ref(-1)

    watch(
      () => props.collapse,
      (newValue: any) => {
        collapsed.value = newValue
      },
      {
        immediate: true,
      },
    )

    const handleResize = async (e: any) => {
      searchContainerWidth.value = e.width
      GridInstance.value?.resize(e.width)
      await nextTick()
      const _width = SearchActionEl.value?.offsetWidth
      searchActionBoxWidth.value = _width
      showSpnas.value = Math.floor(e.width / _width)
      if (collapsed.value) {
        calculateCollapsedIndex()
      }
    }

    const handleCollapse = () => {
      collapsed.value = !collapsed.value
      if (collapsed.value) {
        calculateCollapsedIndex()
      } else {
        collapseIndex.value = -1
      }
    }

    const _cformControls = computed(() => {
      const elements = props.formControls.filter((item) => {
        if (item.hide && typeof item.hide === 'function') {
          return item.hide()
        }
        return true
      })
      return elements
    })

    watch(
      () => _cformControls.value,
      () => {
        if (collapsed.value) {
          calculateCollapsedIndex()
        }
      },
    )

    function calculateCollapsedIndex() {
      collapseIndex.value = -1
      const maxColsPerRow = showSpnas.value || 2
      const elements = _cformControls.value
      let currentRowCols = 0
      let rowCount = 1
      const totalElements = elements.length
      for (let i = 0; i < totalElements; i++) {
        const elementCols = elements[i].span || 1

        const nextElementCol = i + 1 < totalElements ? elements[i + 1]?.span || 1 : 0

        if (currentRowCols + elementCols > maxColsPerRow) {
          rowCount++
          currentRowCols = elementCols
        } else {
          currentRowCols += elementCols
        }
        if (rowCount === props.collapsedRows) {
          if (currentRowCols + nextElementCol >= maxColsPerRow) {
            collapseIndex.value = i + 1
            return i + 1
          }
        }
      }
      collapseIndex.value = -1
    }

    const handleActionResize = (e: any) => {
      searchActionBoxWidth.value = e.width
    }

    const _searchModel = computed({
      get() {
        return props.searchModel
      },
      set(model: any) {
        emit('update:searchModel', model)
      },
    })

    const resetField = (field: string, value = '') => {
      const newModle: any = { ..._searchModel.value }
      newModle[field] = value
      emit('update:searchModel', newModle)
    }

    const getFormatValues = () => {
      return props.formControls.reduce((acc: any, item: SearchFormControlProps) => {
        const { field, formatValue } = item as any
        // 只处理那些有 formatValue 函数的属性
        if (typeof formatValue === 'function') {
          const value = _searchModel.value[field]
          // 只添加那些经过formatValue处理的属性到累加器对象中
          const _formatV = formatValue(value)
          if (Object.prototype.toString.call(_formatV) === '[object Object]') {
            for (const key in _formatV) {
              acc[key] = _formatV[key]
            }
          } else {
            acc[field] = _formatV
          }
        }
        return acc
      }, {})
    }

    // 获取响应式设置
    const getResponsive = (control: SearchFormControlProps, index: number) => {
      return {
        span: control?.span,
        offset: control?.offset ?? 0,
        xs: control?.xs,
        sm: control?.sm,
        md: control?.md,
        lg: control?.lg,
        xl: control?.xl,
        index,
      }
    }

    // 处理默认值
    const handleDefaultValue = () => {
      const _dv: any = {}
      if (props.modelDefault) {
        for (const [key, value] of Object.entries(props.modelDefault)) {
          _dv[key] = typeof value === 'function' ? value() : value
        }
      }
      for (const item of props.formControls) {
        if (item.field && item.defaultValue) {
          _dv[item.field] = typeof item.defaultValue === 'function' ? item.defaultValue() : item.defaultValue
        }
      }
      emit('update:searchModel', _dv)
    }

    const isDefaultValue = () => {
      if (props.modelDefault) {
        return true
      } else {
        return props.formControls.some((item: any) => item.defaultValue)
      }
    }

    const handleReset = () => {
      props.beforeResetFun()
      if (!props.isResetParams) {
        handleDefaultValue()
      } else {
        _searchModel.value = {}
      }
      emit('on-reset')
      props.afterResetFun()
    }

    const handleQuery = () => {
      let _obj = { ..._searchModel.value }
      const filterFields = props.filterFields
      if (filterFields && filterFields.length) {
        const filteredObj = Object.keys(_obj).reduce((acc: any, key) => {
          if (!filterFields.includes(key)) {
            acc[key] = _obj[key]
          }
          return acc
        }, {})
        _obj = filteredObj
      }
      emit('on-search', _obj)
      props.afterSearchFun(_obj)
    }

    // 判断是否显示 展开/合并 按钮
    const showCollapse = computed(() => {
      let totalSpan = 0
      let show = false

      const isColConfigNumber = typeof props.colConfig === 'number'
      const breakpointValue = breakPoint.value

      const totalCol = _cformControls.value.reduce((prev, control: SearchFormControlProps) => {
        prev +=
          (control[breakpointValue]?.span || control.span || 1) +
          (control[breakpointValue]?.offset || control.offset || 0)
        return prev
      }, 0)

      for (const control of _cformControls.value) {
        totalSpan +=
          (control[breakpointValue]?.span || control.span || 1) +
          (control[breakpointValue]?.offset || control.offset || 0)

        if (isColConfigNumber) {
          if (totalSpan > props.colConfig) {
            show = true
            break
          }
        } else if (props.colConfig && totalSpan >= props.colConfig[breakpointValue]) {
          show = true
          break
        }
      }
      if (props.colConfig) {
        const _colConfig: any = props.colConfig
        const rows = Math.ceil((totalCol + 1) / _colConfig[breakpointValue])
        if (rows > props.collapsedRows) {
          show = true
        } else {
          show = false
        }
      }
      return show
    })

    provide('collapseIndex', collapseIndex)
    expose({ resetField, getFormatValues, handleDefaultValue })

    onActivated(() => {
      const rect = searchFormInstance.value?.getBoundingClientRect()
      handleResize(rect)
    })

    onBeforeMount(() => {
      if (isDefaultValue()) handleDefaultValue()
    })
    onMounted(() => {
      if (props.collapse) {
        calculateCollapsedIndex()
      }
    })
    return () => {
      return props?.formControls?.length ? (
        <div
          ref={searchFormInstance}
          v-resizeElement={handleResize}
          class="relative search-form-w bg-white px-[16px] pt-[20px]"
        >
          <ElForm model={_searchModel.value} class="search-form" label-width="auto">
            <Grid
              ref={GridInstance}
              collapsed={collapsed.value}
              gap={[16, 0]}
              cols={props.colConfig}
              collapsedRows={props.collapsedRows}
            >
              {_cformControls.value.map((control: SearchFormControlProps, index: number) => {
                return (
                  <GridItem key={control.field} {...getResponsive(control, index)}>
                    <ElFormItem label={control.label} class="!mb-[20px]">
                      {control.field ? (
                        <SearchFormItem
                          v-model={_searchModel.value[control.field]}
                          control={control}
                          cslot={slots[control.field]}
                        />
                      ) : null}
                    </ElFormItem>
                  </GridItem>
                )
              })}
              <GridItem suffix v-resizeElement={handleActionResize}>
                <div ref={SearchActionEl} class="search-action-box flex items-center justify-end mb-[20px]">
                  {props.okpos === 'right' ? (
                    <>
                      <ElButton onClick={handleReset}>重置</ElButton>
                      <ElButton type="primary" onClick={handleQuery}>
                        查询
                      </ElButton>
                    </>
                  ) : (
                    <>
                      <ElButton type="primary" onClick={handleQuery}>
                        查询
                      </ElButton>
                      <ElButton onClick={handleReset}>重置</ElButton>
                    </>
                  )}
                </div>
              </GridItem>
            </Grid>
          </ElForm>
          {showCollapse.value && (
            <div class={`absolute bottom-0 left-0 w-full flex justify-center ${collapsed.value ? 'hbottom-20' : ''}`}>
              <div
                class={`w-[60px] h-[20px] cursor-pointer ${collapsed.value ? 'downi' : 'upi'}`}
                onClick={handleCollapse}
              ></div>
            </div>
          )}
        </div>
      ) : null
    }
  },
})
</script>
<style scoped>
.upi {
  background: url(./icon/icon_ArrowUp@2x.png);
  background-size: 100% 100%;
}
.downi {
  background: url(./icon/icon_ArrowDown@2x.png);
  background-size: 100% 100%;
}
.hbottom-20 {
  bottom: 0;
}
</style>
