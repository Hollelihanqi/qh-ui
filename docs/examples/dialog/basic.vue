<template>
  <div>
    <ElButton class="mb-2" @click="dialogVisible = true">基础弹框</ElButton>

    <yto-dialog v-model="dialogVisible" width="500px" @confirm="handleConfirm" @cancel="handleCancel">
      <template #header> title </template>
      <p>这是一个示例对话框ww</p>
    </yto-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  setup() {
    const confirm = reactive({
      type: 'warning',
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
