<template>
  <div>
    <ElButton class="mb-2" @click="dialogVisible = true">按钮定制</ElButton>

    <yto-dialog
      v-model="dialogVisible"
      :confirm-option="confirm"
      :cancel-option="cancel"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
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
    const btnVisible = ref(true)

    const confirm = reactive({
      loading: true,
      // type: "primary",
      size: 'large',
      txt: 'confirm',
      hidden: false, // 显示隐藏按钮
    })

    const cancel = reactive({
      // loading: true,
      type: 'warning',
      size: 'large',
      txt: 'cancel',
      hidden: false,
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
      cancel,
      btnVisible,
    }
  },
})
</script>

<style></style>
