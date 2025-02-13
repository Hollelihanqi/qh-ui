<template>
  <div class="layout-menu-demo">
    <yto-layout-menu :unique-opened="true" :collapse="collapse" :menus="listNavigation"></yto-layout-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const collapse = ref(false)

const listNavigation: any[] = [
  {
    label: '公告管理',
    icon: '',
    children: [
      {
        label: '公告列表',
        href: '/layout-child-1?abc=1',
        code: '/layout-child-1',
        closable: false,
        mode: 'router',
      },
    ],
  },
  {
    label: '资讯管理',
    icon: '',
    // icon: "icon iconfont party-web-icon-caidan3",
    children: [
      {
        label: '资讯列表',
        href: '/layout-child-2',
        code: '/layout-child-2',
        mode: 'router',
      },
    ],
  },
]
</script>
<style lang="scss" scoped>
.layout-menu-demo {
  height: 280px;
  // width: 300px;
  .layout-menu {
    width: 400px;
    background: transparent;
    :deep(.el-menu) {
      width: 300px;
      .el-menu-item {
        border: none;
      }
      .el-menu--inline {
        width: 280px;
      }
    }
  }
}
</style>
