import { computed, useTemplateRef } from 'vue'
import { ElMessage } from 'element-plus'

import { createProTableColumns, createProTableSearchForm } from './constants'
import { deleteDemoUser, getDemoUserList, type DemoUser } from './api'

export const useProTable = () => {
  const proTableRef = useTemplateRef<any>('proTableRef')

  const searchFormList = computed(() => createProTableSearchForm())

  const refresh = () => proTableRef.value?.updateTableData()

  const handleDelete = async (row: DemoUser) => {
    await deleteDemoUser(row.id)
    ElMessage.success(`已删除 ${row.name}`)
    refresh()
  }

  const columns = computed(() =>
    createProTableColumns({
      onDelete: (row) => void handleDelete(row),
    }),
  )

  const requestTableData = (params: Record<string, any>) => getDemoUserList(params)

  return {
    proTableRef,
    columns,
    searchFormList,
    requestTableData,
    refresh,
  }
}
