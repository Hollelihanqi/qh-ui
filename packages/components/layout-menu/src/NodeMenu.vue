<template>
  <template v-if="showIcon">
    <img v-if="data?.imgsrc" class="img-icon mr-[8px] ml-[-4px] w-[16px] h-[16px]" :src="data?.imgsrc" />
    <ElIcon v-else class="align-middle">
      <!-- <component v-if="!isBlank(getIcon(data))" :is="getIcon(data)"></component> -->
      <i v-if="!isBlank(getIcon(data))" :class="getIcon(data)"></i>
      <template v-else>{{ labelFirst(data) }}</template>
    </ElIcon>
  </template>

  <div :class="showIcon ? 'w-[calc(100%-18px)]' : 'w-full'" :style="`display:${collapse ? 'none' : 'block'}`">
    <p class="truncate w-full">{{ getLable(data) }}</p>
  </div>
  <!-- <span class="truncate ">{{ getLable(data) }}</span> -->
</template>
<script lang="ts" setup>
import { inject } from 'vue'
import { ElIcon } from 'element-plus'
// import 'element-plus/es/components/icon/style/css'
import { isBlank, isEmpty } from 'gold-core'
import { EnumSessionKey } from '@yto-custom/build-constants'

defineProps({ data: Object, showIcon: { type: Boolean, default: true }, collapse: { type: Boolean, default: false } })
const keyLabel = inject<any>(EnumSessionKey.MenuKeyLabel)
const keyIcon = inject<any>(EnumSessionKey.MenuKeyIcon)
// const width = inject<any>(EnumSessionKey.MenuWidth);

function getLable(target: any) {
  if (isEmpty(target)) {
    return ''
  }
  const key: string = keyLabel as string
  return Reflect.get(target, isBlank(key) ? 'label' : key)
}

function labelFirst(target: any) {
  return getLable(target).substring(0, 1)
}

function getIcon(target: any) {
  if (isEmpty(target)) {
    return ''
  }
  const key: string = keyIcon as string
  return Reflect.get(target, isBlank(key) ? 'icon' : key)
}
</script>
