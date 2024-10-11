<script lang="tsx">
import { defineComponent, h } from 'vue'
import { YtoRemoteSearch } from '@yto-custom/components/remote-search'
export default defineComponent({
  name: 'UserSearch',
  setup(_, context) {
    return () => {
      return h(YtoRemoteSearch, {
        url: '/service-api/index/user/search',
        remote: true,
        searchField: 'keyword',
        valueKey: 'userCode',
        labelKey: 'selText',
        placeholder: '请输入用户编号/姓名',
        requestParams: {
          pageNum: 1,
          pageSize: 50,
        },
        ...context.attrs,
        dataCallback: (data: any) => {
          return data.results.map((item: any) => {
            return { ...item, selText: `${item.userName} (${item.userCode})` }
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
