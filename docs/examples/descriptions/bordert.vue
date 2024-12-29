<template>
  <yto-c-descriptions :data="formModel" :list="infosList" border :span="6">
    <template #status="scope"> {{ IStatus[scope.status] }}模板插槽 </template>
  </yto-c-descriptions>
</template>
<script lang="tsx" setup>
enum IStatus {
  '需求待评估' = 1,
  '评估完成' = 2,
  '生产待验证' = 3,
  '待整改' = 4,
  '验证通过' = 5,
  '异常关闭' = 6,
}

const formModel = {
  c_time: '2023-10-12 13:09:52',
  u_time: '2023-10-12 14:13:19',
  is_delete: '0',
  id: 'FB-20231012-0008',
  project_name: '【勿删】星辰流程测试（李路）',
  component_name: '',
  component_id: '',
  demand_name: '测试移动端  --否',
  demand_assignee: '01787050',
  report_org: '10000000000000188955',
  risk_level: 'R0-1',
  status: 2,
  contact_user: '02283958',
  app_risk: 0,
  version_id: '',
  version_num: '',
  demand_code: 'CS06301-214',
  assess_content: 'test hahaha ',
  assess_result: 1,
  result_desc: 'jsdhfjdgfhjdgf ',
  demand_document: null,
  demand_desc: '烦烦烦方法',
  files: [],
  file_list: [
    {
      file_name: '002.JPG',
      uuid: '9a15a8f9-5281-4ea0-aae2-287da26fe4b1',
    },
    {
      file_name: '4.pdf',
      uuid: 'ddb9649f-8ac1-49b2-a02e-ccba788b644d',
    },
    {
      file_name: '1举报功能对外API说明文档(1).docx',
      uuid: 'fe8d9823-e37c-41f7-b22b-428cc1095cd5',
    },
    {
      file_name: '6.xlsx',
      uuid: '6d0aa2c3-6810-4402-835a-c7a72ffdae95',
    },
    {
      file_name: '7.csv',
      uuid: '655d2e57-5c90-46b1-86df-eb71944382c4',
    },
    {
      file_name: '18 - 副本.JPEG',
      uuid: 'db2e67ca-259f-4d35-9ef6-62fa5d66ddd3',
    },
    {
      file_name: '21.gif',
      uuid: 'bc753a41-3026-4fcf-a3f5-9d2c57ab538f',
    },
    {
      file_name: 'images-1.zip',
      uuid: 'c38acdfb-6ef1-42e2-ac1c-ee92761c4c59',
    },
    {
      file_name: 'PyCharm 2018.2.4.rar',
      uuid: 'bf8487df-9db1-4719-9bfb-7b518bd890c8',
    },
    {
      file_name: 'PyCharm 2018.2.4.rar',
      uuid: '6bc883d5-efb4-4492-bf3e-66c9d61b55c5',
    },
  ],
  report_user_name: '胡荣',
  contact_user_list: [
    {
      contact_user_code: '02283958',
      contact_user_name: '叶青',
    },
  ],
  report_org_name: '测试组-共享技术中心',
  report_org_parent_name: '共享技术中心',
}

const infosList = [
  {
    label: '项目名称',
    prop: 'project_name',
  },
  {
    label: '模块名',
    prop: 'component_name',
  },
  {
    label: '需求名称',
    prop: 'demand_name',
  },
  {
    label: '报告人',
    prop: 'report_user_name',
  },
  {
    label: '报告人部门',
    prop: 'report_org_name',
  },
  {
    label: '状态',
    prop: 'status',
  },
  {
    label: '创建时间',
    prop: 'c_time',
  },
  {
    label: '对接人',
    prop: 'contact_user_list',
    render: () => {
      const str = formModel.contact_user_list?.map((item: any) => item.contact_user_name).filter((i: String) => i)
      return str && str.length ? str.join('、') : '--'
    },
  },
  {
    label: '版本号',
    prop: 'version_num',
  },
]
</script>
