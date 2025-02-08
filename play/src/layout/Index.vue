<template>
  <div class="layout-w h-full w-full">
    <yto-layout-router type="horizaontal" class="lay-rou-container h-full">
      <template #header>
        <yto-layout-header :collapse="collapse" @collapse="collapse = !collapse"></yto-layout-header>
      </template>
      <yto-layout-menu
        :menus="menus"
        :collapse="collapse"
        width="230px"
        title="组件测试"
        link-type="click"
        :searchable="false"
        @menu-click="handleMenuClick"
      ></yto-layout-menu>
    </yto-layout-router>
  </div>
</template>

<script lang="ts" setup>
import { menus } from '@/router/menu'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

console.log('route______________', route.fullPath)
const collapse = ref(false)

const handleMenuClick = (item: any) => {
  router.push({ path: item.href, query: { timestamp: Date.now() } })
}
</script>

<style lang="scss"></style>
