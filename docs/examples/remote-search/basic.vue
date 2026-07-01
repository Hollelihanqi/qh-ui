<template>
  <div class="basic-com">
    <hd-remote-search
      v-model="user"
      base-u-r-l=""
      url="/service-api/index/user/search"
      remote
      search-field="keyword"
      value-key="userCode"
      label-key="userName"
      :requester="request"
      :data-callback="dataCallback"
    ></hd-remote-search>
  </div>
</template>
<script lang="tsx" setup>
import { request } from './request'
const user = ref('')
const dataCallback = (data: any) => {
  return data.results.map((item: any) => {
    return { ...item }
  })
}
</script>
<style lang="scss" scoped>
.basic-com {
  padding: 16px;
}
</style>
