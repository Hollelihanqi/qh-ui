<template>
  <yto-user-search v-model="user" :request-headers="getHeaders"></yto-user-search>
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
  return { authorization: 'token' }
}
</script>
