<template>
  <div class="layout-header flex items-center px-4 h-[48px] leading-[48px]">
    <div class="flex">
      <slot v-if="title || logo" name="left">
        <div class="left-header flex items-center" :class="collapse ? 'disappear' : 'appear'">
          <img v-if="logo" class="w-[30px] h-[30px] mr-[10px]" :src="logo" alt="logo" />
          <span class="title overflow-hidden whitespace-nowrap">{{ title }}</span>
        </div>
      </slot>
    </div>
    <div class="flex flex-1">
      <slot>
        <div class="collapse-icon flex items-center">
          <i
            class="icon iconfont cursor-pointer"
            :class="collapse ? 'layout-icon_dianjizhankai' : 'layout-icon_dianjishouqi'"
            @click="onCollapse"
          ></i>
        </div>
      </slot>
    </div>
    <slot v-if="user" name="right">
      <div class="right-header flex items-center text-[14px]">
        <div class="mr-[5px]">{{ user.userName }}</div>
        <div class="mr-[10px]">（{{ user.userCode }}）</div>
        <slot name="extend"></slot>
        <i
          v-if="isfullscreen"
          class="icon iconfont cursor-pointer mx-[25px] !text-[14px]"
          :class="fullscreen ? 'layout-icon_guanbiquanju' : 'layout-icon_kaiqiquanju'"
          @click="onFullScreen"
        ></i>
        <slot name="logout">
          <div class="flex items-center cursor-pointer" @click="onLogout">
            <span class="mr-[5px]">退出</span> <ElIcon size="16"><SwitchButton /></ElIcon>
          </div>
        </slot>
      </div>
    </slot>
  </div>
</template>
<script lang="ts" setup>
import { ref, unref } from 'vue'
import {ElIcon} from 'element-plus'
import { SwitchButton } from '@element-plus/icons-vue'
import { layoutHeaderProps, layoutHeaderEmits } from './layout-header'
import useFullScreen from './fullScreen'
import { EnumSessionKey } from './constants'
import { session } from 'gold-core'

defineOptions({
  name: 'LayoutHeader',
})

const props = defineProps(layoutHeaderProps)
const emit = defineEmits(layoutHeaderEmits)

const user = ref<any>(props.userInfo ? props.userInfo : session.get(EnumSessionKey.Session_User))
function onLogout(): void {
  emit('logout')
  session.clear()
}
//处理折叠事件
function onCollapse(): void {
  setTimeout(() => {
    const el: any = document.querySelector(' .layout-header .left-header .title')
    if (el) {
      el.style.display = props.collapse ? 'none' : 'block'
    }
  }, 150)

  emit('collapse')
}
// 处理全屏事件
const { toggleFullScreen } = useFullScreen()
const fullscreen = ref(false)
function onFullScreen(): void {
  toggleFullScreen()
  emit('fullscreen')
}
const KeyDown = (event: any) => {
  if (event.keyCode === 122) {
    event.returnValue = false
    toggleFullScreen() //触发全屏的方法
  }
}
window.addEventListener('keydown', KeyDown, true)
document.addEventListener('fullscreenchange', () => {
  fullscreen.value = !unref(fullscreen) //你要切换得图标使用得属性
})
</script>
