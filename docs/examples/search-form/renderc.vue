<template>
  <yto-c-user-search v-model="user" :request-headers="getHeaders"></yto-c-user-search>
</template>
<script lang="tsx" setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
const user = ref<any>('')
watch(
  () => user.value,
  () => {
    ElMessage.success(user.value)
  },
)

const getHeaders = () => {
  let token = sessionStorage.getItem('authorization') as string
  if (token) {
    if (token.indexOf('"') !== -1) {
      const regex = /^"(.*)"$/
      const matches: any = token.match(regex)
      token = matches[1]
    }
  }
  return { authorization: token }
}
</script>
