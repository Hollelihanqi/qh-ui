<template>
  <div class="view-w">
    <div>
      <el-radio-group v-model="radio">
        <el-radio-button label="基础使用" value="1" />
        <el-radio-button label="列设置" value="2" />
      </el-radio-group>
    </div>
    <div class="flex-1 flex flex-col">
      <component :is="radio === '1' ? BaseTable : SettingTable" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import BaseTable from './BaseTable.vue'
import SettingTable from './SettingTable.vue'
import { ref } from 'vue'

const radio = ref('1')
</script>
