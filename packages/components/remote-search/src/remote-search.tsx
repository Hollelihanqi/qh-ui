import { defineComponent, h, ref, getCurrentInstance, onMounted, nextTick } from 'vue'
import { remoteSearchProps, remoteSearchEmits, RemoteSearchProps } from './iremote-search'
import { ElSelect, ElOption, ElSelectV2 } from 'element-plus'
import { request } from '@yto-custom/utils'
import { useDebounceFn } from '@vueuse/core'

export default defineComponent({
  name: 'RemoteSearch',
  props: remoteSearchProps,
  emits: remoteSearchEmits,
  setup(props: RemoteSearchProps, { attrs, expose, emit }: any) {
    const options: any = ref([])
    const copyOptions: any = ref([])
    const loading = ref(false)
    const collapse = ref(true)
    const setData = (list: any) => {
      options.value = list
      copyOptions.value = [...list]
      setDefaultFirstOption(list)
    }

    const setDefaultFirstOption = (list: any) => {
      // 如果设置了defaultFirstOption且有数据，将第一条数据设为默认值
      if (props.defaultFirstOption && list.length > 0 && !attrs.modelValue) {
        const firstItem = list[0]
        const value = props.modelItem ? firstItem : firstItem[props.valueKey]
        // 使用nextTick确保在DOM更新后设置值
        nextTick(() => {
          if (attrs['onUpdate:modelValue']) {
            attrs['onUpdate:modelValue'](value)
          }
        })
      }
    }

    const source = request.CancelToken.source()
    const updateData = (params = {}) => {
      source.cancel()
      source.token = request.CancelToken.source().token
      let _headers: any = { ...props.requestHeaders }
      if (typeof props.requestHeaders === 'function') {
        _headers = props.requestHeaders()
      }
      if (!collapse.value) {
        return
      }
      const _params = {
        ...props.defaultParams,
        ...props.requestParams,
        ...params,
      }
      try {
        loading.value = true
        request
          .request({
            url: props.url,
            method: props.method,
            ...(props.method.toUpperCase() === 'POST' ? { data: _params } : { params: _params }),
            // params: _params,
            // data: JSON.stringify(_params),
            headers: _headers,
            cancelToken: source.token,
          })
          .then((res: any) => {
            // 处理空响应
            if (!res) {
              setData([])
              emit('after-remote', res)
              return
            }

            // 使用数据回调处理
            if (props.dataCallback) {
              setData(props.dataCallback(res) ?? [])
              emit('after-remote', res)
              return
            }

            // 处理数组响应
            if (Array.isArray(res)) {
              setData(res)
              emit('after-remote', res)
              return
            }

            // 处理对象响应
            if (props.resultKey && Array.isArray(res[props.resultKey])) {
              setData(res[props.resultKey])
            } else {
              setData([])
            }

            emit('after-remote', res)
          })
          .finally(() => {
            loading.value = false
          })
      } catch (error) {
        console.error('获取数据失败', error)
      }
    }

    const callRequestApi = async (keywords?: string) => {
      if (props.requestApi) {
        try {
          loading.value = true
          const list = await props.requestApi(keywords)
          setData(list)
        } catch (error) {
          console.error('请求报错', error)
        } finally {
          loading.value = false
        }
      }
    }

    // 一次性获取所有数据,不需要动态搜索
    if (props.requestAuto && props.url && !props.isRemoteSearch) {
      updateData(props.requestParams)
    } else if (props.requestAuto && props.requestApi && !props.isRemoteSearch) {
      callRequestApi()
    }
    const remoteMethod = useDebounceFn((query: string) => {
      if (query) {
        if (!props.url && props.requestApi) {
          callRequestApi(query)
        } else {
          let params = {}
          if (props.searchField) params = { [props.searchField]: query }
          updateData(params)
        }
      } else {
        options.value = []
      }
    }, 300)
    const cusTemplate = (item: any) => {
      if (props.optTemp && typeof props.optTemp === 'function') {
        return props.optTemp(item)
      }
      return h('div', { class: 'cus-temp' }, [h('span', {}, props.labelKey && item[props.labelKey])])
    }

    const getOptions = (params = {}) => {
      options.value = []
      if (!props.url && props.requestApi) {
        callRequestApi()
      } else {
        updateData(params)
      }
    }

    const clearOptions = () => {
      options.value = []
      copyOptions.value = []
    }

    const disLabelEvent = () => {
      const label = RemoteSearchSelectInstance.value?.$el.parentElement.parentElement
      if (label) label.classList.add('el-form-label-dis')
    }

    onMounted(() => {
      if (props.getInstance && typeof props.getInstance === 'function') {
        props.getInstance(getCurrentInstance())
      }
      if (props.getExposed && typeof props.getExposed === 'function') {
        props.getExposed(getCurrentInstance()?.exposed)
      }
      disLabelEvent()
    })

    const RemoteSearchSelectInstance: any = ref()
    expose({ getOptions, clearOptions })

    const renderSelect = () => {
      return h(
        ElSelect,
        {
          class: 'yto-remote-search remote-search-select',
          ref: RemoteSearchSelectInstance,
          loading: loading.value,
          'value-key': props.valueKey,
          remote: false,
          clearable: true,
          filterable: true,
          reserveKeyword: true,
          collapseTags: true,
          collapseTagsTooltip: true,
          placeholder: props.isRemoteSearch ? '请输入' : '请选择',
          style: {
            width: props.w,
          },
          ...attrs,
          remoteMethod: remoteMethod,
          onVisibleChange: async (value: boolean) => {
            await nextTick()
            if (value) {
              if (!props.isRemoteSearch) {
                options.value = [...copyOptions.value]
              }
            } else {
              options.value = []
            }
          },
        },
        () => [
          options.value.map((item: any, index: number) => {
            return h(
              ElOption,
              {
                key: index,
                label: props.labelKey && item[props.labelKey],
                value: props.modelItem ? item : props.valueKey && item[props.valueKey],
              },
              {
                default: () => cusTemplate(item),
              },
            )
          }),
        ],
      )
    }
    const renderSelectV2 = () => {
      const _props = {
        label: props.labelKey,
        value: props.modelItem ? 'value' : props.valueKey,
      }
      return (
        <ElSelectV2
          class="yto-remote-search remote-search-select"
          style={{ width: props.w }}
          options={options.value}
          value-key={props.valueKey}
          props={_props}
          clearable
          filterable
          remoteMethod={remoteMethod}
          loading={loading.value}
          {...attrs}
        ></ElSelectV2>
      )
    }

    return () => {
      return props.stag === 'select' ? renderSelect() : renderSelectV2()
    }
  },
})
