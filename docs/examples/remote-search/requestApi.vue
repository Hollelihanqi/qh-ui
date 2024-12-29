<template>
  <div class="basic-com">
    <yto-c-remote-search
      v-model="user"
      remote
      value-key="userCode"
      :opt-temp="optTemp"
      :request-api="getList"
    ></yto-c-remote-search>
  </div>
</template>
<script lang="ts" setup>
import { request } from '../../utils'
import { h, ref } from 'vue'

const user = ref('')
const _headers: any = () => {
  let token = sessionStorage.getItem('authorization') as string
  if (token) {
    if (token.indexOf('"') !== -1) {
      const regex = /^"(.*)"$/
      const matches: any = token.match(regex)
      token = matches[1]
    }
  }
  return {
    authorization: token,
  }
}
const getList = (keywords: string) => {
  return new Promise((resolve, reject) => {
    request
      .request({
        baseURL: '',
        url: '/service-api/index/user/search',
        method: 'get',
        params: {
          keyword: keywords,
        },
        headers: _headers,
      })
      .then((res: any) => {
        resolve(res.results)
      })
      .catch((error: any) => {
        reject(error)
      })
  })
}
const optTemp = (item: any) => {
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
}
</script>
<style lang="scss" scoped>
.basic-com {
  padding: 16px;
}
</style>
