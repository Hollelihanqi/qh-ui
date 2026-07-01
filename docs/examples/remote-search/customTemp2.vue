<script lang="ts">
import { h, defineComponent } from 'vue'
import { HdRemoteSearch } from '@rdeam/hd-ui'
import { request } from './request'
export default defineComponent({
  setup(props, context) {
    return () => {
      return h(HdRemoteSearch, {
        baseURL: '',
        url: '/service-api/index/user/search',
        remote: true,
        searchField: 'keyword',
        valueKey: 'userCode',
        labelKey: 'userName',
        placeholder: '请输入用户编号/姓名',
        requester: request,
        requestParams: {
          pageNum: 1,
          pageSize: 50,
        },
        ...context.attrs,
        dataCallback: (data: any) => {
          return data.results.map((item: any) => {
            return { ...item }
          })
        },
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
              h('span', {}, `${item.userName} -`),
              h('span', {}, `${item.userCode} -`),
              h('span', {}, `${item.deptName} -`),
              h('span', {}, item.jobName),
            ],
          )
        },
      })
    }
  },
})
</script>
