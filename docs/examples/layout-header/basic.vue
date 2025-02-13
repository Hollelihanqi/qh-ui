<template>
  <div id="layout-hedaer-demo">
    <yto-layout-header
      title="圆通党建"
      :collapse="collapse"
      :logo="logo"
      :user-info="userInfo"
      @collapse="collapse = !collapse"
    >
    </yto-layout-header>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import logo from './vue.svg'

const collapse = ref(false)
const userInfo = {
  userCode: '02348618',
  userName: '魏春霈',
}
</script>
<style lang="scss" scoped>
#layout-hedaer-demo {
  .layout-header {
    --layout-header-background: #900808;
  }
}
</style>
