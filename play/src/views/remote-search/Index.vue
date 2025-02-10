<template>
  <div class="view-w">
    <yto-remote-search v-model="user" remote valueKey="userCode" :requestApi="getList"></yto-remote-search>
    <CustomStaffSelect v-model="user" />
  </div>

</template>

<script lang="ts" setup>
import { request } from '@/api'
import CustomStaffSelect from './CustomStaffSelect.vue'
const _headers = () => {
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
const getList = async (keywords: string) => {
  return new Promise((resolve, reject) => {
    request
      .request({
        baseURL: '',
        url: '/api/category/user/searchUser',
        method: 'get',
        params: {
          keyword: keywords,
        },
        headers: _headers(),
      })
      .then((res: any) => {
        console.log('res_____', res)
        resolve([])
      })
      .catch((error: any) => {
        console.log('error_____________', error)
        reject(error)
      })
  })
}
const user = ref('')
</script>
