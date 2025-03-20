<template>
  <div class="layout-w h-full w-full">
    <yto-layout-router type="horizaontal" class="lay-rou-container h-full">
      <template #header>
        <yto-layout-header :collapse="collapse" :userInfo="userInfo" @collapse="collapse = !collapse"></yto-layout-header>
      </template>
      <yto-layout-menu
        :menus="menus"
        :collapse="collapse"
        title="组件测试"
        :searchable="false"
      ></yto-layout-menu>
    </yto-layout-router>
  </div>
</template>

<script lang="ts" setup>
import { menus } from '@/router/menu'

const collapse = ref(false)
const userInfo = {
  userCode: '02348618',
  userName: '魏春霈',
}
</script>

<style lang="scss"></style>
