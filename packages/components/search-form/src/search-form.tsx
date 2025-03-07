import { defineComponent, ref, computed, watch, nextTick, provide, onActivated, onBeforeMount, onMounted } from 'vue'
import { ElForm, ElFormItem, ElButton } from 'element-plus'
import { searchFormProps, searchFormEmits, SearchFormControlProps } from './isearch-form'
import { BreakPoint } from './components/Grid/interface/index'
import { ResizeElement } from '@yto-custom/directives'
import Grid from './components/Grid/index.vue'
import GridItem from './components/Grid/components/GridItem.vue'
import SearchFormItem from './components/SearchFormItem.vue'
export default defineComponent({
  name: 'SearchForm',
  directives: { ResizeElement },
  props: searchFormProps,
  emits: searchFormEmits,
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
    const defaultValueMap = new Map()
    const fieldFormatKeys = ref<string[]>([])
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

    const insearchFormModel = ref({})

    const _searchModel: any = computed({
      get() {
        return props.searchModel || insearchFormModel.value
      },
      set(model: any) {
        insearchFormModel.value = model
        emit('update:searchModel', model)
      },
    })

    const resetField = (field: string, value = '') => {
      const newModle: any = { ..._searchModel.value }
      newModle[field] = value
      // emit('update:searchModel', newModle)
      _searchModel.value = newModle
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
            acc = { ...acc, ..._formatV }
          } else {
            acc[field] = _formatV
          }
        }
        return acc
      }, {})
    }

    const getFieldFormat = () => {
      return props.formControls.reduce((acc: any, item: SearchFormControlProps) => {
        const { field, fieldFormat } = item as any
        if (field && fieldFormat) {
          // 将 fieldFormat 的结果添加到累加器中，而不是覆盖
          const formatResult = fieldFormat(_searchModel.value[field])
          if (typeof formatResult === 'object') {
            // 如果返回的是对象，展开合并
            Object.assign(acc, formatResult)
          } else {
            // 如果返回的是其他类型，使用字段名作为 key
            acc[field] = formatResult
          }
          fieldFormatKeys.value.push(field)
        }
        return acc
      }, {})
    }

    const getValues = () => {
      const values = { ..._searchModel.value, ...getFormatValues(), ...getFieldFormat() }
      fieldFormatKeys.value.forEach((key) => {
        Reflect.deleteProperty(values, key)
      })
      return values
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

    const getItemDefaultValue = (item: SearchFormControlProps) => {
      if (item.defaultValue) {
        return typeof item.defaultValue === 'function' ? item.defaultValue() : item.defaultValue
      }
      return ''
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
        if (!item.field) return
        if (defaultValueMap.has(item.field)) {
          _dv[item.field] = defaultValueMap.get(item.field)
        } else if (item.defaultValue) {
          _dv[item.field] = getItemDefaultValue(item)
        }
      }
      insearchFormModel.value = _dv
      emit('update:searchModel', _dv)
    }

    const isDefaultValue = () => {
      if (props.modelDefault && Object.keys(props.modelDefault).length) {
        return true
      } else {
        return props.formControls.some((item: any) => item.defaultValue)
      }
    }

    const getDefaultValue = () => {
      for (const item of props.formControls) {
        if (item.field && item.defaultValue) {
          defaultValueMap.set(item.field, getItemDefaultValue(item))
        }
      }
    }

    const getNotClearDefaultValues = () => {
      const newObj: any = {}
      const _clearDefaultValue = props.clearDefaultValue
      for (const item of props.formControls) {
        const { field, clearDefaultValue } = item
        if (!field) continue
        if (clearDefaultValue === false || !_clearDefaultValue) {
          newObj[field] = props.modelDefault?.[field] ?? getItemDefaultValue(item)
        }
      }
      return newObj
    }

    const handleReset = () => {
      props.beforeResetFun()
      _searchModel.value = getNotClearDefaultValues()
      emit('on-reset')
      props.afterResetFun()
    }

    const handleQuery = () => {
      const values = getValues()
      emit('on-search', values)
      props.afterSearchFun?.(values)
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
    expose({ resetField, getFormatValues, getValues, getFieldFormat, handleDefaultValue })

    onActivated(() => {
      if (!hasFormControls.value) return
      const rect = searchFormInstance.value?.getBoundingClientRect()
      handleResize(rect)
    })

    const hasFormControls = computed(() => {
      return Boolean(props?.formControls?.length)
    })

    onBeforeMount(() => {
      if (!hasFormControls.value) return
      getDefaultValue()
      getNotClearDefaultValues()
      if (isDefaultValue()) handleDefaultValue()
    })

    onMounted(() => {
      if (props.collapse && hasFormControls.value) {
        calculateCollapsedIndex()
      }
    })

    return () => {
      return hasFormControls.value ? (
        <div
          ref={searchFormInstance}
          v-resizeElement={handleResize}
          class="yto-search-form relative bg-white px-[16px] pt-[20px]"
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
            <div class={`collapse-btn-box absolute bottom-0 left-0 w-full flex justify-center`}>
              <div
                class={`collapse-btn h-[20px] w-[60px] flex items-center justify-center ${collapsed.value ? 'down' : 'up'}`}
                onClick={handleCollapse}
              >
                <svg
                  v-show={!collapsed.value}
                  width="10px"
                  height="10px"
                  viewBox="0 0 14 13"
                  fill="none"
                  class="c-g-700 m-t-3-n yt-icon yt-icon-chevron-up-double"
                >
                  <path
                    d="M7.01 1.86 1.436 7.434l-.849-.849 6-6a.6.6 0 0 1 .849 0l6 6-.849.849-5.575-5.576Zm0 5-5.575 5.575-.849-.849 6-6a.6.6 0 0 1 .849 0l6 6-.849.849-5.575-5.576Z"
                    fill="currentColor"
                    stroke="none"
                    stroke-width="0"
                    stroke-linecap="round"
                  ></path>
                </svg>
                <svg
                  v-show={collapsed.value}
                  width="10px"
                  height="10px"
                  viewBox="0 0 14 13"
                  fill="none"
                  class="c-g-700 m-t-3-n yt-icon yt-icon-chevron-down-double"
                >
                  <path
                    d="m7.01 10.99 5.575-5.575.849.849-6 6a.6.6 0 0 1-.849 0l-6-6 .849-.849 5.575 5.576Zm0-5L12.584.416l.849.849-6 6a.6.6 0 0 1-.849 0l-6-6 .849-.849 5.575 5.576Z"
                    fill="currentColor"
                    stroke="none"
                    stroke-width="0"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </div>
            </div>
          )}
        </div>
      ) : null
    }
  },
})
