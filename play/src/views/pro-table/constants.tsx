import { ElButton, ElPopconfirm, ElSpace, ElTag } from 'element-plus'
import type { SearchFormControlProps } from '@rdeam/custom'

import { DEPARTMENT_OPTIONS, STATUS_OPTIONS, formatStatus, type DemoUser } from './api'

// 搜索表单配置：与 portal skill 的 search-form 用法对齐。
export const createProTableSearchForm = (): SearchFormControlProps[] => [
  {
    field: 'name',
    label: '关键字',
    el: 'input',
    props: { placeholder: '请输入姓名 / 账号', clearable: true, maxlength: 32 },
  },
  {
    field: 'department',
    label: '部门',
    el: 'select',
    options: DEPARTMENT_OPTIONS,
    props: { placeholder: '请选择', clearable: true },
  },
  {
    field: 'status',
    label: '状态',
    el: 'select',
    options: STATUS_OPTIONS,
    props: { placeholder: '请选择', clearable: true },
  },
]

// 表格列配置：演示 formatText / render / 操作列 / Popconfirm 等典型用法。
export const createProTableColumns = ({ onDelete }: { onDelete: (row: DemoUser) => void }) => [
  { prop: 'id', label: '编号', width: 80, sortable: 'custom' },
  { prop: 'name', label: '姓名', minWidth: 140 },
  { prop: 'loginName', label: '账号', minWidth: 140 },
  { prop: 'department', label: '部门', minWidth: 120 },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    formatText: (row: DemoUser) => formatStatus(row.status),
    render: ({ row }: { row: DemoUser }) => (
      <ElTag type={row.status === 1 ? 'success' : 'info'} effect="light">
        {formatStatus(row.status)}
      </ElTag>
    ),
  },
  { prop: 'remark', label: '备注', minWidth: 200, showOverflowTooltip: true },
  { prop: 'createTime', label: '创建时间', minWidth: 180, sortable: 'custom' },
  {
    prop: 'action',
    label: '操作',
    fixed: 'right',
    width: 140,
    render: ({ row }: { row: DemoUser }) => (
      <ElSpace>
        <ElButton type="primary" link onClick={() => window.alert(`查看 ${row.name}`)}>
          查看
        </ElButton>
        <ElPopconfirm title={`确认删除 ${row.name}？`} onConfirm={() => onDelete(row)}>
          {{
            reference: () => (
              <ElButton type="danger" link>
                删除
              </ElButton>
            ),
          }}
        </ElPopconfirm>
      </ElSpace>
    ),
  },
]
