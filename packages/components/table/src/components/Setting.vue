<template>
  <ElDrawer v-model="dialogVisible" direction="rtl" title="列筛选" size="360px" class="p-0 iel-drawer__bodyp0">
    <div class="pl-[16px] flex flex-col">
      <template v-for="(item, index) in columns" :key="index">
        <ElCheckbox
          v-model="item.checked"
          :checked="item.checked"
          size="large"
          :disabled="item.disabled"
          @change="handleChange"
        >
          <span>{{ item.label }}</span>
        </ElCheckbox>
      </template>
    </div>
    <template #footer>
      <div class="flex items-center justify-end">
        <ElButton type="default" @click="handleSCancel">取消</ElButton>
      </div>
    </template>
  </ElDrawer>
</template>
<script lang="ts" setup>
import { ElDrawer, ElCheckbox, ElButton } from 'element-plus'

interface setColumnsProps {
  label: string
  prop: string
  checked: boolean
  disabled: boolean
}

defineProps({
  columns: {
    type: Array as PropType<setColumnsProps[]>,
    default: () => [],
  },
})
const emits = defineEmits(['on-save', 'on-return'])

const dialogVisible = ref(false)
const actionDialog = (): void => {
  dialogVisible.value = true
}

const handleChange = () => {
  emits('on-save')
}

const handleSCancel = () => {
  dialogVisible.value = false
}

defineExpose({
  actionDialog,
})
</script>
<style lang="scss">
.iel-drawer__bodyp0 {
  .el-drawer__body {
    padding: 0;
    border-bottom: 1px solid #dcdfe6;
  }
  .el-drawer__footer {
    padding: 12px 16px;
  }
  .search-box {
    border: 1px solid #dcdfe6;
    border-left: 0;
    border-right: 0;
    .el-input {
      border: none;
      box-shadow: none;
    }
    .el-input__wrapper {
      box-shadow: none;
    }
  }
}
</style>
