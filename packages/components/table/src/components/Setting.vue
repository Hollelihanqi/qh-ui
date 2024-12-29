<template>
  <ElDrawer v-model="dialogVisible" direction="rtl" title="列筛选" size="360px" class="p-0 iel-drawer__bodyp0">
    <!-- <div class="h-[32px] w-full search-box flex items-center pl-[26px]">
      <el-icon><Search /></el-icon>
      <el-input placeholder="搜索" class="flex-1 h-full"> </el-input>
    </div> -->

    <div class="pl-[16px] flex flex-col">
      <template v-for="(item, index) in columns" :key="index">
        <el-checkbox
          v-model="item.checked"
          :checked="item.checked"
          size="large"
          :disabled="item.disabled"
          @change="handleChange"
        >
          <span>{{ item.label }}</span>
        </el-checkbox>
      </template>
    </div>
    <template #footer>
      <div class="flex items-center justify-end">
        <el-button type="default" @click="handleSCancel">取消</el-button>
        <!-- <el-button type="primary" @click="handleSReture">恢复默认</el-button> -->
        <!-- <el-button type="primary" @click="handleSSave">保存</el-button> -->
      </div>
    </template>
  </ElDrawer>
</template>
<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { ElDrawer } from 'element-plus'

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
