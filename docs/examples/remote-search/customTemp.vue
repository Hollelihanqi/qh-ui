<template>
  <div class="basic-com">
    <h3>自定义 option</h3>
    <hd-remote-search
      v-model="user"
      base-u-r-l=""
      url="/service-api/index/user/search"
      remote
      search-field="keyword"
      value-key="userCode"
      label-key="userName"
      :data-callback="dataCallback"
      :opt-temp="optTemp"
    ></hd-remote-search>
    <h3>自定义 label</h3>
    <hd-remote-search
      v-model="user2"
      base-u-r-l=""
      url="/service-api/index/user/search"
      remote
      search-field="keyword"
      value-key="userCode"
      label-key="selText"
      placeholder="请输入用户编号/姓名"
      :data-callback="dataCallback2"
      :opt-temp="optTemp"
    ></hd-remote-search>
  </div>
</template>
<script lang="tsx" setup>
import { h } from 'vue'
const user = ref('')
const user2 = ref('')
const dataCallback = (data: any) => {
  return data.results.map((item: any) => {
    return { ...item }
  })
}

const dataCallback2 = (data: any) => {
  return data.results.map((item: any) => {
    return { ...item, selText: `${item.userName} (${item.userCode})` }
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
