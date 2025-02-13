<template>
  <yto-remote-search
    v-model="user"
    remote
    value-key="userCode"
    :opt-temp="optTemp"
    :request-api="getList"
  ></yto-remote-search>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue'
import { request } from './request'

const user = ref('')
const _headers: any = () => {
  return {
    authorization: 'token-123',
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
