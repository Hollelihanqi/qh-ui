<template>
  <div>
    <el-button class="a" @click="dialogVisible = true">基础弹框</el-button>

    <yto-dialog v-model="dialogVisible" width="500px" @confirm="handleConfirm" @cancel="handleCancel">
      <template #header> title </template>
      <p>这是一个示例对话框ww</p>
    </yto-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
// import { YtoDialog } from "@yto/custom";

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
