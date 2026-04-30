<template>
  <hd-remote-search v-model="user" value-key="id" label-key="name" :request-api="searchUsers"></hd-remote-search>
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

const searchUsers = (keyword: string) => {
  const users = [
    { id: '1', name: '张三' },
    { id: '2', name: '李四' },
    { id: '3', name: '王五' },
  ]

  return Promise.resolve(users.filter((item) => item.name.includes(keyword || '')))
}
</script>
