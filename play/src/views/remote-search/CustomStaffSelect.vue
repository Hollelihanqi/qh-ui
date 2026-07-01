<script lang="tsx">
import { defineComponent, h } from 'vue'
import { HdRemoteSearch } from '@rdeam/hd-ui'
import { getToken } from '@/utils'
import { request } from '@/api'
export default defineComponent({
  setup(_, context) {
    return () => {
      return h(HdRemoteSearch, {
        url: '/api/v2/searchEmployees',
        remote: true,
        searchField: 'search',
        valueKey: 'id',
        requester: request,
        labelKey: 'selText',
        requestHeaders: {
          authorization: getToken(),
        },
        placeholder: '请输入用户编号/姓名',
        dataCallback: (data: any) => {
          return data.map((item: any) => {
            return { ...item, selText: `${item.name} (${item.id})` }
          })
        },
        ...context.attrs,
        optTemp: (item: any) => {
          return h(
            'div',
            {
              class: 'option-c',
              style: {
                display: 'flex',
                alignItems: 'center',
              },
            },
            [
              h('span', {}, `${item.name} -`),
              h('span', {}, `${item.id} -`),
              h('span', {}, `${item.region_name} -`),
              h('span', {}, item.depart),
            ],
          )
        },
      })
    }
  },
})
</script>
