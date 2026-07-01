import type { PageParams, PageResult } from '@/utils/portal'

export interface DemoUser {
  id: number
  name: string
  loginName: string
  department: string
  status: 0 | 1
  remark: string
  createTime: string
}

const STATUS_TEXT: Record<DemoUser['status'], string> = {
  0: '停用',
  1: '启用',
}

const DEPARTMENTS = ['研发中心', '产品部', '数据部', '运维部', '设计部']

// play 没有真实接口，构造一份 96 条的内存数据集，用于演示分页 / 搜索 / 排序。
const DATA_SET: DemoUser[] = Array.from({ length: 96 }, (_, index) => {
  const id = index + 1
  return {
    id,
    name: `演示用户 ${id.toString().padStart(2, '0')}`,
    loginName: `play_${id.toString().padStart(3, '0')}`,
    department: DEPARTMENTS[id % DEPARTMENTS.length],
    status: (id % 4 === 0 ? 0 : 1) as DemoUser['status'],
    remark: id % 3 === 0 ? '协议用户，需特别关注' : '',
    createTime: new Date(2025, 0, 1 + (id % 90)).toISOString().slice(0, 19).replace('T', ' '),
  }
})

interface QueryParams extends PageParams {
  name?: string
  department?: string
  status?: DemoUser['status']
}

// 模拟服务端筛选 + 排序 + 分页。
export const getDemoUserList = async (params: QueryParams): Promise<PageResult<DemoUser>> => {
  await new Promise((resolve) => window.setTimeout(resolve, 220))

  const { pageNum = 1, pageSize = 10, name, department, status, sortField, sortBy } = params

  let result = DATA_SET.filter((item) => {
    if (name && !item.name.includes(name) && !item.loginName.includes(name)) return false
    if (department && item.department !== department) return false
    if (status !== undefined && status !== null && (status as unknown as string) !== '' && item.status !== status)
      return false
    return true
  })

  if (sortField && typeof sortField === 'string') {
    const direction = sortBy === 'desc' ? -1 : 1
    result = [...result].sort((a, b) => {
      const av = (a as Record<string, any>)[sortField]
      const bv = (b as Record<string, any>)[sortField]
      if (av === bv) return 0
      return av > bv ? direction : -direction
    })
  }

  const total = result.length
  const start = (pageNum - 1) * pageSize
  const items = result.slice(start, start + pageSize)
  return { items, total }
}

export const deleteDemoUser = async (id: number) => {
  await new Promise((resolve) => window.setTimeout(resolve, 200))
  const idx = DATA_SET.findIndex((item) => item.id === id)
  if (idx >= 0) DATA_SET.splice(idx, 1)
  return { success: true }
}

export const formatStatus = (status: DemoUser['status']) => STATUS_TEXT[status] ?? '--'

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((value) => ({ label: value, value }))

export const STATUS_OPTIONS: Array<{ label: string; value: DemoUser['status'] }> = [
  { label: '启用', value: 1 },
  { label: '停用', value: 0 },
]
