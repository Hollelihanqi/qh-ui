<template>
  <hd-tabs v-model="tabAct" :tabs="orgTabs" w="160px"> </hd-tabs>
</template>
<script lang="tsx" setup>
import { TabItemProps } from '@hd/custom'
const tabAct = ref('HEAD')

const test = ref(12)
const test1 = ref(12)

const orgTabs: TabItemProps = [
  {
    label: '总部',
    value: 'HEAD',
    labelCount: test,
  },
  {
    label: '省区',
    value: 'REGION_MANAGE',
    labelCount: () => test1.value,
  },
  {
    label: '中心',
    value: 'TRANSFER_CENTER',
  },
  {
    label: '分公司',
    value: 'BRANCH',
  },
  {
    label: '分部',
    value: 'SUB_DEPARTMENT',
  },
]

setTimeout(() => {
  test.value = 1231231
  test1.value = 777777
}, 5000)
</script>
