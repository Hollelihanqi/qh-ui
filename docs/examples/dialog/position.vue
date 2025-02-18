<template>
  <div>
    <ElButton @click="dialogVisible = true">弹出位置</ElButton>

    <yto-dialog v-model="dialogVisible" :offset="['0', '0']" @confirm="handleConfirm" @cancel="handleCancel">
      <template #header> title </template>
      <p>这是一个示例对话框</p>
    </yto-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
export default defineComponent({
  setup() {
    const confirm = reactive({
      // loading: true,
      type: 'warning',
      // size: 'large'
    })

    const dialogVisible = ref(false)
    const handleConfirm = (val: boolean) => {
      dialogVisible.value = false
      console.log(val)
    }
    const handleCancel = (val: boolean) => {
      dialogVisible.value = false
      console.log(val)
    }
    return {
      dialogVisible,
      handleConfirm,
      handleCancel,
      confirm,
    }
  },
})
</script>

<style></style>
